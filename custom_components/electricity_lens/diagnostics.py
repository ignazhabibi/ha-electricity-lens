"""Diagnostics for Electricity Lens."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

from homeassistant.core import HomeAssistant

from .coordinator import ElectricityLensConfigEntry
from .sources import EnergyInterfaceError, async_get_energy_setup


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ElectricityLensConfigEntry
) -> dict[str, Any]:
    """Return what was configured, what the energy dashboard provides, and the progress.

    Nothing here is secret: statistic ids, prices, and amounts the user entered.
    """
    coordinator = entry.runtime_data
    try:
        energy: dict[str, Any] | str = asdict(await async_get_energy_setup(hass))
    except EnergyInterfaceError as err:
        energy = f"unavailable: {err}"
    return {
        "categories": {
            subentry_id: {
                "type": subentry.subentry_type,
                "data": dict(subentry.data),
                "state": coordinator.states[subentry_id].as_dict()
                if subentry_id in coordinator.states
                else None,
                "result": asdict(result)
                if (result := coordinator.data.categories.get(subentry_id))
                else None,
            }
            for subentry_id, subentry in entry.subentries.items()
        },
        "household": {
            "options": dict(entry.options),
            "state": coordinator.household_state.as_dict(),
        },
        "balance": coordinator.data.balance,
        "currency": hass.config.currency,
        "energy_dashboard": energy,
        "last_update_success": coordinator.last_update_success,
        "progress": coordinator.progress(),
    }
