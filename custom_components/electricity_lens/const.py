"""Constants for the Electricity Lens integration."""

from typing import Final, NamedTuple

DOMAIN: Final = "electricity_lens"

# Categories. Each one is a config subentry type and appears at most once.
# The electric car keeps its first name "wallbox" internally, because the
# entities of existing installations are named after it.
CATEGORY_PV: Final = "pv"
CATEGORY_HEAT_PUMP: Final = "heat_pump"
CATEGORY_WALLBOX: Final = "wallbox"
CATEGORIES: Final = (CATEGORY_PV, CATEGORY_HEAT_PUMP, CATEGORY_WALLBOX)

# Subentry data keys
CONF_INVESTMENT: Final = "investment"
CONF_BATTERY_INVESTMENT: Final = "battery_investment"
"""The PV plant's battery, on its own; the PV plant's payback counts both."""
CONF_METERS: Final = "meters"
CONF_HEAT_METERS: Final = "heat_meters"
CONF_HEATING: Final = "heating"
CONF_COMPARISON: Final = "comparison"
"""What the electric car is compared with: a combustion car, or nothing."""
CONF_SETUP_AT: Final = "setup_at"
"""Start of the first hour after the setup: phase 2 ends, phase 3 begins."""
CONF_BEFORE: Final = "before"
"""The averages for the time before the setup (phase 2)."""
CONF_CURRENT: Final = "current"
"""The values in effect now (phase 3)."""
CONF_RECOMPUTE: Final = "recompute"
"""When the user last asked to compute the category again."""

# Config entry options: the household
CONF_STANDING_CHARGE: Final = "standing_charge"
"""Standing charge per month, shared evenly over the hours of its month."""
RETIRED_OPTIONS: Final = ("cheap_until", "expensive_from")
"""Options of earlier versions, removed by the entry's migration: the price
levels follow the grid price on their own since 0.33.0."""

# Keys inside CONF_BEFORE and CONF_CURRENT
VALUE_PRICE: Final = "price"
"""Gas or oil price for the heat pump, fuel price for the car."""
VALUE_PRICE_ENTITY: Final = "price_entity"
VALUE_SCOP: Final = "scop"
VALUE_TARIFF: Final = "tariff"
VALUE_EV_CONSUMPTION: Final = "ev_consumption"
VALUE_COMBUSTION_CONSUMPTION: Final = "combustion_consumption"

HEATING_GAS: Final = "gas"
HEATING_OIL: Final = "oil"
HEATING_LPG: Final = "lpg"
HEATING_PELLETS: Final = "pellets"
HEATING_DISTRICT: Final = "district_heating"
HEATING_ELECTRIC: Final = "electric"
"""Electric heating, such as storage heaters: heat at its own heating tariff."""
COMPARISON_NONE: Final = "none"
"""Nothing to compare with, so no saving: no former heating, or no combustion car."""
HEATING_NONE: Final = COMPARISON_NONE
"""No former heating, as in a new build."""
COMPARISON_COMBUSTION: Final = "combustion"


class Fuel(NamedTuple):
    """How a former heating's price turns into the cost of a kWh of heat."""

    unit: str
    """What its price is per: kWh, litre, or kilogram."""
    kwh_per_unit: float
    efficiency: float
    """Heat per kWh of fuel over the year."""


# Fixed values almost nobody knows; the documentation names them. Boilers burn
# gas, oil, and LPG at 92 %, a pellet boiler at 88 %. District heating is paid
# per kWh of heat delivered, an electric heating turns each kWh into heat.
FUELS: Final[dict[str, Fuel]] = {
    HEATING_GAS: Fuel("kWh", 1.0, 0.92),
    HEATING_OIL: Fuel("l", 10.0, 0.92),
    HEATING_LPG: Fuel("l", 6.57, 0.92),
    HEATING_PELLETS: Fuel("kg", 4.8, 0.88),
    HEATING_DISTRICT: Fuel("kWh", 1.0, 1.0),
    HEATING_ELECTRIC: Fuel("kWh", 1.0, 1.0),
}

# The card is served by the integration itself, so one install brings both.
FRONTEND_URL: Final = "/electricity_lens_static"
CARD_FILENAME: Final = "electricity-lens.js"

SIGNAL_ENERGY_PREFS_UPDATED: Final = f"{DOMAIN}_energy_prefs_updated"

# Issue ids
ISSUE_ENERGY_INTERFACE: Final = "energy_interface"
ISSUE_NO_GRID_PRICE: Final = "no_grid_price"
ISSUE_MISSING_METER: Final = "missing_meter"
ISSUE_MISSING_PRICE_ENTITY: Final = "missing_price_entity"
