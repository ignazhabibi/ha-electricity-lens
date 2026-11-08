// Every title the dashboard shows, for households of every kind, in English and
// German, against titles.snapshot.md: a changed title shows in the pull
// request's diff. After an intended change: UPDATE_SNAPSHOT=1 npm test.

import "./dom";

import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { test } from "node:test";

import { breakdownTitle, type BreakdownCardConfig } from "../src/electricity-lens-breakdown-card";
import { figureLabel } from "../src/electricity-lens-figures-card";
import { historyTitle, type HistoryCardConfig } from "../src/electricity-lens-history-card";
import { localizer, type Localize } from "../src/localize";
import { dashboardViews, type Sensors } from "../src/strategy";
import type { FigureArea, FiguresInfo } from "../src/types";

const SNAPSHOT = new URL("../test/titles.snapshot.md", import.meta.url);

type Card = Record<string, unknown>;
type View = { title: string; sections: Array<{ cards: Card[] }>; sidebar: { sections: Array<{ cards: Card[] }> } };

const area = (
  id: string,
  kind: FigureArea["kind"],
  name: string,
  keys: string[],
  extra: Partial<FigureArea> = {}
): FigureArea => ({ id, kind, name, statistics: Object.fromEntries(keys.map((key) => [key, [`${id}:${key}`]])), ...extra });

interface Household {
  name: string;
  areas: (t: Localize) => FigureArea[];
  levels?: boolean;
  power?: boolean;
  sensors?: Sensors;
}

const base = () => [
  area("household", "household", "household", ["energy", "cost", "solar", "solar_cost"]),
  area("grid", "grid", "grid", ["energy", "import_cost", "standing_charge", "export", "feed_in"]),
];
const pv = area("solar", "solar", "PV", ["energy", "self_used", "saving"], { forecast: true, investment: true });
const washer = (t: Localize) => area("device_washer", "device", t("figure.energy") === "Verbrauch" ? "Waschmaschine" : "Washer", ["energy", "cost"], { top_level: true });
/** With a PV plant, a category's power is split into PV and grid power. */
const heatPump = (t: Localize, saving: boolean, solar: boolean) =>
  area("heat_pump", "category", t("category.heat_pump"), [
    "cost",
    "heat",
    "scop",
    ...(solar ? ["solar", "solar_cost"] : []),
    ...(saving ? ["saving", "alternative_cost", ...(solar ? ["solar_saving"] : [])] : []),
  ]);
const car = (t: Localize, saving: boolean, solar: boolean) =>
  area("wallbox", "category", t("category.wallbox"), [
    "energy",
    "cost",
    ...(solar ? ["solar", "solar_cost"] : []),
    ...(saving ? ["saving", "alternative_cost"] : []),
  ]);

/** The heat pump's meters as devices of the energy dashboard, with their heat. */
const heatPumpDevices = (t: Localize): FigureArea[] =>
  (t("figure.heat") === "Wärme" ? ["Heizung", "Warmwasser"] : ["Heating", "Hot water"]).map((name, index) => ({
    ...area(`device_heat_pump_${index}`, "device", name, ["cost", "heat"], { top_level: false }),
    statistics: { energy: [`sensor.heat_pump_${index}`], heat: [`sensor.heat_${index}`], cost: [`cost_${index}`] },
  }));

/** A heat pump with its meters; with heat meters its devices count heat too. */
const withMeters = (pump: FigureArea, meters: number, heatMeters: boolean): FigureArea => ({
  ...pump,
  statistics: {
    ...pump.statistics,
    energy: Array.from({ length: meters }, (_, index) => `sensor.heat_pump_${index}`),
    ...(heatMeters ? { heat_meters: Array.from({ length: meters }, (_, index) => `sensor.heat_${index}`) } : {}),
  },
});

const HOUSEHOLDS: Household[] = [
  { name: "Household only", areas: () => [] },
  { name: "Price levels and a device", areas: (t) => [washer(t)], levels: true },
  {
    name: "PV with an investment, a device, and a grid power sensor",
    areas: (t) => [pv, washer(t)],
    power: true,
    sensors: {
      categories: ["pv"],
      investments: [{ category: "pv", payback: "sensor.pv_payback", annualReturn: "sensor.pv_return" }],
      forecasts: [
        { day: "today", entity: "sensor.pv_today" },
        { day: "tomorrow", entity: "sensor.pv_tomorrow" },
      ],
    },
  },
  {
    name: "PV, a heat pump with two meters compared with gas, a car compared with a combustion car",
    areas: (t) => [pv, withMeters(heatPump(t, true, true), 2, true), car(t, true, true), ...heatPumpDevices(t)],
    levels: true,
    power: true,
    sensors: { categories: ["pv", "heat_pump", "wallbox"], investments: [], forecasts: [] },
  },
  {
    name: "A heat pump with two meters and heat meters that are no devices",
    areas: (t) => [withMeters(heatPump(t, true, false), 2, true)],
    sensors: { categories: ["heat_pump"], investments: [], forecasts: [] },
  },
  {
    name: "A heat pump with one meter in a new build, a second car without comparison",
    areas: (t) => [withMeters(heatPump(t, false, false), 1, false), car(t, false, false)],
  },
];

/** A card's title as it shows: its own, else the one the card gives itself. */
function titleOf(t: Localize, card: Card, info: FiguresInfo): string {
  const type = String(card.type).replace("custom:", "");
  if (card.title) return String(card.title);
  if (card.name) return String(card.name);
  const own = info.areas.find((item) => item.id === (card.area ?? "household"));
  switch (type) {
    case "electricity-lens-flow-card":
      return t("flow.title");
    case "electricity-lens-balance-card":
      return t("title");
    case "electricity-lens-savings-card":
      return t("savings_title");
    case "electricity-lens-heat-meters-card":
      return t("heat_meters_title");
    case "electricity-lens-history-card":
      return historyTitle(t, card as unknown as HistoryCardConfig, info);
    case "electricity-lens-breakdown-card":
      return breakdownTitle(t, card as unknown as BreakdownCardConfig, own);
    case "electricity-lens-figures-card":
      return own ? figureLabel(t, card.figure as never, own) : "?";
    default:
      // Home Assistant's own cards name themselves.
      return `(${type})`;
  }
}

function titles(): string {
  const lines = ["# Titles", "", "Written by card/test/titles.test.ts. Main column ‖ sidebar."];
  for (const language of ["en", "de"]) {
    const t = localizer(language);
    for (const household of HOUSEHOLDS) {
      const info: FiguresInfo = {
        calculating: false,
        levels: { cheap_until: household.levels ? 0.2 : null, expensive_from: null },
        areas: [...base(), ...household.areas(t)],
        ...(household.power ? { power: { grid: ["sensor.grid_power"], solar: [], battery: [] } } : {}),
      };
      lines.push("", `## ${language}: ${household.name}`, "");
      for (const view of dashboardViews(info, t, household.sensors) as unknown as View[]) {
        const main = view.sections[0].cards
          .filter((card) => card.type !== "energy-date-selection")
          .map((card) => titleOf(t, card, info));
        const sidebar = view.sidebar.sections[0].cards.map((card) => titleOf(t, card, info));
        lines.push(`- **${view.title}**: ${main.join(" · ")} ‖ ${sidebar.join(" · ")}`);
      }
    }
  }
  return `${lines.join("\n")}\n`;
}

test("the titles are the ones in titles.snapshot.md", () => {
  const now = titles();
  if (process.env.UPDATE_SNAPSHOT) writeFileSync(SNAPSHOT, now);
  assert.equal(now, readFileSync(SNAPSHOT, "utf8"));
});
