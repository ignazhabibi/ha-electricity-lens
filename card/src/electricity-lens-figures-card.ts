// Key figure card of the Electricity Lens integration: one figure for a period,
// such as the household's costs, a device's solar share, or any statistic or
// entity of Home Assistant shown as it is. It looks like the stat cards of the
// energy dashboards: several figures are several cards. It follows the energy
// date selection on the same dashboard, or shows a fixed period.

import {
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";

import { followEnergyDate } from "./energy-date";
import { formatter, numberFormat, splitUnit, type Format } from "./format";
import {
  figuresOf,
  isForecast,
  sourceOf,
  statisticsOf,
  valueOf,
  type Figure,
  type FigureConfig,
  type FigureValue,
  type Unit,
} from "./figures";
import {
  fixedRange,
  periodOf,
  statisticsPeriod,
  type FixedPeriod,
  type Range,
} from "./history";
import { RETRY_MS, cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { hasText, localizer, type Localize } from "./localize";
import { cardStyles } from "./styles";
import type {
  FigureArea,
  FiguresInfo,
  HomeAssistant,
  StatisticMetadata,
  StatisticsRows,
} from "./types";

export type PeriodOption = "energy_date" | FixedPeriod;
export const PERIODS: PeriodOption[] = [
  "energy_date",
  "today",
  "yesterday",
  "this_month",
  "last_month",
  "this_year",
  "last_year",
];

export interface FiguresCardConfig extends FigureConfig {
  type: string;
  period?: PeriodOption;
}

/** The card's config. Before each figure was its own card, a card held a list
 * of tiles: one still works, several have to become one card each. */
export function figuresConfig(
  config: FiguresCardConfig & { tiles?: FigureConfig[]; title?: string; columns?: number }
): FiguresCardConfig {
  if (!config) throw new Error("Invalid configuration");
  const { tiles, title, columns: _columns, ...rest } = config;
  if (tiles === undefined) return rest;
  if (!Array.isArray(tiles) || tiles.length > 1) {
    throw new Error("Each key figure is its own card now: use one card per entry in tiles");
  }
  const tile = tiles[0] ?? {};
  return { ...rest, ...tile, ...(title && !tile.name ? { name: title } : {}) };
}

/** A figure's name; devices and the like are named with their area. */
export function figureLabel(t: Localize, figure: Figure, area: FigureArea): string {
  const specific = `figure.${figure}.${area.kind}`;
  const label = t(hasText(specific) ? specific : (`figure.${figure}` as const));
  return ["device", "other", "category"].includes(area.kind)
    ? `${area.name} ${label}`
    : label;
}

/** The integration computes new hours every 15 minutes. */
const REFRESH_MS = 5 * 60 * 1000;

interface Loaded {
  key: string;
  at: number;
  range: Range;
  period: string;
  rows: StatisticsRows;
  metadata: Record<string, StatisticMetadata>;
  forecast: { today: number | null; tomorrow: number | null };
  failed: boolean;
}

interface Request {
  key: string;
  range: Range;
  ids: string[];
  statistics: string[];
  forecast: boolean;
}

const dayKey = (date: Date): string => date.toDateString();

/** Today's and tomorrow's forecast in kWh, over all forecasts. */
function forecastSums(
  result: Record<string, { wh_hours?: Record<string, number> }>
): { today: number | null; tomorrow: number | null } {
  const now = new Date();
  const today = dayKey(now);
  const tomorrow = dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
  const sums = { today: null as number | null, tomorrow: null as number | null };
  for (const forecast of Object.values(result ?? {})) {
    for (const [time, wh] of Object.entries(forecast.wh_hours ?? {})) {
      const day = dayKey(new Date(time));
      if (day === today) sums.today = (sums.today ?? 0) + wh / 1000;
      if (day === tomorrow) sums.tomorrow = (sums.tomorrow ?? 0) + wh / 1000;
    }
  }
  return sums;
}

export class ElectricityLensFiguresCard extends LensCard {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
    _selected: { state: true },
    _loaded: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: FiguresCardConfig;
  /** The integration's areas; null when it is not loaded. */
  private _info?: FiguresInfo | null;
  private _infoLoading = false;
  private _selected?: Range | null;
  private _loaded?: Loaded;
  private _loading?: string;
  private _unfollow?: () => void;
  private _retryTimer?: ReturnType<typeof setTimeout>;

  static getStubConfig(): Partial<FiguresCardConfig> {
    return {
      period: "energy_date",
      area: "household",
      figure: "cost",
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("electricity-lens-figures-card-editor");
  }

  setConfig(config: FiguresCardConfig): void {
    this._config = figuresConfig(config);
  }

  getCardSize(): number {
    return 2;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 6, min_columns: 6 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._follow();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unfollow?.();
    this._unfollow = undefined;
    clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
  }

  protected _watched(): string[] {
    return [this._config?.entity, this._config?.statistic].filter(
      (entity): entity is string => entity !== undefined
    );
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  private get _language(): string {
    return this.hass?.locale?.language ?? "en";
  }

  private get _period(): PeriodOption {
    return this._config?.period ?? "energy_date";
  }

  private _follow(): void {
    if (this._period !== "energy_date") return;
    if (this._unfollow || !this.isConnected || !this.hass?.connection) return;
    this._unfollow = followEnergyDate(this.hass.connection, (range) => {
      this._selected = range;
    });
  }

  /** The period shown; undefined until the date selection is known. */
  private _range(): Range | undefined {
    const period = this._period;
    if (period !== "energy_date") return fixedRange(period);
    if (this._selected === undefined) return undefined;
    return this._selected ?? fixedRange("this_month");
  }

  private _area(id: string | undefined): FigureArea | undefined {
    return this._info?.areas.find((area) => area.id === id);
  }

  /** The figure of the integration, if its area has it. */
  private _figure(config: FigureConfig): { area: FigureArea; figure: Figure } | undefined {
    const area = this._area(config.area);
    if (!area || !config.figure || !figuresOf(area).includes(config.figure)) {
      return undefined;
    }
    return { area, figure: config.figure };
  }

  private async _loadInfo(): Promise<void> {
    if (!this.hass || this._infoLoading) return;
    this._infoLoading = true;
    this._info = await loadInfo(this.hass);
    this._infoLoading = false;
    clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
    if (this.isConnected && (!this._info || this._info.calculating)) {
      this._retryTimer = setTimeout(() => void this._loadInfo(), RETRY_MS);
    }
  }

  private _request(): Request | undefined {
    const range = this._range();
    const config = this._config;
    if (!range || !config) return undefined;
    const source = sourceOf(config);
    if (source === "energy" && !this._info) return undefined;
    const ids = new Set<string>();
    const statistics = new Set<string>();
    let forecast = false;
    if (source === "statistic" && config.statistic) {
      ids.add(config.statistic);
      statistics.add(config.statistic);
    } else if (source === "energy") {
      const found = this._figure(config);
      if (found) {
        forecast = isForecast(found.figure);
        if (!this._info?.calculating) {
          statisticsOf(found.area, found.figure).forEach((id) => ids.add(id));
        }
      }
    }
    const sorted = [...ids].sort();
    return {
      key: JSON.stringify([sorted, range.start, range.end, forecast]),
      range,
      ids: sorted,
      statistics: [...statistics].sort(),
      forecast,
    };
  }

  private async _load(request: Request): Promise<void> {
    if (!this.hass) return;
    this._loading = request.key;
    const period = statisticsPeriod(periodOf(request.range));
    const loaded: Loaded = {
      key: request.key,
      at: Date.now(),
      range: request.range,
      period,
      rows: {},
      metadata: {},
      forecast: { today: null, tomorrow: null },
      failed: false,
    };
    try {
      const [rows, metadata, forecast] = await Promise.all([
        request.ids.length
          ? this.hass.callWS<StatisticsRows>({
              type: "recorder/statistics_during_period",
              start_time: new Date(request.range.start).toISOString(),
              end_time: new Date(request.range.end + 1).toISOString(),
              statistic_ids: request.ids,
              period,
              types: ["change", "mean", "min", "max"],
              units: { energy: "kWh" },
            })
          : Promise.resolve({}),
        request.statistics.length
          ? this.hass.callWS<StatisticMetadata[]>({
              type: "recorder/get_statistics_metadata",
              statistic_ids: request.statistics,
            })
          : Promise.resolve([]),
        request.forecast
          ? this.hass.callWS<Record<string, { wh_hours?: Record<string, number> }>>(
              { type: "energy/solar_forecast" }
            )
          : Promise.resolve({}),
      ]);
      loaded.rows = rows;
      loaded.metadata = Object.fromEntries(
        metadata.map((entry) => [entry.statistic_id, entry])
      );
      loaded.forecast = forecastSums(forecast);
    } catch {
      loaded.failed = true;
    }
    if (this._loading !== request.key) return;
    this._loading = undefined;
    this._loaded = loaded;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (!this.hass) return;
    if (changed.has("hass") || changed.has("_config")) this._follow();
    if (this._info === undefined) this._info = cachedInfo();
    if (infoStale() && !this._infoLoading) void this._loadInfo();
    else if (this.isConnected && this._info?.calculating && !this._retryTimer && !this._infoLoading) {
      this._retryTimer = setTimeout(() => void this._loadInfo(), RETRY_MS);
    }
    const request = this._request();
    const stale = !this._loaded || Date.now() - this._loaded.at > REFRESH_MS;
    if (
      request &&
      request.key !== this._loading &&
      (request.key !== this._loaded?.key || (stale && !this._loading))
    ) {
      void this._load(request);
    }
  }

  private get _fmt(): Format {
    return formatter(this.hass?.locale, this.hass?.config.currency ?? "EUR");
  }

  private _number(value: number, digits?: number): string {
    return this._fmt.number(value, digits);
  }

  private _format(value: number, unit: Unit): string {
    return this._fmt.value(value, unit);
  }

  // The figure

  /** The rows of a statistic within the period. Days and months begin at
   * midnight of the server's time zone, which may be a few hours off the
   * browser's, so the recorder can return a day just outside the period. */
  private _rows(id: string): NonNullable<StatisticsRows[string]> {
    const loaded = this._loaded;
    if (!loaded) return [];
    const tolerance = loaded.period === "hour" ? 0 : 12 * 3_600_000;
    return (loaded.rows[id] ?? []).filter((row) => {
      const at =
        (typeof row.start === "number" ? row.start : Date.parse(row.start)) +
        tolerance;
      return at >= loaded.range.start && at <= loaded.range.end;
    });
  }

  private _sum(ids: string[] | undefined): number {
    let total = 0;
    for (const id of ids ?? []) {
      for (const row of this._rows(id)) total += row.change ?? 0;
    }
    return total;
  }

  private _energyCard(config: FigureConfig): TemplateResult {
    const t = this._localize;
    const found = this._figure(config);
    if (!found) {
      const generic = `figure.${config.figure ?? ""}`;
      const label = config.name ?? (hasText(generic) ? t(generic) : (config.figure ?? ""));
      // Until the integration answered, the figure is loading, not missing.
      return this._info === undefined
        ? this._card(label, "…")
        : this._card(label, "–", t("figures_unavailable"));
    }
    const { area, figure } = found;
    const label = config.name ?? figureLabel(this._localize, figure, area);
    if (this._info?.calculating && !isForecast(figure)) {
      return this._card(label, "…", t("calculating"));
    }
    if (!this._loaded) return this._card(label, "…");
    if (this._loaded.failed) return this._card(label, "–", t("figures_failed"));
    const forecast =
      figure === "forecast_today"
        ? this._loaded.forecast.today
        : figure === "forecast_tomorrow"
          ? this._loaded.forecast.tomorrow
          : null;
    const result: FigureValue = valueOf(
      figure,
      area,
      (key) => (area.statistics[key] ? this._sum(area.statistics[key]) : null),
      forecast
    );
    const line = result.line
      ? t(
          result.line.key as Parameters<Localize>[0],
          Object.fromEntries(
            Object.entries(result.line.values).map(([name, part]) => [
              name,
              this._format(part.value, part.unit),
            ])
          )
        )
      : undefined;
    return this._card(
      label,
      result.value === null ? "–" : this._format(result.value, result.unit),
      config.secondary === "none" ? undefined : line
    );
  }

  private _statisticCard(config: FigureConfig): TemplateResult {
    const t = this._localize;
    const id = config.statistic ?? "";
    const metadata = this._loaded?.metadata[id];
    const label =
      config.name ??
      metadata?.name ??
      (this.hass?.states[id]?.attributes.friendly_name as string | undefined) ??
      id;
    const rows = this._rows(id);
    const unit =
      metadata?.unit_class === "energy"
        ? "kWh"
        : (metadata?.statistics_unit_of_measurement ?? "");
    const show = (value: number | null) =>
      value === null ? "–" : `${this._number(value)}${unit ? ` ${unit}` : ""}`;
    const values = (key: "mean" | "min" | "max") =>
      rows
        .map((row) => row[key])
        .filter((value): value is number => typeof value === "number");
    const kind = config.value ?? "change";
    let value: number | null = null;
    if (kind === "change") {
      value = rows.length ? rows.reduce((sum, row) => sum + (row.change ?? 0), 0) : null;
    } else if (kind === "mean") {
      const means = values("mean");
      value = means.length ? means.reduce((a, b) => a + b, 0) / means.length : null;
    } else {
      const all = values(kind);
      value = all.length ? (kind === "min" ? Math.min(...all) : Math.max(...all)) : null;
    }
    // A total needs no words; a mean, minimum, or maximum says which it is.
    let line = kind === "change" ? undefined : t(`value.${kind}`);
    if (config.secondary === "range") {
      const mins = values("min");
      const maxes = values("max");
      if (mins.length && maxes.length) {
        line = t("value_range", {
          min: show(Math.min(...mins)),
          max: show(Math.max(...maxes)),
        });
      }
    }
    if (this._loaded?.failed) return this._card(label, "–", t("figures_failed"));
    return this._card(label, show(value), config.secondary === "none" ? undefined : line);
  }

  private _entityCard(config: FigureConfig): TemplateResult {
    const t = this._localize;
    const state = this.hass?.states[config.entity ?? ""];
    const label =
      config.name ??
      (state?.attributes.friendly_name as string | undefined) ??
      config.entity ??
      "";
    if (!state) return this._card(label, "–", t("figures_unavailable"));
    const number = Number(state.state);
    if (Number.isFinite(number) && config.secondary === "payback") {
      return this._card(label, this._format(number, "percent"), this._paybackLine(state.attributes));
    }
    if (Number.isFinite(number) && config.secondary === "return") {
      const rate = numberFormat(this.hass?.locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(number);
      return this._card(label, t("return_value", { rate }), this._returnLine(state.attributes));
    }
    const currency = this.hass?.config.currency ?? "";
    // Units such as "EUR/a" show the currency's symbol, as amounts do.
    const unit = (state.attributes.unit_of_measurement as string | undefined)?.replace(
      currency,
      currency ? this._fmt.currencySymbol() : ""
    );
    const numeric = state.state !== "" && Number.isFinite(number);
    // An amount in the system's currency shows as money, as elsewhere.
    const symbol = this._fmt.currencySymbol();
    const value = !numeric
      ? ["unknown", "unavailable", ""].includes(state.state)
        ? "–"
        : state.state
      : unit && unit === symbol
        ? this._format(number, "money")
        : `${this._number(number)}${unit ? ` ${unit}` : ""}`;
    return this._card(label, value);
  }

  /** What a payback sensor tells: the investment and the time still to go. */
  private _paybackLine(attributes: Record<string, unknown>): string | undefined {
    const t = this._localize;
    if (typeof attributes.investment !== "number") return undefined;
    const investment = this._format(attributes.investment, "money");
    if (typeof attributes.years_left !== "number") return t("line_payback", { investment });
    const years = attributes.years_left;
    const count = Math.max(1, Math.round(years < 1 ? years * 12 : years));
    const time =
      years < 1
        ? t(count === 1 ? "months_one" : "months_other", { count: String(count) })
        : t(count === 1 ? "years_one" : "years_other", { count: String(count) });
    return t("line_payback_left", { investment, time });
  }

  /** What a return sensor tells: how far the saving has gone beyond the investment. */
  private _returnLine(attributes: Record<string, unknown>): string | undefined {
    const { surplus, surplus_percent: percent } = attributes;
    if (typeof surplus !== "number" || typeof percent !== "number") return undefined;
    const locale = this.hass?.locale;
    return this._localize("line_return", {
      percent: numberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }).format(percent / 100),
      amount: numberFormat(locale, {
        style: "currency",
        currency: this.hass?.config.currency ?? "EUR",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }).format(surplus),
    });
  }

  /** The stat card of the energy dashboards: the name as its header, the
   * value with its unit, and the line that explains it. */
  private _card(label: string, value: string, line?: string): TemplateResult {
    const [number, unit] = splitUnit(value);
    return html`<ha-card lang=${this._language}>
      <div class="header"><h2 class="title">${label}</h2></div>
      <div class="stat">
        <div class="value">
          <span class="number">${number}</span>${unit ? html`<span class="unit">${unit}</span>` : nothing}
        </div>
        ${line ? html`<div class="line">${line}</div>` : nothing}
      </div>
    </ha-card>`;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const source = sourceOf(this._config);
    if (source === "statistic") return this._statisticCard(this._config);
    if (source === "entity") return this._entityCard(this._config);
    return this._energyCard(this._config);
  }

  static styles = [
    cardStyles,
    css`
      /* As the stat cards of the energy dashboards. */
      :host {
        display: block;
      }
      ha-card {
        box-sizing: border-box;
      }
      .title {
        font-size: var(--ha-font-size-l, 16px);
        line-height: var(--ha-line-height-normal, 24px);
        color: var(--secondary-text-color);
      }
      .stat {
        display: flex;
        flex-direction: column;
        gap: var(--ha-space-1, 4px);
        /* The line's space stays reserved, so cards with and without one are
           equally tall across rows. */
        min-height: 56px;
        padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px) var(--ha-space-4, 16px);
      }
      .value {
        display: flex;
        align-items: baseline;
        gap: var(--ha-space-1, 4px);
        white-space: nowrap;
        color: var(--primary-text-color);
      }
      .number {
        font-size: var(--ha-font-size-3xl, 28px);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 36px;
        letter-spacing: -0.02em;
      }
      .unit {
        font-size: var(--ha-font-size-m, 14px);
        color: var(--secondary-text-color);
      }
      .line {
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
    `,
  ];
}
