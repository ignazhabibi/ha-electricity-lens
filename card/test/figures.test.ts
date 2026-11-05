// The key figures: what they need, and how value and line follow from the sums.

import assert from "node:assert/strict";
import { test } from "node:test";

import { figuresOf, statisticsOf, valueOf, type Figure } from "../src/figures";
import type { FigureArea } from "../src/types";

const area = (
  kind: FigureArea["kind"],
  keys: string[],
  extra: Partial<FigureArea> = {}
): FigureArea => ({
  id: kind,
  kind,
  name: kind,
  statistics: Object.fromEntries(keys.map((key) => [key, [`stat:${key}`]])),
  ...extra,
});

const value = (figure: Figure, of: FigureArea, sums: Record<string, number>, forecast: number | null = null) =>
  valueOf(figure, of, (key) => (key in sums ? sums[key] : null), forecast);

test("a figure exists only with its statistics", () => {
  const figures = figuresOf(area("grid", ["import_cost", "standing_charge", "energy"]));
  assert.ok(figures.includes("bill"));
  assert.ok(figures.includes("grid_price"));
  assert.ok(!figures.includes("cost"));
});

test("forecast and investment figures exist by the area's flags", () => {
  assert.ok(!figuresOf(area("solar", ["energy"])).includes("forecast_today"));
  assert.ok(figuresOf(area("solar", [], { forecast: true })).includes("forecast_tomorrow"));
  assert.ok(!figuresOf(area("category", [])).includes("payback"));
  const invested = figuresOf(area("category", [], { investment: true }));
  assert.ok(invested.includes("payback") && invested.includes("annual_return"));
});

test("a figure loads what its line needs, where the area has it", () => {
  assert.deepEqual(statisticsOf(area("category", ["saving", "solar_saving"]), "saving"), [
    "stat:saving",
    "stat:solar_saving",
  ]);
  assert.deepEqual(statisticsOf(area("solar", ["saving"]), "saving"), ["stat:saving"]);
});

test("the saving includes the part by solar power and names it", () => {
  const of = area("category", ["saving", "solar_saving"]);
  const result = value("saving", of, { saving: 100, solar_saving: 25 });
  assert.equal(result.value, 125);
  assert.equal(result.line?.key, "line_saving_split");
  assert.equal(result.line?.values.solar.value, 25);
  assert.equal(value("saving", of, { saving: 100, solar_saving: 0 }).line, undefined);
  assert.equal(value("saving", area("solar", ["saving"]), { saving: 100 }).value, 100);
});

test("the bill is the imports and the standing charge, without the feed-in", () => {
  const of = area("grid", ["import_cost", "standing_charge"]);
  const result = value("bill", of, { import_cost: 400, standing_charge: 14, feed_in: 16 });
  assert.equal(result.value, 414);
  assert.equal(result.line?.key, "line_bill");
  assert.equal(value("bill", of, { import_cost: 400, standing_charge: 0 }).line, undefined);
  assert.equal(value("bill", of, { import_cost: 400 }).value, null);
});

test("grid costs name the standing charge, else the feed-in", () => {
  const of = area("grid", ["cost", "feed_in", "standing_charge"]);
  const charged = value("cost", of, { cost: 398, feed_in: 16, standing_charge: 14 });
  assert.equal(charged.value, 398);
  assert.equal(charged.line?.key, "line_bill");
  const free = value("cost", of, { cost: 384, feed_in: 16, standing_charge: 0 });
  assert.equal(free.line?.key, "line_bill_no_charge");
});

test("the household's costs show the average price", () => {
  const result = value("cost", area("household", ["cost"]), { cost: 50, energy: 200, solar: 20 });
  assert.equal(result.line?.key, "line_average_price");
  assert.equal(result.line?.values.price.value, 0.25);
});

test("a device's grid price divides its grid costs by its grid power", () => {
  const of = area("device", ["cost", "solar_cost", "energy", "solar"]);
  const result = value("device_grid_price", of, { cost: 40, solar_cost: 10, energy: 200, solar: 100 });
  assert.equal(result.value, 0.3);
  assert.equal(value("device_grid_price", of, { cost: 5, solar_cost: 5, energy: 100, solar: 100 }).value, null);
});

test("consumption shows its parts for the household, its solar share for a device", () => {
  const sums = { energy: 200, solar: 50 };
  const household = value("energy", area("household", ["energy"]), sums);
  assert.equal(household.line?.key, "line_energy_parts");
  assert.equal(household.line?.values.grid.value, 150);
  const device = value("energy", area("device", ["energy"]), sums);
  assert.equal(device.line?.key, "line_solar_part");
  assert.equal(device.line?.values.percent.value, 25);
});

test("shares are parts of their whole and unknown without one", () => {
  const of = area("household", ["energy", "solar"]);
  assert.equal(value("solar_share", of, { energy: 200, solar: 50 }).value, 25);
  assert.equal(value("solar_share", of, { energy: 0, solar: 0 }).value, null);
  const cheap = value("cheap_share", of, { energy: 200, solar: 50, cheap: 75 });
  assert.equal(cheap.value, 50);
  assert.equal(cheap.line?.values.whole.value, 150);
});

test("heat figures divide by electricity and by heat", () => {
  const of = area("category", ["heat", "energy", "cost"]);
  assert.equal(value("scop", of, { heat: 300, energy: 100 }).value, 3);
  assert.equal(value("heat_price", of, { heat: 300, cost: 30 }).value, 0.1);
});

test("costs per 100 km divide by the distance", () => {
  const of = area("category", ["distance", "cost"]);
  assert.equal(value("cost_per_100km", of, { distance: 200, cost: 10 }).value, 5);
  assert.equal(value("cost_per_100km", of, { distance: 0, cost: 10 }).value, null);
});

test("a forecast shows what it is given", () => {
  assert.equal(value("forecast_today", area("solar", []), {}, 12).value, 12);
});
