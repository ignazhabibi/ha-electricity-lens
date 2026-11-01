"""Websocket command that tells the cards which figures exist.

The cards show figures by area, such as the household's costs or a device's
solar share, and need not know where they are kept: the integration's own
statistics for what it computes, the energy dashboard's statistics for what
Home Assistant already records, such as a device's consumption.
"""

from __future__ import annotations

from typing import Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
import probatio

from .calculation import (
    AREA_HOUSEHOLD,
    AREA_OTHER,
    GRID_COST,
    LEVEL_CHEAP,
    LEVEL_EXPENSIVE,
    effective_meters,
)
from .const import CATEGORY_PV, DOMAIN
from .coordinator import CATEGORY_FIGURES, EnergyPaybackCoordinator
from .sources import (
    EnergyInterfaceError,
    async_get_energy_setup,
    category_statistic_id,
    device_area,
    household_statistic_id,
    saving_statistic_id,
)


@callback
def async_register(hass: HomeAssistant) -> None:
    """Register the websocket command."""
    websocket_api.async_register_command(hass, ws_figures)


@websocket_api.websocket_command({probatio.Required("type"): f"{DOMAIN}/figures"})
@websocket_api.async_response
async def ws_figures(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Send the areas, their names, and the statistics of each figure."""
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        connection.send_error(msg["id"], "not_loaded", "Energy Lens is not loaded")
        return
    coordinator: EnergyPaybackCoordinator = entries[0].runtime_data
    try:
        figures = await async_figures(hass, coordinator)
    except EnergyInterfaceError as err:
        connection.send_error(msg["id"], "energy_interface", str(err))
        return
    connection.send_result(msg["id"], figures)


async def async_figures(
    hass: HomeAssistant, coordinator: EnergyPaybackCoordinator
) -> dict[str, Any]:
    """Return the areas with the statistics of each of their figures.

    Each figure is a list of statistics whose changes add up, for example the
    import meters of several grid connections.
    """
    setup = coordinator.setup or await async_get_energy_setup(hass)
    text = await coordinator.async_texts()
    cheap_until, expensive_from = coordinator.household.levels

    def household(area: str, **extra: list[str]) -> dict[str, list[str]]:
        statistics = {
            "solar": [household_statistic_id(f"{area}_solar")],
            "cost": [household_statistic_id(f"{area}_cost")],
        }
        if cheap_until is not None:
            statistics[LEVEL_CHEAP] = [household_statistic_id(f"{area}_{LEVEL_CHEAP}")]
        if expensive_from is not None:
            statistics[LEVEL_EXPENSIVE] = [
                household_statistic_id(f"{area}_{LEVEL_EXPENSIVE}")
            ]
        return {**extra, **statistics}

    def area(kind: str, area_id: str, name: str, **statistics: Any) -> dict[str, Any]:
        return {"id": area_id, "kind": kind, "name": name, "statistics": statistics}

    areas = [
        area(
            "household",
            AREA_HOUSEHOLD,
            text(AREA_HOUSEHOLD),
            **household(
                AREA_HOUSEHOLD,
                energy=[household_statistic_id(f"{AREA_HOUSEHOLD}_energy")],
            ),
        ),
        area(
            "grid",
            "grid",
            text("area_grid"),
            energy=[grid.import_stat for grid in setup.grids if grid.import_stat],
            export=[grid.export_stat for grid in setup.grids if grid.export_stat],
            cost=[household_statistic_id(GRID_COST)],
        ),
    ]
    categories = {
        config.category: (subentry_id, config)
        for subentry_id, config in coordinator.configs.items()
    }
    if setup.solar:
        solar: dict[str, Any] = {
            "energy": list(setup.solar),
            "self_used": [household_statistic_id(f"{AREA_HOUSEHOLD}_solar")],
        }
        if CATEGORY_PV in categories:
            solar["saving"] = [saving_statistic_id(CATEGORY_PV)]
        areas.append(
            {
                **area("solar", "solar", text("area_solar"), **solar),
                "forecast": bool(setup.forecasts),
            }
        )
    parents = {device.stat: device.included_in for device in setup.devices}
    for category, (subentry_id, config) in categories.items():
        if category == CATEGORY_PV:
            continue
        meters = effective_meters(config.meters, parents)
        devices = [device_area(meter) for meter in meters]
        areas.append(
            area(
                "category",
                category,
                coordinator.config_entry.subentries[subentry_id].title,
                energy=meters,
                solar=[household_statistic_id(f"{device}_solar") for device in devices],
                cost=[household_statistic_id(f"{device}_cost") for device in devices],
                **{
                    level: [
                        household_statistic_id(f"{device}_{level}")
                        for device in devices
                    ]
                    for level, threshold in (
                        (LEVEL_CHEAP, cheap_until),
                        (LEVEL_EXPENSIVE, expensive_from),
                    )
                    if threshold is not None
                },
                saving=[saving_statistic_id(category)],
                **{
                    figure: [category_statistic_id(category, figure)]
                    for figure in CATEGORY_FIGURES[category]
                },
            )
        )
    # Only top-level devices add up to the household, beside "Other".
    top_level = set(effective_meters(parents, parents))
    areas.extend(
        {
            **area(
                "device",
                device_area(device.stat),
                coordinator.device_name(device),
                **household(device_area(device.stat), energy=[device.stat]),
            ),
            "top_level": device.stat in top_level,
        }
        for device in setup.devices
    )
    areas.append(
        area(
            "other",
            AREA_OTHER,
            text(AREA_OTHER),
            **household(
                AREA_OTHER, energy=[household_statistic_id(f"{AREA_OTHER}_energy")]
            ),
        )
    )
    return {
        "calculating": coordinator.household_state.next_hour is None,
        "levels": {"cheap_until": cheap_until, "expensive_from": expensive_from},
        "areas": areas,
    }
