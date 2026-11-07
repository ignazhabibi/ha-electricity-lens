// Where the household's power comes from right now and where it goes, from
// the power sensors the energy dashboard knows. Only sums and differences:
// the home is what the sources give minus what goes back, and "Other" is the
// home minus the consumers that have a power sensor.

import { consumerColors, type Palette } from "./colors";
import type { Key } from "./localize";
import type { FiguresInfo, HassEntityState } from "./types";

/** Below this a part shows as nothing, in kW: sensors are seldom exact to 10 W. */
export const MIN_KW = 0.01;

/** Power units of Home Assistant sensors, in kW. */
const IN_KW: Record<string, number> = { mW: 1e-6, W: 1e-3, kW: 1, MW: 1e3, GW: 1e6 };

/** A sensor's power in kW; null when it has no number or no known unit. */
export function readKw(state: HassEntityState | undefined): number | null {
  if (!state) return null;
  const value = Number(state.state);
  const factor = IN_KW[String(state.attributes.unit_of_measurement ?? "")];
  if (state.state === "" || !Number.isFinite(value) || factor === undefined) return null;
  return value * factor;
}

export interface FlowPart {
  id: string;
  name: { key: Key } | { text: string };
  color: string;
  kw: number;
  /** The sensor whose dialog the part opens, when it has exactly one. */
  entity?: string;
}

/** What the sentence above the bars says. */
export type FlowSummary =
  | { kind: "idle" }
  | { kind: "grid" }
  | { kind: "share"; by: Own; share: number; grid: number }
  | { kind: "covered"; by: Own; export: number; charge: number };

export type Own = "solar" | "battery" | "both";

export interface Flow {
  /** Where the power comes from, in kW. */
  sources: FlowPart[];
  /** Where it goes, in kW. */
  uses: FlowPart[];
  /** What the home uses. */
  home: number;
  summary: FlowSummary;
}

/** The energy dashboard's power sensors, or undefined without one for the grid. */
export function powerSensors(info: FiguresInfo | null | undefined): string[] | undefined {
  const power = info?.power;
  if (!power?.grid.length) return undefined;
  const consumers = info!.areas.flatMap((area) => area.power ?? []);
  return [...new Set([...power.grid, ...power.solar, ...power.battery, ...consumers])];
}

/** The flow right now; null without a grid power sensor that can be read. */
export function powerFlow(
  info: FiguresInfo,
  kwOf: (entity: string) => number | null,
  colors: Palette
): Flow | null {
  const power = info.power;
  if (!power?.grid.length) return null;
  const readings = (entities: string[]) =>
    entities.map(kwOf).filter((value): value is number => value !== null);
  const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
  const grids = readings(power.grid);
  if (!grids.length) return null;
  const grid = sum(grids);
  // An inverter may draw a little at night; it is no solar power.
  const solar = Math.max(sum(readings(power.solar)), 0);
  const battery = sum(readings(power.battery));
  const gridIn = Math.max(grid, 0);
  const exported = Math.max(-grid, 0);
  const batteryOut = Math.max(battery, 0);
  const batteryIn = Math.max(-battery, 0);
  const home = Math.max(solar + gridIn + batteryOut - exported - batteryIn, 0);

  const single = (entities: string[]) => (entities.length === 1 ? entities[0] : undefined);
  const sources: FlowPart[] = [
    { id: "solar", name: { key: "source.solar" }, color: colors.solar, kw: solar, entity: single(power.solar) },
    { id: "battery", name: { key: "flow.battery" }, color: colors.batteryOut, kw: batteryOut, entity: single(power.battery) },
    { id: "grid", name: { key: "source.grid" }, color: colors.grid, kw: gridIn, entity: single(power.grid) },
  ];

  // The consumers as in the consumption by device: the categories, the
  // devices outside them, and the rest as "Other".
  const consumers = consumerColors(info, colors);
  const covered = new Set(
    info.areas.filter((area) => area.kind === "category").flatMap((area) => area.statistics.energy ?? [])
  );
  const measured: FlowPart[] = info.areas
    .filter(
      (area) =>
        area.kind === "category" ||
        (area.kind === "device" &&
          area.top_level !== false &&
          !area.statistics.energy?.some((stat) => covered.has(stat)))
    )
    .flatMap((area) => {
      const values = readings(area.power ?? []);
      if (!values.length) return [];
      return [
        {
          id: area.id,
          name: { text: area.name },
          color: consumers.get(area.id) ?? colors.other,
          kw: Math.max(sum(values), 0),
          entity: single(area.power ?? []),
        },
      ];
    });
  const other = info.areas.find((area) => area.kind === "other");
  const uses: FlowPart[] = [
    ...measured,
    {
      id: "other",
      name: other ? { text: other.name } : { key: "flow.other" },
      color: colors.other,
      kw: Math.max(home - sum(measured.map((part) => part.kw)), 0),
    },
    { id: "battery", name: { key: "flow.battery" }, color: colors.batteryIn, kw: batteryIn, entity: single(power.battery) },
    { id: "export", name: { key: "source.export" }, color: colors.export, kw: exported, entity: single(power.grid) },
  ];

  const shown = (parts: FlowPart[]) => parts.filter((part) => part.kw >= MIN_KW);
  return { sources: shown(sources), uses: shown(uses), home, summary: summaryOf(home, solar, batteryOut, gridIn, exported, batteryIn) };
}

function summaryOf(
  home: number,
  solar: number,
  batteryOut: number,
  gridIn: number,
  exported: number,
  batteryIn: number
): FlowSummary {
  const own = solar + batteryOut;
  if (home < MIN_KW && own < MIN_KW && gridIn < MIN_KW) return { kind: "idle" };
  const by: Own =
    solar >= MIN_KW && batteryOut >= MIN_KW ? "both" : batteryOut >= MIN_KW ? "battery" : "solar";
  if (gridIn < MIN_KW) {
    return {
      kind: "covered",
      by,
      export: exported >= MIN_KW ? exported : 0,
      charge: batteryIn >= MIN_KW ? batteryIn : 0,
    };
  }
  // What the home's own power covers; with grid power it is never all of it.
  const share = home > 0 ? Math.min(Math.max(home - gridIn, 0) / home, 0.99) : 0;
  if (share < 0.005) return { kind: "grid" };
  return { kind: "share", by, share, grid: gridIn };
}
