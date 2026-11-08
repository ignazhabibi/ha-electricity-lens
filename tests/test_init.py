"""Tests for setup, the computed savings, and the sensors."""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.components.recorder import get_instance  # pyright: ignore[reportPrivateImportUsage]
from homeassistant.components.recorder.statistics import (
    get_metadata,
)
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import (
    device_registry as dr,
    entity_registry as er,
    issue_registry as ir,
)
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.electricity_lens import coordinator as coordinator_module
from custom_components.electricity_lens.calculation import HOUR
from custom_components.electricity_lens.const import DOMAIN, SIGNAL_ENERGY_PREFS_UPDATED
from custom_components.electricity_lens.coordinator import ElectricityLensCoordinator
from custom_components.electricity_lens.models import CategoryConfig, CategoryState
from custom_components.electricity_lens.sources import EnergyInterfaceError

from .conftest import (
    GRID_PRICE,
    HEAT_PUMP_DATA,
    HEAT_PUMP_PER_HOUR,
    HOURS,
    PREFS,
    PV_DATA,
    PV_PER_HOUR,
    WALLBOX_DATA,
    WALLBOX_PER_HOUR,
    import_hourly,
    import_hourly_mean,
    make_entry,
    set_energy_prefs,
    setup_entry,
    statistic_sums,
)

COUNTED = HOURS - 1
# The heat pump uses 0.5 kWh per hour in the test data.
HP_KWH = 0.5


def _heat_pump(**changes: Any) -> tuple[str, dict[str, Any]]:
    return ("heat_pump", {**HEAT_PUMP_DATA, **changes})


def _hp_hour(
    heat: float, gas_price: float, electricity_price: float = GRID_PRICE
) -> float:
    return heat / 0.92 * gas_price - HP_KWH * electricity_price


def _subentry(entry: MockConfigEntry, category: str) -> Any:
    return next(s for s in entry.subentries.values() if s.subentry_type == category)


async def _update(
    hass: HomeAssistant, entry: MockConfigEntry, category: str, **data: Any
) -> None:
    subentry = _subentry(entry, category)
    hass.config_entries.async_update_subentry(
        entry, subentry, data={**subentry.data, **data}
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    await hass.async_block_till_done(wait_background_tasks=True)


def _state(hass: HomeAssistant, entity_id: str) -> Any:
    state = hass.states.get(entity_id)
    assert state is not None, entity_id
    return state


@pytest.mark.usefixtures("energy")
async def test_savings(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    """Each category's saving follows from the energy dashboard's statistics."""
    await setup_entry(hass, config_entry)
    assert config_entry.state is ConfigEntryState.LOADED

    pv = _state(hass, "sensor.solar_saving")
    assert float(pv.state) == pytest.approx(COUNTED * PV_PER_HOUR)
    assert pv.attributes["unit_of_measurement"] == "EUR"
    assert pv.attributes["category"] == "pv"
    assert pv.attributes["calculating"] is False
    assert pv.attributes["investment"] == 10000
    assert pv.attributes["balance"] == pytest.approx(COUNTED * PV_PER_HOUR - 10000)
    assert "price" not in pv.attributes
    heat_pump = _state(hass, "sensor.heat_pump_saving")
    assert float(heat_pump.state) == pytest.approx(COUNTED * HEAT_PUMP_PER_HOUR)
    assert heat_pump.attributes["price"] == 0.10
    assert heat_pump.attributes["heating"] == "gas"
    assert heat_pump.attributes["heat_estimated"] is True
    assert float(_state(hass, "sensor.electric_car_saving").state) == pytest.approx(
        COUNTED * WALLBOX_PER_HOUR
    )
    assert float(_state(hass, "sensor.solar_paid_back").state) == pytest.approx(
        COUNTED * PV_PER_HOUR / 10000 * 100
    )
    # No investment, no payback; and no yearly figure after two days.
    assert _state(hass, "sensor.electric_car_paid_back").state == "unknown"
    paid_back = _state(hass, "sensor.solar_paid_back")
    assert paid_back.attributes["investment"] == 10000
    assert paid_back.attributes["years_left"] is None
    annual_return = _state(hass, "sensor.solar_return_per_year")
    assert annual_return.state == "unknown"
    assert annual_return.attributes["surplus"] is None
    assert _state(hass, "sensor.solar_saving_per_year").state == "unknown"

    total = COUNTED * (PV_PER_HOUR + HEAT_PUMP_PER_HOUR + WALLBOX_PER_HOUR)
    assert float(
        _state(hass, "sensor.electricity_lens_balance").state
    ) == pytest.approx(total - 19000)
    balance = _state(hass, "sensor.electricity_lens_balance")
    assert balance.attributes["saved"] == pytest.approx(total)
    assert balance.attributes["invested"] == 19000
    assert balance.attributes["per_year"] is None
    assert balance.attributes["payback"] == pytest.approx(total / 19000 * 100)
    assert balance.attributes["years_left"] is None


@pytest.mark.usefixtures("energy")
async def test_devices(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    """Each category is a device of its subentry."""
    await setup_entry(hass, config_entry)
    devices = dr.async_entries_for_config_entry(
        dr.async_get(hass), config_entry.entry_id
    )
    assert len(devices) == 4
    entity = er.async_get(hass).async_get("sensor.heat_pump_saving")
    assert entity is not None
    assert entity.config_subentry_id in config_entry.subentries


@pytest.mark.usefixtures("energy")
async def test_history_is_written(
    hass: HomeAssistant, config_entry: MockConfigEntry, data_start: datetime
) -> None:
    """The computed past becomes a statistic of the integration's own."""
    await setup_entry(hass, config_entry)
    sums = await statistic_sums(hass, "electricity_lens:pv_saving", data_start)
    assert sums[-1] == pytest.approx(COUNTED * PV_PER_HOUR)
    assert sums[0] == pytest.approx(PV_PER_HOUR)

    pv = _state(hass, "sensor.solar_saving")
    assert pv.attributes["statistic_id"] == "electricity_lens:pv_saving"
    assert "state_class" not in pv.attributes
    # The sensor keeps no statistics of its own.
    assert await statistic_sums(hass, "sensor.solar_saving", data_start) == []


@pytest.mark.usefixtures("energy")
async def test_heat_distance_and_alternative_costs(
    hass: HomeAssistant, config_entry: MockConfigEntry, data_start: datetime
) -> None:
    """Heat pump and car keep heat, distance, and what the alternative cost."""
    await setup_entry(hass, config_entry)
    heat = HP_KWH * 4.0
    assert (await statistic_sums(hass, "electricity_lens:heat_pump_heat", data_start))[
        -1
    ] == pytest.approx(COUNTED * heat)
    assert (
        await statistic_sums(
            hass, "electricity_lens:heat_pump_alternative_cost", data_start
        )
    )[-1] == pytest.approx(COUNTED * heat / 0.92 * 0.10)
    distance = 1.0 / 20 * 100
    assert (
        await statistic_sums(hass, "electricity_lens:wallbox_distance", data_start)
    )[-1] == pytest.approx(COUNTED * distance)
    assert (
        await statistic_sums(
            hass, "electricity_lens:wallbox_alternative_cost", data_start
        )
    )[-1] == pytest.approx(COUNTED * distance * 7 / 100 * 1.80)
    # The PV plant keeps only its saving.
    assert await statistic_sums(hass, "electricity_lens:pv_heat", data_start) == []


@pytest.mark.usefixtures("energy")
async def test_heat_pump_without_former_heating(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """Without a former heating the heat pump keeps its heat, but saves nothing.

    It has no saving sensors and stays out of the balance.
    """
    # Arrange: a saving sensor left from when it had a former heating.
    values = {"scop": 4.0}
    entry = make_entry(
        ("pv", PV_DATA),
        (
            "heat_pump",
            {
                **HEAT_PUMP_DATA,
                "heating": "none",
                "investment": None,
                "before": values,
                "current": values,
            },
        ),
    )
    entry.add_to_hass(hass)
    heat_pump = next(
        subentry_id
        for subentry_id, subentry in entry.subentries.items()
        if subentry.subentry_type == "heat_pump"
    )
    registry = er.async_get(hass)
    registry.async_get_or_create(
        "sensor",
        DOMAIN,
        f"{heat_pump}_saving",
        config_entry=entry,
        config_subentry_id=heat_pump,
    )

    # Act
    await setup_entry(hass, entry)

    # Assert
    heat = await statistic_sums(hass, "electricity_lens:heat_pump_heat", data_start)
    assert heat[-1] == pytest.approx(COUNTED * HP_KWH * 4.0)
    for figure in ("saving", "alternative_cost", "solar_saving"):
        assert (
            await statistic_sums(
                hass, f"electricity_lens:heat_pump_{figure}", data_start
            )
            == []
        )
    assert not registry.async_get_entity_id("sensor", DOMAIN, f"{heat_pump}_saving")
    balance = _state(hass, "sensor.electricity_lens_balance")
    assert float(balance.state) == pytest.approx(COUNTED * PV_PER_HOUR - 10000)
    assert balance.attributes["invested"] == 10000


@pytest.mark.usefixtures("energy")
async def test_car_without_comparison(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A car compared with nothing has no distance, saving, or saving sensors."""
    entry = make_entry(
        ("pv", PV_DATA),
        (
            "wallbox",
            {**WALLBOX_DATA, "comparison": "none", "before": {}, "current": {}},
        ),
    )
    await setup_entry(hass, entry)
    for figure in ("saving", "distance", "alternative_cost", "solar_saving"):
        assert (
            await statistic_sums(hass, f"electricity_lens:wallbox_{figure}", data_start)
            == []
        )
    assert hass.states.get("sensor.electric_car_saving") is None
    balance = _state(hass, "sensor.electricity_lens_balance")
    assert float(balance.state) == pytest.approx(COUNTED * PV_PER_HOUR - 10000)


def test_comparison_keeps_the_past_of_cars_compared_as_before() -> None:
    """A car compared with a combustion car keeps its fingerprint."""
    data = dict(WALLBOX_DATA)
    before = CategoryConfig.from_data("wallbox", data).fingerprint
    assert (
        CategoryConfig.from_data(
            "wallbox", {**data, "comparison": "combustion"}
        ).fingerprint
        == before
    )
    assert (
        CategoryConfig.from_data("wallbox", {**data, "comparison": "none"}).fingerprint
        != before
    )


@pytest.mark.usefixtures("energy")
async def test_new_hours_continue_the_history(
    hass: HomeAssistant, config_entry: MockConfigEntry, data_start: datetime
) -> None:
    """Each update adds the hours it computed to the statistic."""
    await setup_entry(hass, config_entry)
    more = data_start + timedelta(hours=HOURS)
    for statistic_id, per_hour in {
        "sensor.grid_import": 1.0,
        "sensor.grid_export": 0.5,
        "sensor.solar": 2.0,
    }.items():
        import_hourly(
            hass, statistic_id, more, [0.0, per_hour], start_sum=HOURS * per_hour
        )
    await async_wait_recording_done(hass)
    await config_entry.runtime_data.async_refresh()
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)

    sums = await statistic_sums(hass, "electricity_lens:pv_saving", data_start)
    assert sums[-1] == pytest.approx((COUNTED + 2) * PV_PER_HOUR)
    assert float(_state(hass, "sensor.solar_saving").state) == pytest.approx(
        (COUNTED + 2) * PV_PER_HOUR
    )


@pytest.mark.usefixtures("energy")
async def test_removed_category_loses_its_statistics(
    hass: HomeAssistant, config_entry: MockConfigEntry, data_start: datetime
) -> None:
    """Removing a category removes its saving statistic; removing all, all."""
    await setup_entry(hass, config_entry)
    assert await statistic_sums(hass, "electricity_lens:wallbox_saving", data_start)
    hass.config_entries.async_remove_subentry(
        config_entry, _subentry(config_entry, "wallbox").subentry_id
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert (
        await statistic_sums(hass, "electricity_lens:wallbox_saving", data_start) == []
    )
    assert await statistic_sums(hass, "electricity_lens:pv_saving", data_start)

    await hass.config_entries.async_remove(config_entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert await statistic_sums(hass, "electricity_lens:pv_saving", data_start) == []


@pytest.mark.usefixtures("energy")
async def test_progress_survives_restart(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """A reload continues from the stored progress instead of computing again."""
    await setup_entry(hass, config_entry)
    with patch(
        "custom_components.electricity_lens.coordinator.async_hourly_changes"
    ) as changes:
        await hass.config_entries.async_reload(config_entry.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
    changes.assert_not_called()
    assert float(_state(hass, "sensor.solar_saving").state) == pytest.approx(
        COUNTED * PV_PER_HOUR
    )


@pytest.mark.usefixtures("energy")
async def test_update_computes_nothing_again(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """Progress from before categories followed the household stays as it is."""
    await setup_entry(hass, config_entry)
    coordinator = config_entry.runtime_data
    stored = await coordinator._store.async_load()
    assert stored is not None
    for category in stored["categories"].values():
        del category["household"]
    await coordinator._store.async_save(stored)

    with patch(
        "custom_components.electricity_lens.coordinator.async_hourly_changes"
    ) as changes:
        await hass.config_entries.async_reload(config_entry.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
    changes.assert_not_called()
    household = config_entry.runtime_data.household_state.fingerprint
    for state in config_entry.runtime_data.states.values():
        assert state.household == household


@pytest.mark.usefixtures("energy")
@pytest.mark.parametrize(
    ("version", "household_again"),
    [
        pytest.param("CATEGORY_CALCULATION_VERSION", False, id="category_rule"),
        pytest.param("HOUSEHOLD_CALCULATION_VERSION", True, id="household_rule"),
    ],
)
async def test_new_rule_computes_what_it_changes(
    hass: HomeAssistant,
    config_entry: MockConfigEntry,
    version: str,
    household_again: bool,
) -> None:
    """A new category rule spares the household; a new household rule does not."""
    # Arrange: stored figures that only computing them again corrects.
    await setup_entry(hass, config_entry)
    coordinator = config_entry.runtime_data
    household = coordinator.household_state.fingerprint
    energy = coordinator.household_state.totals["household_energy"]
    stored = await coordinator._store.async_load()
    assert stored is not None
    stored["household"]["totals"]["household_energy"] += 100
    for category in stored["categories"].values():
        category["saving"] += 100
    await coordinator._store.async_save(stored)

    # Act
    with patch.object(
        coordinator_module, version, getattr(coordinator_module, version) + 1
    ):
        await hass.config_entries.async_reload(config_entry.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
        await async_wait_recording_done(hass)

    # Assert: the categories are computed again, the household only for its rule.
    coordinator = config_entry.runtime_data
    assert (coordinator.household_state.fingerprint != household) is household_again
    assert coordinator.household_state.totals["household_energy"] == pytest.approx(
        energy if household_again else energy + 100
    )
    assert float(_state(hass, "sensor.solar_saving").state) == pytest.approx(
        COUNTED * PV_PER_HOUR
    )
    assert all(
        state.household == coordinator.household_state.fingerprint
        for state in coordinator.states.values()
    )


@pytest.mark.usefixtures("energy")
async def test_phases(hass: HomeAssistant, data_start: datetime) -> None:
    """Before the setup the averages count, after it the current values."""
    setup_at = (data_start + timedelta(hours=24)).timestamp()
    entry = make_entry(
        _heat_pump(
            setup_at=setup_at,
            before={"price": 0.10, "scop": 4.0},
            current={"price": 0.20, "scop": 4.0},
        )
    )
    await setup_entry(hass, entry)
    expected = 23 * _hp_hour(2.0, 0.10) + 24 * _hp_hour(2.0, 0.20)
    assert float(_state(hass, "sensor.heat_pump_saving").state) == pytest.approx(
        expected
    )

    # Changed averages compute the time before the setup again.
    await _update(hass, entry, "heat_pump", before={"price": 0.30, "scop": 4.0})
    expected = 23 * _hp_hour(2.0, 0.30) + 24 * _hp_hour(2.0, 0.20)
    assert float(_state(hass, "sensor.heat_pump_saving").state) == pytest.approx(
        expected
    )


@pytest.mark.usefixtures("energy")
async def test_new_value_applies_from_now_on(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """A changed current value keeps what was computed."""
    await setup_entry(hass, config_entry)
    before = float(_state(hass, "sensor.heat_pump_saving").state)
    await _update(hass, config_entry, "heat_pump", current={"price": 0.20, "scop": 3.0})
    assert float(_state(hass, "sensor.heat_pump_saving").state) == pytest.approx(before)
    subentry = _subentry(config_entry, "heat_pump")
    state = config_entry.runtime_data.states[subentry.subentry_id]
    assert [value for _, value in state.timeline("price").points] == [0.10, 0.20]
    assert [value for _, value in state.timeline("scop").points] == [4.0, 3.0]
    assert _state(hass, "sensor.heat_pump_saving").attributes["price"] == 0.10


@pytest.mark.usefixtures("energy")
async def test_recompute_keeps_values(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """Recompute computes the category again with the recorded values."""
    await setup_entry(hass, config_entry)
    subentry = _subentry(config_entry, "heat_pump")
    before = float(_state(hass, "sensor.heat_pump_saving").state)
    fingerprint = config_entry.runtime_data.states[subentry.subentry_id].fingerprint
    with patch(
        "custom_components.electricity_lens.coordinator.async_hourly_changes",
        wraps=coordinator_module.async_hourly_changes,
    ) as changes:
        await _update(hass, config_entry, "heat_pump", recompute=1.0)
    assert changes.called
    state = config_entry.runtime_data.states[subentry.subentry_id]
    assert state.fingerprint != fingerprint
    assert float(_state(hass, "sensor.heat_pump_saving").state) == pytest.approx(before)


@pytest.mark.usefixtures("energy")
async def test_oil_and_own_tariff(hass: HomeAssistant) -> None:
    """Oil is priced per litre; an own tariff replaces the grid price."""
    values = {"price": 1.0, "scop": 4.0, "tariff": 0.20}
    entry = make_entry(_heat_pump(heating="oil", before=values, current=values))
    await setup_entry(hass, entry)
    per_hour = 2.0 / 0.92 / 10 * 1.0 - HP_KWH * 0.20
    assert float(_state(hass, "sensor.heat_pump_saving").state) == pytest.approx(
        COUNTED * per_hour
    )
    assert _state(hass, "sensor.heat_pump_saving").attributes["heating"] == "oil"


@pytest.mark.usefixtures("energy")
async def test_heating_change_starts_values_over(hass: HomeAssistant) -> None:
    """Gas and oil prices are not comparable, so their timeline starts over."""
    entry = make_entry(_heat_pump())
    await setup_entry(hass, entry)
    values = {"price": 1.0, "scop": 4.0}
    await _update(
        hass, entry, "heat_pump", heating="oil", before=values, current=values
    )
    state = entry.runtime_data.states[_subentry(entry, "heat_pump").subentry_id]
    assert [value for _, value in state.timeline("price").points] == [1.0]


async def test_heat_measured_after_estimate(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """Before the heat meter's data the COP estimates, afterwards heat is measured."""
    hass.config.currency = "EUR"
    assert await async_setup_component(hass, "energy", {})
    await set_energy_prefs(hass, PREFS)
    for statistic_id in ("sensor.grid_import", "sensor.heat_pump"):
        per_hour = 1.0 if statistic_id == "sensor.grid_import" else HP_KWH
        import_hourly(hass, statistic_id, data_start, [0.0] + [per_hour] * (HOURS - 1))
    import_hourly(
        hass, "sensor.heat", data_start + timedelta(hours=24), [0.0] + [2.2] * 23
    )
    await async_wait_recording_done(hass)
    values = {"price": 0.10, "scop": 3.0}
    entry = make_entry(
        _heat_pump(heat_meters=["sensor.heat"], before=values, current=values)
    )
    await setup_entry(hass, entry)
    expected = 23 * _hp_hour(1.5, 0.10) + _hp_hour(0.0, 0.10) + 23 * _hp_hour(2.2, 0.10)
    heat_pump = _state(hass, "sensor.heat_pump_saving")
    assert float(heat_pump.state) == pytest.approx(expected)
    assert heat_pump.attributes["heat_estimated"] is True


def test_heat_gap_uses_measured_cop() -> None:
    """A gap after the heat meter began uses the COP measured until then."""
    config = CategoryConfig.from_data(
        "heat_pump",
        {**HEAT_PUMP_DATA, "heat_meters": ["sensor.heat"], "before": {"price": 0.1}},
    )
    state = CategoryState()
    changes = {"sensor.heat": {0.0: 4.0}}
    heat = ElectricityLensCoordinator._heat
    assert heat(config, state, changes, 1.0, 0.0) == 4.0
    assert state.heat_start == 0.0
    assert heat(config, state, changes, 2.0, HOUR) == pytest.approx(8.0)
    assert state.estimated


@pytest.mark.usefixtures("energy")
async def test_price_sensor_after_setup(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A price sensor counts after the setup; during its gaps its last value."""
    import_hourly_mean(hass, "sensor.gas_price", data_start, [0.12] * 36)
    await async_wait_recording_done(hass)
    setup_at = (data_start + timedelta(hours=12)).timestamp()
    entry = make_entry(
        _heat_pump(
            setup_at=setup_at,
            current={"price": 0.10, "scop": 4.0, "price_entity": "sensor.gas_price"},
        )
    )
    await setup_entry(hass, entry)
    expected = 11 * _hp_hour(2.0, 0.10) + 36 * _hp_hour(2.0, 0.12)
    assert float(_state(hass, "sensor.heat_pump_saving").state) == pytest.approx(
        expected
    )


@pytest.mark.usefixtures("energy")
async def test_missing_price_sensor_raises_issue(hass: HomeAssistant) -> None:
    """A price sensor that no longer exists raises a repair issue."""
    current = {**WALLBOX_DATA["current"], "price_entity": "sensor.gone"}
    entry = make_entry(("wallbox", {**WALLBOX_DATA, "current": current}))
    await setup_entry(hass, entry)
    subentry_id = _subentry(entry, "wallbox").subentry_id
    issue_id = f"missing_price_entity_{subentry_id}"
    assert ir.async_get(hass).async_get_issue(DOMAIN, issue_id) is not None
    hass.states.async_set("sensor.gone", "1.7")
    await entry.runtime_data.async_refresh()
    assert ir.async_get(hass).async_get_issue(DOMAIN, issue_id) is None
    assert _state(hass, "sensor.electric_car_saving").attributes["price"] == 1.7


@pytest.mark.usefixtures("energy")
async def test_missing_meter_raises_issue(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """A meter removed from the energy dashboard raises a repair issue."""
    await setup_entry(hass, config_entry)
    before = float(_state(hass, "sensor.electric_car_saving").state)
    await _break_wallbox_meter(hass)
    subentry_id = _subentry(config_entry, "wallbox").subentry_id
    issue = ir.async_get(hass).async_get_issue(DOMAIN, f"missing_meter_{subentry_id}")
    assert issue is not None
    assert issue.translation_placeholders == {
        "category": "wallbox",
        "meters": "sensor.wallbox",
    }
    # The category keeps its last figures.
    assert float(_state(hass, "sensor.electric_car_saving").state) == before

    await set_energy_prefs(hass, PREFS)
    # Refreshes are debounced; do not wait for the cooldown.
    await config_entry.runtime_data.async_refresh()
    assert (
        ir.async_get(hass).async_get_issue(DOMAIN, f"missing_meter_{subentry_id}")
        is None
    )


@pytest.mark.usefixtures("energy")
async def test_no_grid_price_raises_issue(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """Without an electricity price the figures stay and an issue is raised."""
    await setup_entry(hass, config_entry)
    grid = {**PREFS["energy_sources"][0], "number_energy_price": None}
    await set_energy_prefs(hass, {"energy_sources": [grid, PREFS["energy_sources"][1]]})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert ir.async_get(hass).async_get_issue(DOMAIN, "no_grid_price") is not None
    assert _state(hass, "sensor.solar_saving").state != "unavailable"


@pytest.mark.usefixtures("energy")
async def test_energy_interface_broken(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """A changed energy interface fails loudly instead of computing wrong numbers."""
    await setup_entry(hass, config_entry)
    with patch(
        "custom_components.electricity_lens.coordinator.async_get_energy_setup",
        side_effect=EnergyInterfaceError("moved"),
    ):
        await config_entry.runtime_data.async_refresh()
    assert ir.async_get(hass).async_get_issue(DOMAIN, "energy_interface") is not None
    assert _state(hass, "sensor.solar_saving").state == "unavailable"


@pytest.mark.usefixtures("energy")
async def test_setup_fails_when_energy_interface_broken(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """Setup fails with a clear error when the energy dashboard cannot be read."""

    config_entry.add_to_hass(hass)
    with patch(
        "custom_components.electricity_lens.async_get_energy_setup",
        side_effect=EnergyInterfaceError("moved"),
    ):
        await hass.config_entries.async_setup(config_entry.entry_id)
    assert config_entry.state is ConfigEntryState.SETUP_ERROR


@pytest.mark.usefixtures("energy")
async def test_unload(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    """The entry unloads cleanly."""
    await setup_entry(hass, config_entry)
    assert await hass.config_entries.async_unload(config_entry.entry_id)
    assert config_entry.state is ConfigEntryState.NOT_LOADED


@pytest.mark.usefixtures("energy")
async def test_card_is_served(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """The card is registered as an extra frontend module with its version."""
    await setup_entry(hass, config_entry)
    modules = hass.data["frontend_extra_module_url"]
    assert any(
        url.startswith("/electricity_lens_static/electricity-lens.js?v=")
        for url in modules.urls
    )


async def test_calculating_without_data(hass: HomeAssistant) -> None:
    """A category whose meters have no data yet shows no saving."""

    assert await async_setup_component(hass, "energy", {})
    await set_energy_prefs(hass, PREFS)
    await async_wait_recording_done(hass)
    entry = make_entry(("pv", {}))
    await setup_entry(hass, entry)
    pv = _state(hass, "sensor.solar_saving")
    assert pv.state == "unknown"
    assert pv.attributes["calculating"] is False


async def test_prices_from_entities_battery_and_heat_meter(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """Price entities, compensation statistics, a battery, and measured heat."""

    hass.config.currency = "EUR"
    assert await async_setup_component(hass, "energy", {})
    grid = {
        **PREFS["energy_sources"][0],
        "number_energy_price": None,
        "entity_energy_price": "sensor.price",
        "number_energy_price_export": None,
        "stat_compensation": "sensor.feed_in_compensation",
    }
    battery = {
        "type": "battery",
        "stat_energy_from": "sensor.discharge",
        "stat_energy_to": "sensor.charge",
    }
    await set_energy_prefs(
        hass,
        {
            **PREFS,
            "energy_sources": [grid, PREFS["energy_sources"][1], battery],
        },
    )
    flows = {
        "sensor.grid_import": 1.0,
        "sensor.grid_export": 0.5,
        "sensor.solar": 2.0,
        "sensor.discharge": 0.3,
        "sensor.charge": 0.4,
        "sensor.heat_pump": 0.5,
        "sensor.heat": 2.2,
    }
    for statistic_id, per_hour in flows.items():
        import_hourly(hass, statistic_id, data_start, [0.0] + [per_hour] * (HOURS - 1))
    import_hourly(
        hass,
        "sensor.feed_in_compensation",
        data_start,
        [0.0] + [0.05] * (HOURS - 1),
        unit="EUR",
    )
    import_hourly_mean(hass, "sensor.price", data_start, [0.25] * HOURS)
    import_hourly_mean(hass, "sensor.gas_price", data_start, [0.12] * HOURS)
    await async_wait_recording_done(hass)

    entry = make_entry(
        ("pv", {"setup_at": 0, "battery_investment": 5000}),
        _heat_pump(
            heat_meters=["sensor.heat"],
            current={"price": 0.10, "price_entity": "sensor.gas_price"},
        ),
    )
    await setup_entry(hass, entry)

    pv_per_hour = (2.0 - 0.5 + 0.3 - 0.4) * 0.25 + 0.05
    pv = _state(hass, "sensor.solar_saving")
    assert float(pv.state) == pytest.approx(COUNTED * pv_per_hour)
    # The battery stores solar power that would have earned 0.10 per kWh fed
    # in, and gives power that would have cost 0.25.
    battery_per_hour = 0.3 * 0.25 - 0.4 * 0.10
    battery = pv.attributes["battery"]
    assert battery["saving"] == pytest.approx(COUNTED * battery_per_hour)
    assert battery["investment"] == 5000
    assert battery["payback"] == pytest.approx(COUNTED * battery_per_hour / 50)
    assert battery["per_year"] is None
    # The PV plant's payback counts its battery.
    assert pv.attributes["investment"] == 5000
    sums = await statistic_sums(hass, "electricity_lens:pv_battery_saving", data_start)
    assert sums[-1] == pytest.approx(COUNTED * battery_per_hour)
    hp_per_hour = 2.2 / 0.92 * 0.12 - 0.5 * 0.25
    heat_pump = _state(hass, "sensor.heat_pump_saving")
    assert float(heat_pump.state) == pytest.approx(COUNTED * hp_per_hour)
    assert heat_pump.attributes["investment"] == 9000
    assert heat_pump.attributes["heat_estimated"] is False
    # The sensor has no state, so the entered price is shown.
    assert heat_pump.attributes["price"] == 0.10


@pytest.mark.usefixtures("energy")
async def test_solar_removed_raises_issue(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """A PV plant without solar production in the energy dashboard raises an issue."""
    await setup_entry(hass, config_entry)
    await set_energy_prefs(hass, {"energy_sources": PREFS["energy_sources"][:1]})
    await hass.async_block_till_done(wait_background_tasks=True)
    subentry_id = _subentry(config_entry, "pv").subentry_id
    issue = ir.async_get(hass).async_get_issue(DOMAIN, f"missing_meter_{subentry_id}")
    assert issue is not None
    assert issue.translation_placeholders == {"category": "pv", "meters": "solar"}


async def test_meter_without_data(hass: HomeAssistant, data_start: datetime) -> None:
    """A category whose meters have no data yet is not shown as calculating."""

    assert await async_setup_component(hass, "energy", {})
    await set_energy_prefs(hass, PREFS)
    import_hourly(hass, "sensor.grid_import", data_start, [0.0, 1.0, 1.0])
    await async_wait_recording_done(hass)
    await setup_entry(hass, make_entry(("wallbox", WALLBOX_DATA)))
    wallbox = _state(hass, "sensor.electric_car_saving")
    assert wallbox.state == "unknown"
    assert wallbox.attributes["calculating"] is False


def _paired_heat_pump() -> tuple[str, dict[str, Any]]:
    return _heat_pump(
        meters=["sensor.heat_pump", "sensor.washer"],
        heat_meters=["sensor.heating", "sensor.hot_water"],
    )


@pytest.mark.usefixtures("energy")
async def test_reload_keeps_figures_of_meters_without_heat_data(
    hass: HomeAssistant,
) -> None:
    """Heat meters that have no statistics yet are no reason to compute again."""
    entry = make_entry(_paired_heat_pump())
    await setup_entry(hass, entry)

    with patch.object(CategoryState, "reset", autospec=True) as reset:
        await hass.config_entries.async_reload(entry.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)

    reset.assert_not_called()


@pytest.mark.usefixtures("energy")
async def test_device_statistics_are_named_in_the_system_language(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A device's saving and comparison costs have translated names."""
    # Arrange
    hass.config.language = "de"
    for statistic_id in ("sensor.heating", "sensor.hot_water"):
        import_hourly(hass, statistic_id, data_start, [0.0] + [1.0] * (HOURS - 1))
    await async_wait_recording_done(hass)

    # Act
    await setup_entry(hass, make_entry(_paired_heat_pump()))

    # Assert
    metadata = await get_instance(hass).async_add_executor_job(
        lambda: get_metadata(hass, statistic_source=DOMAIN)
    )
    prefix = "electricity_lens:heat_pump_device_sensor_heat_pump"
    assert metadata[f"{prefix}_saving"][1]["name"] == "Heat pump Ersparnis"
    assert (
        metadata[f"{prefix}_alternative_cost"][1]["name"]
        == "Heat pump Vergleichskosten"
    )


async def _break_wallbox_meter(hass: HomeAssistant) -> None:
    await set_energy_prefs(
        hass,
        {
            "device_consumption": [
                device
                for device in PREFS["device_consumption"]
                if device["stat_consumption"] != "sensor.wallbox"
            ]
        },
    )
    await hass.async_block_till_done(wait_background_tasks=True)


@pytest.mark.usefixtures("energy")
async def test_removing_a_category_removes_its_issue(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """No repair issue stays behind for a category that no longer exists."""
    # Arrange
    await setup_entry(hass, config_entry)
    await _break_wallbox_meter(hass)
    subentry_id = _subentry(config_entry, "wallbox").subentry_id
    issue_id = f"missing_meter_{subentry_id}"
    assert ir.async_get(hass).async_get_issue(DOMAIN, issue_id) is not None

    # Act
    hass.config_entries.async_remove_subentry(config_entry, subentry_id=subentry_id)
    await hass.async_block_till_done(wait_background_tasks=True)

    # Assert
    assert ir.async_get(hass).async_get_issue(DOMAIN, issue_id) is None


@pytest.mark.usefixtures("energy")
async def test_removing_the_entry_removes_all_issues(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """Removing the integration leaves no repair issue behind."""
    # Arrange
    await setup_entry(hass, config_entry)
    await _break_wallbox_meter(hass)
    registry = ir.async_get(hass)
    assert any(domain == DOMAIN for domain, _ in registry.issues)

    # Act
    await hass.config_entries.async_remove(config_entry.entry_id)
    await hass.async_block_till_done()

    # Assert
    assert not any(domain == DOMAIN for domain, _ in registry.issues)


def _fails_once(function: Any, on_call: int) -> Any:
    calls = 0

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        nonlocal calls
        calls += 1
        if calls == on_call:
            raise HomeAssistantError("Database gone for a moment")
        return function(*args, **kwargs)

    return wrapper


@pytest.mark.usefixtures("energy")
@pytest.mark.parametrize(
    ("function", "on_call"),
    [
        pytest.param("async_hourly_changes", 3, id="household_query"),
        pytest.param("async_write_statistics", 1, id="household_write"),
        pytest.param("async_hourly_changes", 6, id="category_query"),
    ],
)
async def test_failed_update_counts_no_hour_twice(
    hass: HomeAssistant, data_start: datetime, function: str, on_call: int
) -> None:
    """An update that fails halfway leaves no trace in the next one's figures."""
    # Arrange: the past takes several chunks, and one step fails once.
    entry = make_entry(("pv", PV_DATA))
    flaky = _fails_once(getattr(coordinator_module, function), on_call)
    with (
        patch.object(coordinator_module, "CHUNK", 12 * HOUR),
        patch.object(coordinator_module, function, flaky),
    ):
        await setup_entry(hass, entry)
        coordinator = entry.runtime_data
        assert not coordinator.last_update_success

        # Act
        await coordinator.async_refresh()
        await hass.async_block_till_done(wait_background_tasks=True)
        await async_wait_recording_done(hass)

    # Assert: each hour counts once, in the state and in the statistics.
    assert coordinator.last_update_success
    saving = COUNTED * PV_PER_HOUR
    assert float(_state(hass, "sensor.solar_saving").state) == pytest.approx(saving)
    pv_sums = await statistic_sums(hass, "electricity_lens:pv_saving", data_start)
    assert pv_sums[-1] == pytest.approx(saving)
    consumption = COUNTED * (1.0 - 0.5 + 2.0)
    assert coordinator.household_state.totals["household_energy"] == pytest.approx(
        consumption
    )
    household_sums = await statistic_sums(
        hass, "electricity_lens:household_energy", data_start
    )
    assert household_sums[-1] == pytest.approx(consumption)


@pytest.mark.usefixtures("energy")
async def test_restart_continues_the_past(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A restart while the past is computed continues from the last written chunk."""
    # Arrange: four chunks each; the household is done, the PV plant's second
    # chunk fails, as if Home Assistant stopped there.
    entry = make_entry(("pv", PV_DATA))
    flaky = _fails_once(coordinator_module.async_hourly_changes, 6)
    with (
        patch.object(coordinator_module, "CHUNK", 12 * HOUR),
        patch.object(coordinator_module, "async_hourly_changes", flaky),
    ):
        await setup_entry(hass, entry)
    state = next(iter(entry.runtime_data.states.values()))
    assert state.next_hour == data_start.timestamp() + 12 * HOUR
    assert state.computing_past
    # The household's 5 areas write 8 figures each; the PV plant one, a quarter done.
    assert entry.runtime_data.progress() == int((40 + 0.25) / 41 * 100)

    # Act: start again.
    with (
        patch.object(coordinator_module, "CHUNK", 12 * HOUR),
        patch.object(
            coordinator_module,
            "async_hourly_changes",
            wraps=coordinator_module.async_hourly_changes,
        ) as changes,
    ):
        await hass.config_entries.async_reload(entry.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
        await async_wait_recording_done(hass)

    # Assert: only the PV plant's three missing chunks are computed, once each.
    assert changes.call_count == 3
    saving = COUNTED * PV_PER_HOUR
    assert float(_state(hass, "sensor.solar_saving").state) == pytest.approx(saving)
    assert _state(hass, "sensor.solar_saving").attributes["calculating"] is False
    pv_sums = await statistic_sums(hass, "electricity_lens:pv_saving", data_start)
    assert pv_sums[-1] == pytest.approx(saving)
    assert entry.runtime_data.progress() is None


@pytest.mark.usefixtures("energy")
async def test_progress_is_shown_while_computing(hass: HomeAssistant) -> None:
    """The balance sensor tells how far the past is computed, after each chunk."""
    seen: list[Any] = []

    def record(event: Any) -> None:
        if event.data["entity_id"] == "sensor.electricity_lens_balance" and (
            new := event.data["new_state"]
        ):
            seen.append(new.attributes.get("progress"))

    hass.bus.async_listen("state_changed", record)
    with patch.object(coordinator_module, "CHUNK", 12 * HOUR):
        await setup_entry(hass, make_entry(("pv", PV_DATA)))

    shown = [value for value in seen if value is not None]
    assert len(shown) >= 4
    assert shown == sorted(shown)
    assert 0 <= shown[0] < shown[-1] < 100
    assert seen[-1] is None
    balance = _state(hass, "sensor.electricity_lens_balance")
    assert balance.attributes["progress"] is None


@pytest.mark.parametrize(
    ("version", "minor_version"),
    [pytest.param(2, 2, id="newer"), pytest.param(1, 1, id="before_0_12")],
)
async def test_entries_of_other_versions_are_refused(
    hass: HomeAssistant, version: int, minor_version: int
) -> None:
    """An entry this version cannot read is not set up and not touched."""
    entry = make_entry(("pv", {}), version=version, minor_version=minor_version)
    entry.add_to_hass(hass)

    assert not await hass.config_entries.async_setup(entry.entry_id)

    assert entry.state is ConfigEntryState.MIGRATION_ERROR
    assert (entry.version, entry.minor_version) == (version, minor_version)


@pytest.mark.usefixtures("energy")
async def test_entries_of_1_2_lose_the_price_thresholds(hass: HomeAssistant) -> None:
    """Up to 0.32 the price levels had thresholds; the grid price replaced them."""
    entry = make_entry(
        minor_version=2,
        options={"standing_charge": 12, "cheap_until": 0.2, "expensive_from": 0.35},
    )
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)

    assert entry.minor_version == 3
    assert entry.options == {"standing_charge": 12}


async def test_forecast_sensors(hass: HomeAssistant) -> None:
    """With a forecast in the energy dashboard, two sensors show it.

    The sensor of the whole day up to 0.24.0 is gone.
    """
    solar = {**PREFS["energy_sources"][1], "config_entry_solar_forecast": ["plane"]}
    await set_energy_prefs(
        hass, {**PREFS, "energy_sources": [PREFS["energy_sources"][0], solar]}
    )
    entry = make_entry(("pv", PV_DATA))
    entry.add_to_hass(hass)
    registry = er.async_get(hass)
    registry.async_get_or_create(
        "sensor", DOMAIN, f"{entry.entry_id}_forecast_today", config_entry=entry
    )
    with patch(
        "custom_components.electricity_lens.coordinator.async_solar_forecast",
        AsyncMock(return_value=(12.5, 20.25)),
    ):
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
    assert not registry.async_get_entity_id(
        "sensor", DOMAIN, f"{entry.entry_id}_forecast_today"
    )
    assert float(_state(hass, "sensor.electricity_lens_solar_left_today").state) == 12.5
    assert float(_state(hass, "sensor.electricity_lens_solar_tomorrow").state) == 20.25


@pytest.mark.usefixtures("energy")
async def test_forecast_sensors_follow_the_energy_dashboard(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """A forecast added later brings its sensors; removed, they go."""
    await setup_entry(hass, config_entry)
    assert hass.states.get("sensor.electricity_lens_solar_left_today") is None
    solar = {**PREFS["energy_sources"][1], "config_entry_solar_forecast": ["plane"]}

    with patch(
        "custom_components.electricity_lens.coordinator.async_solar_forecast",
        AsyncMock(return_value=(12.5, 20.25)),
    ):
        await set_energy_prefs(
            hass, {**PREFS, "energy_sources": [PREFS["energy_sources"][0], solar]}
        )
        await hass.async_block_till_done(wait_background_tasks=True)
    remaining = _state(hass, "sensor.electricity_lens_solar_left_today")
    assert float(remaining.state) == 12.5
    # The scale of the forecast: the best solar day, from two days of data.
    assert remaining.attributes["best_day"] > 0
    assert remaining.attributes["best_day_full_year"] is False

    await set_energy_prefs(hass, PREFS)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert hass.states.get("sensor.electricity_lens_solar_left_today") is None
    assert not er.async_get(hass).async_get_entity_id(
        "sensor", DOMAIN, f"{config_entry.entry_id}_forecast_rest_today"
    )


@pytest.mark.usefixtures("energy")
async def test_unreadable_energy_dashboard_change_only_refreshes(
    hass: HomeAssistant, config_entry: MockConfigEntry
) -> None:
    """If the change cannot be read, the update reports it; nothing reloads."""
    await setup_entry(hass, config_entry)
    coordinator = config_entry.runtime_data
    with (
        patch(
            "custom_components.electricity_lens.async_get_energy_setup",
            side_effect=EnergyInterfaceError("moved"),
        ),
        patch.object(coordinator, "async_request_refresh", AsyncMock()) as refresh,
    ):
        async_dispatcher_send(hass, SIGNAL_ENERGY_PREFS_UPDATED)
        await hass.async_block_till_done()
    refresh.assert_awaited_once()
    assert config_entry.runtime_data is coordinator
