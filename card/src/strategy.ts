// Dashboard strategy of the Energy Payback integration: a finished energy
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
  type: type.includes("energy-payback") ? `custom:${type}` : type,
  ...options,
});

const full = { grid_options: { columns: "full" } };

const section = (cards: Card[], title?: string): Card => ({
  type: "grid",
  cards: title ? [{ type: "heading", heading: title }, ...cards] : cards,
});

const view = (title: string, path: string, icon: string, sections: Card[]): View => ({
  title,
  path,
  icon,
  type: "sections",
  max_columns: 3,
  sections: [section([card("energy-date-selection", full)]), ...sections],
});

const tiles = (area: string, figures: string[]) =>
  figures.map((figure) => ({ area, figure }));

/** The views for what the household has. */
export function dashboardViews(info: FiguresInfo, t: Localize): View[] {
  const has = (id: string): FigureArea | undefined =>
    info.areas.find((area) => area.id === id);
  const levels = info.levels.cheap_until !== null || info.levels.expensive_from !== null;
  const solar = has("solar");
  const heatPump = has("heat_pump");
  const car = has("wallbox");
  const categories = [solar?.statistics.saving, heatPump, car].some(Boolean);
  const views: View[] = [];

  views.push(
    view(t("strategy.overview"), "overview", "mdi:home-lightning-bolt", [
      section([
        card("energy-payback-figures-card", {
          tiles: tiles("household", [
            "cost",
            "price",
            "solar_share",
            ...(levels ? ["cheap_share"] : ["energy"]),
          ]),
        }),
        card("energy-distribution"),
      ]),
      section([
        card("energy-payback-history-card", {
          area: "household",
          figure: "energy",
          stack: "source",
          line: "price",
        }),
        card("energy-payback-breakdown-card", { area: "household", by: "source" }),
      ]),
      ...(categories ? [section([card("energy-payback-card")])] : []),
    ])
  );

  views.push(
    view(t("strategy.electricity"), "electricity", "mdi:transmission-tower", [
      section([
        card("energy-payback-figures-card", {
          tiles: [
            ...tiles("grid", ["energy", "cost"]),
            ...tiles("household", ["energy", "cost"]),
          ],
        }),
        card("energy-usage-graph"),
      ]),
      section([
        card("energy-payback-breakdown-card", {
          area: "household",
          by: "consumer",
          figure: "cost",
          display: "bars",
          color_by_source: true,
        }),
        card("energy-payback-history-card", {
          area: "household",
          figure: "cost",
          stack: "consumer",
        }),
      ]),
      section([card("energy-devices-graph"), card("energy-sources-table")]),
    ])
  );

  if (solar) {
    views.push(
      view(t("strategy.solar"), "solar", "mdi:solar-power-variant", [
        section([
          card("energy-payback-figures-card", {
            tiles: tiles("solar", [
              "energy",
              "self_consumption",
              ...(solar.statistics.saving ? ["saving"] : []),
              ...(solar.forecast ? ["forecast_today", "forecast_tomorrow"] : []),
            ]),
          }),
          card("energy-solar-graph"),
        ]),
        section([
          card("energy-self-sufficiency-gauge"),
          card("energy-solar-consumed-gauge"),
          card("energy-grid-neutrality-gauge"),
        ]),
        ...(solar.statistics.saving
          ? [section([card("energy-payback-history-card", { area: "solar", figure: "saving" })])]
          : []),
      ])
    );
  }

  if (heatPump) {
    views.push(
      view(heatPump.name, "heating", "mdi:heat-pump", [
        section([
          card("energy-payback-figures-card", {
            tiles: tiles("heat_pump", ["heat", "scop", "heat_price", "cost", "saving", "solar_share"]),
          }),
        ]),
        section([
          card("energy-payback-history-card", {
            area: "heat_pump",
            figure: "heat",
            line: "scop",
          }),
          card("energy-payback-history-card", {
            area: "heat_pump",
            figure: "energy",
            stack: "source",
            line: "price",
          }),
        ]),
      ])
    );
  }

  if (car) {
    views.push(
      view(car.name, "charging", "mdi:car-electric", [
        section([
          card("energy-payback-figures-card", {
            tiles: tiles("wallbox", ["distance", "cost_per_100km", "cost", "saving", "solar_share", "price"]),
          }),
        ]),
        section([
          card("energy-payback-history-card", {
            area: "wallbox",
            figure: "energy",
            stack: "source",
            line: "price",
          }),
          card("energy-payback-history-card", {
            area: "wallbox",
            figure: "distance",
            line: "cost_per_100km",
          }),
        ]),
      ])
    );
  }

  if (categories) {
    views.push(
      view(t("strategy.balance"), "balance", "mdi:scale-balance", [
        section([card("energy-payback-card")]),
        section([card("energy-payback-history-card")]),
      ])
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
