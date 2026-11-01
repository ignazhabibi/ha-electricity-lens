// Dashboard strategy of the Electricity Lens integration: a finished electricity
// dashboard from Home Assistant's energy cards and the integration's cards.
// It has no settings: it asks the integration which areas, categories, and
// price levels exist, and shows only the views that fit. Whoever wants more
// takes control of the dashboard and builds on with the same cards.

import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { Category, FigureArea, FiguresInfo, HomeAssistant } from "./types";

type Card = Record<string, unknown>;
type View = Record<string, unknown>;

const card = (type: string, options: Card = {}): Card => ({
  type: type.startsWith("electricity-lens") ? `custom:${type}` : type,
  ...options,
});

const full = { grid_options: { columns: "full" } };
const half = { grid_options: { columns: 6 } };
const wide = { grid_options: { columns: 12 } };

/** One key figure as a small card in the sidebar, two in a row. name
 * replaces the figure's name, for example without the area in its own view. */
const stat = (area: string, figure: string, options: Card = {}, name?: string): Card =>
  card("electricity-lens-figures-card", {
    tiles: [{ area, figure, ...(name ? { name } : {}) }],
    ...half,
    ...options,
  });

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

/** The integration's sensors the dashboard shows as they are. */
export interface Sensors {
  balance?: string;
  categories: Array<{ category: Category; saving?: string; payback?: string; perYear?: string }>;
}

/** Finds the balance and each category's sensors among the entities. */
export function findSensors(hass: HomeAssistant): Sensors {
  const entries = Object.values(hass.entities ?? {}).filter((entry) => entry.platform === DOMAIN);
  const sibling = (device: string | null | undefined, key: string) =>
    entries.find((entry) => entry.device_id === device && entry.translation_key === key)?.entity_id;
  const order: Category[] = ["pv", "heat_pump", "wallbox"];
  const categories = entries
    .filter((entry) => entry.translation_key === "saving")
    .map((entry) => ({
      category: hass.states[entry.entity_id]?.attributes.category as Category,
      saving: entry.entity_id,
      payback: sibling(entry.device_id, "payback"),
      perYear: sibling(entry.device_id, "saving_per_year"),
    }))
    .filter((item) => order.includes(item.category))
    .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  return {
    balance: entries.find((entry) => entry.translation_key === "balance")?.entity_id,
    categories,
  };
}

/** The views, one question each; every card has one home. Only the
 * overview repeats headline figures, and only for today. */
export function dashboardViews(info: FiguresInfo, t: Localize, sensors: Sensors = { categories: [] }): View[] {
  type Key = Parameters<Localize>[0];
  /** A figure in the view of its own area, named without the area. */
  const own = (area: string, figure: string, options: Card = {}): Card =>
    stat(area, figure, options, t(`figure.${figure}` as Key));
  const named = (area: string, figure: string, key: Key, options: Card = {}): Card =>
    stat(area, figure, options, t(key));
  const titled = (type: string, key: Key, options: Card = {}) =>
    card(type, { title: t(key), ...options });
  const has = (id: string): FigureArea | undefined =>
    info.areas.find((area) => area.id === id);
  const levels = info.levels.cheap_until !== null;
  const solar = has("solar");
  const heatPump = has("heat_pump");
  const car = has("wallbox");
  const devices = info.areas.some((area) => area.kind === "device");
  const savings = Boolean(solar?.statistics.saving?.length || heatPump || car || sensors.categories.length);
  const balance = sensors.balance && sensors.categories.length ? sensors.balance : undefined;
  const today = { period: "today" };
  const sourceHistory = (area: string, options: Card = {}) =>
    card("electricity-lens-history-card", { area, figure: "energy", stack: "source", line: "price", ...options });
  const ring = (area: string) =>
    card("electricity-lens-breakdown-card", { area, by: "source", ...wide });
  const views: View[] = [];

  views.push(
    view(
      t("strategy.overview"),
      "now",
      [card("energy-distribution"), sourceHistory("household", today)],
      [
        named("household", "cost", "strategy.cost_today", today),
        named("household", "solar_share", "strategy.self_sufficiency_today", today),
        solar
          ? named("solar", "energy", "strategy.solar_today", today)
          : named("household", "energy", "strategy.consumption_today", today),
        ...(balance
          ? [
              card("electricity-lens-figures-card", {
                tiles: [{ entity: balance, name: t("strategy.balance"), secondary: "none" }],
                ...half,
              }),
            ]
          : []),
        ...(solar?.forecast ? [own("solar", "forecast_today"), own("solar", "forecast_tomorrow")] : []),
      ],
      false
    )
  );

  views.push(
    view(
      t("strategy.electricity"),
      "household",
      [
        titled("energy-usage-graph", "strategy.usage_graph"),
        ...(solar ? [titled("energy-solar-graph", "strategy.solar_graph")] : []),
        ...(devices
          ? [
              card("electricity-lens-history-card", {
                title: t("strategy.devices_graph"),
                area: "household",
                figure: "energy",
                stack: "consumer",
              }),
            ]
          : []),
      ],
      [
        titled("energy-distribution", "strategy.distribution", wide),
        ring("household"),
        ...(solar ? [card("energy-self-sufficiency-gauge", half), card("energy-solar-consumed-gauge", half)] : []),
      ]
    )
  );

  views.push(
    view(
      t("strategy.costs"),
      "costs",
      [
        card("electricity-lens-history-card", { area: "household", figure: "cost", stack: "consumer", line: "price" }),
        card("electricity-lens-breakdown-card", {
          area: "household",
          by: "consumer",
          figure: "cost",
          display: "bars",
          color_by_source: true,
        }),
        ...(savings ? [card("electricity-lens-history-card"), card("electricity-lens-balance-card")] : []),
      ],
      [
        named("grid", "cost", "strategy.bill", wide),
        own("household", "price"),
        own("household", levels ? "cheap_share" : "solar_share"),
        ...sensors.categories.map((item) =>
          card("electricity-lens-figures-card", {
            title: t(`category.${item.category}`),
            columns: 3,
            tiles: [
              { entity: item.saving, name: t("figure.saving"), secondary: "none" },
              { entity: item.payback, name: t("strategy.paid_back"), secondary: "none" },
              { entity: item.perYear, name: t("strategy.per_year"), secondary: "none" },
            ].filter((tile) => tile.entity),
            ...wide,
          })
        ),
      ]
    )
  );

  if (heatPump) {
    views.push(
      view(
        t("strategy.heating"),
        "heating",
        [
          card("electricity-lens-history-card", { area: "heat_pump", figure: "heat", stack: "consumer", line: "scop" }),
          sourceHistory("heat_pump"),
          card("electricity-lens-history-card", { area: "heat_pump", figure: "cost", stack: "consumer", line: "price" }),
          card("electricity-lens-history-card", { area: "heat_pump", figure: "saving", stack: "consumer" }),
        ],
        [
          own("heat_pump", "scop"),
          own("heat_pump", "heat_price"),
          own("heat_pump", "price"),
          own("heat_pump", "saving"),
          ring("heat_pump"),
          ...((heatPump.statistics.energy?.length ?? 0) > 1
            ? [
                card("electricity-lens-breakdown-card", {
                  area: "heat_pump",
                  by: "consumer",
                  figure: "energy",
                  display: "bars",
                  color_by_source: true,
                  ...wide,
                }),
              ]
            : []),
          ...((heatPump.statistics.heat_meters?.length ?? 0) > 1
            ? [
                card("electricity-lens-breakdown-card", {
                  title: t("figure.heat"),
                  statistics: (heatPump.statistics.heat_meters ?? []).map((statistic) => ({ statistic })),
                  display: "bars",
                  ...wide,
                }),
              ]
            : []),
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
          sourceHistory("wallbox"),
          card("electricity-lens-history-card", { area: "wallbox", figure: "distance", line: "cost_per_100km" }),
          card("electricity-lens-history-card", { area: "wallbox", figure: "cost", line: "price" }),
          card("electricity-lens-history-card", { area: "wallbox", figure: "saving" }),
        ],
        [
          own("wallbox", "cost_per_100km"),
          own("wallbox", "distance"),
          own("wallbox", "price"),
          own("wallbox", "saving"),
          ring("wallbox"),
        ]
      )
    );
  }
  return views;
}

export class ElectricityLensDashboardStrategy extends HTMLElement {
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
    return { title: t("strategy.title"), views: dashboardViews(info, t, findSensors(hass)) };
  }
}
