// Bundle entry: registers the cards of the Electricity Lens integration.

import { ElectricityLensBreakdownCardEditor } from "./breakdown-editor";
import { ElectricityLensBalanceCard } from "./electricity-lens-balance-card";
import { ElectricityLensBreakdownCard } from "./electricity-lens-breakdown-card";
import { ElectricityLensFiguresCard } from "./electricity-lens-figures-card";
import { ElectricityLensFlowCard } from "./electricity-lens-flow-card";
import { ElectricityLensHeatMetersCard } from "./electricity-lens-heat-meters-card";
import { ElectricityLensHistoryCard } from "./electricity-lens-history-card";
import { ElectricityLensSavingsCard } from "./electricity-lens-savings-card";
import { ElectricityLensFiguresCardEditor } from "./figures-editor";
import { ElectricityLensHistoryCardEditor } from "./history-editor";
import { registerCards } from "./register";
import { ElectricityLensSavingsCardEditor } from "./savings-editor";
import { ElectricityLensDashboardStrategy } from "./strategy";

registerCards([
  {
    tag: "electricity-lens-flow-card",
    card: ElectricityLensFlowCard,
    name: "Electricity Lens power flow",
    description:
      "Where the power comes from right now and where it goes, as two bars, from the energy dashboard's power sensors.",
  },
  {
    tag: "electricity-lens-balance-card",
    card: ElectricityLensBalanceCard,
    name: "Electricity Lens economics",
    description:
      "What your PV plant, heat pump, and electric car have saved, against what they cost.",
  },
  {
    tag: "electricity-lens-savings-card",
    card: ElectricityLensSavingsCard,
    name: "Electricity Lens savings",
    description:
      "What solar power, the heat pump, and the electric car saved in the selected period, as a table, or one area's saving reckoned up. Follows the energy date selection.",
    editor: {
      tag: "electricity-lens-savings-card-editor",
      element: ElectricityLensSavingsCardEditor,
    },
  },
  {
    tag: "electricity-lens-heat-meters-card",
    card: ElectricityLensHeatMetersCard,
    name: "Electricity Lens heat meters",
    description:
      "Heat, electricity, and seasonal COP of each of the heat pump's meters in the selected period. Follows the energy date selection.",
  },
  {
    tag: "electricity-lens-history-card",
    card: ElectricityLensHistoryCard,
    name: "Electricity Lens history",
    description:
      "Savings, consumption, or costs per period as bars, stacked by source or consumer, with lines. Follows the energy date selection.",
    editor: {
      tag: "electricity-lens-history-card-editor",
      element: ElectricityLensHistoryCardEditor,
    },
  },
  {
    tag: "electricity-lens-figures-card",
    card: ElectricityLensFiguresCard,
    name: "Electricity Lens key figures",
    description:
      "One key figure for a period: costs, solar share, cheap grid power, savings, or any statistic or entity.",
    editor: {
      tag: "electricity-lens-figures-card-editor",
      element: ElectricityLensFiguresCardEditor,
    },
  },
  {
    tag: "electricity-lens-breakdown-card",
    card: ElectricityLensBreakdownCard,
    name: "Electricity Lens breakdown",
    description:
      "Shares for a period as a ring or bars: the electricity mix, consumption or costs by consumer, or any statistics.",
    editor: {
      tag: "electricity-lens-breakdown-card-editor",
      element: ElectricityLensBreakdownCardEditor,
    },
  },
], [
  {
    type: "electricity-lens",
    element: ElectricityLensDashboardStrategy,
    name: "Electricity Lens",
    description:
      "A finished electricity dashboard with costs, electricity mix, solar, heat pump, car, and the balance.",
  },
]);
