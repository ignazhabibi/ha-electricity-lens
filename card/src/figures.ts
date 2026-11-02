// The figures of the key figure card: which statistics of an area each
// needs, and how its value and the line below follow from their sums. The
// integration computes every cost and share per hour; the card only adds up
// the hours of the period and divides one sum by another.

import type { FigureArea } from "./types";

export type Figure =
  | "energy"
  | "cost"
  | "grid_price"
  | "price"
  | "solar_share"
  | "cheap_share"
  | "expensive_share"
  | "cheap_saving"
  | "self_consumption"
  | "export"
  | "saving"
  | "heat"
  | "alternative_cost"
  | "scop"
  | "heat_price"
  | "distance"
  | "cost_per_100km"
  | "forecast_today"
  | "forecast_tomorrow";

export type Unit =
  | "energy"
  | "money"
  | "price"
  | "percent"
  | "number"
  | "distance"
  | "per_100km";

/** The statistics of an area a figure needs, by their key. */
const NEEDS: Record<Figure, string[]> = {
  energy: ["energy"],
  cost: ["cost"],
  grid_price: ["import_cost", "energy"],
  // A price per kWh consumed, so only where solar power is shared out.
  price: ["cost", "energy", "solar"],
  solar_share: ["solar", "energy"],
  cheap_share: ["cheap", "solar", "energy"],
  expensive_share: ["expensive", "solar", "energy"],
  cheap_saving: ["cheap_saving"],
  self_consumption: ["self_used", "energy"],
  export: ["export"],
  saving: ["saving"],
  heat: ["heat"],
  alternative_cost: ["alternative_cost"],
  scop: ["heat", "energy"],
  heat_price: ["cost", "heat"],
  distance: ["distance"],
  cost_per_100km: ["cost", "distance"],
  forecast_today: [],
  forecast_tomorrow: [],
};

/** Further statistics the line below uses, where the area has them. */
const LINE_NEEDS: Partial<Record<Figure, string[]>> = {
  energy: ["solar", "export"],
  cost: ["energy", "solar", "import_cost", "feed_in"],
  saving: ["alternative_cost", "cost"],
  heat: ["energy"],
  distance: ["energy"],
};

export const FIGURES = Object.keys(NEEDS) as Figure[];

export const isForecast = (figure: Figure): boolean =>
  figure === "forecast_today" || figure === "forecast_tomorrow";

/** The figures an area has the statistics for. */
export function figuresOf(area: FigureArea): Figure[] {
  return FIGURES.filter((figure) =>
    isForecast(figure)
      ? area.forecast === true
      : NEEDS[figure].every((key) => area.statistics[key]?.length)
  );
}

/** The statistics to load for a figure of an area and its line below. */
export function statisticsOf(area: FigureArea, figure: Figure): string[] {
  return [...NEEDS[figure], ...(LINE_NEEDS[figure] ?? [])].flatMap(
    (key) => area.statistics[key] ?? []
  );
}

export interface Line {
  key: string;
  values: Record<string, { value: number; unit: Unit }>;
}

export interface FigureValue {
  value: number | null;
  unit: Unit;
  /** The line below the value, for example "509 of 2,028 kWh from solar". */
  line?: Line;
  /** A share to show as a bar, 0 to 100. */
  bar?: number;
}

const share = (part: number, whole: number): number | null =>
  whole > 0 ? (part / whole) * 100 : null;

/** The value of a figure from the sums of the area's statistics. */
export function valueOf(
  figure: Figure,
  area: FigureArea,
  sum: (key: string) => number | null,
  forecast: number | null
): FigureValue {
  const energy = sum("energy");
  const solar = sum("solar");
  const kwh = (value: number) => ({ value, unit: "energy" as const });
  const money = (value: number) => ({ value, unit: "money" as const });
  const plain = (value: number) => ({ value, unit: "number" as const });
  switch (figure) {
    case "energy": {
      if (energy !== null && solar !== null && energy > 0) {
        const percent = share(solar, energy) ?? 0;
        return {
          value: energy,
          unit: "energy",
          line: {
            key: "line_solar_part",
            values: { percent: { value: percent, unit: "percent" } },
          },
        };
      }
      const exported = sum("export");
      if (area.kind === "grid" && exported !== null) {
        return {
          value: energy,
          unit: "energy",
          line: { key: "line_exported", values: { energy: kwh(exported) } },
        };
      }
      return { value: energy, unit: "energy" };
    }
    case "cost": {
      const cost = sum("cost");
      if (cost !== null && energy && solar !== null) {
        return {
          value: cost,
          unit: "money",
          line: {
            key: "line_average_price",
            values: { price: { value: cost / energy, unit: "price" } },
          },
        };
      }
      const imported = sum("import_cost");
      const feedIn = sum("feed_in");
      if (cost !== null && imported !== null && feedIn !== null) {
        // What the grid connection cost follows from three parts.
        const charge = cost - imported + feedIn;
        return {
          value: cost,
          unit: "money",
          line: {
            key: Math.abs(charge) < 0.005 ? "line_bill_no_charge" : "line_bill",
            values: {
              imported: money(imported),
              feed_in: money(feedIn),
              charge: money(charge),
            },
          },
        };
      }
      if (cost !== null && energy !== null && area.kind === "grid") {
        return {
          value: cost,
          unit: "money",
          line: { key: "line_for_import", values: { energy: kwh(energy) } },
        };
      }
      return { value: cost, unit: "money" };
    }
    case "grid_price": {
      const cost = sum("import_cost");
      if (cost === null || !energy) return { value: null, unit: "price" };
      return {
        value: cost / energy,
        unit: "price",
        line: {
          key: "line_cost_for",
          values: { cost: money(cost), energy: kwh(energy) },
        },
      };
    }
    case "cheap_saving":
      return {
        value: sum("cheap_saving"),
        unit: "money",
        line: { key: "line_against_normal", values: {} },
      };
    case "price": {
      const cost = sum("cost");
      if (cost === null || !energy) return { value: null, unit: "price" };
      return {
        value: cost / energy,
        unit: "price",
        line: {
          key: "line_cost_for",
          values: {
            cost: { value: cost, unit: "money" },
            energy: kwh(energy),
          },
        },
      };
    }
    case "solar_share": {
      if (energy === null || solar === null)
        return { value: null, unit: "percent" };
      const percent = share(solar, energy);
      return {
        value: percent,
        unit: "percent",
        bar: percent ?? 0,
        line: {
          key: "line_from_solar",
          values: { part: plain(solar), whole: kwh(energy) },
        },
      };
    }
    case "cheap_share":
    case "expensive_share": {
      const level = sum(figure === "cheap_share" ? "cheap" : "expensive");
      if (energy === null || solar === null || level === null)
        return { value: null, unit: "percent" };
      const grid = Math.max(energy - solar, 0);
      const percent = share(level, grid);
      return {
        value: percent,
        unit: "percent",
        bar: percent ?? 0,
        line: {
          key: "line_of_grid",
          values: { part: plain(level), whole: kwh(grid) },
        },
      };
    }
    case "self_consumption": {
      const used = sum("self_used");
      if (energy === null || used === null)
        return { value: null, unit: "percent" };
      const percent = share(used, energy);
      return {
        value: percent,
        unit: "percent",
        bar: percent ?? 0,
        line: {
          key: "line_self_used",
          values: { part: plain(used), whole: kwh(energy) },
        },
      };
    }
    case "export":
      return { value: sum("export"), unit: "energy" };
    case "saving": {
      const saving = sum("saving");
      const alternative = sum("alternative_cost");
      const cost = sum("cost");
      if (saving === null || alternative === null || cost === null) {
        return { value: saving, unit: "money" };
      }
      // A device shows what it saved with its solar power, at the lost feed-in
      // compensation as in its costs. In the balance the benefit of solar power
      // belongs to the PV plant, so that nothing counts twice.
      const withSolar = alternative - cost;
      return {
        value: withSolar,
        unit: "money",
        line: {
          key: "line_saving_split",
          values: {
            solar: money(withSolar - saving),
            saving: money(saving),
          },
        },
      };
    }
    case "heat": {
      const heat = sum("heat");
      if (heat === null || energy === null) return { value: heat, unit: "energy" };
      return {
        value: heat,
        unit: "energy",
        line: { key: "line_from_electricity", values: { energy: kwh(energy) } },
      };
    }
    case "alternative_cost":
      return { value: sum("alternative_cost"), unit: "money" };
    case "scop": {
      const heat = sum("heat");
      if (heat === null || !energy) return { value: null, unit: "number" };
      return {
        value: heat / energy,
        unit: "number",
        line: {
          key: "line_heat_from",
          values: { heat: plain(heat), energy: kwh(energy) },
        },
      };
    }
    case "heat_price": {
      const heat = sum("heat");
      const cost = sum("cost");
      if (heat === null || cost === null || !heat) return { value: null, unit: "price" };
      return {
        value: cost / heat,
        unit: "price",
        line: {
          key: "line_cost_for_heat",
          values: { cost: { value: cost, unit: "money" }, heat: kwh(heat) },
        },
      };
    }
    case "distance": {
      const distance = sum("distance");
      if (distance === null || energy === null) return { value: distance, unit: "distance" };
      return {
        value: distance,
        unit: "distance",
        line: { key: "line_charged", values: { energy: kwh(energy) } },
      };
    }
    case "cost_per_100km": {
      const distance = sum("distance");
      const cost = sum("cost");
      if (distance === null || cost === null || !distance) {
        return { value: null, unit: "per_100km" };
      }
      return {
        value: (cost / distance) * 100,
        unit: "per_100km",
        line: {
          key: "line_cost_for",
          values: {
            cost: { value: cost, unit: "money" },
            energy: { value: distance, unit: "distance" },
          },
        },
      };
    }
    case "forecast_today":
    case "forecast_tomorrow":
      return { value: forecast, unit: "energy" };
  }
}

export type StatisticValue = "change" | "mean" | "min" | "max";
export const STATISTIC_VALUES: StatisticValue[] = ["change", "mean", "min", "max"];

/** One tile: a figure of the integration, a statistic, or an entity. */
export interface Tile {
  area?: string;
  figure?: Figure;
  statistic?: string;
  value?: StatisticValue;
  /** The line below: the range of a mean, or none. */
  secondary?: "range" | "none";
  entity?: string;
  name?: string;
}

export type Source = "energy" | "statistic" | "entity";

export const sourceOf = (tile: Tile): Source =>
  tile.statistic !== undefined
    ? "statistic"
    : tile.entity !== undefined
      ? "entity"
      : "energy";
