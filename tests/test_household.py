"""Tests for the household: consumption, mix, and costs as statistics."""

from __future__ import annotations

from datetime import datetime, timedelta

import pytest
from homeassistant.components.recorder import get_instance  # pyright: ignore[reportPrivateImportUsage]
from homeassistant.components.recorder.statistics import (
    get_metadata,
)
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.components.recorder.common import (
    async_wait_recording_done,
)

from custom_components.electricity_lens.coordinator import _standing_charge
from custom_components.electricity_lens.models import HouseholdState

from .conftest import (
    FEED_IN_PRICE,
    GRID_PRICE,
    HEAT_PUMP_DATA,
    HOURS,
    PREFS,
    PV_DATA,
    WALLBOX_DATA,
    import_hourly,
    import_hourly_mean,
    make_entry,
    set_energy_prefs,
    setup_entry,
    statistic_sums,
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
    sums = await statistic_sums(hass, f"electricity_lens:{key}", start)
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


async def _two_prices(hass: HomeAssistant, start: datetime) -> None:
    """Make the grid price a sensor that alternates between 0.20 and 0.40."""
    grid = {
        **PREFS["energy_sources"][0],
        "entity_energy_price": "sensor.price",
        "number_energy_price": None,
    }
    await set_energy_prefs(
        hass, {**PREFS, "energy_sources": [grid, *PREFS["energy_sources"][1:]]}
    )
    import_hourly_mean(
        hass,
        "sensor.price",
        start,
        [0.20 if index % 2 == 0 else 0.40 for index in range(HOURS)],
    )
    await async_wait_recording_done(hass)


# Of the counted hours, the first has the odd index.
CHEAP_HOURS = COUNTED // 2
EXPENSIVE_HOURS = COUNTED - CHEAP_HOURS


@pytest.mark.usefixtures("energy")
async def test_price_levels(hass: HomeAssistant, data_start: datetime) -> None:
    """Grid power at or below the cheap threshold counts as cheap."""
    await _two_prices(hass, data_start)
    await setup_entry(
        hass, make_entry(options={"cheap_until": 0.25, "expensive_from": 0.35})
    )
    grid = CONSUMPTION * (1 - SOLAR_SHARE)
    assert await _total(hass, "household_cheap", data_start) == pytest.approx(
        CHEAP_HOURS * grid
    )
    assert await _total(hass, "household_expensive", data_start) == pytest.approx(
        EXPENSIVE_HOURS * grid
    )
    assert await _total(hass, "device_sensor_washer_cheap", data_start) == (
        pytest.approx(CHEAP_HOURS * 0.2 * (1 - SOLAR_SHARE))
    )
    assert await _total(hass, "household_cheap_cost", data_start) == pytest.approx(
        CHEAP_HOURS * grid * 0.20
    )
    # Against the normal price, here all the hours above the threshold.
    assert await _total(hass, "grid_cheap_saving", data_start) == pytest.approx(
        CHEAP_HOURS * 1.0 * (0.40 - 0.20)
    )


@pytest.mark.usefixtures("energy")
async def test_flat_tariff_has_no_levels(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A single price is neither cheap nor expensive, whatever the thresholds say."""
    await setup_entry(
        hass, make_entry(options={"cheap_until": 0.50, "expensive_from": 0.60})
    )
    assert await _total(hass, "household_cheap", data_start) is None
    assert await _total(hass, "household_expensive", data_start) is None
    assert await _total(hass, "grid_cheap_saving", data_start) is None


@pytest.mark.usefixtures("energy")
async def test_new_levels_sort_the_past_again(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """Changing the levels computes the household again; old levels disappear."""
    await _two_prices(hass, data_start)
    entry = make_entry(options={"cheap_until": 0.25})
    await setup_entry(hass, entry)
    assert await _total(hass, "household_cheap", data_start)

    hass.config_entries.async_update_entry(entry, options={"expensive_from": 0.35})
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)
    assert await _total(hass, "household_cheap", data_start) is None
    assert await _total(hass, "household_expensive", data_start) == pytest.approx(
        EXPENSIVE_HOURS * CONSUMPTION * (1 - SOLAR_SHARE)
    )
    assert await _total(hass, "household_energy", data_start) == pytest.approx(
        COUNTED * CONSUMPTION
    )


@pytest.mark.usefixtures("energy")
async def test_prices_paid(hass: HomeAssistant, data_start: datetime) -> None:
    """Grid power counts at what it cost, what did not come from it at the mean."""
    mean = 0.30
    grid = {
        **PREFS["energy_sources"][0],
        "stat_cost": "sensor.grid_cost",
        "entity_energy_price": "sensor.price",
        "number_energy_price": None,
    }
    await set_energy_prefs(
        hass, {**PREFS, "energy_sources": [grid, *PREFS["energy_sources"][1:]]}
    )
    import_hourly_mean(
        hass, "sensor.price", data_start, [mean] * HOURS, low=0.20, high=0.40
    )
    # The load follows the cheap minutes; the last hour's costs have a gap.
    import_hourly(
        hass,
        "sensor.grid_cost",
        data_start,
        [0.0] + [0.25] * (COUNTED - 1) + [0.05],
        unit="EUR",
    )
    await async_wait_recording_done(hass)
    await setup_entry(hass, make_entry(("pv", PV_DATA), ("wallbox", WALLBOX_DATA)))

    paid = (COUNTED - 1) * 0.25 + mean
    assert await _total(hass, "grid_import_cost", data_start) == pytest.approx(paid)
    assert await _total(hass, "grid_feed_in", data_start) == pytest.approx(
        COUNTED * 0.5 * FEED_IN_PRICE
    )
    assert await _total(hass, "grid_cost", data_start) == pytest.approx(
        paid - COUNTED * 0.5 * FEED_IN_PRICE
    )
    assert await _total(hass, "pv_saving", data_start) == pytest.approx(
        COUNTED * (1.5 * mean + 0.5 * FEED_IN_PRICE)
    )
    assert await _total(hass, "wallbox_saving", data_start) == pytest.approx(
        COUNTED * 1.0 / 20 * 7 * 1.80 - paid
    )
    saving = await _total(hass, "wallbox_saving", data_start)
    by_solar = await _total(hass, "wallbox_solar_saving", data_start)
    alternative = await _total(hass, "wallbox_alternative_cost", data_start)
    cost = await _total(hass, "device_sensor_wallbox_cost", data_start)
    assert saving is not None
    assert by_solar is not None
    assert alternative is not None
    assert cost is not None
    assert saving + by_solar == pytest.approx(alternative - cost)


@pytest.mark.usefixtures("energy")
async def test_each_heat_meter_has_comparison_costs(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A device with its own heat meter knows what the old heating would cost."""
    for statistic_id, per_hour in {"sensor.heat_a": 2.0, "sensor.heat_b": 1.0}.items():
        import_hourly(hass, statistic_id, data_start, [0.0] + [per_hour] * (HOURS - 1))
    await async_wait_recording_done(hass)
    data = {
        **HEAT_PUMP_DATA,
        "meters": ["sensor.heat_pump", "sensor.washer"],
        "heat_meters": ["sensor.heat_a", "sensor.heat_b"],
    }
    await setup_entry(hass, make_entry(("heat_pump", data)))
    for device, heat in {"heat_pump": 2.0, "washer": 1.0}.items():
        key = f"heat_pump_device_sensor_{device}_alternative_cost"
        assert await _total(hass, key, data_start) == pytest.approx(
            COUNTED * heat / 0.92 * HEAT_PUMP_DATA["current"]["price"]
        )
        # What the alternative cost less what the device cost is its saving,
        # with the part by solar power.
        area = f"heat_pump_device_sensor_{device}"
        saving = await _total(hass, f"{area}_saving", data_start)
        by_solar = await _total(hass, f"{area}_solar_saving", data_start)
        alternative = await _total(hass, f"{area}_alternative_cost", data_start)
        cost = await _total(hass, f"device_sensor_{device}_cost", data_start)
        assert saving is not None
        assert by_solar is not None
        assert alternative is not None
        assert cost is not None
        assert saving + by_solar == pytest.approx(alternative - cost)


@pytest.mark.usefixtures("energy")
async def test_meter_running_back_is_no_energy(
    hass: HomeAssistant, data_start: datetime
) -> None:
    """A reset meter neither gives money back nor lowers the consumption."""
    increments = [0.0] + [1.0] * (HOURS - 1)
    increments[10] = -700.0
    import_hourly(hass, "sensor.grid_import", data_start, increments)
    await async_wait_recording_done(hass)
    await setup_entry(hass, make_entry())
    assert await _total(hass, "grid_cost", data_start) == pytest.approx(
        (COUNTED - 1) * GRID_PRICE - COUNTED * 0.5 * FEED_IN_PRICE
    )
    assert await _total(hass, "household_energy", data_start) == pytest.approx(
        (COUNTED - 1) * CONSUMPTION + 1.5
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
    assert await _total(hass, "grid_standing_charge", data_start) == pytest.approx(
        charge
    )
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
async def test_energy_dashboard_change_computes_the_categories_again(
    hass: HomeAssistant,
) -> None:
    """The categories build on the household, so they are computed again with it."""
    # Arrange: savings that only computing them again corrects.
    entry = make_entry(("pv", PV_DATA), ("heat_pump", HEAT_PUMP_DATA))
    await setup_entry(hass, entry)
    coordinator = entry.runtime_data
    expected = {key: state.saving for key, state in coordinator.states.items()}
    for state in coordinator.states.values():
        state.saving += 100

    # Act: the energy dashboard loses a device.
    await set_energy_prefs(
        hass, {**PREFS, "device_consumption": PREFS["device_consumption"][:2]}
    )
    await hass.async_block_till_done(wait_background_tasks=True)
    await async_wait_recording_done(hass)

    # Assert
    for key, state in coordinator.states.items():
        assert state.saving == pytest.approx(expected[key])


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
