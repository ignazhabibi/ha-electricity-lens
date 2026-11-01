"""Tests for the websocket command that tells the cards which figures exist."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
import pytest
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from .conftest import HEAT_PUMP_DATA, PV_DATA, make_entry, setup_entry


async def _figures(hass: HomeAssistant, hass_ws_client: WebSocketGenerator) -> Any:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "energy_payback/figures"})
    return await client.receive_json()


@pytest.mark.usefixtures("energy")
async def test_figures(hass: HomeAssistant, hass_ws_client: WebSocketGenerator) -> None:
    """Each area lists where its figures are kept."""
    entry = make_entry(
        ("pv", PV_DATA),
        ("heat_pump", HEAT_PUMP_DATA),
        options={"cheap_until": 0.25},
    )
    await setup_entry(hass, entry)
    response = await _figures(hass, hass_ws_client)
    assert response["success"]
    result = response["result"]
    assert result["calculating"] is False
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
        "energy": ["energy_payback:household_energy"],
        "solar": ["energy_payback:household_solar"],
        "cost": ["energy_payback:household_cost"],
        "cheap": ["energy_payback:household_cheap"],
    }
    assert areas["grid"]["statistics"] == {
        "energy": ["sensor.grid_import"],
        "export": ["sensor.grid_export"],
        "cost": ["energy_payback:grid_cost"],
    }
    assert areas["solar"]["statistics"]["saving"] == ["energy_payback:pv_saving"]
    assert areas["solar"]["forecast"] is False
    assert areas["heat_pump"]["statistics"] == {
        "energy": ["sensor.heat_pump"],
        "saving": ["energy_payback:heat_pump_saving"],
    }
    washer = areas["device_sensor_washer"]
    assert washer["name"] == "Washer"
    assert washer["kind"] == "device"
    assert washer["top_level"] is True
    # A device's consumption is its own statistic.
    assert washer["statistics"]["energy"] == ["sensor.washer"]
    assert washer["statistics"]["cost"] == ["energy_payback:device_sensor_washer_cost"]


async def test_figures_not_loaded(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator
) -> None:
    """Without a loaded entry the command fails."""
    from homeassistant.setup import async_setup_component  # noqa: PLC0415

    assert await async_setup_component(hass, "energy_payback", {})
    response = await _figures(hass, hass_ws_client)
    assert not response["success"]
    assert response["error"]["code"] == "not_loaded"
