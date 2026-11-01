// Key figure card of the Energy Payback integration: tiles with one figure
// each for a period, such as the household's costs, a device's solar share,
// or any statistic or entity of Home Assistant shown as it is. It follows the
// energy date selection on the same dashboard, or shows a fixed period.

import {
  LitElement,
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";

import { followEnergyDate } from "./energy-date";
import {
  figuresOf,
  isForecast,
  sourceOf,
  statisticsOf,
  valueOf,
  type Figure,
  type FigureValue,
  type Tile,
  type Unit,
} from "./figures";
import {
  fixedRange,
  periodOf,
  rangeLabel,
  statisticsPeriod,
  type FixedPeriod,
  type Range,
} from "./history";
import { hasText, localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
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

export interface FiguresCardConfig {
  type: string;
  title?: string;
  period?: PeriodOption;
  /** 1 to 4; without it as many as fit. */
  columns?: number;
  tiles?: Tile[];
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

const BAR_COLORS: Partial<Record<Figure, string>> = {
  solar_share: "var(--energy-solar-color, #ff9800)",
  self_consumption: "var(--energy-solar-color, #ff9800)",
  cheap_share: "var(--success-color, #43a047)",
  expensive_share: "var(--error-color, #db4437)",
};

interface Loaded {
  key: string;
  at: number;
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

export class EnergyPaybackFiguresCard extends LitElement {
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
  private _infoAt = 0;
  private _infoLoading = false;
  private _selected?: Range | null;
  private _loaded?: Loaded;
  private _loading?: string;
  private _unfollow?: () => void;

  static getStubConfig(): Partial<FiguresCardConfig> {
    return {
      period: "energy_date",
      tiles: [
        { area: "household", figure: "cost" },
        { area: "household", figure: "solar_share" },
      ],
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("energy-payback-figures-card-editor");
  }

  setConfig(config: FiguresCardConfig): void {
    if (!config || (config.tiles !== undefined && !Array.isArray(config.tiles))) {
      throw new Error("tiles must be a list");
    }
    this._config = config;
  }

  getCardSize(): number {
    return 1 + 2 * Math.ceil((this._config?.tiles?.length ?? 1) / 2);
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 12, min_columns: 3 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._follow();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unfollow?.();
    this._unfollow = undefined;
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

  private get _tiles(): Tile[] {
    return this._config?.tiles ?? [];
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

  /** The figure of an energy tile, if its area has it. */
  private _figure(tile: Tile): { area: FigureArea; figure: Figure } | undefined {
    const area = this._area(tile.area);
    if (!area || !tile.figure || !figuresOf(area).includes(tile.figure)) {
      return undefined;
    }
    return { area, figure: tile.figure };
  }

  private async _loadInfo(): Promise<void> {
    if (!this.hass || this._infoLoading) return;
    this._infoLoading = true;
    try {
      this._info = await this.hass.callWS<FiguresInfo>({
        type: `${DOMAIN}/figures`,
      });
    } catch {
      this._info = null;
    }
    this._infoAt = Date.now();
    this._infoLoading = false;
  }

  private _request(): Request | undefined {
    const range = this._range();
    if (!range) return undefined;
    const tiles = this._tiles;
    const needsInfo = tiles.some((tile) => sourceOf(tile) === "energy");
    if (needsInfo && this._info === undefined) return undefined;
    const ids = new Set<string>();
    const statistics = new Set<string>();
    let forecast = false;
    for (const tile of tiles) {
      const source = sourceOf(tile);
      if (source === "statistic" && tile.statistic) {
        ids.add(tile.statistic);
        statistics.add(tile.statistic);
      } else if (source === "energy") {
        const found = this._figure(tile);
        if (!found) continue;
        if (isForecast(found.figure)) forecast = true;
        statisticsOf(found.area, found.figure).forEach((id) => ids.add(id));
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
    const loaded: Loaded = {
      key: request.key,
      at: Date.now(),
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
              period: statisticsPeriod(periodOf(request.range)),
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
    const infoStale = Date.now() - this._infoAt > REFRESH_MS;
    if ((this._info === undefined || infoStale) && !this._infoLoading) {
      void this._loadInfo();
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

  // Formatting

  private _number(value: number, digits?: number): string {
    const abs = Math.abs(value);
    const fraction = digits ?? (abs < 10 ? 2 : abs < 100 ? 1 : 0);
    return new Intl.NumberFormat(this._language, {
      maximumFractionDigits: fraction,
      minimumFractionDigits: digits ?? 0,
    }).format(value);
  }

  private _format(value: number, unit: Unit): string {
    const language = this._language;
    const currency = this.hass?.config.currency ?? "EUR";
    switch (unit) {
      case "energy":
        return `${this._number(value, Math.abs(value) < 100 ? 1 : 0)} kWh`;
      case "money": {
        const cents = Math.abs(value) < 100;
        return new Intl.NumberFormat(language, {
          style: "currency",
          currency,
          maximumFractionDigits: cents ? 2 : 0,
          minimumFractionDigits: cents ? 2 : 0,
        }).format(value);
      }
      case "price":
        if (currency === "EUR") return `${this._number(value * 100, 1)} ct/kWh`;
        return `${new Intl.NumberFormat(language, {
          style: "currency",
          currency,
          maximumFractionDigits: 3,
        }).format(value)}/kWh`;
      case "percent":
        return new Intl.NumberFormat(language, {
          style: "percent",
          maximumFractionDigits: 0,
        }).format(value / 100);
      case "number":
        return this._number(value, Math.abs(value) < 100 ? 1 : 0);
    }
  }

  // Tiles

  private _sum(ids: string[] | undefined): number {
    let total = 0;
    for (const id of ids ?? []) {
      for (const row of this._loaded?.rows[id] ?? []) total += row.change ?? 0;
    }
    return total;
  }

  private _energyTile(tile: Tile): TemplateResult {
    const t = this._localize;
    const found = this._figure(tile);
    if (!found) {
      return this._tile(tile.name ?? tile.figure ?? "", "–", t("figures_unavailable"));
    }
    const { area, figure } = found;
    const label = tile.name ?? figureLabel(this._localize, figure, area);
    if (this._info?.calculating && !isForecast(figure)) {
      return this._tile(label, "…", t("calculating"));
    }
    if (!this._loaded || this._loaded.failed) return this._tile(label, "–");
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
    return this._tile(
      label,
      result.value === null ? "–" : this._format(result.value, result.unit),
      line,
      result.bar,
      BAR_COLORS[figure]
    );
  }

  private _statisticTile(tile: Tile): TemplateResult {
    const t = this._localize;
    const id = tile.statistic ?? "";
    const metadata = this._loaded?.metadata[id];
    const label =
      tile.name ??
      metadata?.name ??
      (this.hass?.states[id]?.attributes.friendly_name as string | undefined) ??
      id;
    const rows = this._loaded?.rows[id] ?? [];
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
    const kind = tile.value ?? "change";
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
    let line = t(`value.${kind}`);
    if (tile.secondary === "range") {
      const mins = values("min");
      const maxes = values("max");
      if (mins.length && maxes.length) {
        line = t("value_range", {
          min: show(Math.min(...mins)),
          max: show(Math.max(...maxes)),
        });
      }
    }
    return this._tile(label, this._loaded?.failed ? "–" : show(value), line);
  }

  private _entityTile(tile: Tile): TemplateResult {
    const t = this._localize;
    const state = this.hass?.states[tile.entity ?? ""];
    const label =
      tile.name ??
      (state?.attributes.friendly_name as string | undefined) ??
      tile.entity ??
      "";
    if (!state) return this._tile(label, "–", t("figures_unavailable"));
    const number = Number(state.state);
    const unit = state.attributes.unit_of_measurement as string | undefined;
    const value =
      state.state !== "" && Number.isFinite(number)
        ? `${this._number(number)}${unit ? ` ${unit}` : ""}`
        : state.state;
    return this._tile(label, value, t("value_current"));
  }

  private _tile(
    label: string,
    value: string,
    line?: string,
    bar?: number,
    color?: string
  ): TemplateResult {
    return html`<div class="tile">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
      ${bar !== undefined
        ? html`<div class="track" role="presentation">
            <div
              class="fill"
              style="width: ${Math.min(Math.max(bar, 0), 100)}%; background: ${color ?? "var(--primary-color)"}"
            ></div>
          </div>`
        : nothing}
      ${line ? html`<div class="line">${line}</div>` : nothing}
    </div>`;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const t = this._localize;
    const range = this._range();
    const columns = this._config.columns;
    const fixed = !!columns && columns >= 1 && columns <= 4;
    return html`<ha-card lang=${this._language}>
      <div class="header">
        <h2 class="title">${this._config.title ?? ""}</h2>
        ${range ? html`<span class="chip">${rangeLabel(range, this._language)}</span>` : nothing}
      </div>
      ${this._loaded?.failed
        ? html`<p class="summary">${t("figures_failed")}</p>`
        : nothing}
      <div class="content">
      <div
        class="tiles ${fixed ? "fixed" : ""}"
        style=${fixed ? `--columns: ${columns}` : ""}
      >
        ${this._tiles.map((tile) => {
          const source = sourceOf(tile);
          if (source === "statistic") return this._statisticTile(tile);
          if (source === "entity") return this._entityTile(tile);
          return this._energyTile(tile);
        })}
      </div>
      </div>
    </ha-card>`;
  }

  static styles = [
    cardStyles,
    css`
      .header {
        min-height: 32px;
      }
      .content {
        container-type: inline-size;
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 12px;
        padding: 12px 16px 16px;
      }
      .tiles.fixed {
        grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
      }
      /* On a narrow card a fixed column count would squeeze the tiles. */
      @container (max-width: 440px) {
        .tiles.fixed {
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        }
      }
      .tile {
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        padding: 12px 14px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
      }
      .label {
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        overflow-wrap: break-word;
        hyphens: auto;
      }
      .value {
        font-size: 28px;
        line-height: 1.15;
        color: var(--primary-text-color);
      }
      @container (max-width: 150px) {
        .value {
          font-size: 22px;
        }
      }
      .line {
        font-size: 13px;
        line-height: 18px;
        color: var(--secondary-text-color);
      }
      .track {
        height: 6px;
        border-radius: 3px;
        overflow: hidden;
        background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
      }
      .fill {
        height: 100%;
        border-radius: 3px;
      }
    `,
  ];
}
