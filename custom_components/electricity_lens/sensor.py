"""Sensors for Electricity Lens."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import PERCENTAGE, UnitOfEnergy
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import DOMAIN
from .coordinator import ElectricityLensConfigEntry, ElectricityLensCoordinator
from .entity import ElectricityLensEntity
from .models import CategoryResult
from .sources import async_get_energy_setup, saving_statistic_id

# Sensors only read the coordinator's data.
PARALLEL_UPDATES = 0


@dataclass(frozen=True, kw_only=True)
class CategorySensorDescription(SensorEntityDescription):
    """Describes a sensor of one category."""

    value_fn: Callable[[CategoryResult], float | None]
    unit_fn: Callable[[str], str]
    attributes_fn: Callable[[CategoryResult], dict[str, Any]] | None = None


def _surplus(result: CategoryResult) -> dict[str, Any]:
    """Return how far the saving has gone beyond the investment."""
    if result.annual_return is None or result.payback is None:
        return {"surplus": None, "surplus_percent": None}
    return {
        "surplus": (result.saving or 0.0) - (result.investment or 0.0),
        "surplus_percent": result.payback - 100,
    }


CATEGORY_SENSORS: tuple[CategorySensorDescription, ...] = (
    CategorySensorDescription(
        key="saving",
        translation_key="saving",
        device_class=SensorDeviceClass.MONETARY,
        # No state class: the saving's history is a statistic of the
        # integration's own, computed hour by hour and again after corrections.
        suggested_display_precision=2,
        value_fn=lambda result: result.saving,
        unit_fn=lambda currency: currency,
    ),
    CategorySensorDescription(
        key="payback",
        translation_key="payback",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=lambda result: result.payback,
        unit_fn=lambda _: PERCENTAGE,
        attributes_fn=lambda result: {
            "investment": result.investment,
            "years_left": result.years_left,
        },
    ),
    CategorySensorDescription(
        key="annual_return",
        translation_key="annual_return",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=1,
        value_fn=lambda result: result.annual_return,
        unit_fn=lambda _: PERCENTAGE,
        attributes_fn=_surplus,
    ),
    CategorySensorDescription(
        key="saving_per_year",
        translation_key="saving_per_year",
        state_class=SensorStateClass.MEASUREMENT,
        suggested_display_precision=0,
        value_fn=lambda result: result.per_year,
        unit_fn=lambda currency: f"{currency}/a",
    ),
)

BALANCE_SENSOR = SensorEntityDescription(
    key="balance",
    translation_key="balance",
    device_class=SensorDeviceClass.MONETARY,
    state_class=SensorStateClass.TOTAL,
    suggested_display_precision=0,
)

# The solar forecast for the rest of today and for tomorrow over all forecasts
# of the energy dashboard, so that a gauge can show it.
FORECAST_SENSORS = (
    SensorEntityDescription(
        key="forecast_rest_today",
        translation_key="forecast_rest_today",
        device_class=SensorDeviceClass.ENERGY,
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        suggested_display_precision=1,
    ),
    SensorEntityDescription(
        key="forecast_tomorrow",
        translation_key="forecast_tomorrow",
        device_class=SensorDeviceClass.ENERGY,
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        suggested_display_precision=1,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ElectricityLensConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the overall balance and the sensors of each category."""
    coordinator = entry.runtime_data
    async_add_entities([BalanceSensor(coordinator, entry.entry_id)])
    # Up to 0.24.0 a sensor showed the whole day; the rest of the day replaced it.
    registry = er.async_get(hass)
    if old := registry.async_get_entity_id(
        "sensor", DOMAIN, f"{entry.entry_id}_forecast_today"
    ):
        registry.async_remove(old)
    coordinator.forecast_sensors = bool((await async_get_energy_setup(hass)).forecasts)
    if coordinator.forecast_sensors:
        async_add_entities(
            ForecastSensor(coordinator, description, entry.entry_id)
            for description in FORECAST_SENSORS
        )
    else:
        # The forecast was removed from the energy dashboard.
        for description in FORECAST_SENSORS:
            if forecast := registry.async_get_entity_id(
                "sensor", DOMAIN, f"{entry.entry_id}_{description.key}"
            ):
                registry.async_remove(forecast)
    for subentry_id, subentry in entry.subentries.items():
        config = coordinator.configs.get(subentry_id)
        if config is not None and not config.is_compared:
            # Without a comparison there is no saving to show. Its figures,
            # such as the heat, are statistics the cards read.
            for description in CATEGORY_SENSORS:
                if stale := registry.async_get_entity_id(
                    "sensor", DOMAIN, f"{subentry_id}_{description.key}"
                ):
                    registry.async_remove(stale)
            continue
        async_add_entities(
            [
                CategorySensor(
                    coordinator, description, subentry_id, subentry.subentry_type
                )
                for description in CATEGORY_SENSORS
            ],
            config_subentry_id=subentry_id,
        )


class BalanceSensor(ElectricityLensEntity, SensorEntity):  # pyright: ignore[reportIncompatibleVariableOverride]
    """All savings minus all investments."""

    # The card reads these. The recorder skips them, as the categories' attributes.
    _unrecorded_attributes = frozenset(
        {"saved", "invested", "per_year", "payback", "years_left", "progress"}
    )

    def __init__(self, coordinator: ElectricityLensCoordinator, entry_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, BALANCE_SENSOR, entry_id, "total")
        self._attr_native_unit_of_measurement = coordinator.hass.config.currency

    @property
    def native_value(self) -> float | None:  # pyright: ignore[reportIncompatibleVariableOverride]
        """Return the balance, unknown while it would be misleading."""
        return self.coordinator.data.balance

    @property
    def extra_state_attributes(self) -> dict[str, Any]:  # pyright: ignore[reportIncompatibleVariableOverride]
        """Return the sums behind the balance, and how far the past is computed."""
        data = self.coordinator.data
        return {
            "saved": data.saved,
            "invested": data.invested,
            "per_year": data.per_year,
            "payback": data.payback,
            "years_left": data.years_left,
            "progress": self.coordinator.progress(),
        }


class ForecastSensor(ElectricityLensEntity, SensorEntity):  # pyright: ignore[reportIncompatibleVariableOverride]
    """The solar forecast of a day, over all forecasts of the energy dashboard."""

    def __init__(
        self,
        coordinator: ElectricityLensCoordinator,
        description: SensorEntityDescription,
        entry_id: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, description, entry_id, "total")

    @property
    def native_value(self) -> float | None:  # pyright: ignore[reportIncompatibleVariableOverride]
        """Return the forecast, unknown without one."""
        forecast = self.coordinator.forecast
        if forecast is None:
            return None
        return forecast[
            0 if self.entity_description.key == "forecast_rest_today" else 1
        ]

    @property
    def extra_state_attributes(self) -> dict[str, Any]:  # pyright: ignore[reportIncompatibleVariableOverride]
        """Return the best solar day of the last twelve months, the forecast's scale."""
        best = self.coordinator.best_solar_day
        return {
            "best_day": None if best is None else round(best, 1),
            "best_day_full_year": self.coordinator.best_solar_day_full_year,
        }


class CategorySensor(ElectricityLensEntity, SensorEntity):  # pyright: ignore[reportIncompatibleVariableOverride]
    """A figure of one category."""

    entity_description: CategorySensorDescription  # pyright: ignore[reportIncompatibleVariableOverride]
    # The card and the more-info dialog read these. They change rarely, and
    # their history is not interesting, so the recorder skips them.
    _unrecorded_attributes = frozenset(
        {
            "category",
            "calculating",
            "counting_since",
            "investment",
            "yearly_from",
            "price",
            "heating",
            "heat_estimated",
            "statistic_id",
            "balance",
            "years_left",
            "surplus",
            "surplus_percent",
            "battery",
        }
    )

    def __init__(
        self,
        coordinator: ElectricityLensCoordinator,
        description: CategorySensorDescription,
        subentry_id: str,
        category: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, description, subentry_id, category)
        self._subentry_id = subentry_id
        self._category = category
        self._attr_native_unit_of_measurement = description.unit_fn(
            coordinator.hass.config.currency
        )

    @property
    def _result(self) -> CategoryResult | None:
        return self.coordinator.data.categories.get(self._subentry_id)

    @property
    def native_value(self) -> float | None:  # pyright: ignore[reportIncompatibleVariableOverride]
        """Return the figure."""
        if (result := self._result) is None:
            return None
        return self.entity_description.value_fn(result)

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:  # pyright: ignore[reportIncompatibleVariableOverride]
        """Return since when the saving counts and the price it uses now."""
        if (result := self._result) is None:
            return None
        if self.entity_description.key != "saving":
            attributes_fn = self.entity_description.attributes_fn
            return attributes_fn(result) if attributes_fn else None
        attributes: dict[str, Any] = {
            "category": self._category,
            "statistic_id": saving_statistic_id(self._category),
            "calculating": result.calculating,
            "counting_since": (
                result.counting_since.isoformat() if result.counting_since else None
            ),
            "investment": result.investment,
            "balance": result.balance,
            "yearly_from": result.yearly_from.isoformat()
            if result.yearly_from
            else None,
        }
        if result.price is not None:
            attributes["price"] = result.price
        if result.heating is not None:
            attributes["heating"] = result.heating
            attributes["heat_estimated"] = result.heat_estimated
        if (battery := result.battery) is not None:
            # The battery's part of the PV plant's saving, with its own payback.
            attributes["battery"] = {
                "saving": battery.saving,
                "investment": battery.investment,
                "per_year": battery.per_year,
                "payback": battery.payback,
                "years_left": battery.years_left,
                "counting_since": battery.counting_since.isoformat(),
            }
        return attributes
