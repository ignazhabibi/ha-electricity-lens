"""Websocket command that tells the cards which figures exist.

The cards show figures by area, such as the household's costs or a device's
solar share, and need not know where they are kept: the integration's own
statistics for what it computes, the energy dashboard's statistics for what
Home Assistant already records, such as a device's consumption.
"""

from __future__ import annotations

from typing import Any

import probatio
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .calculation import (
    AREA_HOUSEHOLD,
    AREA_OTHER,
    GRID_CHEAP_SAVING,
    GRID_COST,
    GRID_FEED_IN,
    GRID_IMPORT_COST,
    GRID_STANDING_CHARGE,
    LEVEL_CHEAP,
    LEVEL_EXPENSIVE,
    effective_meters,
)
from .const import CATEGORY_HEAT_PUMP, CATEGORY_PV, DOMAIN
from .coordinator import CATEGORY_FIGURES, ElectricityLensCoordinator
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
    websocket_api.async_register_command(hass, ws_figures)  # pyright: ignore[reportUnknownMemberType]


@websocket_api.websocket_command({probatio.Required("type"): f"{DOMAIN}/figures"})  # pyright: ignore[reportPrivateImportUsage, reportUnknownMemberType]
@websocket_api.async_response  # pyright: ignore[reportPrivateImportUsage]
async def ws_figures(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,  # pyright: ignore[reportPrivateImportUsage]
    msg: dict[str, Any],
) -> None:
    """Send the areas, their names, and the statistics of each figure."""
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        connection.send_error(msg["id"], "not_loaded", "Electricity Lens is not loaded")
        return
    coordinator: ElectricityLensCoordinator = entries[0].runtime_data
    try:
        figures = await async_figures(hass, coordinator)
    except EnergyInterfaceError as err:
        connection.send_error(msg["id"], "energy_interface", str(err))
        return
    connection.send_result(msg["id"], figures)


async def async_figures(
    hass: HomeAssistant, coordinator: ElectricityLensCoordinator
) -> dict[str, Any]:
    """Return the areas with the statistics of each of their figures.

    Each figure is a list of statistics whose changes add up, for example the
    import meters of several grid connections. Consumers and the sources also
    name the energy dashboard's power sensors, for the power right now.
    """
    setup = coordinator.setup or await async_get_energy_setup(hass)
    text = await coordinator.async_texts()
    cheap_until, expensive_from = coordinator.household.levels
    levels = ((LEVEL_CHEAP, cheap_until), (LEVEL_EXPENSIVE, expensive_from))

    def household(area: str, **extra: list[str]) -> dict[str, list[str]]:
        statistics = {
            "solar": [household_statistic_id(f"{area}_solar")],
            "cost": [household_statistic_id(f"{area}_cost")],
            "solar_cost": [household_statistic_id(f"{area}_solar_cost")],
        }
        for level, threshold in levels:
            if threshold is not None:
                statistics[level] = [household_statistic_id(f"{area}_{level}")]
                statistics[f"{level}_cost"] = [
                    household_statistic_id(f"{area}_{level}_cost")
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
            import_cost=[household_statistic_id(GRID_IMPORT_COST)],
            feed_in=[household_statistic_id(GRID_FEED_IN)],
            standing_charge=[household_statistic_id(GRID_STANDING_CHARGE)],
            **(
                {"cheap_saving": [household_statistic_id(GRID_CHEAP_SAVING)]}
                if cheap_until is not None
                else {}
            ),
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
                "investment": CATEGORY_PV in categories
                and bool(categories[CATEGORY_PV][1].investment),
            }
        )
    parents = {device.stat: device.included_in for device in setup.devices}
    power = {device.stat: device.power for device in setup.devices if device.power}
    for category, (subentry_id, config) in categories.items():
        if category == CATEGORY_PV:
            continue
        meters = effective_meters(config.meters, parents)
        devices = [device_area(meter) for meter in meters]
        areas.append(
            {
                "power": [power[meter] for meter in meters if meter in power],
                **area(
                    "category",
                    category,
                    coordinator.config_entry.subentries[subentry_id].title,
                    energy=meters,
                    solar=[
                        household_statistic_id(f"{device}_solar") for device in devices
                    ],
                    cost=[
                        household_statistic_id(f"{device}_cost") for device in devices
                    ],
                    solar_cost=[
                        household_statistic_id(f"{device}_solar_cost")
                        for device in devices
                    ],
                    **{
                        key: [
                            household_statistic_id(f"{device}_{key}")
                            for device in devices
                        ]
                        for level, threshold in levels
                        if threshold is not None
                        for key in (level, f"{level}_cost")
                    },
                    saving=[saving_statistic_id(category)],
                    **{
                        figure: [category_statistic_id(category, figure)]
                        for figure in CATEGORY_FIGURES[category]
                    },
                    **(
                        {"heat_meters": list(config.heat_meters)}
                        if config.heat_meters
                        else {}
                    ),
                ),
                "investment": bool(config.investment),
            }
        )
    # Only top-level devices add up to the household, beside "Other".
    top_level = set(effective_meters(parents, parents))
    paired_heat: dict[str, str] = {}
    if CATEGORY_HEAT_PUMP in categories:
        hp_config = categories[CATEGORY_HEAT_PUMP][1]
        hp_meters = effective_meters(hp_config.meters, parents)
        if len(hp_config.heat_meters) == len(hp_meters) > 1:
            paired_heat = dict(zip(hp_meters, hp_config.heat_meters, strict=True))
    areas.extend(
        {
            **area(
                "device",
                device_area(device.stat),
                coordinator.device_name(device),
                **household(device_area(device.stat), energy=[device.stat]),
                **(
                    {
                        "heat": [paired_heat[device.stat]],
                        "saving": [
                            category_statistic_id(
                                CATEGORY_HEAT_PUMP,
                                f"{device_area(device.stat)}_saving",
                            )
                        ],
                        "alternative_cost": [
                            category_statistic_id(
                                CATEGORY_HEAT_PUMP,
                                f"{device_area(device.stat)}_alternative_cost",
                            )
                        ],
                        "solar_saving": [
                            category_statistic_id(
                                CATEGORY_HEAT_PUMP,
                                f"{device_area(device.stat)}_solar_saving",
                            )
                        ],
                    }
                    if device.stat in paired_heat
                    else {}
                ),
            ),
            "top_level": device.stat in top_level,
            "power": [device.power] if device.power else [],
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
        "calculating": coordinator.household_state.next_hour is None
        or any(result.calculating for result in coordinator.data.categories.values()),
        "levels": {"cheap_until": cheap_until, "expensive_from": expensive_from},
        "areas": areas,
        # The sensors of the power right now: the grid's positive while
        # importing, the batteries' positive while discharging.
        "power": {
            "grid": list(setup.grid_power),
            "solar": list(setup.solar_power),
            "battery": list(setup.battery_power),
        },
    }
