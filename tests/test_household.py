"""Tests for the household: consumption, mix, and costs as statistics."""

from __future__ import annotations

from datetime import datetime, timedelta

from homeassistant.components.recorder import get_instance
from homeassistant.components.recorder.statistics import (
    get_metadata,
    statistics_during_period,
)
from homeassistant.core import HomeAssistant
import pytest
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.electricity_lens.coordinator import _standing_charge
from custom_components.electricity_lens.models import HouseholdState

from .conftest import (
    FEED_IN_PRICE,
    GRID_PRICE,
    HOURS,
    PREFS,
    WALLBOX_DATA,
    import_hourly,
    make_entry,
    set_energy_prefs,
    setup_entry,
)

COUNTED = HOURS - 1
# Per hour with the test flows: 1 kWh import, 0.5 export, 2 solar, so the
# household uses 2.5 kWh, 1.5 of them solar power: a solar share of 60 %.
CONSUMPTION = 2.5
SOLAR_SHARE = 0.6
KWH_PRICE = (1 - SOLAR_SHARE) * GRID_PRICE + SOLAR_SHARE * FEED_IN_PRICE
DEVICES = {"heat_pump": 0.5, "wallbox": 1.0, "washer": 0.2}
OTHER = CONSUMPTION - sum(DEVICES.values())


async def _total(hass: HomeAssistant, key: str, start: datetime) -> float | None:
    statistic_id = f"electricity_lens:{key}"
    rows = await get_instance(hass).async_add_executor_job(
        statistics_during_period,
        hass,
        start,
        None,
        {statistic_id},
        "hour",
        None,
        {"sum"},
    )
    sums = [row["sum"] for row in rows.get(statistic_id, [])]
    return sums[-1] if sums else None


@pytest.mark.usefixtures("energy")
async def test_household_statistics(hass: HomeAssistant, data_start: datetime) -> None:
    """Consumption, solar power, and costs of the household and each device."""
    await setup_entry(hass, make_entry())

    assert await _total(hass, "household_energy", data_start) == pytest.approx(
        COUNTED * CONSUMPTION
    )
    assert await _total(hass, "household_solar", data_start) == pytest.approx(
        COUNTED * CONSUMPTION * SOLAR_SHARE
    )
    assert await _total(hass, "household_cost", data_start) == pytest.approx(
        COUNTED * CONSUMPTION * KWH_PRICE
    )
    for device, kwh in DEVICES.items():
        area = f"device_sensor_{device}"
        assert await _total(hass, f"{area}_solar", data_start) == pytest.approx(
            COUNTED * kwh * SOLAR_SHARE
        )
        # The device's own statistic holds its energy.
        assert await _total(hass, f"{area}_energy", data_start) is None
        assert await _total(hass, f"{area}_cost", data_start) == pytest.approx(
            COUNTED * kwh * KWH_PRICE
        )
    assert await _total(hass, "other_energy", data_start) == pytest.approx(
        COUNTED * OTHER
    )
    assert await _total(hass, "grid_cost", data_start) == pytest.approx(
        COUNTED * (1.0 * GRID_PRICE - 0.5 * FEED_IN_PRICE)
    )
    # Without price levels there is no cheap or expensive grid power.
    assert await _total(hass, "household_cheap", data_start) is None

    metadata = await get_instance(hass).async_add_executor_job(
        lambda: get_metadata(
            hass,
            statistic_ids={
                "electricity_lens:household_energy",
                "electricity_lens:device_sensor_washer_cost",
                "electricity_lens:grid_cost",
            },
        )
    )
    names = {key: meta["name"] for key, (_, meta) in metadata.items()}
    assert names == {
        "electricity_lens:household_energy": "Household consumption",
        "electricity_lens:device_sensor_washer_cost": "Washer costs",
        "electricity_lens:grid_cost": "Grid costs",
    }
    assert metadata["electricity_lens:household_energy"][1]["unit_class"] == "energy"
    assert metadata["electricity_lens:grid_cost"][1]["unit_of_measurement"] == "EUR"


@pytest.mark.usefixtures("energy")
async def test_price_levels(hass: HomeAssistant, data_start: datetime) -> None:
    """Grid power at or below the cheap threshold counts as cheap."""
    await setup_entry(
        hass, make_entry(options={"cheap_until": GRID_PRICE, "expensive_from": 0.5})
    )
    grid = CONSUMPTION * (1 - SOLAR_SHARE)
    assert await _total(hass, "household_cheap", data_start) == pytest.approx(
        COUNTED * grid
    )
    assert await _total(hass, "device_sensor_washer_cheap", data_start) == (
        pytest.approx(COUNTED * 0.2 * (1 - SOLAR_SHARE))
    )
    assert await _total(hass, "household_expensive", data_start) is None


@pytest.mark.usefixtures("energy")
async def test_new_levels_sort_the_past_again(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """Changing the levels computes the household again; old levels disappear."""
    entry = make_entry(options={"cheap_until": GRID_PRICE})
    await setup_entry(hass, entry)
    assert await _total(hass, "household_cheap", data_start)

    hass.config_entries.async_update_entry(entry, options={"expensive_from": 0.25})
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert await _total(hass, "household_cheap", data_start) is None
    assert await _total(hass, "household_expensive", data_start) == pytest.approx(
        COUNTED * CONSUMPTION * (1 - SOLAR_SHARE)
    )
    assert await _total(hass, "household_energy", data_start) == pytest.approx(
        COUNTED * CONSUMPTION
    )


@pytest.mark.usefixtures("energy")
async def test_standing_charge(hass: HomeAssistant, data_start: datetime) -> None:
    """The standing charge is shared over the hours of its month."""
    await setup_entry(hass, make_entry(options={"standing_charge": 30}))
    state = HouseholdState()
    state.standing_charge.set(30, 0)
    # It counts from the first hour with data, even one without consumption.
    charge = sum(
        _standing_charge(state, (data_start + timedelta(hours=index)).timestamp())
        for index in range(HOURS)
    )
    assert 30 / 31 / 24 * HOURS <= charge <= 30 / 28 / 24 * HOURS
    assert await _total(hass, "grid_cost", data_start) == pytest.approx(
        COUNTED * (1.0 * GRID_PRICE - 0.5 * FEED_IN_PRICE) + charge
    )
    # Consumers' costs leave the standing charge out.
    assert await _total(hass, "household_cost", data_start) == pytest.approx(
        COUNTED * CONSUMPTION * KWH_PRICE
    )


@pytest.mark.usefixtures("energy")
async def test_own_tariff_prices_the_device(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A category's own tariff prices its devices' grid power."""
    values = {**WALLBOX_DATA["current"], "tariff": 0.20}
    entry = make_entry(
        ("wallbox", {**WALLBOX_DATA, "before": values, "current": values})
    )
    await setup_entry(hass, entry)
    wallbox = 1.0 * ((1 - SOLAR_SHARE) * 0.20 + SOLAR_SHARE * FEED_IN_PRICE)
    assert await _total(hass, "device_sensor_wallbox_cost", data_start) == (
        pytest.approx(COUNTED * wallbox)
    )
    assert await _total(hass, "household_cost", data_start) == pytest.approx(
        COUNTED * ((CONSUMPTION - 1.0) * KWH_PRICE + wallbox)
    )


@pytest.mark.usefixtures("energy")
async def test_new_hours_continue(hass: HomeAssistant, data_start: datetime) -> None:
    """Each update adds the hours it computed."""
    entry = make_entry()
    await setup_entry(hass, entry)
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
    await entry.runtime_data.async_refresh()
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert await _total(hass, "household_energy", data_start) == pytest.approx(
        (COUNTED + 2) * CONSUMPTION
    )


@pytest.mark.usefixtures("energy")
async def test_removed_device_loses_its_statistics(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A device removed from the energy dashboard loses its statistics."""
    entry = make_entry()
    await setup_entry(hass, entry)
    assert await _total(hass, "device_sensor_washer_cost", data_start)

    await set_energy_prefs(
        hass, {**PREFS, "device_consumption": PREFS["device_consumption"][:2]}
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert await _total(hass, "device_sensor_washer_cost", data_start) is None
    assert await _total(hass, "other_energy", data_start) == pytest.approx(
        COUNTED * (OTHER + DEVICES["washer"])
    )

    await hass.config_entries.async_remove(entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert await _total(hass, "household_energy", data_start) is None


@pytest.mark.usefixtures("energy")
async def test_recompute_computes_everything(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """Recomputing the household also computes the categories again."""
    entry = make_entry(("wallbox", WALLBOX_DATA))
    await setup_entry(hass, entry)
    coordinator = entry.runtime_data
    fingerprint = coordinator.household_state.fingerprint
    category_fingerprint = next(iter(coordinator.states.values())).fingerprint

    hass.config_entries.async_update_entry(entry, options={"recompute": 12345.0})
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    coordinator = entry.runtime_data
    assert coordinator.household_state.fingerprint != fingerprint
    assert next(iter(coordinator.states.values())).fingerprint != category_fingerprint
    assert await _total(hass, "household_energy", data_start) == pytest.approx(
        COUNTED * CONSUMPTION
    )
