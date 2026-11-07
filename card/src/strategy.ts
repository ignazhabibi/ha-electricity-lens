// Dashboard strategy of the Electricity Lens integration: a finished electricity
// dashboard from Home Assistant's energy cards and the integration's cards.
// It has no settings: it asks the integration which areas and categories
// exist, and shows only the views that fit. Whoever wants more
// takes control of the dashboard and builds on with the same cards.

import { heatDevices } from "./history-figures";
import { localizer, type Localize } from "./localize";
import { DOMAIN, areaOfCategory, investmentSensors } from "./model";
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

/** Where the forecast gauges turn from red to yellow to green, as shares of
 * the best solar day of the last twelve months: what a good day is depends on
 * the plant. */
const FORECAST_YELLOW = 0.35;
const FORECAST_GREEN = 0.65;

/** The integration's sensors the dashboard needs to know of. */
export interface Sensors {
  categories: Category[];
  /** The categories with an investment, and the sensors about it. */
  investments: { category: Category; payback: string; annualReturn: string }[];
  /** The sensors of the solar forecast for the rest of today and for tomorrow,
   * with the best solar day of the last twelve months as their scale. */
  forecasts: { day: "today" | "tomorrow"; entity: string; bestDay?: number; fullYear?: boolean }[];
}

/** Finds the categories among the entities. */
export function findSensors(hass: HomeAssistant): Sensors {
  const entries = Object.values(hass.entities ?? {}).filter((entry) => entry.platform === DOMAIN);
  const order: Category[] = ["pv", "heat_pump", "wallbox"];
  const savings = entries.filter((entry) => entry.translation_key === "saving");
  const categories = savings
    .map((entry) => hass.states[entry.entity_id]?.attributes.category as Category)
    .filter((category) => order.includes(category));
  const forecasts = (["today", "tomorrow"] as const).flatMap((day) => {
    const key = day === "today" ? "forecast_rest_today" : "forecast_tomorrow";
    const entity = entries.find((entry) => entry.translation_key === key)?.entity_id;
    if (!entity) return [];
    const attributes = hass.states[entity]?.attributes ?? {};
    const bestDay = typeof attributes.best_day === "number" ? attributes.best_day : undefined;
    return [{ day, entity, bestDay, fullYear: attributes.best_day_full_year === true }];
  });
  return { categories, investments: investmentSensors(hass), forecasts };
}

/** The views, one question each; every card has one home. Only the
 * overview repeats headline figures, and only for today. */
export function dashboardViews(info: FiguresInfo, t: Localize, sensors: Sensors = { categories: [], investments: [], forecasts: [] }): View[] {
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
  const solar = has("solar");
  const heatPump = has("heat_pump");
  const car = has("wallbox");
  const devices = info.areas.some((area) => area.kind === "device");
  // Shares by source need more than one source: solar power, or price levels
  // that part the grid power. Without them a ring would be one whole.
  const sources = Boolean(solar) || info.levels.cheap_until !== null || info.levels.expensive_from !== null;
  // A heat pump or car saves only when compared with what it replaced.
  const saves = (area?: FigureArea) => Boolean(area?.statistics.saving?.length);
  const savings = saves(solar) || saves(heatPump) || saves(car) || sensors.categories.length > 0;
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
  const ring = (area: string): Card[] =>
    sources ? [card("electricity-lens-breakdown-card", { area, by: "source", ...wide })] : [];
  // Each investment shows its payback, and once it is paid back its return.
  // Home Assistant shows and hides them by the sensors' states.
  const investmentTiles = sensors.investments.flatMap(({ category, payback, annualReturn }) => [
    card("electricity-lens-figures-card", {
      area: areaOfCategory(category),
      figure: "payback",
      name: t(`strategy.payback_${category}`),
      visibility: [{ condition: "numeric_state", entity: payback, below: 100 }],
      ...half,
    }),
    card("electricity-lens-figures-card", {
      area: areaOfCategory(category),
      figure: "annual_return",
      name: t(`strategy.return_${category}`),
      // The sensor has a number only from then on.
      visibility: [{ condition: "numeric_state", entity: annualReturn, above: -1 }],
      ...half,
    }),
  ]);
  // The solar forecast as gauges up to the best day of the last twelve months.
  // Colors only once the data covers a year: a best day of winter alone
  // would make every spring day look good.
  const forecastGauges = solar?.forecast
    ? sensors.forecasts.map(({ entity, day, bestDay, fullYear }) => {
        const max = bestDay ? Math.ceil(bestDay) : undefined;
        return card("gauge", {
          entity,
          name: t(`strategy.forecast_${day}`),
          min: 0,
          ...(max ? { max } : {}),
          needle: false,
          ...(max && fullYear
            ? {
                severity: {
                  red: 0,
                  yellow: Math.round(max * FORECAST_YELLOW * 10) / 10,
                  green: Math.round(max * FORECAST_GREEN * 10) / 10,
                },
              }
            : {}),
          ...half,
        });
      })
    : [];
  const views: View[] = [];

  views.push(
    view(
      t("strategy.overview"),
      "now",
      // The power right now on top, where the energy dashboard knows the grid's.
      // Without savings there is no balance; the day's curve keeps the column filled.
      [
        ...(info.power?.grid.length ? [card("electricity-lens-flow-card")] : []),
        savings ? card("electricity-lens-balance-card") : sourceHistory("household", today),
      ],
      [
        ...forecastGauges,
        named("household", "cost", "strategy.cost_today", today),
        named("household", "energy", "strategy.consumption_today", today),
        ...investmentTiles,
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
        ...ring("household"),
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
        // Costs by device need devices: without them, Other is the whole.
        ...(devices
          ? [
              titled("electricity-lens-history-card", "strategy.cost_history", {
                area: "household",
                figure: "cost",
                stack: "consumer",
                ...(solar ? {} : priceLine),
              }),
            ]
          : []),
      ],
      [
        own("grid", "grid_price", quiet),
        price("household", quiet),
        ...(devices
          ? [
              titled("electricity-lens-breakdown-card", "strategy.cost_distribution", {
                area: "household",
                by: "consumer",
                figure: "cost",
                display: "bars",
                color_by_source: true,
                ...wide,
              }),
            ]
          : []),
        ...(savings ? [card("electricity-lens-savings-card", wide)] : []),
      ]
    )
  );

  if (heatPump) {
    views.push(
      view(
        t("strategy.heating"),
        "heating",
        [
          titled("electricity-lens-history-card", "figure.heat", {
            area: "heat_pump",
            figure: "heat",
            stack: "consumer",
            line: "scop",
            line_name: t("figure.scop"),
          }),
          titled("electricity-lens-history-card", "strategy.usage_graph", {
            area: "heat_pump",
            figure: "energy",
            stack: "source",
          }),
          titled("electricity-lens-history-card", solar ? "strategy.cost_with_solar" : "figure.cost", {
            area: "heat_pump",
            figure: "cost",
            stack: "source",
            ...priceLine,
          }),
        ],
        [
          own("heat_pump", "scop", quiet),
          own("heat_pump", "heat_price", quiet),
          ...ring("heat_pump"),
          ...(heatDevices(info).length
            ? [card("electricity-lens-heat-meters-card", wide)]
            : [
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
              ]),
          ...(saves(heatPump) ? [card("electricity-lens-savings-card", { area: "heat_pump", ...wide })] : []),
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
          titled("electricity-lens-history-card", "strategy.charged_energy", {
            area: "wallbox",
            figure: "energy",
            stack: "source",
          }),
          titled("electricity-lens-history-card", "strategy.charging_cost", {
            area: "wallbox",
            figure: "cost",
            stack: "source",
            ...priceLine,
          }),
        ],
        [
          own("wallbox", "device_grid_price", quiet),
          price("wallbox", quiet),
          ...ring("wallbox"),
          ...(saves(car) ? [card("electricity-lens-savings-card", { area: "wallbox", ...wide })] : []),
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
