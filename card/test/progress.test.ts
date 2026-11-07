// How far the integration has computed the past, and what the cards say.

import assert from "node:assert/strict";
import { test } from "node:test";

import { calculatingText, durationText, localizer } from "../src/localize";
import { readCategories, readProgress } from "../src/model";
import type { FiguresInfo, HomeAssistant } from "../src/types";

const hass = (progress: unknown): HomeAssistant =>
  ({
    entities: {
      "sensor.balance": {
        entity_id: "sensor.balance",
        platform: "electricity_lens",
        translation_key: "balance",
      },
    },
    states: {
      "sensor.balance": { state: "unknown", attributes: { progress } },
    },
  }) as unknown as HomeAssistant;

const info = (progress: number | null): FiguresInfo => ({
  calculating: progress !== null,
  progress,
  levels: { cheap_until: null, expensive_from: null },
  areas: [],
});

test("the balance sensor tells the progress first", () => {
  assert.equal(readProgress(hass(40), info(10)), 40);
  assert.equal(readProgress(hass(null), info(10)), 10);
  assert.equal(readProgress(undefined, info(10)), 10);
  assert.equal(readProgress(hass(null), info(null)), null);
});

test("the text names the progress once it is known", () => {
  const t = localizer("de");
  assert.equal(calculatingText(t, 40), "Wird berechnet … 40 %");
  assert.equal(calculatingText(t, null), "Wird berechnet …");
  assert.equal(calculatingText(localizer("en"), 0), "Being computed … 0 %");
});

test("the time still to go is months below a year, else years", () => {
  const t = localizer("de");
  assert.equal(durationText(t, 0.72), "9 Monate");
  assert.equal(durationText(t, 0.01), "1 Monat");
  assert.equal(durationText(t, 2.4), "2 Jahre");
});

test("the PV plant's battery is read from its saving sensor", () => {
  const pv = (battery: unknown): HomeAssistant =>
    ({
      entities: {
        "sensor.pv_saving": { entity_id: "sensor.pv_saving", platform: "electricity_lens", translation_key: "saving" },
      },
      states: {
        "sensor.pv_saving": { state: "1200", attributes: { category: "pv", battery } },
      },
    }) as unknown as HomeAssistant;

  const [withBattery] = readCategories(pv({ saving: 300, investment: 5000, per_year: 250, payback: 6, years_left: 18.8 }));
  assert.deepEqual(withBattery.battery, { saving: 300, investment: 5000, perYear: 250, payback: 6, yearsLeft: 18.8 });
  assert.equal(readCategories(pv(undefined))[0].battery, null);
});
