"""How savings and payback are calculated.

Pure functions without Home Assistant, so the rules can be read and tested on
their own. Energy is in kWh, money in the user's currency.
"""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass, field
from datetime import datetime, timedelta, tzinfo
from math import log1p

from .const import FUELS

HOUR = 3600.0
DAY = 24 * HOUR
YEAR = 365.25 * DAY
# Below this an hour's import is too small to derive a price from its costs.
MIN_PRICED_ENERGY = 0.01
# Prices closer than half a cent are one price: the sensor's rounding noise
# does not make an implausible cost.
SAME_PRICE = 0.005

type TimelineValue = float | str | None


@dataclass(slots=True)
class Timeline:
    """A value the user set, each one valid from a point in time.

    A new value applies from the next full hour; what was computed with the
    old one stays, just as the energy dashboard treats a new electricity price.
    The first value applies from the beginning.
    """

    points: list[tuple[float, TimelineValue]] = field(
        default_factory=list[tuple[float, TimelineValue]]
    )

    def value_at(self, timestamp: float) -> TimelineValue:
        """Return the value in effect at timestamp."""
        if not self.points:
            return None
        index = bisect_right([start for start, _ in self.points], timestamp)
        return self.points[max(index - 1, 0)][1]

    def set(self, value: TimelineValue, valid_from: float) -> bool:
        """Record a new value. Return whether it changed."""
        if self.points and self.points[-1][1] == value:
            return False
        if not self.points:
            valid_from = 0.0
        self.points = [point for point in self.points if point[0] < valid_from]
        self.points.append((valid_from, value))
        return True

    def as_list(self) -> list[list[TimelineValue]]:
        """Return the timeline for storage."""
        return [[start, value] for start, value in self.points]

    @classmethod
    def from_list(cls, points: Iterable[Sequence[TimelineValue]]) -> Timeline:
        """Restore a timeline from storage."""
        return cls([(float(start or 0.0), value) for start, value in points])


def electricity_prices(
    hours: Sequence[float],
    *,
    entity_prices: Mapping[float, float],
    costs: Mapping[float, float],
    energy: Mapping[float, float],
    fixed: float | None,
    last_known: float | None,
) -> list[float | None]:
    """Return the price of one grid connection for each hour.

    In order of preference: the dashboard's price entity, the dashboard's
    costs divided by the imported energy, its fixed price, the last price seen.
    Hours before the first known price take the first known price.
    """
    prices: list[float | None] = []
    previous = last_known
    for hour in hours:
        price = entity_prices.get(hour)
        if (
            price is None
            and hour in costs
            and (kwh := energy.get(hour, 0.0)) >= MIN_PRICED_ENERGY
        ):
            price = costs[hour] / kwh
        if price is None:
            price = fixed if fixed is not None else previous
        prices.append(price)
        if price is not None:
            previous = price
    first = next((price for price in prices if price is not None), None)
    return [first if price is None else price for price in prices]


def paid_prices(
    hours: Sequence[float],
    *,
    prices: Sequence[float | None],
    costs: Mapping[float, float],
    energy: Mapping[float, float],
    ranges: Mapping[float, tuple[float, float]],
) -> list[float | None]:
    """Return what a kWh imported in each hour really cost.

    A load that follows the cheap windows of a tariff, such as a charging car,
    pays less than the hour's mean price. The dashboard's costs know that: they
    price each kWh at its moment. They have gaps though, for example a meter
    catching up on hours it missed, so they count only if they fit the prices
    the sensor had in that hour. Otherwise the mean price stands.
    """
    paid = list(prices)
    for index, hour in enumerate(hours):
        if hour in costs and (kwh := energy.get(hour, 0.0)) >= MIN_PRICED_ENERGY:
            unit = costs[hour] / kwh
            low, high = ranges.get(hour, (unit, unit))
            if low - SAME_PRICE <= unit <= high + SAME_PRICE:
                paid[index] = unit
    return paid


def average_price(
    prices: Sequence[float | None], energies: Sequence[float]
) -> float | None:
    """Return the price of an hour over several grid connections.

    With several tariffs, such as day and night, each counts with the energy
    imported through it. Without imports, each counts the same.
    """
    known = [
        (price, energy)
        for price, energy in zip(prices, energies, strict=True)
        if price is not None
    ]
    if not known:
        return None
    total = sum(energy for _, energy in known)
    if total >= MIN_PRICED_ENERGY:
        return sum(price * energy for price, energy in known) / total
    return sum(price for price, _ in known) / len(known)


@dataclass(frozen=True, slots=True)
class GridPrices:
    """The electricity price of each hour over all grid connections."""

    mean: list[float | None]
    """The mean price, which values what did not come from the grid."""
    paid: list[float | None]
    """What a kWh imported in the hour cost."""
    low: list[float | None]
    high: list[float | None]


def combine_grid_prices(
    hours: Sequence[float],
    *,
    means: Sequence[Sequence[float | None]],
    paids: Sequence[Sequence[float | None]],
    energies: Sequence[Mapping[float, float]],
    ranges: Sequence[Mapping[float, tuple[float, float]]],
) -> GridPrices:
    """Return the prices of each hour over all grid connections.

    means, paids, energies, and ranges hold one entry per grid connection:
    its mean and paid prices, its imports, and its price sensor's lowest and
    highest price per hour, if known. Each connection counts with what it
    imported, as in average_price. The lowest and highest price of an hour
    also hold its mean and paid price.
    """

    def over_grids(per_grid: Sequence[Sequence[float | None]]) -> list[float | None]:
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
        known = [item[hour] for item in ranges if hour in item]
        bounds = [price for price in (mean[index], paid[index]) if price is not None]
        low.append(min([*bounds, *(item[0] for item in known)], default=None))
        high.append(max([*bounds, *(item[1] for item in known)], default=None))
    return GridPrices(mean=mean, paid=paid, low=low, high=high)


def standing_charge_share(monthly: float, hour: float, time_zone: tzinfo) -> float:
    """Return the standing charge of an hour: an even share of its day's.

    Suppliers bill the standing charge by the day, so every day costs twelve
    months over 365 days, whatever its month; a bill from the 12th to the 11th
    then holds its days at the same price. Days begin at local midnight, so a
    day with a change to or from summer time has an hour less or more.
    """
    local = datetime.fromtimestamp(hour, time_zone)
    day = local.replace(hour=0, minute=0, second=0, microsecond=0)
    next_day = day + timedelta(days=1)
    return monthly * 12 / 365 / ((next_day.timestamp() - day.timestamp()) / HOUR)


def pv_saving(
    *,
    solar: float,
    export: float,
    battery_out: float,
    battery_in: float,
    price: float,
    export_revenue: float,
    bonus: float = 0.0,
) -> float:
    """Return what the PV plant saved in one hour.

    Without PV and battery all electricity used in the house would come from
    the grid and nothing would be fed in. The battery belongs to the PV plant:
    what it gives back is valued when it is used. A self-consumption bonus
    adds bonus_saving.
    """
    self_used = solar - export + battery_out - battery_in
    return (
        self_used * price
        + export_revenue
        + bonus_saving(solar=solar, export=export, bonus=bonus)
    )


def bonus_saving(*, solar: float, export: float, bonus: float) -> float:
    """Return what a self-consumption bonus earned in one hour.

    The grid operator pays it for what the meters say was used on site: solar
    production minus feed-in. What a battery stored counts, its losses too.
    """
    return bonus * max(solar - export, 0.0)


def lost_feed_in(feed_in: float, bonus: float) -> float:
    """Return what a kWh of solar power used on site gives up.

    It does not earn the feed-in compensation but earns the self-consumption
    bonus, so it costs their difference, and never less than nothing.
    """
    return max(feed_in - bonus, 0.0)


@dataclass(frozen=True, slots=True)
class BatteryFlows:
    """Where the home batteries' energy of one hour came from and went."""

    solar_in: float = 0.0
    grid_in: float = 0.0
    to_house: float = 0.0
    to_grid: float = 0.0

    @property
    def charge(self) -> float:
        """Return what went into the batteries."""
        return self.solar_in + self.grid_in

    @property
    def discharge(self) -> float:
        """Return what came out of the batteries."""
        return self.to_house + self.to_grid


def battery_flows(
    *,
    solar: float,
    export: float,
    charge: float = 0.0,
    discharge: float = 0.0,
    from_grid: float = 0.0,
    from_solar: float = 0.0,
    to_home: float = 0.0,
    to_grid: float = 0.0,
) -> BatteryFlows:
    """Return where the batteries' energy of one hour came from and went.

    A battery measured per direction says it; for one measured in total, charge
    and discharge, the hour's statistics do not. Then the battery is taken to
    charge from solar power first, with what the measured ones left over, and
    to give to the house first, after what the measured ones fed in.
    """
    solar_in = min(charge, max(solar - from_solar, 0.0))
    spare_export = max(export - to_grid, 0.0)
    solar_to_grid = min(spare_export, max(solar - from_solar - solar_in, 0.0))
    estimated_to_grid = min(discharge, max(spare_export - solar_to_grid, 0.0))
    return BatteryFlows(
        solar_in=from_solar + solar_in,
        grid_in=from_grid + charge - solar_in,
        to_house=to_home + discharge - estimated_to_grid,
        to_grid=to_grid + estimated_to_grid,
    )


def battery_saving(flows: BatteryFlows, *, price: float, feed_in_price: float) -> float:
    """Return what the battery added to the PV plant's saving in one hour.

    Compared with the same PV plant without a battery: the solar power it
    stored would have been fed in, what it charged from the grid would not
    have been bought, and what it gave would have come from the grid, or not
    have been fed in. The PV plant's saving minus this is what it saved
    without the battery, so the two add up to the PV plant's saving.
    """
    return (
        flows.to_house * price
        + flows.to_grid * feed_in_price
        - flows.solar_in * feed_in_price
        - flows.grid_in * price
    )


# What a battery gives back of what it was charged with, at least and at most.
# Below the lower bound the meters, not the battery, are off.
BATTERY_EFFICIENCY = (0.7, 1.0)


@dataclass(frozen=True, slots=True)
class BatteryHour:
    """What the batteries stored and gave to the house in one hour.

    solar and grid are the energy the house got from the batteries, by where
    it came from; solar_cost and grid_cost what it cost when it was stored,
    with the battery's losses.
    """

    grid_in: float = 0.0
    solar: float = 0.0
    grid: float = 0.0
    solar_cost: float = 0.0
    grid_cost: float = 0.0


def battery_hour(
    store: dict[str, float],
    flows: BatteryFlows,
    *,
    price: float,
    feed_in: float,
) -> BatteryHour:
    """Store an hour's charge and return what the batteries gave to the house.

    store holds the energy in the batteries by where it came from, solar and
    grid, what it cost, solar_cost and grid_cost, and all energy charged and
    discharged, updated here. Grid power costs the hour's price, solar power the feed-in
    compensation it did not earn. What comes out is taken in proportion from
    what is in, at the losses the batteries had so far. What comes out beyond
    that was in before the statistics began, and counts as solar power, as the
    batteries belong to the PV plant.
    """
    store["charged"] = store.get("charged", 0.0) + flows.charge
    store["discharged"] = store.get("discharged", 0.0) + flows.discharge
    store["solar"] = store.get("solar", 0.0) + flows.solar_in
    store["solar_cost"] = store.get("solar_cost", 0.0) + flows.solar_in * feed_in
    store["grid"] = store.get("grid", 0.0) + flows.grid_in
    store["grid_cost"] = store.get("grid_cost", 0.0) + flows.grid_in * price
    if not flows.discharge:
        return BatteryHour(grid_in=flows.grid_in)
    lowest, highest = BATTERY_EFFICIENCY
    efficiency = (
        min(max(store["discharged"] / store["charged"], lowest), highest)
        if store["charged"] > 0
        else highest
    )
    held = store["solar"] + store["grid"]
    taken = min(flows.discharge / efficiency, held)
    part = taken / held if held > 0 else 0.0
    given: dict[str, float] = {}
    for key in ("solar", "grid", "solar_cost", "grid_cost"):
        given[key] = store[key] * part
        store[key] -= given[key]
    before = flows.discharge - taken * efficiency
    house = flows.to_house / flows.discharge
    return BatteryHour(
        grid_in=flows.grid_in,
        solar=(given["solar"] * efficiency + before) * house,
        grid=given["grid"] * efficiency * house,
        solar_cost=(given["solar_cost"] + before * feed_in) * house,
        grid_cost=given["grid_cost"] * house,
    )


def heating_cost(heat: float, heating: str, price: float) -> float:
    """Return what the former heating would have paid for this heat.

    The price is per unit of its fuel, such as a kWh of gas or a litre of oil.
    Energy content and efficiency are fixed.
    """
    fuel = FUELS[heating]
    return heat / fuel.efficiency / fuel.kwh_per_unit * price


def heat_pump_saving(
    *,
    electricity: float,
    heat: float,
    heating: str,
    fuel_price: float,
    electricity_price: float,
) -> float:
    """Return what the heat pump saved in one hour, compared with the former heating."""
    return heating_cost(heat, heating, fuel_price) - electricity * electricity_price


def estimated_heat(
    electricity: float,
    *,
    entered_scop: float | None,
    measured_heat: float,
    measured_electricity: float,
    measuring: bool,
) -> float:
    """Return the heat of an hour no heat meter measured, from its electricity.

    Before the heat meters began to measure, the seasonal COP entered for that
    time counts; later gaps use the COP measured until then. measured_heat and
    measured_electricity are what the measured hours so far added up to.
    """
    scop = None if measuring else entered_scop
    if scop is None and measured_electricity > 0:
        scop = measured_heat / measured_electricity
    if scop is None:
        scop = entered_scop or 0.0
    return electricity * scop


def fuel_price(
    *, sensor: float | None, last_sensor: float | None, entered: float | None
) -> float:
    """Return the gas, oil, or fuel price of an hour.

    A price sensor takes precedence. While it has no value, its last value
    counts, and without one the price entered for that time.
    """
    if sensor is not None:
        return sensor
    if last_sensor is not None:
        return last_sensor
    return entered or 0.0


def solar_saving(*, alternative_cost: float, cost: float, saving: float) -> float:
    """Return what a device's solar power added to its saving in one hour.

    The saving counts all of the device's electricity at the hour's price, as
    the benefit of solar power belongs to the PV plant. The device's cost
    counts its solar power at the feed-in compensation it did not earn. What
    remains between them and the alternative is what its solar power saved.
    """
    return alternative_cost - cost - saving


def wallbox_distance(electricity: float, ev_consumption: float) -> float:
    """Return the distance charged, in km.

    The electric car's consumption is per 100 km, measured at the wallbox.
    """
    return electricity / ev_consumption * 100


def fuel_cost(
    distance: float, combustion_consumption: float, fuel_price: float
) -> float:
    """Return what a combustion car would have paid for fuel for a distance.

    Its consumption is in litres per 100 km.
    """
    return distance * combustion_consumption / 100 * fuel_price


def wallbox_saving(
    *,
    electricity: float,
    ev_consumption: float,
    combustion_consumption: float,
    fuel_price: float,
    electricity_price: float,
) -> float:
    """Return what charging at home saved in one hour, compared with a combustion car.

    Consumptions are per 100 km: kWh for the electric car, measured at the
    wallbox, and litres for the combustion car.
    """
    distance = wallbox_distance(electricity, ev_consumption)
    return (
        fuel_cost(distance, combustion_consumption, fuel_price)
        - electricity * electricity_price
    )


AREA_HOUSEHOLD = "household"
AREA_OTHER = "other"
GRID_COST = "grid_cost"
GRID_IMPORT_COST = "grid_import_cost"
GRID_FEED_IN = "grid_feed_in"
GRID_STANDING_CHARGE = "grid_standing_charge"
GRID_CHEAP_SAVING = "grid_cheap_saving"
GRID_HOURS = "grid_hours"
GRID_CHEAP_HOURS = "grid_cheap_hours"
GRID_EXPENSIVE_HOURS = "grid_expensive_hours"
LEVEL_CHEAP = "cheap"
LEVEL_EXPENSIVE = "expensive"
# A price this far below or above the normal price is cheap or expensive.
LEVEL_SPAN = 0.10
# The normal price is the median of the hourly prices of this span.
NORMAL_SPAN = 7 * DAY


def normal_price(prices: Iterable[float]) -> float | None:
    """Return the normal price: the median of the hourly prices given.

    The price that holds in most hours, such as the high rate of a tariff with
    a cheap night window. Seven days, so that weekends count. A median, so that
    a few cheap windows or price peaks do not move it.
    """
    ordered = sorted(prices)
    return ordered[len(ordered) // 2] if ordered else None


def price_level(price: float, normal: float | None) -> str | None:
    """Return the level of a price against the normal price, None for normal.

    A flat tariff has no levels: every hour costs the normal price.
    """
    if normal is None or normal <= 0:
        return None
    if price <= normal * (1 - LEVEL_SPAN):
        return LEVEL_CHEAP
    if price >= normal * (1 + LEVEL_SPAN):
        return LEVEL_EXPENSIVE
    return None


def _mix(
    consumption: float, grid_import: float, feed_in: float, battery: BatteryHour
) -> tuple[float, float, float, float]:
    """Return the shares of solar power and stored grid power, and their prices.

    What the batteries stored from the grid is not part of what the house drew
    from the grid in the hour; the rest of the consumption is solar power.
    Solar power from the batteries costs what it did when it was stored, the
    rest the hour's feed-in compensation.
    """
    if not consumption:
        return 0.0, 0.0, feed_in, 0.0
    stored = min(battery.grid, consumption)
    direct = min(max(grid_import - battery.grid_in, 0.0), consumption - stored)
    from_solar = consumption - direct - stored
    from_battery = min(battery.solar, from_solar)
    solar_cost = (from_solar - from_battery) * feed_in
    if battery.solar:
        solar_cost += battery.solar_cost / battery.solar * from_battery
    return (
        from_solar / consumption,
        stored / consumption,
        solar_cost / from_solar if from_solar else feed_in,
        battery.grid_cost / battery.grid if battery.grid else 0.0,
    )


def household_hour(
    *,
    grid_import: float,
    export: float,
    solar: float,
    battery_out: float,
    battery_in: float,
    devices: Mapping[str, float],
    top_level: Iterable[str],
    price: float,
    feed_in: float,
    export_revenue: float,
    standing_charge: float,
    tariffs: Mapping[str, float],
    level: str | None,
    hour_level: str | None,
    normal: float | None,
    debts: dict[str, float],
    battery: BatteryHour | None = None,
) -> dict[str, float]:
    """Return consumption, mix, and costs of one hour, keyed by area and figure.

    Areas are the household, each device, and "other", what the household used
    beyond its top-level devices. devices, top_level, and tariffs name devices
    by their area. Figures are energy, solar, cost, what the solar power and the
    grid power's level cost, and the grid power's level, cheap or expensive, if
    any. Devices have no energy figure: their own statistic already holds it.

    Solar power used in the house is shared among the consumers in proportion
    to their consumption. It costs the feed-in compensation it did not earn;
    grid power costs the hour's price, or a device's own tariff. battery says
    what the batteries gave to the house, as battery_hour: solar power and grid
    power, at what they cost when they were stored. GRID_COST is what the grid
    connection cost: imports minus feed-in compensation plus the standing charge.

    level is the level of the price paid in the hour, hour_level that of the
    hour's mean price, against the normal price. A device's own tariff has one
    price, so its grid power has no level. GRID_CHEAP_SAVING is what cheap grid
    power cost less and expensive grid power cost more than at the normal
    price. GRID_HOURS counts the hours, grid_cheap_hours and
    grid_expensive_hours those of each level, whatever the household drew.

    "Other" is what remains of each figure, so all consumers add up to the
    household. A meter that books a day at once reports more than the household
    used in that hour, and what it booked was in "other" while nobody knew. That
    surplus stays in debts, keyed by figure and updated here, and later hours of
    "other" pay it back.
    """
    consumption = max(grid_import - export + solar + battery_out - battery_in, 0.0)
    share, stored_share, solar_price, stored_price = _mix(
        consumption, grid_import, feed_in, battery or BatteryHour()
    )
    result: dict[str, float] = {
        GRID_COST: grid_import * price - export_revenue + standing_charge,
        GRID_IMPORT_COST: grid_import * price,
        GRID_FEED_IN: export_revenue,
        GRID_STANDING_CHARGE: standing_charge,
        GRID_HOURS: 1.0,
    }
    if hour_level == LEVEL_CHEAP:
        result[GRID_CHEAP_HOURS] = 1.0
    elif hour_level == LEVEL_EXPENSIVE:
        result[GRID_EXPENSIVE_HOURS] = 1.0

    def add(
        area: str, energy: float, unit_price: float, own_level: str | None
    ) -> dict[str, float]:
        solar_part = energy * share
        stored_part = energy * stored_share
        grid_part = energy - solar_part - stored_part
        figures = {
            "solar": solar_part,
            "cost": grid_part * unit_price
            + stored_part * stored_price
            + solar_part * solar_price,
            "solar_cost": solar_part * solar_price,
        }
        if own_level is not None:
            figures[own_level] = grid_part
            figures[f"{own_level}_cost"] = grid_part * unit_price
        for figure, value in figures.items():
            result[f"{area}_{figure}"] = value
        return figures

    household = add(AREA_HOUSEHOLD, consumption, price, level) | {"energy": consumption}
    remaining = dict(household)
    top = set(top_level)
    own_grid = 0.0
    for stat, energy in devices.items():
        tariff = tariffs.get(stat)
        figures = add(
            stat,
            energy,
            price if tariff is None else tariff,
            level if tariff is None else None,
        )
        if stat not in top:
            continue
        if tariff is not None:
            grid_part = energy * (1 - share - stored_share)
            own_grid += grid_part
            # An own tariff changes what the household costs, not what it used,
            gap = grid_part * (tariff - price)
            household["cost"] += gap
            remaining["cost"] += gap
            # and its grid power is not part of the levels of the household's.
            if level is not None:
                for figure, value in (
                    (level, grid_part),
                    (f"{level}_cost", grid_part * price),
                ):
                    household[figure] = max(household[figure] - value, 0.0)
                    remaining[figure] -= value
        for figure, value in (figures | {"energy": energy}).items():
            remaining[figure] -= value
    if level is not None and normal is not None:
        result[GRID_CHEAP_SAVING] = max(grid_import - own_grid, 0.0) * (normal - price)
    for figure, value in remaining.items():
        left = value - debts.get(figure, 0.0)
        result[f"{AREA_OTHER}_{figure}"] = max(left, 0.0)
        debts[figure] = max(-left, 0.0)
    result[f"{AREA_HOUSEHOLD}_energy"] = consumption
    result[f"{AREA_HOUSEHOLD}_cost"] = household["cost"]
    if level is not None:
        result[f"{AREA_HOUSEHOLD}_{level}"] = household[level]
        result[f"{AREA_HOUSEHOLD}_{level}_cost"] = household[f"{level}_cost"]
    return result


def effective_meters(
    selected: Iterable[str], parents: Mapping[str, str | None]
) -> list[str]:
    """Drop meters already contained in another selected meter.

    The energy dashboard records with included_in_stat that a device's
    consumption is part of another device's. Counting both would count twice.
    """
    chosen = list(dict.fromkeys(selected))
    result: list[str] = []
    for meter in chosen:
        parent = parents.get(meter)
        seen = {meter}
        # Walk up until a selected ancestor, the top, or a loop.
        while parent is not None and parent not in chosen and parent not in seen:
            seen.add(parent)
            parent = parents.get(parent)
        if parent is None or parent in seen:
            result.append(meter)
    return result


@dataclass(frozen=True, slots=True)
class Summary:
    """Payback figures derived from the saving so far."""

    payback: float | None
    """Share of the investment the savings have covered, in percent."""
    per_year: float | None
    """Average saving per year, once there are twelve months of data."""
    yearly_from: float
    """When the yearly average becomes available."""
    years_left: float | None
    """Years until the investment is covered, at the yearly average."""
    annual_return: float | None
    """Internal rate of return so far, in percent per year, once paid back."""


def internal_rate_of_return(
    *, investment: float, saving: float, years: float
) -> float | None:
    """Return the internal rate of return so far, in percent per year.

    The investment at the start, the saving evenly over the years since, and no
    value left at the end: zero when the saving has just covered the investment.
    None before that.
    """
    if investment <= 0 or saving < investment or years < 0.1:
        return None
    low, high = 0.0, 5.0
    for _ in range(30):
        rate = (low + high) / 2
        growth = log1p(rate)
        worth_now = (
            saving / years * ((1 - (1 + rate) ** -years) / growth)
            if growth > 1e-9
            else saving
        )
        if worth_now > investment:
            low = rate
        else:
            high = rate
    return (low + high) / 2 * 100


def summarize(
    *,
    saving: float,
    counting_since: float,
    until: float,
    investment: float | None,
) -> Summary:
    """Return payback figures, leaving out what the data cannot support."""
    yearly_from = counting_since + YEAR
    years = (until - counting_since) / YEAR
    per_year = None
    if until >= yearly_from:
        per_year = saving / years
    payback = None
    years_left = None
    annual_return = None
    if investment is not None and investment > 0:
        payback = saving / investment * 100
        if saving < investment and per_year is not None and per_year > 0:
            years_left = (investment - saving) / per_year
        annual_return = internal_rate_of_return(
            investment=investment, saving=saving, years=years
        )
    return Summary(
        payback=payback,
        per_year=per_year,
        yearly_from=yearly_from,
        years_left=years_left,
        annual_return=annual_return,
    )
