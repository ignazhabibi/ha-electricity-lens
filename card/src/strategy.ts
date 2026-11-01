// Dashboard strategy of the Energy Lens integration: a finished energy
// dashboard from Home Assistant's energy cards and the integration's cards.
// It has no settings: it asks the integration which areas, categories, and
// price levels exist, and shows only the views that fit. Whoever wants more
// takes control of the dashboard and builds on with the same cards.

import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { FigureArea, FiguresInfo, HomeAssistant } from "./types";

type Card = Record<string, unknown>;
type View = Record<string, unknown>;

const card = (type: string, options: Card = {}): Card => ({
  type: type.startsWith("energy-lens") ? `custom:${type}` : type,
  ...options,
});

const full = { grid_options: { columns: "full" } };
const half = { grid_options: { columns: 6 } };
const wide = { grid_options: { columns: 12 } };

/** One key figure as a small card in the sidebar, two in a row. */
const stat = (area: string, figure: string, options: Card = {}): Card =>
  card("energy-lens-figures-card", { tiles: [{ area, figure }], ...half, ...options });

/** A view as the energy dashboards before it: the main column with the date
 * selection on top, and a sidebar with key figures and shares. Tabs show the
 * name only. */
const view = (
  title: string,
  path: string,
  main: Card[],
  sidebar: Card[],
  dateSelection = true
): View => ({
  title,
  path,
  type: "sections",
  max_columns: 3,
  sections: [
    {
      type: "grid",
      column_span: 2,
      cards: [
        ...(dateSelection ? [card("energy-date-selection", full)] : []),
        ...main.map((item) => ({ ...full, ...item })),
      ],
    },
  ],
  sidebar: { sections: [{ type: "grid", cards: sidebar }] },
});

/** The views for what the household has. */
export function dashboardViews(info: FiguresInfo, t: Localize): View[] {
  const has = (id: string): FigureArea | undefined =>
    info.areas.find((area) => area.id === id);
  const levels = info.levels.cheap_until !== null;
  const solar = has("solar");
  const heatPump = has("heat_pump");
  const car = has("wallbox");
  const pvSaving = !!solar?.statistics.saving;
  const categories = pvSaving || !!heatPump || !!car;
  const forecast = solar?.forecast
    ? [stat("solar", "forecast_today"), stat("solar", "forecast_tomorrow")]
    : [];
  const views: View[] = [];

  views.push(
    view(
      t("strategy.overview"),
      "overview",
      [
        card("energy-distribution"),
        ...(categories ? [card("energy-lens-balance-card")] : []),
      ],
      [
        stat("household", "cost", { period: "today" }),
        stat("household", "solar_share", { period: "today" }),
        ...(forecast.length
          ? forecast
          : [stat("household", "energy", { period: "today" }), stat("household", "price", { period: "today" })]),
      ],
      false
    )
  );

  views.push(
    view(
      t("strategy.consumption"),
      "consumption",
      [
        card("energy-usage-graph"),
        ...(solar ? [card("energy-solar-graph")] : []),
        card("energy-lens-history-card", {
          area: "household",
          figure: "energy",
          stack: "source",
          line: "price",
        }),
        card("energy-devices-detail-graph"),
      ],
      [
        card("energy-distribution", wide),
        card("energy-lens-breakdown-card", { area: "household", by: "source", ...wide }),
        card("energy-self-sufficiency-gauge", half),
        ...(solar ? [card("energy-solar-consumed-gauge", half)] : []),
        ...forecast,
      ]
    )
  );

  views.push(
    view(
      t("strategy.costs"),
      "costs",
      [
        card("energy-lens-history-card", {
          area: "household",
          figure: "cost",
          stack: "consumer",
          line: "price",
        }),
        card("energy-lens-breakdown-card", {
          area: "household",
          by: "consumer",
          figure: "cost",
          display: "bars",
          color_by_source: true,
        }),
        ...(categories ? [card("energy-lens-history-card")] : []),
      ],
      [
        stat("household", "price"),
        stat("grid", "cost"),
        stat("household", "solar_share"),
        stat("household", levels ? "cheap_share" : "cost"),
      ]
    )
  );

  if (heatPump) {
    views.push(
      view(
        t("strategy.heating"),
        "heating",
        [
          card("energy-lens-history-card", { area: "heat_pump", figure: "heat", line: "scop" }),
          card("energy-lens-history-card", {
            area: "heat_pump",
            figure: "energy",
            stack: "source",
            line: "price",
          }),
          card("energy-lens-history-card", { area: "heat_pump", figure: "saving" }),
        ],
        [
          stat("heat_pump", "scop"),
          stat("heat_pump", "heat_price"),
          stat("heat_pump", "price"),
          stat("heat_pump", "solar_share"),
          stat("heat_pump", "saving", wide),
        ]
      )
    );
  }

  if (car) {
    views.push(
      view(
        t("strategy.charging"),
        "charging",
        [
          card("energy-lens-history-card", {
            area: "wallbox",
            figure: "energy",
            stack: "source",
            line: "price",
          }),
          card("energy-lens-history-card", {
            area: "wallbox",
            figure: "distance",
            line: "cost_per_100km",
          }),
          card("energy-lens-history-card", { area: "wallbox", figure: "saving" }),
        ],
        [
          stat("wallbox", "cost_per_100km"),
          stat("wallbox", "price"),
          stat("wallbox", "solar_share"),
          stat("wallbox", "distance"),
          stat("wallbox", "saving", wide),
        ]
      )
    );
  }

  if (categories) {
    views.push(
      view(
        t("strategy.balance"),
        "balance",
        [card("energy-lens-balance-card"), card("energy-lens-history-card")],
        [
          ...(pvSaving ? [stat("solar", "saving", wide)] : []),
          ...(heatPump ? [stat("heat_pump", "saving", wide)] : []),
          ...(car ? [stat("wallbox", "saving", wide)] : []),
        ]
      )
    );
  }
  return views;
}

export class EnergyPaybackDashboardStrategy extends HTMLElement {
  /** The strategy has no settings. */
  static noEditor = true;

  static async generate(
    _config: Record<string, unknown>,
    hass: HomeAssistant
  ): Promise<{ title: string; views: View[] }> {
    const t = localizer(hass.locale?.language ?? hass.language ?? "en");
    let info: FiguresInfo;
    try {
      info = await hass.callWS<FiguresInfo>({ type: `${DOMAIN}/figures` });
    } catch {
      return {
        title: t("strategy.title"),
        views: [
          {
            title: t("strategy.title"),
            cards: [{ type: "markdown", content: t("strategy.not_loaded") }],
          },
        ],
      };
    }
    return { title: t("strategy.title"), views: dashboardViews(info, t) };
  }
}
