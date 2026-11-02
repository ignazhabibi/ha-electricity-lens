// What the history card can show for an area: figures as bars, how they
// stack, and shares or prices as a line. Each bar series adds up some of the
// area's statistics and subtracts others, for example grid power at normal
// prices: consumption minus solar, cheap, and expensive power.

import { consumerColors, type Palette } from "./colors";
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
  if (
    area.kind === "category" &&
    (area.statistics.energy?.length ?? 0) > 1 &&
    (figure === "energy" ||
      figure === "cost" ||
      ((figure === "heat" || figure === "saving") && (area.statistics.heat_meters?.length ?? 0) > 1))
  ) {
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
  /** Whether the series counts downwards, as the feed-in. */
  negative?: boolean;
}

/** The bar series of a figure of an area, stacked as asked. */
export function barSeries(
  info: FiguresInfo,
  area: FigureArea,
  figure: BarFigure,
  stack: Stack,
  colors: Palette
): BarSeries[] {
  const of = (key: string) => area.statistics[key] ?? [];
  const consumers = consumerColors(info, colors);
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
    // The household's feed-in shows below the line, as in HA's usage graph.
    const exported = info.areas.find((item) => item.kind === "grid")?.statistics.export ?? [];
    if (area.kind === "household" && exported.length) {
      series.push({ id: "export", name: { key: "source.export" }, color: colors.export, plus: exported, minus: [], negative: true });
    }
    return series;
  }
  if (stack === "consumer") {
    if (area.kind === "category") {
      const meters = new Set(area.statistics.energy ?? []);
      return info.areas
        .filter((item) => item.kind === "device" && item.statistics.energy?.some((stat) => meters.has(stat)))
        .map((item) => ({
          id: item.id,
          name: { text: item.name },
          color: consumers.get(item.id) ?? colors.other,
          plus: item.statistics[figure] ?? [],
          minus: [],
        }));
    }
    const covered = new Set(
      info.areas.filter((item) => item.kind === "category").flatMap((item) => item.statistics.energy ?? [])
    );
    return info.areas
      .filter(
        (item) =>
          (item.kind === "category" && (item.statistics.energy?.length ?? 0) > 0) ||
          (item.kind === "device" &&
            item.top_level !== false &&
            !item.statistics.energy?.some((stat) => covered.has(stat))) ||
          item.kind === "other"
      )
      .map((item) => ({
        id: item.id,
        name: { text: item.name },
        color: consumers.get(item.id) ?? colors.other,
        plus: item.statistics[figure] ?? [],
        minus: [],
      }));
  }
  const color =
    figure === "export"
      ? colors.export
      : area.kind === "solar"
        ? colors.solar
        : (consumers.get(area.id) ??
          (figure === "heat" ? colors.heat : figure === "distance" ? colors.car : colors.grid));
  return [{ id: figure, name: { text: area.name }, color, plus: of(figure), minus: [] }];
}
