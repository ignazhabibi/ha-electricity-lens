// The power right now: where it comes from, where it goes, and what the
// sentence above the bars says.

import assert from "node:assert/strict";
import { test } from "node:test";

import { powerFlow, powerSensors, readKw } from "../src/flow";
import type { FigureArea, FiguresInfo } from "../src/types";
import { colors } from "./palette";

const area = (id: string, kind: FigureArea["kind"], energy: string[], power: string[] = [], extra: Partial<FigureArea> = {}): FigureArea => ({
  id,
  kind,
  name: id,
  statistics: { energy },
  power,
  ...extra,
});

// The heat pump measures its power on one of its two meters, the car has
// none, the washer is a device of its own.
const info: FiguresInfo = {
  calculating: false,
  levels: { cheap: null, expensive: null },
  power: { grid: ["sensor.grid"], solar: ["sensor.solar"], battery: [] },
  areas: [
    area("household", "household", []),
    area("heat_pump", "category", ["sensor.heating", "sensor.hot_water"], ["sensor.hp"]),
    area("wallbox", "category", ["sensor.car"]),
    area("heating", "device", ["sensor.heating"], ["sensor.hp"], { top_level: true }),
    area("hot_water", "device", ["sensor.hot_water"], [], { top_level: true }),
    area("car", "device", ["sensor.car"], [], { top_level: true }),
    area("washer", "device", ["sensor.washer"], ["sensor.washer_power"], { top_level: true }),
    area("other", "other", []),
  ],
};

const flowOf = (kw: Record<string, number>, of: FiguresInfo = info) =>
  powerFlow(of, (entity) => (entity in kw ? kw[entity] : null), colors);

const parts = (list: { id: string; kw: number }[]) =>
  Object.fromEntries(list.map((part) => [part.id, Math.round(part.kw * 100) / 100]));

test("a sensor's power is read in kW by its unit", () => {
  const state = (value: string, unit?: string) => ({ entity_id: "sensor.x", state: value, attributes: { unit_of_measurement: unit } });
  assert.equal(readKw(state("1500", "W")), 1.5);
  assert.equal(readKw(state("2.5", "kW")), 2.5);
  assert.equal(readKw(state("unavailable", "W")), null);
  assert.equal(readKw(state("", "W")), null);
  assert.equal(readKw(state("12", "A")), null);
  assert.equal(readKw(undefined), null);
});

test("without a grid power sensor there is no flow", () => {
  const without = { ...info, power: { grid: [], solar: ["sensor.solar"], battery: [] } };
  assert.equal(powerSensors(without), undefined);
  assert.equal(flowOf({ "sensor.solar": 1 }, without), null);
  assert.equal(powerSensors({ ...info, power: undefined }), undefined);
  // A grid sensor that cannot be read gives no flow either.
  assert.equal(flowOf({ "sensor.solar": 1 }), null);
});

test("the watched sensors are each power sensor once", () => {
  assert.deepEqual(powerSensors(info), ["sensor.grid", "sensor.solar", "sensor.hp", "sensor.washer_power"]);
});

test("in the evening the grid covers most, and the rest is Other", () => {
  const flow = flowOf({ "sensor.grid": 3.4, "sensor.solar": 0.16, "sensor.hp": 1.2, "sensor.washer_power": 0 })!;
  assert.equal(Math.round(flow.home * 100) / 100, 3.56);
  assert.deepEqual(parts(flow.sources), { solar: 0.16, grid: 3.4 });
  // The heat pump counts once, as its category; the washer draws nothing.
  assert.deepEqual(parts(flow.uses), { heat_pump: 1.2, other: 2.36 });
  assert.equal(flow.summary.kind, "share");
  if (flow.summary.kind === "share") {
    assert.equal(flow.summary.by, "solar");
    assert.equal(Math.round(flow.summary.share * 100), 4);
    assert.equal(flow.summary.grid, 3.4);
  }
  assert.equal(flow.uses.find((part) => part.id === "heat_pump")?.color, "heat");
  assert.equal(flow.uses.find((part) => part.id === "heat_pump")?.entity, "sensor.hp");
});

test("at noon the surplus goes to the grid, and in equals out", () => {
  const flow = flowOf({ "sensor.grid": -1.2, "sensor.solar": 6.2, "sensor.hp": 0.8, "sensor.washer_power": 0.3 })!;
  assert.equal(Math.round(flow.home * 100) / 100, 5);
  assert.deepEqual(parts(flow.sources), { solar: 6.2 });
  assert.deepEqual(parts(flow.uses), { heat_pump: 0.8, washer: 0.3, other: 3.9, export: 1.2 });
  const sum = (list: { kw: number }[]) => list.reduce((total, part) => total + part.kw, 0);
  assert.equal(Math.round(sum(flow.sources) * 100), Math.round(sum(flow.uses) * 100));
  assert.deepEqual(flow.summary, { kind: "covered", by: "solar", export: 1.2, charge: 0 });
});

test("a battery gives and takes power on its own side", () => {
  const withBattery = { ...info, power: { ...info.power!, battery: ["sensor.battery"] } };
  const night = flowOf({ "sensor.grid": 0, "sensor.solar": 0, "sensor.battery": 0.9, "sensor.hp": 0 }, withBattery)!;
  assert.deepEqual(parts(night.sources), { battery: 0.9 });
  assert.equal(night.sources[0].color, "battery-out");
  assert.deepEqual(night.summary, { kind: "covered", by: "battery", export: 0, charge: 0 });
  const noon = flowOf({ "sensor.grid": -1, "sensor.solar": 5, "sensor.battery": -2, "sensor.hp": 0 }, withBattery)!;
  assert.deepEqual(parts(noon.uses), { other: 2, battery: 2, export: 1 });
  assert.equal(noon.uses.find((part) => part.id === "battery")?.color, "battery-in");
  assert.deepEqual(noon.summary, { kind: "covered", by: "solar", export: 1, charge: 2 });
});

test("all from the grid, and nothing at all", () => {
  assert.deepEqual(flowOf({ "sensor.grid": 0.5, "sensor.solar": 0 })!.summary, { kind: "grid" });
  // An inverter's draw at night is no negative solar power.
  assert.deepEqual(parts(flowOf({ "sensor.grid": 0.5, "sensor.solar": -0.004 })!.sources), { grid: 0.5 });
  assert.deepEqual(flowOf({ "sensor.grid": 0, "sensor.solar": 0 })!.summary, { kind: "idle" });
});

test("consumers that read more than the home never make Other negative", () => {
  // Sensors report at different moments.
  const flow = flowOf({ "sensor.grid": 1, "sensor.solar": 0, "sensor.hp": 1.3 })!;
  assert.deepEqual(parts(flow.uses), { heat_pump: 1.3 });
});
