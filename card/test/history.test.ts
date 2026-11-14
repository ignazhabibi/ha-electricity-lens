// The history chart: how long its bars are, where "all years" begins, and how
// the compared period stands next to the selection.

import assert from "node:assert/strict";
import { test } from "node:test";

import { barChart, shareChart, timeAxis } from "../src/chart";
import { fromFirstValue, meansPerSlot, periodOf, slotsOf, valuesPerSlot } from "../src/history";

const range = (from: Date, to: Date) => ({ start: from.getTime(), end: to.getTime() - 1 });

test("bars are as long as in Home Assistant's energy graphs", () => {
  assert.equal(periodOf(range(new Date(2026, 4, 3), new Date(2026, 4, 4))), "hour");
  assert.equal(periodOf(range(new Date(2026, 4, 3), new Date(2026, 4, 6))), "hour");
  assert.equal(periodOf(range(new Date(2026, 4, 3), new Date(2026, 4, 10))), "day");
  assert.equal(periodOf(range(new Date(2026, 4, 1), new Date(2026, 5, 1))), "day");
  assert.equal(periodOf(range(new Date(2026, 0, 1), new Date(2027, 0, 1))), "month");
  assert.equal(periodOf(range(new Date(2026, 0, 1), new Date(2026, 2, 1))), "month");
  // Not whole months: days, however long.
  assert.equal(periodOf(range(new Date(2026, 0, 5), new Date(2026, 3, 5))), "day");
  // The change to summer time (in Europe on 29 March 2026) costs no day.
  assert.equal(periodOf(range(new Date(2026, 2, 28), new Date(2026, 2, 31))), "hour");
  assert.equal(periodOf(range(new Date(2026, 2, 28), new Date(2026, 3, 1))), "day");
});

test("the day after the period stays out of the last bar", () => {
  // Home Assistant also returns the day that begins at the end asked for.
  const period = range(new Date(2026, 8, 12), new Date(2026, 9, 12));
  const slots = slotsOf(period, periodOf(period));
  const rows = [
    { start: new Date(2026, 8, 12).getTime(), change: 1, mean: 10 },
    { start: new Date(2026, 9, 11).getTime(), change: 2, mean: 20 },
    { start: new Date(2026, 9, 12).getTime(), change: 4, mean: 40 },
  ];
  assert.equal(slots.length, 30);
  const values = valuesPerSlot(rows, slots, "day");
  assert.equal(values[0], 1);
  assert.equal(values[29], 2);
  assert.equal(values.reduce<number>((sum, value) => sum + (value ?? 0), 0), 3);
  assert.equal(meansPerSlot(rows, slots, "day")[29], 20);
  // Months: the January after a year stays out of its December.
  const year = range(new Date(2025, 0, 1), new Date(2026, 0, 1));
  const months = slotsOf(year, "month");
  const monthly = [
    { start: new Date(2025, 11, 1).getTime(), change: 5 },
    { start: new Date(2026, 0, 1).getTime(), change: 7 },
  ];
  assert.equal(valuesPerSlot(monthly, months, "month")[11], 5);
});

test("all years begin with the first value of any series", () => {
  assert.equal(fromFirstValue([[null, null, 3, 4], [null, 0, null, 1]], 4), 1);
  assert.equal(fromFirstValue([[null, null]], 2), 0);
});

test("compared bars stand left, paler, and go with their legend entry", () => {
  const series = [{ id: "solar", name: "Solar", color: "#ff9800", values: [1, 2] }];
  const chart = barChart({
    slots: [0, 86_400_000],
    axis: { min: 0, max: 86_400_000, language: "en" },
    labels: ["1", "2"],
    series,
    compare: { series: [{ ...series[0], values: [3, 4] }], labels: ["a", "b"] },
    unit: "kWh",
    total: "Total",
    format: String,
    tick: String,
  });
  const bars = chart.data as Array<{ id: string; stack: string; color: string }>;
  assert.deepEqual(
    bars.map((bar) => [bar.id, bar.stack, bar.color]),
    [
      ["compare-solar", "compare", "#ff980032"],
      ["solar", "main", "#ff98007f"],
    ]
  );
  assert.deepEqual(chart.options.legend.data, [{ id: "solar", secondaryIds: ["compare-solar"], name: "Solar" }]);
});

test("the legend names only what occurs in the selection or the comparison", () => {
  const chart = barChart({
    slots: [0, 86_400_000],
    axis: { min: 0, max: 86_400_000, language: "en" },
    labels: ["1", "2"],
    series: [
      { id: "cheap", name: "Grid cheap", color: "#90caf9", values: [1, 2] },
      { id: "expensive", name: "Grid expensive", color: "#1565c0", values: [0, null] },
      { id: "solar", name: "Solar", color: "#ff9800", values: [0, 0] },
    ],
    compare: {
      series: [
        { id: "cheap", name: "Grid cheap", color: "#90caf9", values: [1, 1] },
        { id: "expensive", name: "Grid expensive", color: "#1565c0", values: [0, 0] },
        { id: "solar", name: "Solar", color: "#ff9800", values: [0.4, 0] },
      ],
      labels: ["a", "b"],
    },
    lines: [{ id: "price", name: "Avg. grid price", color: "#9e9e9e", values: [null, null], format: String }],
    unit: "kWh",
    total: "Total",
    format: String,
    tick: String,
  });
  assert.deepEqual(
    chart.options.legend.data.map((entry) => entry.id),
    ["cheap", "solar"]
  );
});

test("bars stand at their slot's start on a time axis, as Home Assistant's energy graphs", () => {
  const day = 86_400_000;
  const chart = barChart({
    slots: [0, day],
    axis: { min: 0, max: day, language: "en" },
    labels: ["1", "2"],
    series: [{ id: "grid", name: "Grid", color: "#488fc2", values: [1, null] }],
    lines: [{ id: "price", name: "Price", color: "#727272", values: [0.3, 0.2], format: String }],
    unit: "kWh",
    total: "Total",
    format: String,
    tick: String,
  });
  const [bars, line] = chart.data as Array<{ data: Array<{ value: unknown } | unknown[]> }>;
  assert.deepEqual(bars.data.map((item) => (item as { value: unknown }).value), [[0, 1], [day, null]]);
  assert.deepEqual(line.data, [[0, 0.3], [day, 0.2]]);
  // ha-chart-base labels a time axis by its range, as on Home Assistant's graphs.
  assert.equal((chart.options.xAxis as { type: string }).type, "time");
  assert.equal((chart.options.xAxis as { axisLabel?: unknown }).axisLabel, undefined);
});

test("months and years name themselves, January with its year", () => {
  const axis = timeAxis({
    min: new Date(2025, 10, 1).getTime(),
    max: new Date(2026, 1, 1).getTime(),
    period: "month",
    language: "en",
  }) as { axisLabel: { formatter: (value: number) => string } };
  assert.equal(axis.axisLabel.formatter(new Date(2025, 11, 1).getTime()), "December");
  assert.equal(axis.axisLabel.formatter(new Date(2026, 0, 1).getTime()), "{bold|January 2026}");
});

test("the compared period forms a paler inner ring", () => {
  const items = [
    { id: "solar", name: "Solar", color: "#ff9800", value: 3 },
    { id: "grid", name: "Grid", color: "#488fc2", value: 1 },
  ];
  const chart = shareChart({
    items,
    total: "Total",
    format: String,
    percent: String,
    centerColor: "#000",
    labelColor: "#000",
    hidden: new Set(["grid"]),
    compare: [1, 1],
  });
  const ids = (chart.data as Array<{ id: string; data: number[][] }>).map((series) => series.id);
  assert.deepEqual(ids, ["solar", "grid", "compare-solar", "compare-grid", "total"]);
  // A part hidden in the legend leaves both rings to the others.
  const compareGrid = (chart.data as Array<{ id: string; data: number[][] }>).find((s) => s.id === "compare-grid");
  assert.equal(compareGrid?.data[0][3], 0);
});
