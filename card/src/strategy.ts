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
    area,
    figure,
    ...(name ? { name } : {}),
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

/** The integration's sensors the dashboard needs to know of. */
export interface Sensors {
  categories: Category[];
}

/** Finds the categories among the entities. */
export function findSensors(hass: HomeAssistant): Sensors {
  const entries = Object.values(hass.entities ?? {}).filter((entry) => entry.platform === DOMAIN);
  const order: Category[] = ["pv", "heat_pump", "wallbox"];
  const categories = entries
    .filter((entry) => entry.translation_key === "saving")
    .map((entry) => hass.states[entry.entity_id]?.attributes.category as Category)
    .filter((category) => order.includes(category));
  return { categories };
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
  const today = { period: "today" };
  // With a PV plant the price of a kWh includes its solar power; the name says so.
  const priceLine = {
    line: "price",
    ...(solar ? { line_name: t("strategy.price_with_solar") } : {}),
  };
  const price = (area: string, options: Card = {}): Card =>
    solar ? named(area, "price", "strategy.price_with_solar", options) : own(area, "price", options);
  // Without the line below: its numbers stand on the cards next to it.
  const quiet = { secondary: "none" };
  const sourceHistory = (area: string, options: Card = {}) =>
    card("electricity-lens-history-card", { area, figure: "energy", stack: "source", ...priceLine, ...options });
  const ring = (area: string) =>
    card("electricity-lens-breakdown-card", { area, by: "source", ...wide });
  const views: View[] = [];

  views.push(
    view(
      t("strategy.overview"),
      "now",
      [
        card("energy-distribution"),
        sourceHistory("household", today),
        ...(savings ? [card("electricity-lens-balance-card")] : []),
      ],
      [
        named("household", "cost", "strategy.cost_today", today),
        named("household", "solar_share", "strategy.self_sufficiency_today", today),
        solar
          ? named("solar", "energy", "strategy.solar_today", today)
          : named("household", "energy", "strategy.consumption_today", today),
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
        titled("electricity-lens-history-card", "strategy.bill", {
          area: "household",
          figure: "cost",
          stack: "bill",
          line: "grid_price",
        }),
        ...(solar
          ? [
              titled("electricity-lens-history-card", "strategy.cost_with_solar", {
                area: "household",
                figure: "cost",
                stack: "source",
                ...priceLine,
              }),
            ]
          : []),
        titled("electricity-lens-history-card", "strategy.cost_history", {
          area: "household",
          figure: "cost",
          stack: "consumer",
          ...(solar ? {} : priceLine),
        }),
        titled("electricity-lens-breakdown-card", "strategy.cost_distribution", {
          area: "household",
          by: "consumer",
          figure: "cost",
          display: "bars",
          color_by_source: true,
        }),
        ...(savings ? [card("electricity-lens-savings-card")] : []),
      ],
      [
        named("grid", "bill", "strategy.bill", wide),
        own("grid", "grid_price", quiet),
        price("household", quiet),
        own("household", levels ? "cheap_share" : "solar_share"),
        ...(levels ? [own("grid", "cheap_saving")] : []),
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
          card("electricity-lens-history-card", { area: "heat_pump", figure: "cost", stack: "consumer", ...priceLine }),
          card("electricity-lens-history-card", { area: "heat_pump", figure: "saving", stack: "consumer" }),
        ],
        [
          own("heat_pump", "scop"),
          own("heat_pump", "heat_price", quiet),
          price("heat_pump"),
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
          card("electricity-lens-history-card", { area: "wallbox", figure: "cost", ...priceLine }),
          card("electricity-lens-history-card", { area: "wallbox", figure: "saving" }),
        ],
        [
          own("wallbox", "cost_per_100km", quiet),
          own("wallbox", "distance", quiet),
          price("wallbox"),
          own("wallbox", "saving"),
          ring("wallbox"),
        ]
      )
    );
  }
  return views;
}

/** How long the dashboard waits for the integration while Home Assistant starts. */
const STARTUP_WAIT_MS = 30_000;
const STARTUP_RETRY_MS = 1_000;

/** The integration's figures. While Home Assistant starts, the integration may
 * not be loaded yet: a dashboard of one view instead of its real ones would break
 * the open view until the start is over, so the dashboard waits for it. */
async function loadFigures(hass: HomeAssistant): Promise<FiguresInfo> {
  const starting = hass.config.state !== undefined && hass.config.state !== "RUNNING";
  const deadline = Date.now() + STARTUP_WAIT_MS;
  for (;;) {
    try {
      return await hass.callWS<FiguresInfo>({ type: `${DOMAIN}/figures` });
    } catch (error) {
      if (!starting || Date.now() >= deadline) throw error;
      await new Promise((resolve) => setTimeout(resolve, STARTUP_RETRY_MS));
    }
  }
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
      info = await loadFigures(hass);
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
