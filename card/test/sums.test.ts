// The sums of statistics over a period, which every card adds up the same way.

import assert from "node:assert/strict";
import { test } from "node:test";

import { loadSums } from "../src/sums";
import type { HomeAssistant } from "../src/types";

const HOUR = 3_600_000;

type Rows = Record<string, Array<{ start: number | string; change?: number | null }>>;

/** A Home Assistant that answers the statistics query with rows, and keeps
 * the queries it was asked. */
function fakeHass(rows: Rows) {
  const queries: Array<Record<string, unknown>> = [];
  const hass = {
    callWS: async (message: Record<string, unknown>) => {
      queries.push(message);
      return rows;
    },
  } as unknown as HomeAssistant;
  return { hass, queries };
}

const range = (from: Date, to: Date) => ({ start: from.getTime(), end: to.getTime() - 1 });

test("without statistics nothing is asked", async () => {
  const { hass, queries } = fakeHass({});
  assert.deepEqual(await loadSums(hass, [], range(new Date(2026, 4, 3), new Date(2026, 4, 4))), {});
  assert.equal(queries.length, 0);
});

test("hours count exactly within the period", async () => {
  const day = range(new Date(2026, 4, 3), new Date(2026, 4, 4));
  const { hass, queries } = fakeHass({
    "stat:energy": [
      { start: day.start - HOUR, change: 100 },
      { start: day.start, change: 1 },
      { start: new Date(day.start + 12 * HOUR).toISOString(), change: 2 },
      { start: day.end + 1, change: 100 },
    ],
  });

  const sums = await loadSums(hass, ["stat:energy", "stat:missing"], day);

  assert.deepEqual(sums, { "stat:energy": 3, "stat:missing": 0 });
  assert.equal(queries[0].period, "hour");
  assert.deepEqual(queries[0].types, ["change"]);
  assert.equal(queries[0].end_time, new Date(day.end + 1).toISOString());
});

test("days begin at the server's midnight, a few hours off the browser's", async () => {
  const week = range(new Date(2026, 4, 4), new Date(2026, 4, 11));
  const serverMidnight = (day: number) => new Date(2026, 4, day).getTime() - 2 * HOUR;
  const { hass, queries } = fakeHass({
    "stat:energy": [
      { start: serverMidnight(3), change: 100 },
      ...[4, 5, 6, 7, 8, 9, 10].map((day) => ({ start: serverMidnight(day), change: 1 })),
      { start: serverMidnight(11), change: 100 },
      { start: serverMidnight(5) + HOUR, change: null },
    ],
  });

  const sums = await loadSums(hass, ["stat:energy"], week);

  assert.equal(queries[0].period, "day");
  assert.deepEqual(sums, { "stat:energy": 7 });
});

test("the day the clocks change counts once", async () => {
  // In Europe summer time begins on 29 March 2026: that day has 23 hours.
  const days = range(new Date(2026, 2, 27), new Date(2026, 3, 1));
  const { hass } = fakeHass({
    "stat:energy": [26, 27, 28, 29, 30, 31, 32].map((day) => ({
      start: new Date(2026, 2, day).getTime(),
      change: day >= 27 && day <= 31 ? 1 : 100,
    })),
  });

  assert.deepEqual(await loadSums(hass, ["stat:energy"], days), { "stat:energy": 5 });
});
