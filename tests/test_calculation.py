"""Tests for the calculation rules."""

from __future__ import annotations

from datetime import datetime
from zoneinfo import ZoneInfo

import pytest

from custom_components.electricity_lens.calculation import (
    DAY,
    HOUR,
    YEAR,
    Timeline,
    average_price,
    battery_saving,
    combine_grid_prices,
    effective_meters,
    electricity_prices,
    estimated_heat,
    fuel_price,
    heat_pump_saving,
    heating_cost,
    household_hour,
    internal_rate_of_return,
    normal_price,
    paid_prices,
    price_level,
    pv_saving,
    solar_saving,
    standing_charge_share,
    summarize,
    wallbox_saving,
)
from custom_components.electricity_lens.models import CategoryResult, PaybackData
from custom_components.electricity_lens.sensor import _surplus


def test_timeline() -> None:
    """The first value also covers the past; later values apply from their start."""
    timeline = Timeline()
    assert timeline.value_at(100) is None
    assert timeline.set(0.11, valid_from=5000)
    assert timeline.value_at(-1) == 0.11
    assert not timeline.set(0.11, valid_from=6000)
    assert timeline.set(0.13, valid_from=7200)
    assert timeline.value_at(7199) == 0.11
    assert timeline.value_at(7200) == 0.13
    # A second change before the first took effect replaces it.
    assert timeline.set(0.14, valid_from=7200)
    assert timeline.points == [(0.0, 0.11), (7200, 0.14)]
    assert Timeline.from_list(timeline.as_list()) == timeline
    # Sensors are recorded the same way; None means none is chosen.
    assert timeline.set(None, valid_from=9000)
    assert timeline.value_at(9000) is None


def test_electricity_prices_order() -> None:
    """Entity price, then costs per kWh, then fixed price, then the last price."""
    hours = [0.0, HOUR, 2 * HOUR, 3 * HOUR]
    prices = electricity_prices(
        hours,
        entity_prices={0.0: 0.40},
        costs={0.0: 9.0, HOUR: 0.6, 2 * HOUR: 0.0},
        energy={0.0: 1.0, HOUR: 2.0, 2 * HOUR: 0.0},
        fixed=None,
        last_known=0.2,
    )
    assert prices == [0.40, 0.3, 0.3, 0.3]

    assert electricity_prices(
        hours[:2], entity_prices={}, costs={}, energy={}, fixed=0.32, last_known=None
    ) == [0.32, 0.32]
    # Hours before the first known price take the first known price.
    assert electricity_prices(
        hours[:2],
        entity_prices={HOUR: 0.25},
        costs={},
        energy={},
        fixed=None,
        last_known=None,
    ) == [0.25, 0.25]
    assert electricity_prices(
        hours[:1], entity_prices={}, costs={}, energy={}, fixed=None, last_known=None
    ) == [None]


def test_paid_prices() -> None:
    """Costs per kWh count where they fit the prices of the hour."""
    hours = [0.0, HOUR, 2 * HOUR, 3 * HOUR, 4 * HOUR]
    paid = paid_prices(
        hours,
        prices=[0.24, 0.24, 0.32, 0.32, 0.32],
        # A car charging in the cheap minutes; a meter catching up on a gap; no
        # energy to derive a price from; no costs at all.
        costs={0.0: 1.9, HOUR: 0.6, 2 * HOUR: 0.0},
        energy={0.0: 10.0, HOUR: 65.0, 2 * HOUR: 0.0, 3 * HOUR: 1.0},
        ranges={0.0: (0.18, 0.32), HOUR: (0.18, 0.32), 2 * HOUR: (0.32, 0.32)},
    )
    assert paid == pytest.approx([0.19, 0.24, 0.32, 0.32, 0.32])
    # Without a sensor's prices the costs are all that is known.
    assert paid_prices(
        hours[:1], prices=[0.30], costs={0.0: 2.0}, energy={0.0: 10.0}, ranges={}
    ) == pytest.approx([0.20])


def test_pv_saving() -> None:
    """Self-used solar power at the grid price plus feed-in revenue."""
    assert pv_saving(
        solar=5, export=2, battery_out=1, battery_in=1.5, price=0.3, export_revenue=0.16
    ) == pytest.approx(2.5 * 0.3 + 0.16)


def test_battery_saving() -> None:
    """The battery against the same PV plant without it, hour by hour."""
    price, feed_in = 0.30, 0.08

    def saving(**flows: float) -> float:
        return battery_saving(price=price, feed_in_price=feed_in, **flows)

    # Noon: it stores solar power that would have been fed in.
    noon = {"solar": 5.0, "export": 1.0, "battery_out": 0.0, "battery_in": 3.0}
    assert saving(**noon) == pytest.approx(-3 * feed_in)
    # Evening: what it gives would have come from the grid.
    evening = {"solar": 0.0, "export": 0.0, "battery_out": 3.0, "battery_in": 0.0}
    assert saving(**evening) == pytest.approx(3 * price)
    # Charged from the grid, or fed in from the battery.
    from_grid = {"solar": 0.0, "export": 0.0, "battery_out": 0.0, "battery_in": 2.0}
    assert saving(**from_grid) == pytest.approx(-2 * price)
    to_grid = {"solar": 0.0, "export": 2.0, "battery_out": 2.0, "battery_in": 0.0}
    assert saving(**to_grid) == pytest.approx(2 * feed_in)
    # With the battery's part taken out, the PV plant saves as without one: the
    # stored solar power fed in, what the battery gave bought.
    total = pv_saving(price=price, export_revenue=1.0 * feed_in, **noon)
    without = pv_saving(
        solar=5.0,
        export=4.0,
        battery_out=0.0,
        battery_in=0.0,
        price=price,
        export_revenue=4.0 * feed_in,
    )
    assert total - saving(**noon) == pytest.approx(without)


def test_heating_cost() -> None:
    """Each fuel at its unit, energy content, and efficiency."""
    assert heating_cost(9.2, "gas", 0.1) == pytest.approx(1.0)
    assert heating_cost(92, "oil", 1.0) == pytest.approx(10.0)
    # LPG: 6.57 kWh per litre at 92 %; pellets: 4.8 kWh per kg at 88 %.
    assert heating_cost(92 * 6.57, "lpg", 0.8) == pytest.approx(100 * 0.8)
    assert heating_cost(88 * 4.8, "pellets", 0.35) == pytest.approx(100 * 0.35)
    # District heating and an electric heating pay for each kWh of heat.
    assert heating_cost(100, "district_heating", 0.12) == pytest.approx(12.0)
    assert heating_cost(100, "electric", 0.25) == pytest.approx(25.0)


def test_heat_pump_saving() -> None:
    """The former heating's cost for the same heat minus the heat pump's electricity."""
    assert heat_pump_saving(
        electricity=1, heat=4, heating="gas", fuel_price=0.09, electricity_price=0.3
    ) == pytest.approx(4 / 0.92 * 0.09 - 0.3)


def test_average_price() -> None:
    """Several tariffs count with their imported energy, or equally without any."""
    assert average_price([0.3, 0.2], [1.0, 3.0]) == pytest.approx(0.225)
    assert average_price([0.3, 0.2], [0.0, 0.0]) == pytest.approx(0.25)
    assert average_price([None, 0.2], [1.0, 1.0]) == pytest.approx(0.2)
    assert average_price([None], [1.0]) is None


def test_wallbox_saving() -> None:
    """Fuel for the same distance minus the charging electricity."""
    assert wallbox_saving(
        electricity=20,
        ev_consumption=20,
        combustion_consumption=7,
        fuel_price=1.8,
        electricity_price=0.3,
    ) == pytest.approx(7 * 1.8 - 6)


def test_effective_meters() -> None:
    """A meter contained in another selected meter is not counted twice."""
    parents = {"heating": "total", "water": "total", "total": None, "rod": "heating"}
    assert effective_meters(["heating", "water"], parents) == ["heating", "water"]
    assert effective_meters(["total", "heating", "rod"], parents) == ["total"]
    assert effective_meters(["heating", "rod", "heating"], parents) == ["heating"]
    cycle = {"a": "b", "b": "a"}
    assert effective_meters(["a"], cycle) == ["a"]


def test_summarize() -> None:
    """No yearly average before twelve months, no payback without investment."""
    early = summarize(saving=100, counting_since=0, until=100 * DAY, investment=1000)
    assert early.per_year is None
    assert early.payback == pytest.approx(10)
    assert early.yearly_from == YEAR

    later = summarize(saving=3000, counting_since=0, until=2 * YEAR, investment=None)
    assert later.per_year == pytest.approx(1500)
    assert later.payback is None


def test_payback_figures() -> None:
    """Years left until paid back, the return from then on."""
    paying = summarize(saving=2000, counting_since=0, until=2 * YEAR, investment=5000)
    assert paying.years_left == pytest.approx(3)
    assert paying.annual_return is None

    paid = summarize(
        saving=24349, counting_since=0, until=10 * YEAR, investment=12174.5
    )
    assert paid.years_left is None
    assert paid.annual_return == pytest.approx(17.28, abs=0.01)

    # Before twelve months there is no average to go on.
    early = summarize(saving=100, counting_since=0, until=100 * DAY, investment=1000)
    assert early.years_left is None


def test_internal_rate_of_return() -> None:
    """The rate so far: zero at break-even, none before it."""
    rate = internal_rate_of_return
    assert rate(investment=12174.5, saving=12174.5, years=5.19) == pytest.approx(
        0, abs=1e-6
    )
    assert rate(investment=12174.5, saving=12572.4, years=5.191) == pytest.approx(
        1.25, abs=0.01
    )
    assert rate(investment=12174.5, saving=24349, years=10) == pytest.approx(
        17.28, abs=0.01
    )
    assert rate(investment=1000, saving=999, years=5) is None
    assert rate(investment=0, saving=999, years=5) is None
    assert rate(investment=1000, saving=2000, years=0.05) is None


def test_normal_price() -> None:
    """The price of most hours: the high rate beside a cheap night window."""
    assert normal_price([0.182] * 5 + [0.318] * 19) == pytest.approx(0.318)
    # A few price peaks or cheap windows do not move it.
    assert normal_price([0.25, 0.26, 0.27, 0.28, 1.20]) == pytest.approx(0.27)
    assert normal_price([]) is None


def test_price_level() -> None:
    """Ten percent below or above the normal price; a flat tariff has none."""
    assert price_level(0.182, 0.318) == "cheap"
    assert price_level(0.318, 0.318) is None
    assert price_level(0.378, 0.318) == "expensive"
    # Within ten percent, a dynamic tariff's hour is normal.
    assert price_level(0.29, 0.30) is None
    assert price_level(0.27, 0.27) is None
    assert price_level(0.20, None) is None


def _hour(**changes: object) -> dict[str, float]:
    arguments: dict[str, object] = {
        "grid_import": 1.0,
        "export": 0.0,
        "solar": 3.0,
        "battery_out": 0.0,
        "battery_in": 0.0,
        "devices": {"car": 2.0, "charger": 1.5, "pump": 1.0},
        "top_level": ["car", "pump"],
        "price": 0.30,
        "feed_in": 0.08,
        "export_revenue": 0.0,
        "standing_charge": 0.02,
        "tariffs": {"pump": 0.20},
        "level": "cheap",
        "hour_level": "cheap",
        "normal": 0.40,
        "debts": {},
    }
    return household_hour(**{**arguments, **changes})  # type: ignore[arg-type]


def test_household_hour() -> None:
    """Solar power is shared in proportion; own tariffs price their device."""
    hour = _hour()
    # 4 kWh used, 3 of them solar power: 75 %.
    assert hour["household_energy"] == 4.0
    assert hour["household_solar"] == 3.0
    # The pump's own tariff has one price: its grid power has no level.
    assert hour["household_cheap"] == pytest.approx(1.0 - 0.25)
    assert "pump_cheap" not in hour
    assert hour["car_solar"] == pytest.approx(1.5)
    assert hour["car_cost"] == pytest.approx(0.5 * 0.30 + 1.5 * 0.08)
    assert hour["pump_cost"] == pytest.approx(0.25 * 0.20 + 0.75 * 0.08)
    # The charger is part of the car, so "other" leaves it out.
    assert hour["charger_solar"] == pytest.approx(1.125)
    assert hour["other_energy"] == pytest.approx(1.0)
    # A device's energy is in its own statistic already.
    assert "car_energy" not in hour
    assert hour["household_cost"] == pytest.approx(
        hour["car_cost"] + hour["pump_cost"] + hour["other_cost"]
    )
    assert hour["grid_cost"] == pytest.approx(1.0 * 0.30 + 0.02)
    assert hour["grid_import_cost"] == pytest.approx(0.30)
    assert hour["grid_feed_in"] == 0.0
    assert hour["grid_cheap_saving"] == pytest.approx(0.75 * (0.40 - 0.30))
    assert "household_expensive" not in hour
    assert hour["grid_hours"] == 1.0
    assert hour["grid_cheap_hours"] == 1.0


def test_household_hour_levels() -> None:
    """Expensive grid power costs more than at the normal price; hours count."""
    hour = _hour(level="expensive", hour_level="expensive", normal=0.25)
    assert hour["household_expensive"] == pytest.approx(0.75)
    assert hour["grid_cheap_saving"] == pytest.approx(0.75 * (0.25 - 0.30))
    assert hour["grid_expensive_hours"] == 1.0
    # A charge in the cheap minutes of a dearer hour: the kWh is cheap, the hour not.
    hour = _hour(hour_level=None)
    assert hour["household_cheap"] == pytest.approx(0.75)
    assert "grid_cheap_hours" not in hour
    assert hour["grid_hours"] == 1.0


def test_household_hour_costs_by_source() -> None:
    """What the solar power and each level cost add up to a consumer's costs."""
    hour = _hour()
    for area in ("car", "other"):
        assert hour[f"{area}_solar_cost"] == pytest.approx(hour[f"{area}_solar"] * 0.08)
        assert hour[f"{area}_cost"] == pytest.approx(
            hour[f"{area}_solar_cost"] + hour[f"{area}_cheap_cost"]
        )
    # The pump's grid power at its own tariff has no level.
    assert hour["pump_cost"] == pytest.approx(hour["pump_solar_cost"] + 0.25 * 0.20)
    assert hour["household_cost"] == pytest.approx(
        hour["household_solar_cost"] + hour["household_cheap_cost"] + 0.25 * 0.20
    )
    # The household's cheap power costs what its consumers' cheap power costs.
    assert hour["household_cheap_cost"] == pytest.approx(
        hour["car_cheap_cost"] + hour["other_cheap_cost"]
    )
    normal = _hour(level=None, hour_level=None)
    assert "household_cheap_cost" not in normal
    assert "grid_cheap_saving" not in normal
    assert "grid_cheap_hours" not in normal


def test_consumers_add_up_when_a_meter_books_a_day_at_once() -> None:
    """A meter's surplus is paid back by "other", in every figure."""
    debts: dict[str, float] = {}
    totals: dict[str, float] = {}
    # Five hours of 2 kWh with the pump's meter silent, then the pump books them.
    for pump in (0.0, 0.0, 0.0, 0.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0):
        hour = _hour(
            grid_import=1.0,
            solar=1.0,
            devices={"pump": pump},
            top_level=["pump"],
            tariffs={},
            debts=debts,
        )
        for key, value in hour.items():
            totals[key] = totals.get(key, 0.0) + value
    assert totals["household_energy"] == pytest.approx(20.0)
    assert totals["other_energy"] == pytest.approx(10.0)
    assert totals["household_cost"] == pytest.approx(10 * (0.30 + 0.08))
    for figure in ("solar", "cost", "solar_cost", "cheap", "cheap_cost"):
        assert totals[f"pump_{figure}"] + totals[f"other_{figure}"] == pytest.approx(
            totals[f"household_{figure}"]
        )
    assert debts["energy"] == pytest.approx(0.0)


def test_consumers_with_debt_stay_at_zero() -> None:
    """Until the surplus is paid back, "other" shows nothing, not less."""
    debts = {"energy": 5.0, "cost": 2.0}
    hour = _hour(grid_import=1.0, solar=1.0, devices={}, top_level=[], debts=debts)
    assert hour["other_energy"] == 0.0
    assert hour["other_cost"] == 0.0
    assert debts["energy"] == pytest.approx(3.0)
    assert debts["cost"] == pytest.approx(2.0 - (0.30 + 0.08))
    assert hour["household_energy"] == 2.0


def test_household_hour_battery_from_grid() -> None:
    """A battery charged from the grid gives no solar power to the house."""
    hour = _hour(solar=0.0, battery_in=0.5, devices={}, top_level=[], tariffs={})
    assert hour["household_energy"] == 0.5
    assert hour["household_solar"] == 0.0
    assert hour["other_energy"] == 0.5
    # Bad readings leave the household at zero, not below.
    hour = _hour(grid_import=0.0, solar=0.0, devices={}, top_level=[], tariffs={})
    assert hour["household_energy"] == 0.0


def test_balance_figures() -> None:
    """The sums behind the balance, and the yearly savings only when all have one."""
    paid = CategoryResult(
        category="pv",
        calculating=False,
        saving=12000,
        investment=10000,
        payback=120,
        per_year=2000,
        annual_return=5,
    )
    paying = CategoryResult(
        category="heat_pump",
        calculating=False,
        saving=1000,
        investment=9000,
        payback=11,
        per_year=500,
    )
    data = PaybackData({"a": paid, "b": paying})
    assert data.balance == pytest.approx(-6000)
    assert data.saved == pytest.approx(13000)
    assert data.invested == pytest.approx(19000)
    assert data.per_year == pytest.approx(2500)
    # All together: 13000 of 19000 paid back, 6000 to go at 2500 a year.
    assert data.payback == pytest.approx(13000 / 19000 * 100)
    assert data.years_left == pytest.approx(2.4)
    assert PaybackData({"a": paid}).years_left is None

    young = CategoryResult(category="wallbox", calculating=False, saving=10)
    assert PaybackData({"a": paid, "c": young}).per_year is None
    assert PaybackData({"b": paying, "c": young}).years_left is None
    assert PaybackData({"c": young}).payback is None

    assert paying.balance == pytest.approx(-8000)
    assert young.balance == pytest.approx(10)
    assert CategoryResult(category="pv", calculating=True, saving=10).balance is None

    assert _surplus(paid) == {
        "surplus": pytest.approx(2000),
        "surplus_percent": pytest.approx(20),
    }
    assert _surplus(paying) == {"surplus": None, "surplus_percent": None}


def test_combine_grid_prices() -> None:
    """Each grid connection counts with its imports; the bounds hold all prices."""
    hours = [0.0, HOUR]
    prices = combine_grid_prices(
        hours,
        means=[[0.30, 0.30], [0.10, None]],
        paids=[[0.28, 0.30], [0.10, None]],
        energies=[{0.0: 3.0}, {0.0: 1.0}],
        ranges=[{0.0: (0.20, 0.40)}, {}],
    )
    assert prices.mean == pytest.approx([0.25, 0.30])
    assert prices.paid == pytest.approx([0.235, 0.30])
    assert prices.low == pytest.approx([0.20, 0.30])
    assert prices.high == pytest.approx([0.40, 0.30])


def test_standing_charge_share() -> None:
    """A month's standing charge is shared evenly over its hours."""
    berlin = ZoneInfo("Europe/Berlin")
    february = datetime(2025, 2, 10, 12, tzinfo=berlin).timestamp()
    assert standing_charge_share(28 * 24, february, berlin) == pytest.approx(1.0)
    # March 2025 has an hour less: summer time begins.
    march = datetime(2025, 3, 10, 12, tzinfo=berlin).timestamp()
    assert standing_charge_share(31 * 24 - 1, march, berlin) == pytest.approx(1.0)


def test_estimated_heat() -> None:
    """The entered COP counts before measuring, the measured COP in later gaps."""
    assert estimated_heat(
        2.0,
        entered_scop=4.0,
        measured_heat=0.0,
        measured_electricity=0.0,
        measuring=False,
    ) == pytest.approx(8.0)
    assert estimated_heat(
        2.0,
        entered_scop=4.0,
        measured_heat=30.0,
        measured_electricity=10.0,
        measuring=True,
    ) == pytest.approx(6.0)
    # Measuring, but without electricity yet: the entered COP, else nothing.
    assert estimated_heat(
        2.0, entered_scop=4.0, measured_heat=0, measured_electricity=0, measuring=True
    ) == pytest.approx(8.0)
    assert estimated_heat(
        2.0, entered_scop=None, measured_heat=0, measured_electricity=0, measuring=True
    ) == pytest.approx(0.0)


def test_fuel_price() -> None:
    """A sensor's price first, then its last price, then the entered one."""
    assert fuel_price(sensor=1.9, last_sensor=1.7, entered=1.5) == 1.9
    assert fuel_price(sensor=None, last_sensor=1.7, entered=1.5) == 1.7
    assert fuel_price(sensor=None, last_sensor=None, entered=1.5) == 1.5
    assert fuel_price(sensor=None, last_sensor=None, entered=None) == 0.0


def test_solar_saving() -> None:
    """What the solar power added: the hour's price against the lost compensation."""
    # 2 kWh, half solar power; grid power at 0.30, feed-in at 0.08.
    saving = heat_pump_saving(
        electricity=2.0,
        heat=8.0,
        heating="gas",
        fuel_price=0.10,
        electricity_price=0.30,
    )
    alternative = heating_cost(8.0, "gas", 0.10)
    cost = 1.0 * 0.30 + 1.0 * 0.08
    assert solar_saving(
        alternative_cost=alternative, cost=cost, saving=saving
    ) == pytest.approx(1.0 * (0.30 - 0.08))
