"""Tests for the websocket command that tells the cards which figures exist."""

from __future__ import annotations

from typing import Any
from unittest.mock import patch

import pytest
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.electricity_lens.sources import EnergyInterfaceError

from .conftest import (
    HEAT_PUMP_DATA,
    PREFS,
    PV_DATA,
    make_entry,
    set_energy_prefs,
    setup_entry,
)


async def _figures(hass: HomeAssistant, hass_ws_client: WebSocketGenerator) -> Any:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "electricity_lens/figures"})
    return await client.receive_json()


@pytest.mark.usefixtures("energy")
async def test_figures(hass: HomeAssistant, hass_ws_client: WebSocketGenerator) -> None:
    """Each area lists where its figures are kept."""
    entry = make_entry(
        ("pv", PV_DATA),
        ("heat_pump", {**HEAT_PUMP_DATA, "heat_meters": ["sensor.heat"]}),
        options={"cheap_until": 0.25},
    )
    await setup_entry(hass, entry)
    response = await _figures(hass, hass_ws_client)
    assert response["success"]
    result = response["result"]
    assert result["calculating"] is False
    assert result["progress"] is None
    assert result["levels"] == {"cheap_until": 0.25, "expensive_from": None}
    areas = {area["id"]: area for area in result["areas"]}
    assert list(areas) == [
        "household",
        "grid",
        "solar",
        "heat_pump",
        "device_sensor_heat_pump",
        "device_sensor_wallbox",
        "device_sensor_washer",
        "other",
    ]
    assert areas["household"]["name"] == "Household"
    assert areas["household"]["statistics"] == {
        "energy": ["electricity_lens:household_energy"],
        "solar": ["electricity_lens:household_solar"],
        "cost": ["electricity_lens:household_cost"],
        "solar_cost": ["electricity_lens:household_solar_cost"],
        "cheap": ["electricity_lens:household_cheap"],
        "cheap_cost": ["electricity_lens:household_cheap_cost"],
    }
    assert areas["grid"]["statistics"] == {
        "energy": ["sensor.grid_import"],
        "export": ["sensor.grid_export"],
        "cost": ["electricity_lens:grid_cost"],
        "import_cost": ["electricity_lens:grid_import_cost"],
        "feed_in": ["electricity_lens:grid_feed_in"],
        "standing_charge": ["electricity_lens:grid_standing_charge"],
        "cheap_saving": ["electricity_lens:grid_cheap_saving"],
    }
    assert areas["solar"]["statistics"]["saving"] == ["electricity_lens:pv_saving"]
    assert areas["solar"]["forecast"] is False
    assert areas["solar"]["investment"] is True
    assert areas["heat_pump"]["investment"] is True
    assert areas["heat_pump"]["statistics"] == {
        "energy": ["sensor.heat_pump"],
        "solar": ["electricity_lens:device_sensor_heat_pump_solar"],
        "cost": ["electricity_lens:device_sensor_heat_pump_cost"],
        "solar_cost": ["electricity_lens:device_sensor_heat_pump_solar_cost"],
        "cheap": ["electricity_lens:device_sensor_heat_pump_cheap"],
        "cheap_cost": ["electricity_lens:device_sensor_heat_pump_cheap_cost"],
        "saving": ["electricity_lens:heat_pump_saving"],
        "heat": ["electricity_lens:heat_pump_heat"],
        "alternative_cost": ["electricity_lens:heat_pump_alternative_cost"],
        "solar_saving": ["electricity_lens:heat_pump_solar_saving"],
        "heat_meters": ["sensor.heat"],
    }
    washer = areas["device_sensor_washer"]
    assert washer["name"] == "Washer"
    assert washer["kind"] == "device"
    assert washer["top_level"] is True
    # A device's consumption is its own statistic.
    assert washer["statistics"]["energy"] == ["sensor.washer"]
    assert washer["statistics"]["cost"] == [
        "electricity_lens:device_sensor_washer_cost"
    ]
    # Without power sensors in the energy dashboard there is nothing to show now.
    assert washer["power"] == []
    assert result["power"] == {"grid": [], "solar": [], "battery": []}


@pytest.mark.usefixtures("energy")
async def test_figures_power(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """The energy dashboard's power sensors are passed on by source and consumer."""
    # Arrange: power sensors for the grid, the PV plant, and two devices.
    grid, solar = PREFS["energy_sources"]
    await set_energy_prefs(
        hass,
        {
            **PREFS,
            "energy_sources": [
                {**grid, "power_config": {"stat_rate": "sensor.grid_power"}},
                {**solar, "stat_rate": "sensor.solar_power"},
            ],
            "device_consumption": [
                {
                    "stat_consumption": "sensor.heat_pump",
                    "stat_rate": "sensor.hp_power",
                },
                {"stat_consumption": "sensor.wallbox"},
                {
                    "stat_consumption": "sensor.washer",
                    "stat_rate": "sensor.washer_power",
                },
            ],
        },
    )
    await setup_entry(hass, make_entry(("heat_pump", HEAT_PUMP_DATA)))

    # Act
    response = await _figures(hass, hass_ws_client)

    # Assert
    result = response["result"]
    assert result["power"] == {
        "grid": ["sensor.grid_power"],
        "solar": ["sensor.solar_power"],
        "battery": [],
    }
    areas = {area["id"]: area for area in result["areas"]}
    assert areas["heat_pump"]["power"] == ["sensor.hp_power"]
    assert areas["device_sensor_heat_pump"]["power"] == ["sensor.hp_power"]
    assert areas["device_sensor_wallbox"]["power"] == []
    assert areas["device_sensor_washer"]["power"] == ["sensor.washer_power"]


async def test_figures_not_loaded(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """Without a loaded entry the command fails."""
    from homeassistant.setup import async_setup_component  # noqa: PLC0415

    assert await async_setup_component(hass, "electricity_lens", {})
    response = await _figures(hass, hass_ws_client)
    assert not response["success"]
    assert response["error"]["code"] == "not_loaded"


@pytest.mark.usefixtures("energy")
async def test_figures_pair_heat_meters_with_devices(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """A heat meter per device gives each device its heat and saving."""
    entry = make_entry(
        (
            "heat_pump",
            {
                **HEAT_PUMP_DATA,
                "meters": ["sensor.heat_pump", "sensor.washer"],
                "heat_meters": ["sensor.heating", "sensor.hot_water"],
            },
        )
    )
    await setup_entry(hass, entry)
    response = await _figures(hass, hass_ws_client)
    areas = {area["id"]: area for area in response["result"]["areas"]}
    assert areas["device_sensor_heat_pump"]["statistics"]["heat"] == ["sensor.heating"]
    assert areas["device_sensor_washer"]["statistics"]["heat"] == ["sensor.hot_water"]
    assert "saving" in areas["device_sensor_washer"]["statistics"]


@pytest.mark.usefixtures("energy")
async def test_figures_without_former_heating(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """Without a former heating the heat pump has its heat, but no saving."""
    entry = make_entry(
        (
            "heat_pump",
            {
                **HEAT_PUMP_DATA,
                "heating": "none",
                "investment": None,
                "meters": ["sensor.heat_pump", "sensor.washer"],
                "heat_meters": ["sensor.heating", "sensor.hot_water"],
                "before": {"scop": 4.0},
                "current": {"scop": 4.0},
            },
        )
    )
    await setup_entry(hass, entry)
    response = await _figures(hass, hass_ws_client)
    areas = {area["id"]: area for area in response["result"]["areas"]}
    statistics = areas["heat_pump"]["statistics"]
    assert statistics["heat"] == ["electricity_lens:heat_pump_heat"]
    assert not {"saving", "alternative_cost", "solar_saving"} & set(statistics)
    assert areas["heat_pump"]["investment"] is False
    washer = areas["device_sensor_washer"]["statistics"]
    assert washer["heat"] == ["sensor.hot_water"]
    assert "saving" not in washer


@pytest.mark.usefixtures("energy")
async def test_figures_interface_error(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """A changed energy interface is reported, not raised."""
    await setup_entry(hass, make_entry(("pv", PV_DATA)))
    with patch(
        "custom_components.electricity_lens.websocket_api.async_figures",
        side_effect=EnergyInterfaceError("changed"),
    ):
        response = await _figures(hass, hass_ws_client)
    assert not response["success"]
    assert response["error"]["code"] == "energy_interface"
