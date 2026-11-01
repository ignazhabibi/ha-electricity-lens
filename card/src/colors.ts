// The color system of all Energy Lens cards, in one place. It builds on
// Home Assistant's energy colors, so themes that change them change the
// cards too, and gives every thing one color wherever it appears:
// - Grid power is one family; its price level is the lightness (cheap is
//   light, expensive dark), so no other hue is needed for it.
// - A device that belongs to a category wears the category's color: the
//   heat pump's devices its red, the car's its green.
// - Other devices take a fixed order of colors that no source or category
//   uses; "Other" is always neutral grey.
// - Lines are quiet: ratios and prices in the secondary text color.
// ECharts cannot read CSS variables, so the colors are resolved here.

import type { FigureArea, FiguresInfo } from "./types";

export interface Palette {
  solar: string;
  grid: string;
  cheap: string;
  expensive: string;
  export: string;
  heat: string;
  heatLight: string;
  car: string;
  other: string;
  line: string;
  consumers: string[];
}

/** The same colors for CSS, where variables work directly. */
export const CSS_COLORS = {
  solar: "var(--energy-solar-color, #ff9800)",
  grid: "var(--energy-grid-consumption-color, #488fc2)",
  cheap: "color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 55%, #fff)",
  expensive: "color-mix(in srgb, var(--energy-grid-consumption-color, #488fc2) 70%, #000)",
  export: "var(--energy-grid-return-color, #8353d1)",
  heat: "var(--energy-gas-color, #8e021b)",
  car: "var(--energy-non-fossil-color, #0f9d58)",
} as const;

const HOT_WATER = /warm\s*wasser|hot\s*water|dhw|eau chaude/i;

const CONSUMERS = ["#76b7b2", "#b07aa1", "#9c755f", "#ff9da7", "#bab0ac", "#a3a948"];

type Rgb = [number, number, number];

function parse(color: string): Rgb | undefined {
  const value = color.trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value)?.[1];
  if (hex) {
    const full = hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
  }
  const rgb = /^rgba?\(([^)]+)\)/i.exec(value)?.[1];
  if (rgb) {
    const [r, g, b] = rgb.split(/[ ,/]+/).filter(Boolean).map(Number);
    if ([r, g, b].every(Number.isFinite)) return [r, g, b];
  }
  return undefined;
}

const hex = ([r, g, b]: Rgb): string =>
  `#${[r, g, b].map((v) => Math.round(Math.min(Math.max(v, 0), 255)).toString(16).padStart(2, "0")).join("")}`;

/** A color mixed with white or black, weight being the color's share. */
export function mix(color: string, other: "white" | "black", weight: number): string {
  const rgb = parse(color);
  if (!rgb) return color;
  const target = other === "white" ? 255 : 0;
  return hex(rgb.map((v) => v * weight + target * (1 - weight)) as Rgb);
}

/** The palette, with the theme's energy colors as the element sees them. */
export function palette(element: Element): Palette {
  const style = getComputedStyle(element);
  const read = (variable: string, fallback: string) =>
    style.getPropertyValue(variable).trim() || fallback;
  const grid = read("--energy-grid-consumption-color", "#488fc2");
  const heat = read("--energy-gas-color", "#8e021b");
  return {
    solar: read("--energy-solar-color", "#ff9800"),
    grid,
    cheap: mix(grid, "white", 0.55),
    expensive: mix(grid, "black", 0.7),
    export: read("--energy-grid-return-color", "#8353d1"),
    heat,
    heatLight: mix(heat, "white", 0.6),
    car: read("--energy-non-fossil-color", "#0f9d58"),
    other: read("--disabled-color", "#bdbdbd"),
    line: read("--secondary-text-color", "#727272"),
    consumers: CONSUMERS,
  };
}

/** The category a device belongs to, and its place among the category's
 * meters, in the order they were set up. */
function categoryOf(
  info: FiguresInfo,
  device: FigureArea
): { id: string; index: number } | undefined {
  const meter = device.statistics.energy?.[0];
  for (const area of info.areas) {
    const index = meter && area.kind === "category" ? (area.statistics.energy ?? []).indexOf(meter) : -1;
    if (index >= 0) return { id: area.id, index };
  }
  return undefined;
}

/** The color of each consumer: category colors for their devices, a fixed
 * order for the others, grey for "Other". */
export function consumerColors(info: FiguresInfo, colors: Palette): Map<string, string> {
  const result = new Map<string, string>();
  const anyHotWater = info.areas.some(
    (area) => area.kind === "device" && categoryOf(info, area)?.id === "heat_pump" && HOT_WATER.test(area.name)
  );
  let next = 0;
  for (const area of info.areas) {
    if (area.kind === "other") {
      result.set(area.id, colors.other);
    } else if (area.kind === "device") {
      const category = categoryOf(info, area);
      if (category?.id === "heat_pump") {
        // Heating takes the full color, hot water the light one: by its name
        // where it says so, otherwise by the order the meters were set up.
        const hotWater = HOT_WATER.test(area.name) || (!anyHotWater && category.index > 0);
        result.set(area.id, hotWater ? colors.heatLight : colors.heat);
      } else if (category?.id === "wallbox") {
        result.set(area.id, colors.car);
      } else {
        result.set(area.id, colors.consumers[next++ % colors.consumers.length]);
      }
    } else if (area.id === "heat_pump") {
      result.set(area.id, colors.heat);
    } else if (area.id === "wallbox") {
      result.set(area.id, colors.car);
    }
  }
  return result;
}
