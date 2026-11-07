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
import { localizer } from "./localize";
import { registerCards } from "./register";
import { ElectricityLensSavingsCardEditor } from "./savings-editor";
import { ElectricityLensDashboardStrategy } from "./strategy";

// The card picker has no hass to ask; Home Assistant sets the page's language.
const t = localizer(document.documentElement.lang || navigator.language || "en");

registerCards([
  {
    tag: "electricity-lens-flow-card",
    card: ElectricityLensFlowCard,
    name: t("picker.flow"),
    description: t("picker.flow.description"),
  },
  {
    tag: "electricity-lens-balance-card",
    card: ElectricityLensBalanceCard,
    name: t("picker.economics"),
    description: t("picker.economics.description"),
  },
  {
    tag: "electricity-lens-savings-card",
    card: ElectricityLensSavingsCard,
    name: t("picker.savings"),
    description: t("picker.savings.description"),
    editor: {
      tag: "electricity-lens-savings-card-editor",
      element: ElectricityLensSavingsCardEditor,
    },
  },
  {
    tag: "electricity-lens-heat-meters-card",
    card: ElectricityLensHeatMetersCard,
    name: t("picker.heat_meters"),
    description: t("picker.heat_meters.description"),
  },
  {
    tag: "electricity-lens-history-card",
    card: ElectricityLensHistoryCard,
    name: t("picker.history"),
    description: t("picker.history.description"),
    editor: {
      tag: "electricity-lens-history-card-editor",
      element: ElectricityLensHistoryCardEditor,
    },
  },
  {
    tag: "electricity-lens-figures-card",
    card: ElectricityLensFiguresCard,
    name: t("picker.figures"),
    description: t("picker.figures.description"),
    editor: {
      tag: "electricity-lens-figures-card-editor",
      element: ElectricityLensFiguresCardEditor,
    },
  },
  {
    tag: "electricity-lens-breakdown-card",
    card: ElectricityLensBreakdownCard,
    name: t("picker.breakdown"),
    description: t("picker.breakdown.description"),
    editor: {
      tag: "electricity-lens-breakdown-card-editor",
      element: ElectricityLensBreakdownCardEditor,
    },
  },
], [
  {
    type: "electricity-lens",
    element: ElectricityLensDashboardStrategy,
    name: t("picker.dashboard"),
    description: t("picker.dashboard.description"),
  },
]);
