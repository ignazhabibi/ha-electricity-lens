// How far the integration has computed the past, and what the cards say.

import assert from "node:assert/strict";
import { test } from "node:test";

import { calculatingText, localizer } from "../src/localize";
import { readProgress } from "../src/model";
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
