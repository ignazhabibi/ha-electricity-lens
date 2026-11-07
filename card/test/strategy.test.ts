// The dashboard strategy has no settings: the areas decide which views and
// cards there are.

import "./dom";

import assert from "node:assert/strict";
import { test } from "node:test";

import { localizer } from "../src/localize";
import { dashboardViews, type Sensors } from "../src/strategy";
import type { FigureArea, FiguresInfo } from "../src/types";

const t = localizer("en");

const area = (id: string, kind: FigureArea["kind"], statistics: FigureArea["statistics"] = {}, extra: Partial<FigureArea> = {}): FigureArea => ({
  id,
  kind,
  name: id,
  statistics,
  ...extra,
});

const infoOf = (areas: FigureArea[], power?: FiguresInfo["power"]): FiguresInfo => ({
  calculating: false,
  levels: { cheap_until: null, expensive_from: null },
  areas: [area("household", "household", { energy: ["stat:energy"] }), area("grid", "grid"), ...areas],
  ...(power ? { power } : {}),
});

type Card = Record<string, unknown>;
type View = { path: string; sections: Array<{ cards: Card[] }>; sidebar: { sections: Array<{ cards: Card[] }> } };

const views = (info: FiguresInfo, sensors?: Sensors) => dashboardViews(info, t, sensors) as unknown as View[];
const cardsOf = (view: View) => [...view.sections[0].cards, ...view.sidebar.sections[0].cards];
const typesOf = (view: View) => cardsOf(view).map((card) => card.type);
const viewOf = (all: View[], path: string) => {
  const view = all.find((item) => item.path === path);
  assert.ok(view, path);
  return view;
};

test("a household without solar power or categories has three views and no savings", () => {
  const all = views(infoOf([]));

  assert.deepEqual(all.map((view) => view.path), ["now", "household", "costs"]);
  const now = typesOf(viewOf(all, "now"));
  assert.ok(now.includes("custom:electricity-lens-history-card"));
  assert.ok(!now.includes("custom:electricity-lens-balance-card"));
  assert.ok(!now.includes("custom:electricity-lens-flow-card"));
  assert.ok(!typesOf(viewOf(all, "costs")).includes("custom:electricity-lens-savings-card"));
  assert.ok(!typesOf(viewOf(all, "household")).includes("energy-solar-graph"));
});

test("without devices and a second source, no card shows a single share", () => {
  const all = views(infoOf([]));

  const cards = all.flatMap(cardsOf);
  assert.ok(!cards.some((card) => card.stack === "consumer" || card.by === "consumer"));
  assert.ok(!cards.some((card) => card.by === "source"));
});

test("devices bring the costs by device, price levels the shares by source", () => {
  const device = area("device_washer", "device", { energy: ["sensor.washer"] });
  const info = { ...infoOf([device]), levels: { cheap_until: 0.2, expensive_from: null } };

  const all = views(info);

  const costs = cardsOf(viewOf(all, "costs"));
  assert.ok(costs.some((card) => card.stack === "consumer"));
  assert.ok(costs.some((card) => card.by === "consumer"));
  assert.ok(cardsOf(viewOf(all, "household")).some((card) => card.by === "source"));
});

test("the power flow stands on top where the grid has a power sensor", () => {
  const all = views(infoOf([], { grid: ["sensor.grid_power"], solar: [], battery: [] }));

  assert.equal(viewOf(all, "now").sections[0].cards[0].type, "custom:electricity-lens-flow-card");
});

test("heat pump and car bring their views, and the savings with them", () => {
  const all = views(
    infoOf([
      area("heat_pump", "category", { energy: ["sensor.heat_pump"] }),
      area("wallbox", "category", { energy: ["sensor.wallbox"] }),
    ])
  );

  assert.deepEqual(all.map((view) => view.path), ["now", "household", "costs", "heating", "charging"]);
  assert.ok(typesOf(viewOf(all, "now")).includes("custom:electricity-lens-balance-card"));
  assert.ok(typesOf(viewOf(all, "costs")).includes("custom:electricity-lens-savings-card"));
});

test("with a PV plant the price includes solar power, and the forecast shows as gauges", () => {
  const solar = area("solar", "solar", { saving: ["electricity_lens:pv_saving"] }, { forecast: true });
  const sensors: Sensors = {
    categories: ["pv"],
    investments: [],
    forecasts: [{ day: "tomorrow", entity: "sensor.electricity_lens_solar_forecast_tomorrow" }],
  };

  const all = views(infoOf([solar]), sensors);

  assert.ok(typesOf(viewOf(all, "household")).includes("energy-solar-graph"));
  const gauges = cardsOf(viewOf(all, "now")).filter((card) => card.type === "gauge");
  assert.deepEqual(gauges.map((card) => card.entity), ["sensor.electricity_lens_solar_forecast_tomorrow"]);
  const price = cardsOf(viewOf(all, "costs")).find((card) => card.figure === "price");
  assert.equal(price?.name, t("strategy.price_with_solar"));
});

test("several heat meters of the heat pump's devices share one card", () => {
  const meters = ["sensor.heating", "sensor.hot_water"];
  const heatPump = area("heat_pump", "category", { energy: meters, heat_meters: ["sensor.heat_a", "sensor.heat_b"] });
  const devices = meters.map((meter, index) =>
    area(`device_${index}`, "device", { energy: [meter], heat: [`stat:heat_${index}`] })
  );

  const withDevices = typesOf(viewOf(views(infoOf([heatPump, ...devices])), "heating"));
  const withoutDevices = cardsOf(viewOf(views(infoOf([heatPump])), "heating"));

  assert.ok(withDevices.includes("custom:electricity-lens-heat-meters-card"));
  assert.ok(!withoutDevices.some((card) => card.type === "custom:electricity-lens-heat-meters-card"));
  // Without devices of their own, the meters stand as bars instead.
  assert.equal(withoutDevices.filter((card) => card.display === "bars").length, 2);
});
