// The history chart's stacks: each bar takes its figure apart, so its parts
// add up to the figure, and no consumer counts twice.

import assert from "node:assert/strict";
import { test } from "node:test";

import { formatter, type LocaleSettings } from "../src/format";
import { barSeries, billLines, billStatistics, heatDevices, stacksOf, type BarSeries } from "../src/history-figures";
import type { FigureArea, FiguresInfo } from "../src/types";
import { colors } from "./palette";

const area = (id: string, kind: FigureArea["kind"], statistics: FigureArea["statistics"] = {}, extra: Partial<FigureArea> = {}): FigureArea => ({
  id,
  kind,
  name: id,
  statistics,
  ...extra,
});

const infoOf = (areas: FigureArea[]): FiguresInfo => ({
  calculating: false,
  levels: { cheap: null, expensive: null },
  areas,
});

/** What a series shows for these sums of its statistics, as the chart adds them up. */
const valueOf = (series: BarSeries, sums: Record<string, number>) => {
  const total = (ids: string[]) => ids.reduce((sum, id) => sum + (sums[id] ?? 0), 0);
  const value = total(series.plus) - total(series.minus);
  return series.floor ? Math.max(0, value) : value;
};
const totalOf = (all: BarSeries[], sums: Record<string, number>) =>
  all.filter((series) => !series.negative).reduce((sum, series) => sum + valueOf(series, sums), 0);

const household = area("household", "household", {
  energy: ["energy"],
  solar: ["solar"],
  cheap: ["cheap"],
  expensive: ["expensive"],
  cost: ["cost"],
  solar_cost: ["solar_cost"],
  cheap_cost: ["cheap_cost"],
  expensive_cost: ["expensive_cost"],
});
const grid = area("grid", "grid", {
  export: ["export"],
  feed_in: ["feed_in"],
  import_cost: ["import_cost"],
  standing_charge: ["standing_charge"],
});

test("the household's energy by source adds up to its energy; the feed-in stands apart", () => {
  const series = barSeries(infoOf([household, grid]), household, "energy", "source", colors);
  const sums = { energy: 10, solar: 4, cheap: 2, expensive: 1, export: 3 };

  assert.deepEqual(series.map((item) => item.id), ["solar", "cheap", "grid", "expensive", "export"]);
  assert.equal(totalOf(series, sums), 10);
  assert.equal(valueOf(series.find((item) => item.id === "grid")!, sums), 3);
  assert.equal(series.find((item) => item.id === "export")?.negative, true);
});

test("the bill is the standing charge and the imports, without the feed-in", () => {
  const series = barSeries(infoOf([household, grid]), household, "cost", "bill", colors);
  const sums = { standing_charge: 12, import_cost: 30, cheap_cost: 5, expensive_cost: 8, feed_in: 20 };

  assert.equal(totalOf(series, sums), 42);
  assert.ok(!series.some((item) => item.plus.includes("feed_in")));
});

test("costs by source add up to the costs, and grid power never goes below zero", () => {
  const series = barSeries(infoOf([household, grid]), household, "cost", "source", colors);

  assert.equal(totalOf(series, { cost: 20, solar_cost: 4, cheap_cost: 3, expensive_cost: 6 }), 20);
  // Rounded parts may exceed the whole; the remainder shows as nothing.
  assert.equal(valueOf(series.find((item) => item.id === "grid")!, { cost: 5, solar_cost: 6 }), 0);
});

test("each consumer counts once: a category's devices and sub-devices not again", () => {
  const heatPump = area("heat_pump", "category", { energy: ["sensor.heat_pump"] });
  const inCategory = area("heat_pump_device", "device", { energy: ["sensor.heat_pump"] });
  const washer = area("washer", "device", { energy: ["sensor.washer"] }, { top_level: true });
  const drum = area("drum", "device", { energy: ["sensor.drum"] }, { top_level: false });
  const other = area("other", "other", { energy: ["other"] });
  const info = infoOf([household, grid, heatPump, inCategory, washer, drum, other]);

  const series = barSeries(info, household, "energy", "consumer", colors);

  assert.deepEqual(series.map((item) => item.id), ["heat_pump", "washer", "other"]);
  assert.equal(series.find((item) => item.id === "other")?.color, colors.other);
});

test("a device's saving includes the part by solar power", () => {
  const device = area("washer", "device", { saving: ["saving"], solar_saving: ["solar_saving"] });

  const [series] = barSeries(infoOf([device]), device, "saving", "none", colors);

  assert.equal(valueOf(series, { saving: 3, solar_saving: 2 }), 5);
});

test("a category stacks by consumer with several meters; its costs by source come last", () => {
  const one = area("wallbox", "category", { energy: ["a"], cost: ["c"], solar_cost: ["s"] });
  const two = area("heat_pump", "category", { energy: ["a", "b"], cost: ["c"], heat: ["h"], heat_meters: ["x"] });

  assert.deepEqual(stacksOf(one, "cost"), ["none", "source"]);
  assert.deepEqual(stacksOf(two, "energy"), ["consumer", "none"]);
  // One heat meter cannot be taken apart by device.
  assert.deepEqual(stacksOf(two, "heat"), ["none"]);
  assert.deepEqual(stacksOf(household, "cost"), ["consumer", "source", "bill", "none"]);
});

test("the heat pump's devices with heat meters count only when there are several", () => {
  const heatPump = area("heat_pump", "category", { energy: ["sensor.a", "sensor.b"] });
  const deviceA = area("a", "device", { energy: ["sensor.a"], heat: ["heat_a"] });
  const deviceB = area("b", "device", { energy: ["sensor.b"], heat: ["heat_b"] });
  const elsewhere = area("c", "device", { energy: ["sensor.c"], heat: ["heat_c"] });

  assert.deepEqual(heatDevices(infoOf([heatPump, deviceA, deviceB, elsewhere])).map((item) => item.id), ["a", "b"]);
  assert.deepEqual(heatDevices(infoOf([heatPump, deviceA, elsewhere])), []);
});

test("the bill's lines are its bars as a table: grid power or its levels, the standing charge", () => {
  const grid = area("grid", "grid", {
    energy: ["import_a", "import_b"],
    import_cost: ["import_cost"],
    standing_charge: ["standing_charge"],
  });
  const home = area("household", "household", {
    cheap: ["cheap"],
    cheap_cost: ["cheap_cost"],
    expensive: ["expensive"],
    expensive_cost: ["expensive_cost"],
  });
  const info = infoOf([home, grid]);
  assert.deepEqual(billStatistics(info, home).sort(), [
    "cheap",
    "cheap_cost",
    "expensive",
    "expensive_cost",
    "import_a",
    "import_b",
    "import_cost",
    "standing_charge",
  ]);
  const sumOf = (sums: Record<string, number>) => (ids: string[]) =>
    ids.reduce((total, id) => total + (sums[id] ?? 0), 0);
  const round = (bill: ReturnType<typeof billLines>) => ({
    lines: bill.lines.map((line) => [line.id, line.energy === null ? null : +line.energy.toFixed(1), +line.cost.toFixed(2)]),
    total: [+bill.total.energy.toFixed(1), +bill.total.cost.toFixed(2)],
  });

  // A time-of-use tariff: the cheap window and the rest, as on the bill
  // of 12 Sep to 11 Oct 2026 in the developer household.
  const tou = billLines(info, home, sumOf({
    import_a: 900, import_b: 63.9, import_cost: 256.54, standing_charge: 14.32, cheap: 367.9, cheap_cost: 67.23,
  }));
  assert.deepEqual(round(tou), {
    lines: [
      ["cheap", 367.9, 67.23],
      ["normal", 596, 189.31],
      ["standing_charge", null, 14.32],
    ],
    total: [963.9, 270.86],
  });

  // A flat price has no levels, and without a standing charge no such line.
  const flat = billLines(info, home, sumOf({ import_a: 500, import_cost: 150 }));
  assert.deepEqual(round(flat), { lines: [["grid", 500, 150]], total: [500, 150] });

  // A dynamic price: cheap and expensive hours, normal is the rest.
  const dynamic = billLines(info, home, sumOf({
    import_a: 400, import_cost: 120, cheap: 100, cheap_cost: 20, expensive: 50, expensive_cost: 20, standing_charge: 12,
  }));
  assert.deepEqual(round(dynamic).lines.map((line) => line[0]), ["cheap", "normal", "expensive", "standing_charge"]);
  assert.deepEqual(round(dynamic).lines[1], ["normal", 250, 80]);

  // Levels that do not occur in the period leave grid power alone.
  const none = billLines(info, home, sumOf({ import_a: 300, import_cost: 90, cheap: 0.01, standing_charge: 10 }));
  assert.deepEqual(round(none).lines.map((line) => line[0]), ["grid", "standing_charge"]);
});

test("the bill's values are exact, to check them against the supplier's bill", () => {
  const fmt = formatter({ language: "de", number_format: "decimal_comma" } as LocaleSettings, "EUR");
  assert.equal(fmt.exact(963.84, "energy"), "963,8 kWh");
  assert.equal(fmt.exact(270.86, "money"), "270,86\u00a0€");
  assert.equal(fmt.exact(1234.5, "money"), "1.234,50\u00a0€");
  // Elsewhere on the cards, large values stay round.
  assert.equal(fmt.value(270.86, "money"), "271\u00a0€");
});
