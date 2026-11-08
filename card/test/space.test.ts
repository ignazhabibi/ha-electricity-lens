// Every card text, in every language, against the space of the place it stands
// in, as CONTEXT.md gives it. Widths are Roboto's, summed per character, as
// Home Assistant shows the cards; placeholders hold typical long values.

import assert from "node:assert/strict";
import { test } from "node:test";

import { languages, type Key } from "../src/localize";
import widths from "./roboto-widths.json";

type Weight = "400" | "500";

const width = (text: string, size: number, weight: Weight = "400"): number => {
  const table = widths[weight] as Record<string, number>;
  return [...text].reduce((sum, char) => sum + (table[char] ?? table.m), 0) * (size / 100);
};

/** Typical long values for the placeholders. */
const SAMPLES: Record<string, string> = {
  amount: "1.234 €",
  charge: "12,34 €",
  cost: "123,45 €",
  energy: "345,6 kWh",
  feed_in: "12,34 €",
  grid: "45,6 kWh",
  heat: "1.234 kWh",
  investment: "12.345 €",
  part: "123,4 kWh",
  percent: "45 %",
  price: "31,2 ct/kWh",
  solar: "45,6 kWh",
  time: "11 Monate",
  whole: "345,6 kWh",
  name: "Wärmepumpe",
  area: "Wärmepumpe",
  figure: "Stromkosten",
};

const fill = (text: string): string => text.replace(/\{(\w+)\}/g, (_, name: string) => SAMPLES[name] ?? name);

interface Place {
  size: number;
  weight?: Weight;
  budget: number;
  keys: Key[];
}

/** The places of CONTEXT.md and the texts that stand in them. */
const PLACES: Record<string, Place> = {
  "card title": {
    size: 24,
    budget: 280,
    keys: [
      "title",
      "savings_title",
      "heat_meters_title",
      "flow.title",
      "history_title",
      "breakdown_mix",
      "breakdown_cost_by_device",
      "breakdown_energy_by_device",
      "breakdown_heat_pump_by_device",
      "breakdown_statistics",
      "strategy.bill",
      "strategy.cost_by_source",
      "strategy.cost_history",
      "strategy.cost_distribution",
      "strategy.usage_graph",
      "strategy.solar_graph",
      "strategy.devices_graph",
      "strategy.distribution",
      "strategy.heat_distribution",
      "figure.heat",
      "figure.energy.heat_pump",
      "figure.cost.heat_pump",
      "figure.energy.wallbox",
      "figure.cost.wallbox",
    ],
  },
  "row next to numbers": {
    size: 14,
    budget: 150,
    keys: [
      "category.pv",
      "category.heat_pump",
      "category.wallbox",
      "battery_part",
      "total",
      "savings_pv",
      "savings_feed_in",
      "savings_total",
      "meters_consumer",
    ],
  },
  "row next to one number": {
    size: 14,
    budget: 230,
    keys: [
      "savings_instead_gas",
      "savings_instead_oil",
      "savings_instead_lpg",
      "savings_instead_pellets",
      "savings_instead_district_heating",
      "savings_instead_electric",
      "savings_instead_fuel",
      "figure_of",
      "savings_saved",
      "savings_part_heat_pump",
      "savings_part_wallbox",
      "savings_part_pv",
    ],
  },
  "key figure title": {
    size: 16,
    weight: "500",
    budget: 135,
    keys: [
      ...(Object.keys(languages.en) as Key[]).filter((key) => key.startsWith("figure.")),
      "strategy.cost_today",
      "strategy.consumption_today",
      "strategy.price_with_solar",
    ],
  },
  "line under a key figure": {
    size: 12,
    budget: 160,
    keys: [
      "line_saving_split",
      "line_bill",
      "line_bill_no_charge",
      "line_against_normal",
      "line_from_electricity",
      "line_heat_from",
      "line_charged",
      "line_solar_part",
      "line_energy_parts",
      "line_exported",
      "line_average_price",
      "line_for_import",
      "line_cost_for",
      "line_part_of",
      "line_payback",
      "line_payback_left",
      "line_return",
    ],
  },
  // The info icon takes 24 px of the title's room.
  "key figure title with info": {
    size: 16,
    weight: "500",
    budget: 111,
    keys: ["figure.price", "figure.heat_price", "strategy.price_with_solar", "category.pv", "category.heat_pump", "category.wallbox"],
  },
  "gauge name": { size: 15, budget: 120, keys: ["strategy.forecast_today", "strategy.forecast_tomorrow"] },
};

for (const [place, { size, weight, budget, keys }] of Object.entries(PLACES)) {
  test(`every ${place} fits its ${budget} px`, () => {
    const tooLong = Object.entries(languages).flatMap(([language, texts]) =>
      keys
        .map((key) => ({ key, text: fill(texts[key]) }))
        .map(({ key, text }) => ({ key, text, px: Math.round(width(text, size, weight)) }))
        .filter(({ px }) => px > budget)
        .map(({ key, text, px }) => `${language} ${key}: "${text}" ${px} px`)
    );
    assert.deepEqual(tooLong, []);
  });
}
