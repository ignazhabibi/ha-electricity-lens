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
  | "grid_price"
  | "solar_share"
  | "cheap_share"
  | "expensive_share"
  | "self_consumption"
  | "scop"
  | "heat_price"
  | "cost_per_100km";
export type Stack = "source" | "consumer" | "bill" | "none";

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
  "grid_price",
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

/** The household's bill is the grid's, so its charts can show the grid price. */
export const lineFiguresOf = (area: FigureArea): LineFigure[] =>
  LINES.filter(
    (figure) =>
      figuresOf(area).includes(figure as Figure) ||
      (figure === "grid_price" && area.kind === "household")
  );

/** The ways a figure of an area can stack. */
export function stacksOf(area: FigureArea, figure: BarFigure): Stack[] {
  const stacks: Stack[] = [];
  if (figure === "energy" && area.statistics.solar?.length) stacks.push("source");
  if (area.kind === "household" && (figure === "energy" || figure === "cost")) {
    stacks.push("consumer");
  }
  if (area.kind === "household" && figure === "cost") stacks.push("source", "bill");
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

/** What a figure of an area adds up. A device's saving includes its solar
 * power, at the lost feed-in compensation as in its costs, as the key figures
 * show it; only the balance gives that benefit to the PV plant. */
function sums(area: FigureArea, figure: BarFigure): { plus: string[]; minus: string[] } {
  const { alternative_cost: alternative, cost } = area.statistics;
  return figure === "saving" && alternative?.length && cost?.length
    ? { plus: alternative, minus: cost }
    : { plus: area.statistics[figure] ?? [], minus: [] };
}

/** The electricity bill in its parts: the standing charge and the grid power by
 * price level, what the supplier charges. The feed-in compensation is not set
 * off against it. */
function billSeries(info: FiguresInfo, household: FigureArea, colors: Palette): BarSeries[] {
  const grid = info.areas.find((item) => item.kind === "grid")?.statistics ?? {};
  const imported = grid.import_cost ?? [];
  const feedIn = grid.feed_in ?? [];
  const cheap = household.statistics.cheap_cost ?? [];
  const expensive = household.statistics.expensive_cost ?? [];
  const series: BarSeries[] = [
    {
      id: "standing_charge",
      name: { key: "source.standing_charge" },
      color: colors.standing,
      plus: [...(grid.cost ?? []), ...feedIn],
      minus: imported,
      floor: true,
    },
  ];
  if (cheap.length) {
    series.push({ id: "cheap", name: { key: "source.cheap" }, color: colors.cheap, plus: cheap, minus: [] });
  }
  series.push({
    id: "grid",
    name: { key: cheap.length || expensive.length ? "source.normal" : "source.grid" },
    color: colors.grid,
    plus: imported,
    minus: [...cheap, ...expensive],
    floor: true,
  });
  if (expensive.length) {
    series.push({ id: "expensive", name: { key: "source.expensive" }, color: colors.expensive, plus: expensive, minus: [] });
  }
  return series;
}

/** What all consumption costs, as consumption by source in money: solar power
 * at the feed-in compensation it did not earn, and grid power by price level.
 * The feed-in shows below the line but is no part of the total: it pays for
 * power that was not consumed. */
function costSeries(info: FiguresInfo, household: FigureArea, colors: Palette): BarSeries[] {
  const of = (key: string) => household.statistics[key] ?? [];
  const cheap = of("cheap_cost");
  const expensive = of("expensive_cost");
  const series: BarSeries[] = [
    { id: "solar", name: { key: "source.solar" }, color: colors.solar, plus: of("solar_cost"), minus: [] },
  ];
  if (cheap.length) {
    series.push({ id: "cheap", name: { key: "source.cheap" }, color: colors.cheap, plus: cheap, minus: [] });
  }
  series.push({
    id: "grid",
    name: { key: cheap.length || expensive.length ? "source.normal" : "source.grid" },
    color: colors.grid,
    plus: of("cost"),
    minus: [...of("solar_cost"), ...cheap, ...expensive],
    floor: true,
  });
  if (expensive.length) {
    series.push({ id: "expensive", name: { key: "source.expensive" }, color: colors.expensive, plus: expensive, minus: [] });
  }
  const feedIn = info.areas.find((item) => item.kind === "grid")?.statistics.feed_in ?? [];
  if (feedIn.length) {
    series.push({ id: "export", name: { key: "source.export" }, color: colors.export, plus: feedIn, minus: [], negative: true });
  }
  return series;
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
  if (stack === "bill" && figure === "cost") return billSeries(info, area, colors);
  if (stack === "source" && figure === "cost") return costSeries(info, area, colors);
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
          ...sums(item, figure),
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
  return [{ id: figure, name: { text: area.name }, color, ...sums(area, figure) }];
}
