// The figures of the key figure card: which statistics of an area each
// needs, and how its value and the line below follow from their sums. The
// integration computes every cost and share per hour; the card only adds up
// the hours of the period and divides one sum by another.

import type { FigureArea } from "./types";

export type Figure =
  | "energy"
  | "cost"
  | "price"
  | "solar_share"
  | "cheap_share"
  | "expensive_share"
  | "self_consumption"
  | "export"
  | "saving"
  | "forecast_today"
  | "forecast_tomorrow";

export type Unit = "energy" | "money" | "price" | "percent" | "number";

/** The statistics of an area a figure needs, by their key. */
const NEEDS: Record<Figure, string[]> = {
  energy: ["energy"],
  cost: ["cost"],
  // A price per kWh consumed, so only where solar power is shared out.
  price: ["cost", "energy", "solar"],
  solar_share: ["solar", "energy"],
  cheap_share: ["cheap", "solar", "energy"],
  expensive_share: ["expensive", "solar", "energy"],
  self_consumption: ["self_used", "energy"],
  export: ["export"],
  saving: ["saving"],
  forecast_today: [],
  forecast_tomorrow: [],
};

/** Further statistics the line below uses, where the area has them. */
const LINE_NEEDS: Partial<Record<Figure, string[]>> = {
  energy: ["solar", "export"],
  cost: ["energy", "solar"],
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
      if (cost !== null && energy !== null && area.kind === "grid") {
        return {
          value: cost,
          unit: "money",
          line: { key: "line_for_import", values: { energy: kwh(energy) } },
        };
      }
      return { value: cost, unit: "money" };
    }
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
    case "saving":
      return { value: sum("saving"), unit: "money" };
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
  secondary?: "range";
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
