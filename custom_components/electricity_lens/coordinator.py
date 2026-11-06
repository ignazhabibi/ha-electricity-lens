"""Coordinator that computes the savings hour by hour from the recorder."""

from __future__ import annotations

import logging
import math
from collections.abc import Callable, Collection, Iterator
from copy import deepcopy
from dataclasses import dataclass
from datetime import timedelta
from time import time
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er, issue_registry as ir
from homeassistant.helpers.storage import Store
from homeassistant.helpers.translation import async_get_translations
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .calculation import (
    AREA_HOUSEHOLD,
    AREA_OTHER,
    DAY,
    GRID_CHEAP_SAVING,
    GRID_COST,
    GRID_FEED_IN,
    GRID_IMPORT_COST,
    GRID_STANDING_CHARGE,
    HOUR,
    LEVEL_CHEAP,
    LEVEL_EXPENSIVE,
    average_price,
    effective_meters,
    electricity_prices,
    fuel_cost,
    heat_pump_saving,
    heating_cost,
    household_hour,
    normal_price,
    paid_prices,
    price_level,
    pv_saving,
    summarize,
    wallbox_distance,
    wallbox_saving,
)
from .const import (
    CATEGORY_HEAT_PUMP,
    CATEGORY_PV,
    CATEGORY_WALLBOX,
    DOMAIN,
    ISSUE_ENERGY_INTERFACE,
    ISSUE_MISSING_METER,
    ISSUE_MISSING_PRICE_ENTITY,
    ISSUE_NO_GRID_PRICE,
    VALUE_COMBUSTION_CONSUMPTION,
    VALUE_EV_CONSUMPTION,
    VALUE_PRICE,
    VALUE_PRICE_ENTITY,
    VALUE_SCOP,
    VALUE_TARIFF,
)
from .models import (
    CategoryConfig,
    CategoryResult,
    CategoryState,
    HouseholdConfig,
    HouseholdState,
    PaybackData,
    settings_hash,
)
from .sources import (
    DeviceMeter,
    EnergyInterfaceError,
    EnergySetup,
    GridSource,
    async_end_of_data,
    async_first_hour,
    async_get_energy_setup,
    async_hourly_changes,
    async_hourly_ranges,
    async_hourly_values,
    async_remove_statistics,
    async_solar_forecast,
    async_statistic_ids,
    async_wait_recorder,
    async_write_statistics,
    category_statistic_id,
    cost_stat,
    device_area,
    household_statistic_id,
    statistic_category,
)

_LOGGER = logging.getLogger(__name__)

UPDATE_INTERVAL = timedelta(minutes=15)
# The past is computed in chunks to keep each recorder query small.
CHUNK = 30 * 24 * HOUR
STORAGE_VERSION = 1
# Version 2 keeps the savings in statistics of the integration's own instead
# of the saving sensors' statistics. Version 3 adds heat, distance, and the
# alternative's costs per category.
STATISTICS_VERSION = 3
# Raised when a rule changes what the computed past looks like: everything is
# then computed again. Version 2: prices paid, price levels that need a contrast,
# consumers that add up to the household, and meters that run back. Version 3:
# no hour counted twice after a failed update. Version 4: the standing charge and
# the saving by solar power per category.
CALCULATION_VERSION = 4

type ElectricityLensConfigEntry = ConfigEntry[ElectricityLensCoordinator]


@dataclass(frozen=True, slots=True)
class GridPrices:
    """The electricity price of each hour over all grid connections."""

    mean: list[float | None]
    """The mean price, which values what did not come from the grid."""
    paid: list[float | None]
    """What a kWh imported in the hour cost."""
    low: list[float | None]
    high: list[float | None]


def _hours(start: float, end: float) -> list[float]:
    return [start + index * HOUR for index in range(int((end - start) // HOUR))]


def _ceil_hour(timestamp: float) -> float:
    return math.ceil(timestamp / HOUR) * HOUR


def next_full_hour() -> float:
    """Return the start of the next full hour, from when new values apply."""
    return _ceil_hour(time() + 1)


# The figures each category keeps besides its saving.
CATEGORY_FIGURES: dict[str, tuple[str, ...]] = {
    CATEGORY_HEAT_PUMP: ("heat", "alternative_cost", "solar_saving"),
    CATEGORY_WALLBOX: ("distance", "alternative_cost", "solar_saving"),
}


def _standing_charge(state: HouseholdState, hour: float) -> float:
    """Return the standing charge of an hour: its month's share."""
    monthly = state.standing_charge.value_at(hour)
    if not isinstance(monthly, int | float):
        return 0.0
    local = dt_util.as_local(dt_util.utc_from_timestamp(hour))
    month = local.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    next_month = (month + timedelta(days=32)).replace(day=1)
    return monthly / ((next_month.timestamp() - month.timestamp()) / HOUR)


def _number(hass: HomeAssistant, entity_id: str | None) -> float | None:
    """Return the numeric state of an entity, or None."""
    if entity_id is None or (state := hass.states.get(entity_id)) is None:
        return None
    try:
        return float(state.state)
    except ValueError:
        return None


def value_at(
    config: CategoryConfig, state: CategoryState, key: str, hour: float
) -> float | None:
    """Return a value in effect at hour.

    Before the setup the average entered for that time counts, after it the
    current value of that hour.
    """
    if hour < config.setup_at:
        return config.before.get(key)
    value = state.timeline(key).value_at(hour)
    return float(value) if isinstance(value, int | float) else None


def _heat_meter_figures(
    config: CategoryConfig,
    meters: list[str],
    changes: dict[str, dict[float, float]],
    hour: float,
    *,
    fuel_price: float,
    electricity_price: float,
    device_costs: dict[str, float],
) -> Iterator[tuple[str, float]]:
    """Yield what each device with its own heat meter saved in an hour.

    Also what the former heating would have cost for its heat, and what the
    device's solar power adds to its saving.
    """
    for meter, heat_meter in zip(meters, config.heat_meters, strict=True):
        heat = changes[heat_meter][hour]
        saving = heat_pump_saving(
            electricity=changes.get(meter, {}).get(hour, 0.0),
            heat=heat,
            heating=config.heating,
            fuel_price=fuel_price,
            electricity_price=electricity_price,
        )
        alternative = heating_cost(heat, config.heating, fuel_price)
        yield f"{device_area(meter)}_saving", saving
        yield f"{device_area(meter)}_alternative_cost", alternative
        yield (
            f"{device_area(meter)}_solar_saving",
            alternative - device_costs[meter] - saving,
        )


def _price_entity_at(state: CategoryState, hour: float) -> str | None:
    entity = state.timeline(VALUE_PRICE_ENTITY).value_at(hour)
    return entity if isinstance(entity, str) else None


def coordinator_store(hass: HomeAssistant, entry: ConfigEntry) -> Store[dict[str, Any]]:
    """Return the store that keeps the progress of an entry."""
    return Store(hass, STORAGE_VERSION, f"{DOMAIN}.{entry.entry_id}")


def async_remove_issues(hass: HomeAssistant, *, keep: Collection[str] = ()) -> None:
    """Remove the integration's repair issues, except those in keep."""
    for domain, issue_id in list(ir.async_get(hass).issues):
        if domain == DOMAIN and issue_id not in keep:
            ir.async_delete_issue(hass, DOMAIN, issue_id)


class ElectricityLensCoordinator(DataUpdateCoordinator[PaybackData]):
    """Compute each category's saving from the energy dashboard's statistics.

    Every update continues where the last one stopped, so hours missed while
    Home Assistant was off are caught up. The first update computes the past.
    """

    config_entry: ElectricityLensConfigEntry

    def __init__(self, hass: HomeAssistant, entry: ElectricityLensConfigEntry) -> None:
        """Initialize the coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=UPDATE_INTERVAL,
        )
        self._store = coordinator_store(hass, entry)
        self.configs: dict[str, CategoryConfig] = {}
        self.states: dict[str, CategoryState] = {}
        self.household = HouseholdConfig.from_options(entry.options)
        self.household_state = HouseholdState()
        self.setup: EnergySetup | None = None
        """The energy dashboard as of the last update."""
        self._without_data: set[str] = set()
        self.forecast: tuple[float, float] | None = None
        """Today's and tomorrow's solar forecast in kWh, as of the last update."""

    async def async_load(self) -> None:
        """Restore progress and record changed current values."""
        stored = await self._store.async_load() or {}
        stored_categories: dict[str, Any] = stored.get("categories", {})
        moving_statistics = (
            bool(stored_categories)
            and stored.get("statistics_version", 1) < STATISTICS_VERSION
        )
        valid_from = next_full_hour()
        self.household_state = HouseholdState.from_dict(stored.get("household", {}))
        self.household_state.standing_charge.set(
            self.household.standing_charge, valid_from
        )
        for subentry_id, subentry in self.config_entry.subentries.items():
            config = CategoryConfig.from_data(subentry.subentry_type, subentry.data)
            state = CategoryState.from_dict(stored_categories.get(subentry_id, {}))
            if state.heating != config.heating:
                # Gas prices are per kWh, oil prices per litre: start over.
                state.timelines = {}
                state.heating = config.heating
            # Recomputing the household computes everything again.
            fingerprint = f"{config.fingerprint}:{CALCULATION_VERSION}"
            if self.household.recompute is not None:
                fingerprint += f":{self.household.recompute}"
            if state.fingerprint != fingerprint or moving_statistics:
                state.reset(fingerprint)
            for key in config.values:
                state.timeline(key).set(config.current.get(key), valid_from)
            if config.category != CATEGORY_PV:
                state.timeline(VALUE_PRICE_ENTITY).set(config.price_entity, valid_from)
            self.configs[subentry_id] = config
            self.states[subentry_id] = state
        # A removed category can no longer clear its own issues.
        async_remove_issues(
            self.hass,
            keep={
                ISSUE_ENERGY_INTERFACE,
                ISSUE_NO_GRID_PRICE,
                *(
                    f"{issue}_{subentry_id}"
                    for issue in (ISSUE_MISSING_METER, ISSUE_MISSING_PRICE_ENTITY)
                    for subentry_id in self.configs
                ),
            },
        )
        configured = {config.category for config in self.configs.values()}
        stale = [
            statistic_id
            for statistic_id in await async_statistic_ids(self.hass)
            if (category := statistic_category(statistic_id)) is not None
            and category not in configured
        ]
        if moving_statistics:
            # The past is computed again into the new statistics; the saving
            # sensors' own statistics would only confuse.
            stale += self._saving_entities()
        async_remove_statistics(self.hass, stale)
        await self._async_save()
        self.data = self._results()

    def _saving_entities(self) -> list[str]:
        registry = er.async_get(self.hass)
        return [
            entity_id
            for subentry_id in self.config_entry.subentries
            if (
                entity_id := registry.async_get_entity_id(
                    Platform.SENSOR, DOMAIN, f"{subentry_id}_saving"
                )
            )
        ]

    async def _async_save(self) -> None:
        await self._store.async_save(
            {
                "statistics_version": STATISTICS_VERSION,
                "household": self.household_state.as_dict(),
                "categories": {
                    subentry_id: state.as_dict()
                    for subentry_id, state in self.states.items()
                },
            }
        )

    async def _async_update_data(self) -> PaybackData:
        """Compute all hours the recorder has compiled since the last update."""
        try:
            setup = await async_get_energy_setup(self.hass)
            self.setup = setup
        except EnergyInterfaceError as err:
            self._issue(ISSUE_ENERGY_INTERFACE, ISSUE_ENERGY_INTERFACE)
            raise UpdateFailed(
                translation_domain=DOMAIN,
                translation_key=ISSUE_ENERGY_INTERFACE,
                translation_placeholders={"error": str(err)},
            ) from err
        ir.async_delete_issue(self.hass, DOMAIN, ISSUE_ENERGY_INTERFACE)
        self.forecast = await async_solar_forecast(self.hass, setup.forecasts)

        grid = setup.grid()
        if grid is None or grid.import_stat is None:
            # Keep the last figures until the energy dashboard is fixed.
            self._issue(ISSUE_NO_GRID_PRICE, ISSUE_NO_GRID_PRICE)
            return self._results()
        ir.async_delete_issue(self.hass, DOMAIN, ISSUE_NO_GRID_PRICE)

        self._check_price_entities()
        if (end := await async_end_of_data(self.hass, grid.import_stat)) is None:
            # No grid data yet, so there is nothing to compute.
            self._without_data = set(self.configs)
            return self._results()
        await self._async_advance_household(setup, end)
        for subentry_id, config in self.configs.items():
            await self._async_advance(subentry_id, config, setup, end)
        await async_wait_recorder(self.hass)
        await self._async_save()
        return self._results()

    def _issue(
        self,
        issue_id: str,
        translation_key: str,
        placeholders: dict[str, str] | None = None,
    ) -> None:
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            issue_id,
            is_fixable=False,
            severity=ir.IssueSeverity.ERROR,
            translation_key=translation_key,
            translation_placeholders=placeholders,
        )

    def _check_price_entities(self) -> None:
        """Raise an issue for price sensors that no longer exist."""
        registry = er.async_get(self.hass)
        for subentry_id, config in self.configs.items():
            issue_id = f"{ISSUE_MISSING_PRICE_ENTITY}_{subentry_id}"
            entity = config.price_entity
            if (
                entity is not None
                and registry.async_get(entity) is None
                and self.hass.states.get(entity) is None
            ):
                # Until it is replaced, its last value counts.
                self._issue(
                    issue_id,
                    ISSUE_MISSING_PRICE_ENTITY,
                    {
                        "category": self.config_entry.subentries[subentry_id].title,
                        "entity": entity,
                    },
                )
            else:
                ir.async_delete_issue(self.hass, DOMAIN, issue_id)

    def _key_stats(self, config: CategoryConfig, setup: EnergySetup) -> list[str]:
        """Return the statistics whose data defines when a category begins."""
        if config.category == CATEGORY_PV:
            return list(setup.solar)
        parents = {device.stat: device.included_in for device in setup.devices}
        return effective_meters(config.meters, parents)

    async def _async_advance(
        self,
        subentry_id: str,
        config: CategoryConfig,
        setup: EnergySetup,
        end: float,
    ) -> None:
        """Compute one category up to end."""
        state = self.states[subentry_id]
        issue_id = f"{ISSUE_MISSING_METER}_{subentry_id}"
        missing = [meter for meter in config.meters if setup.device(meter) is None]
        if config.category == CATEGORY_PV and not setup.solar:
            missing = ["solar"]
        if missing:
            # Keep the last figures until the meter is back or replaced.
            self._issue(
                issue_id,
                ISSUE_MISSING_METER,
                {
                    "category": self.config_entry.subentries[subentry_id].title,
                    "meters": ", ".join(missing),
                },
            )
            return
        ir.async_delete_issue(self.hass, DOMAIN, issue_id)

        if state.data_start is None:
            state.data_start = await async_first_hour(
                self.hass, self._key_stats(config, setup)
            )
            if state.data_start is None:
                self._without_data.add(subentry_id)
                return
        self._without_data.discard(subentry_id)

        counting_since = _ceil_hour(state.data_start)
        computing_past = state.next_hour is None
        start = state.next_hour if state.next_hour is not None else counting_since
        # A failure halfway must not count its hours again in the next update,
        # so the state changes only once they are written.
        progress = deepcopy(state)
        history: dict[str, list[tuple[float, float]]] = {}
        while start < end:
            chunk_end = min(start + CHUNK, end)
            rows = await self._async_compute(config, setup, progress, start, chunk_end)
            for figure, series in rows.items():
                history.setdefault(figure, []).extend(series)
            start = chunk_end
        await self._async_write_history(
            subentry_id, config, history, replace=computing_past
        )
        await async_wait_recorder(self.hass)
        progress.next_hour = max(start, counting_since)
        self.states[subentry_id] = progress

    def _category_sources(
        self,
        config: CategoryConfig,
        setup: EnergySetup,
        state: CategoryState,
        meters: list[str],
        end: float,
    ) -> tuple[set[str], set[str]]:
        """Return the sum statistics and the value entities a category reads."""
        sums: set[str] = set(meters) | set(config.heat_meters)
        values: set[str] = set()
        for source in setup.grids:
            sums |= _grid_sums(self.hass, source)
            values |= {
                entity
                for entity in (source.price_entity, source.export_price_entity)
                if entity is not None
            }
        if config.category == CATEGORY_PV:
            for battery in setup.batteries:
                sums |= {battery.discharge_stat, battery.charge_stat}
        elif end > config.setup_at:
            # Price sensors count only after the setup.
            values |= {
                entity
                for _, entity in state.timeline(VALUE_PRICE_ENTITY).points
                if isinstance(entity, str)
            }
        return sums, values

    async def _async_compute(
        self,
        config: CategoryConfig,
        setup: EnergySetup,
        state: CategoryState,
        start: float,
        end: float,
    ) -> dict[str, list[tuple[float, float]]]:
        """Add the saving of the hours from start to end to state.

        Return per figure the cumulative value at the end of each hour in which
        it changed. Hours without change are left out; the recorder carries the
        sum over them.
        """
        hours = _hours(start, end)
        meters = self._key_stats(config, setup)
        is_pv = config.category == CATEGORY_PV

        sums, values = self._category_sources(config, setup, state, meters, end)
        changes = _without_resets(
            self.hass, setup, await async_hourly_changes(self.hass, sums, start, end)
        )
        entity_values = await async_hourly_values(self.hass, values, start, end)
        ranges = await async_hourly_ranges(
            self.hass, _price_entities(setup), start, end
        )
        prices = self._grid_prices(
            setup,
            hours,
            changes,
            entity_values,
            ranges=ranges,
            last_prices=state.last_prices,
        )

        def change(stat: str, hour: float) -> float:
            return changes.get(stat, {}).get(hour, 0.0)

        history: list[tuple[float, float]] = []
        figures: dict[str, list[tuple[float, float]]] = {"saving": history}

        def add(figure: str, hour: float, amount: float) -> None:
            if amount:
                total = state.totals[figure] = state.totals.get(figure, 0.0) + amount
                figures.setdefault(figure, []).append((hour, total))

        if is_pv:
            self._add_pv_hours(
                setup=setup,
                state=state,
                hours=hours,
                changes=changes,
                entity_values=entity_values,
                prices=prices,
                history=history,
            )
            return figures

        def value(key: str, hour: float) -> float | None:
            return value_at(config, state, key, hour)

        # The household is computed first. Costs can be negative, so no floor here.
        cost_ids = {
            meter: household_statistic_id(f"{device_area(meter)}_cost")
            for meter in meters
        }
        costs = await async_hourly_changes(
            self.hass, set(cost_ids.values()), start, end
        )

        for index, hour in enumerate(hours):
            electricity = sum(change(meter, hour) for meter in meters)

            device_costs = {
                meter: costs.get(statistic, {}).get(hour, 0.0)
                for meter, statistic in cost_ids.items()
            }
            tariff = value(VALUE_TARIFF, hour)
            electricity_price = (
                tariff if tariff is not None else prices.paid[index] or 0.0
            )
            fuel_price = self._fuel_price(config, state, entity_values, hour)
            saving = 0.0
            if config.category == CATEGORY_HEAT_PUMP:
                heat = self._heat(config, state, changes, electricity, hour)
                saving = heat_pump_saving(
                    electricity=electricity,
                    heat=heat,
                    heating=config.heating,
                    fuel_price=fuel_price,
                    electricity_price=electricity_price,
                )
                alternative = heating_cost(heat, config.heating, fuel_price)
                add("heat", hour, heat)
                add("alternative_cost", hour, alternative)
                add(
                    "solar_saving",
                    hour,
                    alternative - sum(device_costs.values()) - saving,
                )
                if len(config.heat_meters) == len(meters) > 1 and all(
                    hour in changes.get(m, {}) for m in config.heat_meters
                ):
                    for figure, amount in _heat_meter_figures(
                        config,
                        meters,
                        changes,
                        hour,
                        fuel_price=fuel_price,
                        electricity_price=electricity_price,
                        device_costs=device_costs,
                    ):
                        add(figure, hour, amount)
            elif (ev := value(VALUE_EV_CONSUMPTION, hour)) and (
                combustion := value(VALUE_COMBUSTION_CONSUMPTION, hour)
            ) is not None:
                saving = wallbox_saving(
                    electricity=electricity,
                    ev_consumption=ev,
                    combustion_consumption=combustion,
                    fuel_price=fuel_price,
                    electricity_price=electricity_price,
                )
                distance = wallbox_distance(electricity, ev)
                alternative = fuel_cost(distance, combustion, fuel_price)
                add("distance", hour, distance)
                add("alternative_cost", hour, alternative)
                add(
                    "solar_saving",
                    hour,
                    alternative - sum(device_costs.values()) - saving,
                )
            if saving:
                state.saving += saving
                history.append((hour, state.saving))
        return figures

    def _add_pv_hours(
        self,
        *,
        setup: EnergySetup,
        state: CategoryState,
        hours: list[float],
        changes: dict[str, dict[float, float]],
        entity_values: dict[str, dict[float, float]],
        prices: GridPrices,
        history: list[tuple[float, float]],
    ) -> None:
        """Add what the PV plant saved in each hour to state and history."""

        def change(stat: str, hour: float) -> float:
            return changes.get(stat, {}).get(hour, 0.0)

        export_prices = {
            source.export_stat: _export_prices(
                self.hass, source, hours, changes, entity_values
            )
            for source in setup.grids
            if source.export_stat is not None
        }
        for index, hour in enumerate(hours):
            if saving := pv_saving(
                solar=sum(change(stat, hour) for stat in setup.solar),
                export=sum(change(stat, hour) for stat in export_prices),
                battery_out=sum(
                    change(b.discharge_stat, hour) for b in setup.batteries
                ),
                battery_in=sum(change(b.charge_stat, hour) for b in setup.batteries),
                price=prices.mean[index] or 0.0,
                export_revenue=sum(
                    change(stat, hour) * (rates[index] or 0.0)
                    for stat, rates in export_prices.items()
                ),
            ):
                state.saving += saving
                history.append((hour, state.saving))

    def _fuel_price(
        self,
        config: CategoryConfig,
        state: CategoryState,
        entity_values: dict[str, dict[float, float]],
        hour: float,
    ) -> float:
        """Return the gas, oil, or fuel price of an hour.

        After the setup a price sensor takes precedence. While it has no value,
        its last value counts.
        """
        if hour >= config.setup_at and (entity := _price_entity_at(state, hour)):
            price = entity_values.get(entity, {}).get(hour)
            if price is not None:
                state.last_prices[entity] = price
                return price
            if (last := state.last_prices.get(entity)) is not None:
                return last
        return value_at(config, state, VALUE_PRICE, hour) or 0.0

    @staticmethod
    def _heat(
        config: CategoryConfig,
        state: CategoryState,
        changes: dict[str, dict[float, float]],
        electricity: float,
        hour: float,
    ) -> float:
        """Return the heat of an hour, measured if possible, else estimated.

        An hour counts as measured when every heat meter has data for it.
        Before the first measured hour the seasonal COP entered for that time
        estimates the heat; later gaps use the COP measured until then.
        """
        heat_meters = config.heat_meters
        if heat_meters and all(hour in changes.get(meter, {}) for meter in heat_meters):
            heat = sum(changes[meter][hour] for meter in heat_meters)
            if state.heat_start is None:
                state.heat_start = hour
            state.measured_heat += heat
            state.measured_electricity += electricity
            return heat
        scop = None
        if state.heat_start is None:
            scop = value_at(config, state, VALUE_SCOP, hour)
        if scop is None and state.measured_electricity > 0:
            scop = state.measured_heat / state.measured_electricity
        if scop is None:
            scop = value_at(config, state, VALUE_SCOP, hour) or 0.0
        if electricity:
            state.estimated = True
        return electricity * scop

    def _grid_prices(
        self,
        setup: EnergySetup,
        hours: list[float],
        changes: dict[str, dict[float, float]],
        entity_values: dict[str, dict[float, float]],
        *,
        ranges: dict[str, dict[float, tuple[float, float]]],
        last_prices: dict[str, float],
    ) -> GridPrices:
        """Return the electricity prices of each hour over all grid connections.

        last_prices holds the last price per grid import meter, to bridge gaps.
        """
        means: list[list[float | None]] = []
        paids: list[list[float | None]] = []
        energies: list[dict[float, float]] = []
        grid_ranges: list[dict[float, tuple[float, float]]] = []
        for grid in setup.priced_grids:
            assert grid.import_stat is not None
            costs = changes.get(_cost_stat(self.hass, grid) or "", {})
            energy = changes.get(grid.import_stat, {})
            grid_range = ranges.get(grid.price_entity or "", {})
            prices = electricity_prices(
                hours,
                entity_prices=entity_values.get(grid.price_entity or "", {}),
                costs=costs,
                energy=energy,
                fixed=grid.price,
                last_known=last_prices.get(grid.import_stat),
            )
            if prices and prices[-1] is not None:
                last_prices[grid.import_stat] = prices[-1]
            means.append(prices)
            paids.append(
                paid_prices(
                    hours,
                    prices=prices,
                    costs=costs,
                    energy=energy,
                    ranges=grid_range,
                )
            )
            energies.append(energy)
            grid_ranges.append(grid_range)

        def over_grids(per_grid: list[list[float | None]]) -> list[float | None]:
            return [
                average_price(
                    [prices[index] for prices in per_grid],
                    [energy.get(hour, 0.0) for energy in energies],
                )
                for index, hour in enumerate(hours)
            ]

        mean = over_grids(means)
        paid = over_grids(paids)
        low: list[float | None] = []
        high: list[float | None] = []
        for index, hour in enumerate(hours):
            known = [item[hour] for item in grid_ranges if hour in item]
            bounds = [
                price for price in (mean[index], paid[index]) if price is not None
            ]
            low.append(min([*bounds, *(item[0] for item in known)], default=None))
            high.append(max([*bounds, *(item[1] for item in known)], default=None))
        return GridPrices(mean=mean, paid=paid, low=low, high=high)

    def _household_fingerprint(self, setup: EnergySetup) -> str:
        """Identify what changes the household's computed past.

        The energy dashboard's meters, the price levels, recomputing, and the
        own tariffs before the setup of heat pump and car, which price their
        devices. The standing charge applies from now on, like current values.
        """
        return settings_hash(
            {
                "grids": sorted(
                    [grid.import_stat or "", grid.export_stat or ""]
                    for grid in setup.grids
                ),
                "solar": sorted(setup.solar),
                "batteries": sorted(
                    [battery.discharge_stat, battery.charge_stat]
                    for battery in setup.batteries
                ),
                "devices": sorted(
                    [device.stat, device.included_in or ""] for device in setup.devices
                ),
                "levels": list(self.household.levels),
                "recompute": self.household.recompute,
                "calculation": CALCULATION_VERSION,
                "tariffs": sorted(
                    [sorted(config.meters), tariff]
                    for config in self.configs.values()
                    if config.category != CATEGORY_PV
                    and (tariff := config.before.get(VALUE_TARIFF)) is not None
                ),
            }
        )

    def _tariff_owners(self, setup: EnergySetup) -> dict[str, str]:
        """Return the category whose own tariff prices each device.

        A device measured by heat pump or car, or contained in one of their
        meters, belongs to that category.
        """
        owned = {
            meter: subentry_id
            for subentry_id, config in self.configs.items()
            if config.category != CATEGORY_PV
            for meter in config.meters
        }
        parents = {device.stat: device.included_in for device in setup.devices}
        owners: dict[str, str] = {}
        for stat in parents:
            node: str | None = stat
            seen: set[str] = set()
            while node is not None and node not in seen:
                if node in owned:
                    owners[stat] = owned[node]
                    break
                seen.add(node)
                node = parents.get(node)
        return owners

    async def _async_advance_household(self, setup: EnergySetup, end: float) -> None:
        """Compute the household up to end, writing its statistics chunk by chunk."""
        state = self.household_state
        if state.fingerprint != (fingerprint := self._household_fingerprint(setup)):
            state.reset(fingerprint)
        if state.data_start is None:
            imports = [grid.import_stat for grid in setup.grids if grid.import_stat]
            state.data_start = await async_first_hour(self.hass, imports)
            if state.data_start is None:
                return
        counting_since = _ceil_hour(state.data_start)
        computing_past = state.next_hour is None
        start = state.next_hour if state.next_hour is not None else counting_since
        # As for a category: the state changes only once the hours are written.
        progress = deepcopy(state)
        history: dict[str, list[tuple[float, float]]] = {}
        while start < end:
            chunk_end = min(start + CHUNK, end)
            rows = await self._async_compute_household(
                setup, progress, start, chunk_end
            )
            for key, series in rows.items():
                history.setdefault(key, []).extend(series)
            start = chunk_end
        if computing_past:
            # Computing the past replaces what an earlier computation wrote,
            # including devices no longer in the energy dashboard.
            async_remove_statistics(
                self.hass,
                [
                    statistic_id
                    for statistic_id in await async_statistic_ids(self.hass)
                    if statistic_category(statistic_id) is None
                ],
            )
        names = await self._async_household_names(setup)
        currency = self.hass.config.currency
        for key, series in history.items():
            async_write_statistics(
                self.hass,
                household_statistic_id(key),
                names.get(key, key),
                currency
                if key.endswith("_cost")
                or key in (GRID_FEED_IN, GRID_CHEAP_SAVING, GRID_STANDING_CHARGE)
                else "kWh",
                series,
                replace=False,
            )
        await async_wait_recorder(self.hass)
        progress.next_hour = max(start, counting_since)
        self.household_state = progress

    async def async_texts(self) -> Callable[[str], str]:
        """Return the names of areas and figures in the system language."""
        translations = await async_get_translations(
            self.hass, self.hass.config.language, "selector", [DOMAIN]
        )

        def text(key: str) -> str:
            return translations.get(
                f"component.{DOMAIN}.selector.statistics.options.{key}", key
            )

        return text

    def device_name(self, device: DeviceMeter) -> str:
        """Return a device's name: as in the energy dashboard, else its entity's."""
        entity = self.hass.states.get(device.stat)
        return device.name or (entity.name if entity else device.stat)

    async def _async_household_names(self, setup: EnergySetup) -> dict[str, str]:
        """Return the name of each household statistic in the system language."""
        text = await self.async_texts()
        areas = {AREA_HOUSEHOLD: text(AREA_HOUSEHOLD), AREA_OTHER: text(AREA_OTHER)}
        for device in setup.devices:
            areas[device_area(device.stat)] = self.device_name(device)
        names = {
            key: text(key)
            for key in (
                GRID_COST,
                GRID_IMPORT_COST,
                GRID_FEED_IN,
                GRID_STANDING_CHARGE,
                GRID_CHEAP_SAVING,
            )
        }
        for area, area_name in areas.items():
            for figure in (
                "energy",
                "solar",
                "cost",
                "solar_cost",
                LEVEL_CHEAP,
                f"{LEVEL_CHEAP}_cost",
                LEVEL_EXPENSIVE,
                f"{LEVEL_EXPENSIVE}_cost",
            ):
                names[f"{area}_{figure}"] = f"{area_name} {text(figure)}"
        return names

    async def _async_compute_household(
        self, setup: EnergySetup, state: HouseholdState, start: float, end: float
    ) -> dict[str, list[tuple[float, float]]]:
        """Add the household figures of the hours from start to end to state.

        Return per figure the cumulative value at the end of each hour in which
        it changed. Hours without change are left out; the recorder carries the
        sum over them.
        """
        hours = _hours(start, end)
        imports = [grid.import_stat for grid in setup.grids if grid.import_stat]
        parents = {device.stat: device.included_in for device in setup.devices}
        sums: set[str] = set(setup.solar) | set(parents)
        values: set[str] = set()
        for battery in setup.batteries:
            sums |= {battery.discharge_stat, battery.charge_stat}
        for grid in setup.grids:
            sums |= _grid_sums(self.hass, grid)
            values |= {
                entity
                for entity in (grid.price_entity, grid.export_price_entity)
                if entity is not None
            }
        changes = _without_resets(
            self.hass, setup, await async_hourly_changes(self.hass, sums, start, end)
        )
        entity_values = await async_hourly_values(self.hass, values, start, end)
        ranges = await async_hourly_ranges(
            self.hass, _price_entities(setup), start, end
        )
        prices = self._grid_prices(
            setup,
            hours,
            changes,
            entity_values,
            ranges=ranges,
            last_prices=state.last_prices,
        )
        export_prices = {
            grid.export_stat: _export_prices(
                self.hass, grid, hours, changes, entity_values
            )
            for grid in setup.grids
            if grid.export_stat is not None
        }
        top_level = [device_area(stat) for stat in effective_meters(parents, parents)]
        owners = self._tariff_owners(setup)

        def change(stat: str, hour: float) -> float:
            return changes.get(stat, {}).get(hour, 0.0)

        rows: dict[str, list[tuple[float, float]]] = {}
        for index, hour in enumerate(hours):
            exported = {stat: change(stat, hour) for stat in export_prices}
            tariffs: dict[str, float] = {}
            for stat, subentry_id in owners.items():
                tariff = value_at(
                    self.configs[subentry_id],
                    self.states[subentry_id],
                    VALUE_TARIFF,
                    hour,
                )
                if tariff is not None:
                    tariffs[device_area(stat)] = tariff
            price = prices.paid[index] or 0.0
            state.recent_prices = [
                row for row in state.recent_prices if row[0] > hour - DAY
            ]
            state.recent_prices.append(
                [hour, prices.low[index] or price, prices.high[index] or price]
            )
            cheap_until, expensive_from = self.household.levels
            figures = household_hour(
                grid_import=sum(change(stat, hour) for stat in imports),
                export=sum(exported.values()),
                solar=sum(change(stat, hour) for stat in setup.solar),
                battery_out=sum(
                    change(b.discharge_stat, hour) for b in setup.batteries
                ),
                battery_in=sum(change(b.charge_stat, hour) for b in setup.batteries),
                devices={device_area(stat): change(stat, hour) for stat in parents},
                top_level=top_level,
                price=price,
                feed_in=average_price(
                    [rates[index] for rates in export_prices.values()],
                    list(exported.values()),
                )
                or 0.0,
                export_revenue=sum(
                    exported[stat] * (rates[index] or 0.0)
                    for stat, rates in export_prices.items()
                ),
                standing_charge=_standing_charge(state, hour),
                tariffs=tariffs,
                level=price_level(
                    price,
                    cheap_until,
                    expensive_from,
                    min(row[1] for row in state.recent_prices),
                    max(row[2] for row in state.recent_prices),
                ),
                normal=normal_price(
                    (row[2] for row in state.recent_prices), cheap_until
                ),
                debts=state.debts,
            )
            for key, value in figures.items():
                if value:
                    total = state.totals[key] = state.totals.get(key, 0.0) + value
                    rows.setdefault(key, []).append((hour, total))
        return rows

    async def _async_write_history(
        self,
        subentry_id: str,
        config: CategoryConfig,
        history: dict[str, list[tuple[float, float]]],
        *,
        replace: bool,
    ) -> None:
        """Write the computed hours to the category's statistics."""
        registry = er.async_get(self.hass)
        entity_id = registry.async_get_entity_id(
            Platform.SENSOR, DOMAIN, f"{subentry_id}_saving"
        )
        sensor = self.hass.states.get(entity_id) if entity_id else None
        title = self.config_entry.subentries[subentry_id].title
        text = await self.async_texts()
        units = {"heat": "kWh", "distance": "km"}
        for figure in {"saving", *CATEGORY_FIGURES.get(config.category, ())}:
            async_write_statistics(
                self.hass,
                category_statistic_id(config.category, figure),
                (sensor.name if sensor else title)
                if figure == "saving"
                else f"{title} {text(figure)}",
                units.get(figure, self.hass.config.currency),
                history.get(figure, []),
                replace=replace,
            )
        if (
            config.category == CATEGORY_HEAT_PUMP
            and self.setup is not None
            and len(config.heat_meters)
            == len(meters := self._key_stats(config, self.setup))
            > 1
        ):
            for meter in meters:
                dev = self.setup.device(meter)
                dev_name = self.device_name(dev) if dev else meter
                for name in ("saving", "alternative_cost", "solar_saving"):
                    figure = f"{device_area(meter)}_{name}"
                    async_write_statistics(
                        self.hass,
                        category_statistic_id(config.category, figure),
                        f"{dev_name} {text(name)}",
                        self.hass.config.currency,
                        history.get(figure, []),
                        replace=replace,
                    )

    def current_price(
        self, config: CategoryConfig, state: CategoryState
    ) -> float | None:
        """Return the gas, oil, or fuel price in effect now."""
        now = time()
        price = _number(self.hass, _price_entity_at(state, now))
        if price is None:
            price = value_at(config, state, VALUE_PRICE, now)
        return price

    def _results(self) -> PaybackData:
        results: dict[str, CategoryResult] = {}
        for subentry_id, config in self.configs.items():
            state = self.states[subentry_id]
            is_heat_pump = config.category == CATEGORY_HEAT_PUMP
            base: dict[str, Any] = {
                "category": config.category,
                "investment": config.investment,
                "price": None
                if config.category == CATEGORY_PV
                else self.current_price(config, state),
                "heating": config.heating if is_heat_pump else None,
            }
            if state.data_start is None or state.next_hour is None:
                results[subentry_id] = CategoryResult(
                    calculating=subentry_id not in self._without_data, **base
                )
                continue
            counting_since = _ceil_hour(state.data_start)
            summary = summarize(
                saving=state.saving,
                counting_since=counting_since,
                until=state.next_hour,
                investment=config.investment,
            )
            results[subentry_id] = CategoryResult(
                calculating=False,
                saving=state.saving,
                payback=summary.payback,
                per_year=summary.per_year,
                years_left=summary.years_left,
                annual_return=summary.annual_return,
                counting_since=dt_util.utc_from_timestamp(counting_since),
                yearly_from=dt_util.utc_from_timestamp(summary.yearly_from),
                heat_estimated=state.estimated if is_heat_pump else None,
                **base,
            )
        return PaybackData(results)


def _price_entities(setup: EnergySetup) -> set[str]:
    """Return the price sensors of the grid imports."""
    return {grid.price_entity for grid in setup.grids if grid.price_entity is not None}


def _without_resets(
    hass: HomeAssistant, setup: EnergySetup, changes: dict[str, dict[float, float]]
) -> dict[str, dict[float, float]]:
    """Return the changes with meters that ran back at zero.

    A meter running back was reset or corrected: no energy flowed back. Costs and
    compensation keep their sign, as a negative price really pays.
    """
    money = {
        stat
        for grid in setup.grids
        for stat in (_cost_stat(hass, grid), _compensation_stat(hass, grid))
    }
    return {
        stat: values
        if stat in money
        else {hour: max(value, 0.0) for hour, value in values.items()}
        for stat, values in changes.items()
    }


def _cost_stat(hass: HomeAssistant, grid: GridSource) -> str | None:
    if grid.cost_stat is not None or grid.import_stat is None:
        return grid.cost_stat
    if grid.price is None and grid.price_entity is None:
        return None
    return cost_stat(hass, grid.import_stat, compensation=False)


def _compensation_stat(hass: HomeAssistant, grid: GridSource) -> str | None:
    if grid.compensation_stat is not None or grid.export_stat is None:
        return grid.compensation_stat
    if grid.export_price is None and grid.export_price_entity is None:
        return None
    return cost_stat(hass, grid.export_stat, compensation=True)


def _grid_sums(hass: HomeAssistant, grid: GridSource) -> set[str]:
    """Return the sum statistics a grid's prices and flows need."""
    stats = (
        grid.import_stat,
        grid.export_stat,
        _cost_stat(hass, grid),
        _compensation_stat(hass, grid),
    )
    return {stat for stat in stats if stat is not None}


def _export_prices(
    hass: HomeAssistant,
    grid: GridSource,
    hours: list[float],
    changes: dict[str, dict[float, float]],
    entity_values: dict[str, dict[float, float]],
) -> list[float | None]:
    """Return the feed-in compensation per kWh for each hour."""
    assert grid.export_stat is not None
    compensation = _compensation_stat(hass, grid)
    return electricity_prices(
        hours,
        entity_prices=entity_values.get(grid.export_price_entity or "", {}),
        costs=changes.get(compensation or "", {}),
        energy=changes.get(grid.export_stat, {}),
        fixed=grid.export_price,
        last_known=None,
    )
