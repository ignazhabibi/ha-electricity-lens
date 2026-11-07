// A palette whose colors are their own names, so tests can tell them apart.

import type { Palette } from "../src/colors";

export const colors: Palette = {
  solar: "solar",
  grid: "grid",
  cheap: "cheap",
  expensive: "expensive",
  export: "export",
  batteryOut: "battery-out",
  batteryIn: "battery-in",
  standing: "standing",
  heat: "heat",
  car: "car",
  other: "other",
  line: "line",
  consumers: ["c1", "c2", "c3"],
};
