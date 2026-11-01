// What the history card can show for an area: figures as bars, how they
// stack, and shares or prices as a line. Each bar series adds up some of the
// area's statistics and subtracts others, for example grid power at normal
// prices: consumption minus solar, cheap, and expensive power.

import { figuresOf, type Figure } from "./figures";
import type { FigureArea, FiguresInfo } from "./types";

export type BarFigure =
  | "energy"
  | "cost"
  | "saving"
  | "export"
  | "heat"
  | "distance"
  | "alternative_cost";
export type LineFigure =
  | "price"
  | "solar_share"
  | "cheap_share"
  | "expensive_share"
  | "self_consumption"
  | "scop"
  | "heat_price"
  | "cost_per_100km";
export type Stack = "source" | "consumer" | "none";

const BARS: BarFigure[] = [
  "energy",
  "cost",
  "saving",
  "export",
  "heat",
  "distance",
  "alternative_cost",
];
const LINES: LineFigure[] = [
  "price",
  "solar_share",
  "cheap_share",
  "expensive_share",
  "self_consumption",
  "scop",
  "heat_price",
  "cost_per_100km",
];

export const barFiguresOf = (area: FigureArea): BarFigure[] =>
  BARS.filter((figure) => figuresOf(area).includes(figure));

export const lineFiguresOf = (area: FigureArea): LineFigure[] =>
  LINES.filter((figure) => figuresOf(area).includes(figure as Figure));

/** The ways a figure of an area can stack. */
export function stacksOf(area: FigureArea, figure: BarFigure): Stack[] {
  const stacks: Stack[] = [];
  if (figure === "energy" && area.statistics.solar?.length) stacks.push("source");
  if (area.kind === "household" && (figure === "energy" || figure === "cost")) {
    stacks.push("consumer");
  }
  stacks.push("none");
  return stacks;
}

export interface BarSeries {
  id: string;
  /** A text key, or the name of a device. */
  name: { key?: string; text?: string };
  color: string;
  plus: string[];
  minus: string[];
  /** Whether the series cannot be below zero, as a difference of meters. */
  floor?: boolean;
}

const CONSUMER_COLORS = [
  "#44739e",
  "#984ea3",
  "#00a0a0",
  "#ff7f00",
  "#af8d00",
  "#7f80cd",
  "#86b300",
  "#c42e60",
  "#a65628",
  "#f781bf",
];

/** The bar series of a figure of an area, stacked as asked. */
export function barSeries(
  info: FiguresInfo,
  area: FigureArea,
  figure: BarFigure,
  stack: Stack,
  colors: { solar: string; grid: string; cheap: string; expensive: string }
): BarSeries[] {
  const of = (key: string) => area.statistics[key] ?? [];
  if (stack === "source" && figure === "energy") {
    const series: BarSeries[] = [
      { id: "solar", name: { key: "source.solar" }, color: colors.solar, plus: of("solar"), minus: [] },
    ];
    const levels = ["cheap", "expensive"].filter((level) => of(level).length);
    if (of("cheap").length) {
      series.push({ id: "cheap", name: { key: "source.cheap" }, color: colors.cheap, plus: of("cheap"), minus: [] });
    }
    series.push({
      id: "grid",
      name: { key: levels.length ? "source.normal" : "source.grid" },
      color: colors.grid,
      plus: of("energy"),
      minus: [...of("solar"), ...levels.flatMap(of)],
      floor: true,
    });
    if (of("expensive").length) {
      series.push({ id: "expensive", name: { key: "source.expensive" }, color: colors.expensive, plus: of("expensive"), minus: [] });
    }
    return series;
  }
  if (stack === "consumer") {
    const consumers = info.areas.filter(
      (item) => (item.kind === "device" && item.top_level !== false) || item.kind === "other"
    );
    return consumers.map((item, index) => ({
      id: item.id,
      name: { text: item.name },
      color: CONSUMER_COLORS[index % CONSUMER_COLORS.length],
      plus: item.statistics[figure] ?? [],
      minus: [],
    }));
  }
  return [
    {
      id: figure,
      name: { text: area.name },
      color:
        figure === "saving" || figure === "export"
          ? colors.solar
          : figure === "heat"
            ? "#8e021b"
            : colors.grid,
      plus: of(figure),
      minus: [],
    },
  ];
}
