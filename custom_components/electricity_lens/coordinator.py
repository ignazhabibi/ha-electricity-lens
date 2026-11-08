"""Coordinator that computes the savings hour by hour from the recorder."""

from __future__ import annotations

import logging
import math
from collections.abc import Callable, Collection, Iterator
from copy import deepcopy
from datetime import date, timedelta
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
    GRID_CHEAP_HOURS,
    GRID_CHEAP_SAVING,
    GRID_COST,
    GRID_EXPENSIVE_HOURS,
    GRID_FEED_IN,
    GRID_HOURS,
    GRID_IMPORT_COST,
    GRID_STANDING_CHARGE,
    HOUR,
    LEVEL_CHEAP,
    LEVEL_EXPENSIVE,
    NORMAL_SPAN,
    GridPrices,
    average_price,
    battery_saving,
    combine_grid_prices,
    effective_meters,
    electricity_prices,
    estimated_heat,
    fuel_cost,
    fuel_price,
    heat_pump_saving,
    heating_cost,
    household_hour,
    normal_price,
    paid_prices,
    price_level,
    pv_saving,
    solar_saving,
    standing_charge_share,
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
    BatteryResult,
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
    async_best_day,
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
# The past is computed in chunks to keep each recorder query and write small.
# Each written chunk is kept, so that a restart continues from there.
CHUNK = 30 * 24 * HOUR
STORAGE_VERSION = 1
# Raised when a rule changes what the computed past looks like, so that it is
# computed again. The categories build on the household, so a new household
# rule computes everything again; a new category rule only the categories,
# which saves writing the household's many statistics. Up to version 4 both
# were one: 2 brought prices paid, price levels that need a contrast,
# consumers that add up to the household, and meters that run back; 3 no hour
# counted twice after a failed update; 4 the standing charge and the saving by
# solar power per category; 5 price levels against the normal price instead of
# thresholds, and the hours of each level. Categories: 5 the battery's part of
# the PV plant's saving.
HOUSEHOLD_CALCULATION_VERSION = 5
CATEGORY_CALCULATION_VERSION = 5

type ElectricityLensConfigEntry = ConfigEntry[ElectricityLensCoordinator]


def _hours(start: float, end: float) -> list[float]:
    return [start + index * HOUR for index in range(int((end - start) // HOUR))]


def _ceil_hour(timestamp: float) -> float:
    return math.ceil(timestamp / HOUR) * HOUR


def next_full_hour() -> float:
    """Return the start of the next full hour, from when new values apply."""
    return _ceil_hour(time() + 1)


# The figures each category keeps besides its saving.
CATEGORY_FIGURES: dict[str, tuple[str, ...]] = {
    CATEGORY_PV: ("battery_saving",),
    CATEGORY_HEAT_PUMP: ("heat", "alternative_cost", "solar_saving"),
    CATEGORY_WALLBOX: ("distance", "alternative_cost", "solar_saving"),
}
# Of them, those without a comparison: the heat. A car's distance only serves
# the comparison with a combustion car.
UNCOMPARED_FIGURES: dict[str, tuple[str, ...]] = {
    CATEGORY_HEAT_PUMP: ("heat",),
    CATEGORY_WALLBOX: (),
}


# The figures the household keeps for each area: energy, solar power, costs,
# solar costs, and the cheap and expensive grid power with their costs.
HOUSEHOLD_AREA_FIGURES = 8


def _done(state: CategoryState | HouseholdState) -> float:
    """Return the share of the past that is computed."""
    if not state.computing_past:
        return 1.0
    if state.next_hour is None or state.past_until is None or state.data_start is None:
        return 0.0
    start = _ceil_hour(state.data_start)
    if (span := state.past_until - start) <= 0:
        return 1.0
    return min(max((state.next_hour - start) / span, 0.0), 1.0)


def _standing_charge(state: HouseholdState, hour: float) -> float:
    """Return the standing charge of an hour: its month's share."""
    monthly = state.standing_charge.value_at(hour)
    if not isinstance(monthly, int | float):
        return 0.0
    return standing_charge_share(monthly, hour, dt_util.get_default_time_zone())


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
            solar_saving(
                alternative_cost=alternative, cost=device_costs[meter], saving=saving
            ),
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
        """The solar forecast in kWh for the rest of today and for tomorrow."""
        self.forecast_sensors = False
        """Whether the forecast sensors exist; they follow the energy dashboard."""
        self.best_solar_day: float | None = None
        """The most solar energy of a day in the last twelve months, in kWh."""
        self.best_solar_day_full_year = False
        """Whether the solar data covers all of the last twelve months."""
        self._best_solar_day_on: date | None = None

    async def async_load(self) -> None:
        """Restore progress and record changed current values."""
        stored = await self._store.async_load() or {}
        stored_categories: dict[str, Any] = stored.get("categories", {})
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
            fingerprint = f"{config.fingerprint}:{CATEGORY_CALCULATION_VERSION}"
            if self.household.recompute is not None:
                fingerprint += f":{self.household.recompute}"
            if state.fingerprint != fingerprint:
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
        async_remove_statistics(self.hass, stale)
        await self._async_save()
        self.data = self._results()

    async def _async_save(self) -> None:
        await self._store.async_save(
            {
                "household": self.household_state.as_dict(),
                "categories": {
                    subentry_id: state.as_dict()
                    for subentry_id, state in self.states.items()
                },
            }
        )

    async def _async_update_best_solar_day(self, solar: tuple[str, ...]) -> None:
        """Find the best solar day of the last twelve months, once a day.

        It is the scale of the forecast: what counts as a good day depends on
        the plant, from a balcony plant to a large roof.
        """
        today = dt_util.now().date()
        if self._best_solar_day_on == today:
            return
        year_ago = (dt_util.start_of_local_day() - timedelta(days=365)).timestamp()
        self.best_solar_day = await async_best_day(self.hass, solar, year_ago)
        first = await async_first_hour(self.hass, solar)
        self.best_solar_day_full_year = first is not None and first <= year_ago
        self._best_solar_day_on = today

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
        if setup.forecasts:
            await self._async_update_best_solar_day(setup.solar)

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
        started = time()
        if (computing := self.progress()) is not None:
            _LOGGER.debug("Computing the past, %s %% done", computing)
        # The household comes first: the categories read its devices' costs
        # from its statistics.
        await self._async_advance_household(setup, end)
        for subentry_id, config in self.configs.items():
            await self._async_advance(subentry_id, config, setup, end)
        if computing is not None and self.progress() is None:
            _LOGGER.debug("Computed the past in %.0f s", time() - started)
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

        household = self.household_state.fingerprint
        if state.household is None:
            state.household = household
        elif state.household != household:
            # The category builds on the household's figures, such as what the
            # solar power of its devices cost: computed again, it is too.
            state.reset(state.fingerprint)
            state.household = household
        if state.data_start is None:
            state.data_start = await async_first_hour(
                self.hass, self._key_stats(config, setup)
            )
            if state.data_start is None:
                self._without_data.add(subentry_id)
                return
        self._without_data.discard(subentry_id)

        counting_since = _ceil_hour(state.data_start)
        # Computing the past replaces what an earlier computation wrote.
        replace = state.next_hour is None
        if replace:
            state.past_until = end
        start = state.next_hour if state.next_hour is not None else counting_since
        while start < end:
            chunk_end = min(start + CHUNK, end)
            # A failure halfway must not count its hours again in the next
            # update, so the state changes only once they are written. Each
            # written chunk is kept, so that a restart continues from there.
            progress = deepcopy(state)
            rows = await self._async_compute(config, setup, progress, start, chunk_end)
            await self._async_write_history(subentry_id, config, rows, replace=replace)
            await async_wait_recorder(self.hass)
            progress.next_hour = chunk_end
            self.states[subentry_id] = state = progress
            await self._async_save()
            self.async_update_listeners()
            replace = False
            start = chunk_end
        if state.next_hour is None:
            # Nothing to compute yet: clear what an earlier computation wrote.
            await self._async_write_history(subentry_id, config, {}, replace=replace)
            state.next_hour = max(start, counting_since)

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
                add=add,
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
                add("heat", hour, heat)
                if not config.is_compared:
                    continue
                saving = heat_pump_saving(
                    electricity=electricity,
                    heat=heat,
                    heating=config.heating,
                    fuel_price=fuel_price,
                    electricity_price=electricity_price,
                )
                alternative = heating_cost(heat, config.heating, fuel_price)
                add("alternative_cost", hour, alternative)
                add(
                    "solar_saving",
                    hour,
                    solar_saving(
                        alternative_cost=alternative,
                        cost=sum(device_costs.values()),
                        saving=saving,
                    ),
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
                    solar_saving(
                        alternative_cost=alternative,
                        cost=sum(device_costs.values()),
                        saving=saving,
                    ),
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
        add: Callable[[str, float, float], None],
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
            solar = sum(change(stat, hour) for stat in setup.solar)
            export = sum(change(stat, hour) for stat in export_prices)
            battery_out = sum(change(b.discharge_stat, hour) for b in setup.batteries)
            battery_in = sum(change(b.charge_stat, hour) for b in setup.batteries)
            price = prices.mean[index] or 0.0
            if saving := pv_saving(
                solar=solar,
                export=export,
                battery_out=battery_out,
                battery_in=battery_in,
                price=price,
                export_revenue=sum(
                    change(stat, hour) * (rates[index] or 0.0)
                    for stat, rates in export_prices.items()
                ),
            ):
                state.saving += saving
                history.append((hour, state.saving))
            if battery_in or battery_out:
                if state.battery_start is None:
                    state.battery_start = hour
                add(
                    "battery_saving",
                    hour,
                    battery_saving(
                        solar=solar,
                        export=export,
                        battery_out=battery_out,
                        battery_in=battery_in,
                        price=price,
                        feed_in_price=_feed_in_price(export_prices, index),
                    ),
                )

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
        sensor = last = None
        if hour >= config.setup_at and (entity := _price_entity_at(state, hour)):
            if (sensor := entity_values.get(entity, {}).get(hour)) is not None:
                state.last_prices[entity] = sensor
            last = state.last_prices.get(entity)
        return fuel_price(
            sensor=sensor,
            last_sensor=last,
            entered=value_at(config, state, VALUE_PRICE, hour),
        )

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
        if electricity:
            state.estimated = True
        return estimated_heat(
            electricity,
            entered_scop=value_at(config, state, VALUE_SCOP, hour),
            measured_heat=state.measured_heat,
            measured_electricity=state.measured_electricity,
            measuring=state.heat_start is not None,
        )

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
        return combine_grid_prices(
            hours, means=means, paids=paids, energies=energies, ranges=grid_ranges
        )

    def _household_fingerprint(self, setup: EnergySetup) -> str:
        """Identify what changes the household's computed past.

        The energy dashboard's meters, recomputing, and the
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
                "recompute": self.household.recompute,
                "calculation": HOUSEHOLD_CALCULATION_VERSION,
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
        if state.next_hour is None:
            state.past_until = end
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
        start = state.next_hour if state.next_hour is not None else counting_since
        names = await self._async_household_names(setup)
        currency = self.hass.config.currency
        while start < end:
            chunk_end = min(start + CHUNK, end)
            # As for a category: the state changes only once the hours are
            # written, and each written chunk is kept.
            progress = deepcopy(state)
            rows = await self._async_compute_household(
                setup, progress, start, chunk_end
            )
            for key, series in rows.items():
                async_write_statistics(
                    self.hass,
                    household_statistic_id(key),
                    names.get(key, key),
                    currency
                    if key.endswith("_cost")
                    or key in (GRID_FEED_IN, GRID_CHEAP_SAVING, GRID_STANDING_CHARGE)
                    else "h"
                    if key in (GRID_HOURS, GRID_CHEAP_HOURS, GRID_EXPENSIVE_HOURS)
                    else "kWh",
                    series,
                    replace=False,
                )
            await async_wait_recorder(self.hass)
            progress.next_hour = chunk_end
            self.household_state = state = progress
            await self._async_save()
            self.async_update_listeners()
            start = chunk_end
        if state.next_hour is None:
            state.next_hour = max(start, counting_since)

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
                GRID_HOURS,
                GRID_CHEAP_HOURS,
                GRID_EXPENSIVE_HOURS,
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
            paid = prices.paid[index]
            price = paid or 0.0
            mean = prices.mean[index]
            state.recent_prices = [
                row for row in state.recent_prices if row[0] > hour - NORMAL_SPAN
            ]
            if mean is not None:
                state.recent_prices.append([hour, mean])
            normal = normal_price(row[1] for row in state.recent_prices)
            level = price_level(paid, normal) if paid is not None else None
            hour_level = price_level(mean, normal) if mean is not None else None
            for seen in (level, hour_level):
                if seen is not None:
                    state.levels[seen] = hour
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
                level=level,
                hour_level=hour_level,
                normal=normal,
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

    def progress(self) -> int | None:
        """Return how far the past is computed, in percent; None once it is.

        Writing the statistics takes most of the time, so each part counts with
        the number of statistics it writes: the household with the figures of
        each of its areas, each category with its own.
        """
        parts: list[tuple[float, float]] = []
        household = self.household_state
        if household.data_start is not None:
            areas = len(self.setup.devices) + 2 if self.setup else 2
            parts.append((HOUSEHOLD_AREA_FIGURES * areas, _done(household)))
        for subentry_id, config in self.configs.items():
            if subentry_id in self._without_data:
                continue
            # A car compared with nothing writes no statistics of its own.
            if figures := len(self._written_figures(config)):
                parts.append((figures, _done(self.states[subentry_id])))
        if all(done >= 1 for _, done in parts):
            return None
        total = sum(weight for weight, _ in parts)
        return int(sum(weight * done for weight, done in parts) / total * 100)

    def _written_figures(self, config: CategoryConfig) -> tuple[str, ...]:
        """Return the statistics a category writes: its saving and figures."""
        if config.category == CATEGORY_PV:
            has_battery = self.setup is not None and bool(self.setup.batteries)
            return ("saving", "battery_saving") if has_battery else ("saving",)
        if not config.is_compared:
            return UNCOMPARED_FIGURES[config.category]
        return ("saving", *CATEGORY_FIGURES[config.category])

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
                "investment": config.total_investment,
                "price": None
                if config.category == CATEGORY_PV
                else self.current_price(config, state),
                "heating": config.heating if is_heat_pump else None,
                "compared": config.is_compared,
            }
            if (
                state.data_start is None
                or state.next_hour is None
                or state.computing_past
            ):
                results[subentry_id] = CategoryResult(
                    calculating=subentry_id not in self._without_data, **base
                )
                continue
            counting_since = _ceil_hour(state.data_start)
            summary = summarize(
                saving=state.saving,
                counting_since=counting_since,
                until=state.next_hour,
                investment=config.total_investment,
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
                battery=_battery_result(config, state),
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


def _battery_result(
    config: CategoryConfig, state: CategoryState
) -> BatteryResult | None:
    """Return the battery's part of the PV plant, counted from its first hour."""
    if (
        config.category != CATEGORY_PV
        or state.battery_start is None
        or state.next_hour is None
    ):
        return None
    saving = state.totals.get("battery_saving", 0.0)
    summary = summarize(
        saving=saving,
        counting_since=state.battery_start,
        until=state.next_hour,
        investment=config.battery_investment,
    )
    return BatteryResult(
        saving=saving,
        investment=config.battery_investment,
        per_year=summary.per_year,
        payback=summary.payback,
        years_left=summary.years_left,
        counting_since=dt_util.utc_from_timestamp(state.battery_start),
    )


def _feed_in_price(export_prices: dict[str, list[float | None]], index: int) -> float:
    """Return the feed-in compensation per kWh of an hour, also without feed-in.

    The battery's solar power would have been fed in even in an hour in which
    nothing was. With several feed-in meters, the mean of their prices counts.
    """
    rates = [
        value for rates in export_prices.values() if (value := rates[index]) is not None
    ]
    return sum(rates) / len(rates) if rates else 0.0


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
