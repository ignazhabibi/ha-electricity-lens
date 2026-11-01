// The color system of all Electricity Lens cards, in one place. It builds on
// Home Assistant's energy and graph colors, so themes that change them change
// the cards too, and gives every thing one color wherever it appears:
// - Grid power is one family; its price level is the lightness (cheap is
//   light, expensive dark), so no other hue is needed for it.
// - Individual devices take Home Assistant's graph colors (--graph-color-1,
//   --color-1, ...) in the order they are configured in the energy dashboard,
//   matching HA's own individual devices graph; "Other" is always neutral grey.
// - Categories (PV, heat pump, car) keep their energy colors.
// - Lines are quiet: ratios and prices in the secondary text color.
// ECharts cannot read CSS variables, so the colors are resolved here.

import type { FiguresInfo } from "./types";

export interface Palette {
  solar: string;
  grid: string;
  cheap: string;
  expensive: string;
  export: string;
  heat: string;
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

const GRAPH_FALLBACKS = [
  "#4269d0",
  "#f4bd4a",
  "#ff725c",
  "#6cc5b0",
  "#a463f2",
  "#ff8ab7",
  "#9c6b4e",
  "#97bbf5",
  "#01ab63",
  "#094bad",
  "#c99000",
  "#d84f3e",
];

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

/** The palette, with the theme's energy and graph colors as the element sees them. */
export function palette(element: Element): Palette {
  const style = getComputedStyle(element);
  const read = (variable: string, fallback: string) =>
    style.getPropertyValue(variable).trim() || fallback;
  const grid = read("--energy-grid-consumption-color", "#488fc2");
  const consumers = Array.from({ length: 54 }, (_, index) => {
    const n = index + 1;
    return (
      style.getPropertyValue(`--graph-color-${n}`).trim() ||
      style.getPropertyValue(`--color-${n}`).trim() ||
      GRAPH_FALLBACKS[index % GRAPH_FALLBACKS.length]
    );
  });
  return {
    solar: read("--energy-solar-color", "#ff9800"),
    grid,
    cheap: mix(grid, "white", 0.55),
    expensive: mix(grid, "black", 0.7),
    export: read("--energy-grid-return-color", "#8353d1"),
    heat: read("--energy-gas-color", "#8e021b"),
    car: read("--energy-non-fossil-color", "#0f9d58"),
    other:
      style.getPropertyValue("--history-unknown-color").trim() ||
      read("--disabled-color", "#bdbdbd"),
    line: read("--secondary-text-color", "#727272"),
    consumers,
  };
}

/** The color of each consumer: HA's graph colors in device order, category
 * colors for category areas, grey for "Other". */
export function consumerColors(info: FiguresInfo, colors: Palette): Map<string, string> {
  const result = new Map<string, string>();
  let next = 0;
  for (const area of info.areas) {
    if (area.kind === "other") {
      result.set(area.id, colors.other);
    } else if (area.kind === "device") {
      result.set(area.id, colors.consumers[next++ % colors.consumers.length]);
    } else if (area.id === "heat_pump") {
      result.set(area.id, colors.heat);
    } else if (area.id === "wallbox") {
      result.set(area.id, colors.car);
    }
  }
  return result;
}
