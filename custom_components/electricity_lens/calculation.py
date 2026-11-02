"""How savings and payback are calculated.

Pure functions without Home Assistant, so the rules can be read and tested on
their own. Energy is in kWh, money in the user's currency.
"""

from __future__ import annotations

from bisect import bisect_right
from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass, field

from .const import BOILER_EFFICIENCY, HEATING_OIL, OIL_KWH_PER_LITRE

HOUR = 3600.0
DAY = 24 * HOUR
YEAR = 365.25 * DAY
# Below this an hour's import is too small to derive a price from its costs.
MIN_PRICED_ENERGY = 0.01
# Prices closer than half a cent are one price: the sensor's rounding noise
# neither makes a price level nor an implausible cost.
SAME_PRICE = 0.005

type TimelineValue = float | str | None


@dataclass(slots=True)
class Timeline:
    """A value the user set, each one valid from a point in time.

    A new value applies from the next full hour; what was computed with the
    old one stays, just as the energy dashboard treats a new electricity price.
    The first value applies from the beginning.
    """

    points: list[tuple[float, TimelineValue]] = field(default_factory=list)

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


def pv_saving(
    *,
    solar: float,
    export: float,
    battery_out: float,
    battery_in: float,
    price: float,
    export_revenue: float,
) -> float:
    """Return what the PV plant saved in one hour.

    Without PV and battery all electricity used in the house would come from
    the grid and nothing would be fed in. The battery belongs to the PV plant:
    what it gives back is valued when it is used.
    """
    self_used = solar - export + battery_out - battery_in
    return self_used * price + export_revenue


def heating_cost(heat: float, heating: str, price: float) -> float:
    """Return what the former heating would have paid for this heat.

    Gas is priced per kWh, heating oil per litre. The efficiency is fixed.
    """
    fuel = heat / BOILER_EFFICIENCY
    if heating == HEATING_OIL:
        fuel /= OIL_KWH_PER_LITRE
    return fuel * price


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
GRID_CHEAP_SAVING = "grid_cheap_saving"
LEVEL_CHEAP = "cheap"
LEVEL_EXPENSIVE = "expensive"


def price_level(
    price: float,
    cheap_until: float | None,
    expensive_from: float | None,
    recent_low: float,
    recent_high: float,
) -> str | None:
    """Return the price level of an hour's grid power, None for normal.

    A level needs a contrast: with one price all day, as on a flat tariff,
    nothing is cheap or expensive, whatever the thresholds say. recent_low and
    recent_high are the lowest and highest price of the last day, the past of
    the hour only, as an hour's level stays once it is computed.
    """
    if cheap_until is not None and price <= cheap_until:
        if recent_high - price > SAME_PRICE:
            return LEVEL_CHEAP
    elif (
        expensive_from is not None
        and price >= expensive_from
        and price - recent_low > SAME_PRICE
    ):
        return LEVEL_EXPENSIVE
    return None


def normal_price(highs: Iterable[float], cheap_until: float | None) -> float | None:
    """Return what grid power cost outside the cheap hours of the last day.

    highs are the highest price of each of those hours. An average, so that a
    single price peak of a dynamic tariff does not make every cheap hour look
    like a great saving.
    """
    if cheap_until is None:
        return None
    normal = [high for high in highs if high > cheap_until]
    return sum(normal) / len(normal) if normal else None


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
    normal: float | None,
    debts: dict[str, float],
) -> dict[str, float]:
    """Return consumption, mix, and costs of one hour, keyed by area and figure.

    Areas are the household, each device, and "other", what the household used
    beyond its top-level devices. devices, top_level, and tariffs name devices
    by their area. Figures are energy, solar, cost, what the solar power and the
    grid power's level cost, and the grid power's level, cheap or expensive, if
    any. Devices have no energy figure: their own statistic already holds it.

    Solar power used in the house is shared among the consumers in proportion
    to their consumption. It costs the feed-in compensation it did not earn;
    grid power costs the hour's price, or a device's own tariff. The battery
    belongs to the PV plant, as in pv_saving. GRID_COST is what the grid
    connection cost: imports minus feed-in compensation plus the standing charge.
    GRID_CHEAP_SAVING is what cheap grid power saved against the normal price.

    "Other" is what remains of each figure, so all consumers add up to the
    household. A meter that books a day at once reports more than the household
    used in that hour, and what it booked was in "other" while nobody knew. That
    surplus stays in debts, keyed by figure and updated here, and later hours of
    "other" pay it back.
    """
    consumption = max(grid_import - export + solar + battery_out - battery_in, 0.0)
    from_solar = min(max(consumption - grid_import, 0.0), consumption)
    share = from_solar / consumption if consumption else 0.0
    result: dict[str, float] = {
        GRID_COST: grid_import * price - export_revenue + standing_charge,
        GRID_IMPORT_COST: grid_import * price,
        GRID_FEED_IN: export_revenue,
    }
    if level == LEVEL_CHEAP and normal is not None:
        result[GRID_CHEAP_SAVING] = grid_import * max(normal - price, 0.0)

    def add(area: str, energy: float, unit_price: float) -> dict[str, float]:
        solar_part = energy * share
        grid_part = energy - solar_part
        figures = {
            "solar": solar_part,
            "cost": grid_part * unit_price + solar_part * feed_in,
            "solar_cost": solar_part * feed_in,
        }
        if level is not None:
            figures[level] = grid_part
            figures[f"{level}_cost"] = grid_part * unit_price
        for figure, value in figures.items():
            result[f"{area}_{figure}"] = value
        return figures

    household = add(AREA_HOUSEHOLD, consumption, price) | {"energy": consumption}
    remaining = dict(household)
    top = set(top_level)
    for stat, energy in devices.items():
        figures = add(stat, energy, tariffs.get(stat, price))
        if stat not in top:
            continue
        # An own tariff changes what the household costs, not what it used.
        gap = energy * (1 - share) * (tariffs.get(stat, price) - price)
        for figure in ("cost", f"{level}_cost"):
            if figure in household:
                household[figure] += gap
                remaining[figure] += gap
        for figure, value in (figures | {"energy": energy}).items():
            remaining[figure] -= value
    for figure, value in remaining.items():
        left = value - debts.get(figure, 0.0)
        result[f"{AREA_OTHER}_{figure}"] = max(left, 0.0)
        debts[figure] = max(-left, 0.0)
    result[f"{AREA_HOUSEHOLD}_energy"] = consumption
    result[f"{AREA_HOUSEHOLD}_cost"] = household["cost"]
    if level is not None:
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
    result = []
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


def summarize(
    *,
    saving: float,
    counting_since: float,
    until: float,
    investment: float | None,
) -> Summary:
    """Return payback figures, leaving out what the data cannot support."""
    yearly_from = counting_since + YEAR
    per_year = None
    if until >= yearly_from:
        per_year = saving / ((until - counting_since) / YEAR)
    payback = None
    if investment is not None and investment > 0:
        payback = saving / investment * 100
    return Summary(payback=payback, per_year=per_year, yearly_from=yearly_from)
