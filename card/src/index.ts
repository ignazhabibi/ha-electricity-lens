// Bundle entry: registers the cards of the Energy Lens integration.

import { EnergyPaybackBreakdownCardEditor } from "./breakdown-editor";
import { EnergyPaybackBreakdownCard } from "./energy-payback-breakdown-card";
import { EnergyPaybackCard } from "./energy-payback-card";
import { EnergyPaybackFiguresCard } from "./energy-payback-figures-card";
import { EnergyPaybackHistoryCard } from "./energy-payback-history-card";
import { EnergyPaybackFiguresCardEditor } from "./figures-editor";
import { EnergyPaybackHistoryCardEditor } from "./history-editor";
import { registerCards } from "./register";
import { EnergyPaybackDashboardStrategy } from "./strategy";

registerCards([
  {
    tag: "energy-lens-balance-card",
    card: EnergyPaybackCard,
    name: "Energy Lens balance",
    aliases: ["energy-payback-card"],
    description:
      "What your PV plant, heat pump, and electric car have saved, and when they pay off.",
  },
  {
    tag: "energy-lens-history-card",
    card: EnergyPaybackHistoryCard,
    name: "Energy Lens history",
    aliases: ["energy-payback-history-card"],
    description:
      "Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",
    editor: {
      tag: "energy-lens-history-card-editor",
      element: EnergyPaybackHistoryCardEditor,
    },
  },
  {
    tag: "energy-lens-figures-card",
    card: EnergyPaybackFiguresCard,
    name: "Energy Lens key figures",
    aliases: ["energy-payback-figures-card"],
    description:
      "Tiles with key figures for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",
    editor: {
      tag: "energy-lens-figures-card-editor",
      element: EnergyPaybackFiguresCardEditor,
    },
  },
  {
    tag: "energy-lens-breakdown-card",
    card: EnergyPaybackBreakdownCard,
    name: "Energy Lens breakdown",
    aliases: ["energy-payback-breakdown-card"],
    description:
      "Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",
    editor: {
      tag: "energy-lens-breakdown-card-editor",
      element: EnergyPaybackBreakdownCardEditor,
    },
  },
], [
  {
    type: "energy-lens",
    element: EnergyPaybackDashboardStrategy,
    name: "Energy Lens",
    description:
      "A finished energy dashboard with costs, electricity mix, solar, heat pump, car, and the balance.",
  },
]);
