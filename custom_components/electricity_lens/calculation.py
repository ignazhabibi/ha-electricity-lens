"""How savings and payback are calculated.

Pure functions without Home Assistant, so the rules can be read and tested on
their own. Energy is in kWh, money in the user's currency.
"""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass, field
from datetime import datetime, timedelta, tzinfo
from math import log1p

from .const import FUELS

HOUR = 3600.0
DAY = 24 * HOUR
YEAR = 365.25 * DAY
# Below this an hour's import is too small to derive a price from its costs.
MIN_PRICED_ENERGY = 0.01
# Prices closer than half a cent are one price: the sensor's rounding noise
# does not make an implausible cost.
SAME_PRICE = 0.005

type TimelineValue = float | str | None


@dataclass(slots=True)
class Timeline:
    """A value the user set, each one valid from a point in time.

    A new value applies from the next full hour; what was computed with the
    old one stays, just as the energy dashboard treats a new electricity price.
    The first value applies from the beginning.
    """

    points: list[tuple[float, TimelineValue]] = field(
        default_factory=list[tuple[float, TimelineValue]]
    )

    def value_at(self, timestamp: float) -> TimelineValue:
        """Return the value in effect at timestamp."""
        if not self.points:
            return None
        index = bisect_right([start for start, _ in self.points], timestamp)
        return self.points[max(index - 1, 0)][1]

    def set(self, value: TimelineValue, valid_from: float) -> bool:
        """Record a new value. Return whether it changed."""
        if self.points and self.points[-1][1] == value:
            return False
        if not self.points:
            valid_from = 0.0
        self.points = [point for point in self.points if point[0] < valid_from]
        self.points.append((valid_from, value))
        return True

    def as_list(self) -> list[list[TimelineValue]]:
        """Return the timeline for storage."""
        return [[start, value] for start, value in self.points]

    @classmethod
    def from_list(cls, points: Iterable[Sequence[TimelineValue]]) -> Timeline:
        """Restore a timeline from storage."""
        return cls([(float(start or 0.0), value) for start, value in points])


def electricity_prices(
    hours: Sequence[float],
    *,
    entity_prices: Mapping[float, float],
    costs: Mapping[float, float],
    energy: Mapping[float, float],
    fixed: float | None,
    last_known: float | None,
) -> list[float | None]:
    """Return the price of one grid connection for each hour.

    In order of preference: the dashboard's price entity, the dashboard's
    costs divided by the imported energy, its fixed price, the last price seen.
    Hours before the first known price take the first known price.
    """
    prices: list[float | None] = []
    previous = last_known
    for hour in hours:
        price = entity_prices.get(hour)
        if (
            price is None
            and hour in costs
            and (kwh := energy.get(hour, 0.0)) >= MIN_PRICED_ENERGY
        ):
            price = costs[hour] / kwh
        if price is None:
            price = fixed if fixed is not None else previous
        prices.append(price)
        if price is not None:
            previous = price
    first = next((price for price in prices if price is not None), None)
    return [first if price is None else price for price in prices]


def paid_prices(
    hours: Sequence[float],
    *,
    prices: Sequence[float | None],
    costs: Mapping[float, float],
    energy: Mapping[float, float],
    ranges: Mapping[float, tuple[float, float]],
) -> list[float | None]:
    """Return what a kWh imported in each hour really cost.

    A load that follows the cheap windows of a tariff, such as a charging car,
    pays less than the hour's mean price. The dashboard's costs know that: they
    price each kWh at its moment. They have gaps though, for example a meter
    catching up on hours it missed, so they count only if they fit the prices
    the sensor had in that hour. Otherwise the mean price stands.
    """
    paid = list(prices)
    for index, hour in enumerate(hours):
        if hour in costs and (kwh := energy.get(hour, 0.0)) >= MIN_PRICED_ENERGY:
            unit = costs[hour] / kwh
            low, high = ranges.get(hour, (unit, unit))
            if low - SAME_PRICE <= unit <= high + SAME_PRICE:
                paid[index] = unit
    return paid


def average_price(
    prices: Sequence[float | None], energies: Sequence[float]
) -> float | None:
    """Return the price of an hour over several grid connections.

    With several tariffs, such as day and night, each counts with the energy
    imported through it. Without imports, each counts the same.
    """
    known = [
        (price, energy)
        for price, energy in zip(prices, energies, strict=True)
        if price is not None
    ]
    if not known:
        return None
    total = sum(energy for _, energy in known)
    if total >= MIN_PRICED_ENERGY:
        return sum(price * energy for price, energy in known) / total
    return sum(price for price, _ in known) / len(known)


@dataclass(frozen=True, slots=True)
class GridPrices:
    """The electricity price of each hour over all grid connections."""

    mean: list[float | None]
    """The mean price, which values what did not come from the grid."""
    paid: list[float | None]
    """What a kWh imported in the hour cost."""
    low: list[float | None]
    high: list[float | None]


def combine_grid_prices(
    hours: Sequence[float],
    *,
    means: Sequence[Sequence[float | None]],
    paids: Sequence[Sequence[float | None]],
    energies: Sequence[Mapping[float, float]],
    ranges: Sequence[Mapping[float, tuple[float, float]]],
) -> GridPrices:
    """Return the prices of each hour over all grid connections.

    means, paids, energies, and ranges hold one entry per grid connection:
    its mean and paid prices, its imports, and its price sensor's lowest and
    highest price per hour, if known. Each connection counts with what it
    imported, as in average_price. The lowest and highest price of an hour
    also hold its mean and paid price.
    """

    def over_grids(per_grid: Sequence[Sequence[float | None]]) -> list[float | None]:
        return [
            average_price(
                [prices[index] for prices in per_grid],
                [energy.get(hour, 0.0) for energy in energies],
            )
            for index, hour in enumerate(hours)
        ]

    mean = over_grids(means)
    paid = over_grids(paids)
    low: list[float | None] = []
    high: list[float | None] = []
    for index, hour in enumerate(hours):
        known = [item[hour] for item in ranges if hour in item]
        bounds = [price for price in (mean[index], paid[index]) if price is not None]
        low.append(min([*bounds, *(item[0] for item in known)], default=None))
        high.append(max([*bounds, *(item[1] for item in known)], default=None))
    return GridPrices(mean=mean, paid=paid, low=low, high=high)


def standing_charge_share(monthly: float, hour: float, time_zone: tzinfo) -> float:
    """Return the standing charge of an hour: an even share of its month's.

    Months begin at local midnight, so a month with a change to or from
    summer time has an hour less or more.
    """
    local = datetime.fromtimestamp(hour, time_zone)
    month = local.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    next_month = (month + timedelta(days=32)).replace(day=1)
    return monthly / ((next_month.timestamp() - month.timestamp()) / HOUR)


def pv_saving(
    *,
    solar: float,
    export: float,
    battery_out: float,
    battery_in: float,
    price: float,
    export_revenue: float,
) -> float:
    """Return what the PV plant saved in one hour.

    Without PV and battery all electricity used in the house would come from
    the grid and nothing would be fed in. The battery belongs to the PV plant:
    what it gives back is valued when it is used.
    """
    self_used = solar - export + battery_out - battery_in
    return self_used * price + export_revenue


def battery_saving(
    *,
    solar: float,
    export: float,
    battery_out: float,
    battery_in: float,
    price: float,
    feed_in_price: float,
) -> float:
    """Return what the battery added to the PV plant's saving in one hour.

    Compared with the same PV plant without a battery: the solar power it
    stored would have been fed in, what it charged from the grid would not
    have been bought, and what it gave would have come from the grid, or not
    have been fed in. The hour's statistics do not say which power went where,
    so the battery is taken to charge from solar power first and to give to
    the house first. The PV plant's saving minus this is what it saved
    without the battery, so the two add up to the PV plant's saving.
    """
    solar_to_battery = min(battery_in, max(solar, 0.0))
    grid_to_battery = battery_in - solar_to_battery
    solar_to_grid = min(export, max(solar - solar_to_battery, 0.0))
    battery_to_grid = min(battery_out, max(export - solar_to_grid, 0.0))
    battery_to_house = battery_out - battery_to_grid
    return (
        battery_to_house * price
        + battery_to_grid * feed_in_price
        - solar_to_battery * feed_in_price
        - grid_to_battery * price
    )


def heating_cost(heat: float, heating: str, price: float) -> float:
    """Return what the former heating would have paid for this heat.

    The price is per unit of its fuel, such as a kWh of gas or a litre of oil.
    Energy content and efficiency are fixed.
    """
    fuel = FUELS[heating]
    return heat / fuel.efficiency / fuel.kwh_per_unit * price


def heat_pump_saving(
    *,
    electricity: float,
    heat: float,
    heating: str,
    fuel_price: float,
    electricity_price: float,
) -> float:
    """Return what the heat pump saved in one hour, compared with the former heating."""
    return heating_cost(heat, heating, fuel_price) - electricity * electricity_price


def estimated_heat(
    electricity: float,
    *,
    entered_scop: float | None,
    measured_heat: float,
    measured_electricity: float,
    measuring: bool,
) -> float:
    """Return the heat of an hour no heat meter measured, from its electricity.

    Before the heat meters began to measure, the seasonal COP entered for that
    time counts; later gaps use the COP measured until then. measured_heat and
    measured_electricity are what the measured hours so far added up to.
    """
    scop = None if measuring else entered_scop
    if scop is None and measured_electricity > 0:
        scop = measured_heat / measured_electricity
    if scop is None:
        scop = entered_scop or 0.0
    return electricity * scop


def fuel_price(
    *, sensor: float | None, last_sensor: float | None, entered: float | None
) -> float:
    """Return the gas, oil, or fuel price of an hour.

    A price sensor takes precedence. While it has no value, its last value
    counts, and without one the price entered for that time.
    """
    if sensor is not None:
        return sensor
    if last_sensor is not None:
        return last_sensor
    return entered or 0.0


def solar_saving(*, alternative_cost: float, cost: float, saving: float) -> float:
    """Return what a device's solar power added to its saving in one hour.

    The saving counts all of the device's electricity at the hour's price, as
    the benefit of solar power belongs to the PV plant. The device's cost
    counts its solar power at the feed-in compensation it did not earn. What
    remains between them and the alternative is what its solar power saved.
    """
    return alternative_cost - cost - saving


def wallbox_distance(electricity: float, ev_consumption: float) -> float:
    """Return the distance charged, in km.

    The electric car's consumption is per 100 km, measured at the wallbox.
    """
    return electricity / ev_consumption * 100


def fuel_cost(
    distance: float, combustion_consumption: float, fuel_price: float
) -> float:
    """Return what a combustion car would have paid for fuel for a distance.

    Its consumption is in litres per 100 km.
    """
    return distance * combustion_consumption / 100 * fuel_price


def wallbox_saving(
    *,
    electricity: float,
    ev_consumption: float,
    combustion_consumption: float,
    fuel_price: float,
    electricity_price: float,
) -> float:
    """Return what charging at home saved in one hour, compared with a combustion car.

    Consumptions are per 100 km: kWh for the electric car, measured at the
    wallbox, and litres for the combustion car.
    """
    distance = wallbox_distance(electricity, ev_consumption)
    return (
        fuel_cost(distance, combustion_consumption, fuel_price)
        - electricity * electricity_price
    )


AREA_HOUSEHOLD = "household"
AREA_OTHER = "other"
GRID_COST = "grid_cost"
GRID_IMPORT_COST = "grid_import_cost"
GRID_FEED_IN = "grid_feed_in"
GRID_STANDING_CHARGE = "grid_standing_charge"
GRID_CHEAP_SAVING = "grid_cheap_saving"
GRID_HOURS = "grid_hours"
GRID_CHEAP_HOURS = "grid_cheap_hours"
GRID_EXPENSIVE_HOURS = "grid_expensive_hours"
LEVEL_CHEAP = "cheap"
LEVEL_EXPENSIVE = "expensive"
# A price this far below or above the normal price is cheap or expensive.
LEVEL_SPAN = 0.10
# The normal price is the median of the hourly prices of this span.
NORMAL_SPAN = 7 * DAY


def normal_price(prices: Iterable[float]) -> float | None:
    """Return the normal price: the median of the hourly prices given.

    The price that holds in most hours, such as the high rate of a tariff with
    a cheap night window. Seven days, so that weekends count. A median, so that
    a few cheap windows or price peaks do not move it.
    """
    ordered = sorted(prices)
    return ordered[len(ordered) // 2] if ordered else None


def price_level(price: float, normal: float | None) -> str | None:
    """Return the level of a price against the normal price, None for normal.

    A flat tariff has no levels: every hour costs the normal price.
    """
    if normal is None or normal <= 0:
        return None
    if price <= normal * (1 - LEVEL_SPAN):
        return LEVEL_CHEAP
    if price >= normal * (1 + LEVEL_SPAN):
        return LEVEL_EXPENSIVE
    return None


def household_hour(
    *,
    grid_import: float,
    export: float,
    solar: float,
    battery_out: float,
    battery_in: float,
    devices: Mapping[str, float],
    top_level: Iterable[str],
    price: float,
    feed_in: float,
    export_revenue: float,
    standing_charge: float,
    tariffs: Mapping[str, float],
    level: str | None,
    hour_level: str | None,
    normal: float | None,
    debts: dict[str, float],
) -> dict[str, float]:
    """Return consumption, mix, and costs of one hour, keyed by area and figure.

    Areas are the household, each device, and "other", what the household used
    beyond its top-level devices. devices, top_level, and tariffs name devices
    by their area. Figures are energy, solar, cost, what the solar power and the
    grid power's level cost, and the grid power's level, cheap or expensive, if
    any. Devices have no energy figure: their own statistic already holds it.

    Solar power used in the house is shared among the consumers in proportion
    to their consumption. It costs the feed-in compensation it did not earn;
    grid power costs the hour's price, or a device's own tariff. The battery
    belongs to the PV plant, as in pv_saving. GRID_COST is what the grid
    connection cost: imports minus feed-in compensation plus the standing charge.

    level is the level of the price paid in the hour, hour_level that of the
    hour's mean price, against the normal price. A device's own tariff has one
    price, so its grid power has no level. GRID_CHEAP_SAVING is what cheap grid
    power cost less and expensive grid power cost more than at the normal
    price. GRID_HOURS counts the hours, grid_cheap_hours and
    grid_expensive_hours those of each level, whatever the household drew.

    "Other" is what remains of each figure, so all consumers add up to the
    household. A meter that books a day at once reports more than the household
    used in that hour, and what it booked was in "other" while nobody knew. That
    surplus stays in debts, keyed by figure and updated here, and later hours of
    "other" pay it back.
    """
    consumption = max(grid_import - export + solar + battery_out - battery_in, 0.0)
    from_solar = min(max(consumption - grid_import, 0.0), consumption)
    share = from_solar / consumption if consumption else 0.0
    result: dict[str, float] = {
        GRID_COST: grid_import * price - export_revenue + standing_charge,
        GRID_IMPORT_COST: grid_import * price,
        GRID_FEED_IN: export_revenue,
        GRID_STANDING_CHARGE: standing_charge,
        GRID_HOURS: 1.0,
    }
    if hour_level == LEVEL_CHEAP:
        result[GRID_CHEAP_HOURS] = 1.0
    elif hour_level == LEVEL_EXPENSIVE:
        result[GRID_EXPENSIVE_HOURS] = 1.0

    def add(
        area: str, energy: float, unit_price: float, own_level: str | None
    ) -> dict[str, float]:
        solar_part = energy * share
        grid_part = energy - solar_part
        figures = {
            "solar": solar_part,
            "cost": grid_part * unit_price + solar_part * feed_in,
            "solar_cost": solar_part * feed_in,
        }
        if own_level is not None:
            figures[own_level] = grid_part
            figures[f"{own_level}_cost"] = grid_part * unit_price
        for figure, value in figures.items():
            result[f"{area}_{figure}"] = value
        return figures

    household = add(AREA_HOUSEHOLD, consumption, price, level) | {"energy": consumption}
    remaining = dict(household)
    top = set(top_level)
    own_grid = 0.0
    for stat, energy in devices.items():
        tariff = tariffs.get(stat)
        figures = add(
            stat,
            energy,
            price if tariff is None else tariff,
            level if tariff is None else None,
        )
        if stat not in top:
            continue
        if tariff is not None:
            grid_part = energy * (1 - share)
            own_grid += grid_part
            # An own tariff changes what the household costs, not what it used,
            gap = grid_part * (tariff - price)
            household["cost"] += gap
            remaining["cost"] += gap
            # and its grid power is not part of the levels of the household's.
            if level is not None:
                for figure, value in (
                    (level, grid_part),
                    (f"{level}_cost", grid_part * price),
                ):
                    household[figure] = max(household[figure] - value, 0.0)
                    remaining[figure] -= value
        for figure, value in (figures | {"energy": energy}).items():
            remaining[figure] -= value
    if level is not None and normal is not None:
        result[GRID_CHEAP_SAVING] = max(grid_import - own_grid, 0.0) * (normal - price)
    for figure, value in remaining.items():
        left = value - debts.get(figure, 0.0)
        result[f"{AREA_OTHER}_{figure}"] = max(left, 0.0)
        debts[figure] = max(-left, 0.0)
    result[f"{AREA_HOUSEHOLD}_energy"] = consumption
    result[f"{AREA_HOUSEHOLD}_cost"] = household["cost"]
    if level is not None:
        result[f"{AREA_HOUSEHOLD}_{level}"] = household[level]
        result[f"{AREA_HOUSEHOLD}_{level}_cost"] = household[f"{level}_cost"]
    return result


def effective_meters(
    selected: Iterable[str], parents: Mapping[str, str | None]
) -> list[str]:
    """Drop meters already contained in another selected meter.

    The energy dashboard records with included_in_stat that a device's
    consumption is part of another device's. Counting both would count twice.
    """
    chosen = list(dict.fromkeys(selected))
    result: list[str] = []
    for meter in chosen:
        parent = parents.get(meter)
        seen = {meter}
        # Walk up until a selected ancestor, the top, or a loop.
        while parent is not None and parent not in chosen and parent not in seen:
            seen.add(parent)
            parent = parents.get(parent)
        if parent is None or parent in seen:
            result.append(meter)
    return result


@dataclass(frozen=True, slots=True)
class Summary:
    """Payback figures derived from the saving so far."""

    payback: float | None
    """Share of the investment the savings have covered, in percent."""
    per_year: float | None
    """Average saving per year, once there are twelve months of data."""
    yearly_from: float
    """When the yearly average becomes available."""
    years_left: float | None
    """Years until the investment is covered, at the yearly average."""
    annual_return: float | None
    """Internal rate of return so far, in percent per year, once paid back."""


def internal_rate_of_return(
    *, investment: float, saving: float, years: float
) -> float | None:
    """Return the internal rate of return so far, in percent per year.

    The investment at the start, the saving evenly over the years since, and no
    value left at the end: zero when the saving has just covered the investment.
    None before that.
    """
    if investment <= 0 or saving < investment or years < 0.1:
        return None
    low, high = 0.0, 5.0
    for _ in range(30):
        rate = (low + high) / 2
        growth = log1p(rate)
        worth_now = (
            saving / years * ((1 - (1 + rate) ** -years) / growth)
            if growth > 1e-9
            else saving
        )
        if worth_now > investment:
            low = rate
        else:
            high = rate
    return (low + high) / 2 * 100


def summarize(
    *,
    saving: float,
    counting_since: float,
    until: float,
    investment: float | None,
) -> Summary:
    """Return payback figures, leaving out what the data cannot support."""
    yearly_from = counting_since + YEAR
    years = (until - counting_since) / YEAR
    per_year = None
    if until >= yearly_from:
        per_year = saving / years
    payback = None
    years_left = None
    annual_return = None
    if investment is not None and investment > 0:
        payback = saving / investment * 100
        if saving < investment and per_year is not None and per_year > 0:
            years_left = (investment - saving) / per_year
        annual_return = internal_rate_of_return(
            investment=investment, saving=saving, years=years
        )
    return Summary(
        payback=payback,
        per_year=per_year,
        yearly_from=yearly_from,
        years_left=years_left,
        annual_return=annual_return,
    )
