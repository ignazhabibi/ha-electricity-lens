// Breakdown card of the Energy Lens integration: shares of a whole for a
// period, as a ring or as bars. Split by source (solar power and grid power
// by price level) or by consumer (top-level devices and Other), in energy or
// costs; or the shares of any statistics, shown as they are.

import { LitElement, css, html, nothing, svg, type PropertyValues, type TemplateResult } from "lit";

import { CSS_COLORS, palette } from "./colors";
import { followEnergyDate } from "./energy-date";
import { PERIODS, type PeriodOption } from "./energy-payback-figures-card";
import { formatter, type Format } from "./format";
import { fixedRange, rangeLabel, type Range } from "./history";
import { barSeries, type BarSeries } from "./history-figures";
import { cachedInfo, infoStale, loadInfo } from "./info";
import { hasText, localizer, type Localize } from "./localize";
import { cardStyles } from "./styles";
import { loadSums } from "./sums";
import type { FigureArea, FiguresInfo, HomeAssistant, StatisticMetadata } from "./types";

export { PERIODS };

export interface BreakdownCardConfig {
  type: string;
  title?: string;
  period?: PeriodOption;
  area?: string;
  by?: "source" | "consumer";
  figure?: "energy" | "cost";
  display?: "ring" | "bars";
  /** Bars by consumer: split each bar into its sources. */
  color_by_source?: boolean;
  /** Instead of an area: the shares of these statistics. */
  statistics?: Array<{ statistic: string; name?: string }>;
}

const REFRESH_MS = 5 * 60 * 1000;
const RADIUS = 64;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;


interface Part {
  id: string;
  name: string;
  color: string;
  value: number;
  /** For consumers: the energy per source, to split the bar. */
  mix?: Array<{ color: string; value: number }>;
  /** For consumers by costs: their energy, for the average price. */
  energy?: number;
}

export class EnergyPaybackBreakdownCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
    _selected: { state: true },
    _sums: { state: true },
  };

  hass?: HomeAssistant;
  private _config: BreakdownCardConfig = { type: "" };
  private _info?: FiguresInfo | null;
  private _infoLoading = false;
  private _selected?: Range | null;
  private _sums?: { key: string; at: number; values: Record<string, number>; names: Record<string, string>; failed: boolean };
  private _loading?: string;
  private _unfollow?: () => void;

  static getStubConfig(): Partial<BreakdownCardConfig> {
    return { area: "household", by: "source", figure: "energy", display: "ring" };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("energy-lens-breakdown-card-editor");
  }

  setConfig(config: BreakdownCardConfig): void {
    if (config?.statistics !== undefined && !Array.isArray(config.statistics)) {
      throw new Error("statistics must be a list");
    }
    this._config = config ?? { type: "" };
  }

  getCardSize(): number {
    return 4;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 6, min_columns: 4 };
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

  private get _fmt(): Format {
    return formatter(this._language, this.hass?.config.currency ?? "EUR");
  }

  private get _byStatistics(): boolean {
    return !!this._config.statistics?.length;
  }

  private _follow(): void {
    if ((this._config.period ?? "energy_date") !== "energy_date") return;
    if (this._unfollow || !this.isConnected || !this.hass?.connection) return;
    this._unfollow = followEnergyDate(this.hass.connection, (range) => {
      this._selected = range;
    });
  }

  private _range(): Range | undefined {
    const option = this._config.period ?? "energy_date";
    if (option !== "energy_date") return fixedRange(option);
    if (this._selected === undefined) return undefined;
    return this._selected ?? fixedRange("this_month");
  }

  private _area(): FigureArea | undefined {
    return this._info?.areas.find((area) => area.id === (this._config.area ?? "household"));
  }

  private get _by(): "source" | "consumer" {
    const area = this._area();
    if (this._config.by === "consumer" && area?.kind === "household") return "consumer";
    return area?.statistics.solar?.length ? "source" : "consumer";
  }

  private get _figure(): "energy" | "cost" {
    return this._by === "consumer" && this._config.figure === "cost" ? "cost" : "energy";
  }

  /** The series that make up the whole. */
  private _series(): BarSeries[] {
    const info = this._info;
    const area = this._area();
    if (!info || !area) return [];
    // The ring shows what was consumed; the feed-in is no part of it.
    return barSeries(info, area, this._figure, this._by === "source" ? "source" : "consumer", palette(this)).filter(
      (series) => !series.negative
    );
  }

  private _ids(): string[] {
    const ids = new Set<string>();
    if (this._byStatistics) {
      this._config.statistics?.forEach((item) => ids.add(item.statistic));
    } else {
      for (const series of this._series()) [...series.plus, ...series.minus].forEach((id) => ids.add(id));
      if (this._by === "consumer" && this._info) {
        // Each consumer's energy and its sources, for the line and the split bar.
        for (const series of this._series()) {
          const area = this._info.areas.find((item) => item.id === series.id);
          for (const key of ["energy", "solar", "cheap", "expensive"]) {
            (area?.statistics[key] ?? []).forEach((id) => ids.add(id));
          }
        }
      }
    }
    return [...ids].sort();
  }

  private async _loadInfo(): Promise<void> {
    if (!this.hass || this._infoLoading) return;
    this._infoLoading = true;
    this._info = await loadInfo(this.hass);
    this._infoLoading = false;
  }

  private async _load(key: string, ids: string[], range: Range): Promise<void> {
    if (!this.hass) return;
    this._loading = key;
    const result = { key, at: Date.now(), values: {} as Record<string, number>, names: {} as Record<string, string>, failed: false };
    try {
      const statistics = this._byStatistics ? ids : [];
      const [values, metadata] = await Promise.all([
        loadSums(this.hass, ids, range),
        statistics.length
          ? this.hass.callWS<StatisticMetadata[]>({ type: "recorder/get_statistics_metadata", statistic_ids: statistics })
          : Promise.resolve([]),
      ]);
      result.values = values;
      result.names = Object.fromEntries(metadata.map((m) => [m.statistic_id, m.name ?? m.statistic_id]));
    } catch {
      result.failed = true;
    }
    if (this._loading !== key) return;
    this._loading = undefined;
    this._sums = result;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (!this.hass) return;
    if (changed.has("hass") || changed.has("_config")) this._follow();
    if (!this._byStatistics) {
      if (this._info === undefined) this._info = cachedInfo();
      if (infoStale() && !this._infoLoading) void this._loadInfo();
      if (!this._info) return;
    }
    const range = this._range();
    if (!range) return;
    const ids = this._ids();
    if (!ids.length) return;
    const key = JSON.stringify([ids, range.start, range.end]);
    const stale = !this._sums || Date.now() - this._sums.at > REFRESH_MS;
    if (key !== this._loading && (key !== this._sums?.key || (stale && !this._loading))) {
      void this._load(key, ids, range);
    }
  }

  private _sum(ids: string[]): number {
    return ids.reduce((total, id) => total + (this._sums?.values[id] ?? 0), 0);
  }

  private _parts(): Part[] {
    const t = this._localize;
    if (this._byStatistics) {
      // Shares of other statistics take the consumer colors, in their order.
      const { consumers } = palette(this);
      return (this._config.statistics ?? []).map((item, index) => ({
        id: item.statistic,
        name: item.name ?? this._sums?.names[item.statistic] ?? item.statistic,
        color: consumers[index % consumers.length],
        value: this._sum([item.statistic]),
      }));
    }
    const parts = this._series().map((series) => {
      const value = this._sum(series.plus) - this._sum(series.minus);
      const name =
        series.name.text ??
        (series.name.key && hasText(series.name.key) ? t(series.name.key) : series.id);
      const part: Part = { id: series.id, name, color: series.color, value: series.floor ? Math.max(value, 0) : value };
      if (this._by === "consumer" && this._info) {
        const colors = palette(this);
        const area = this._info.areas.find((item) => item.id === series.id);
        if (area) {
          const of = (key: string) => this._sum(area.statistics[key] ?? []);
          const energy = of("energy");
          const solar = of("solar");
          const cheap = of("cheap");
          const expensive = of("expensive");
          part.energy = energy;
          part.mix = [
            { color: colors.solar, value: solar },
            { color: colors.cheap, value: cheap },
            { color: colors.grid, value: Math.max(energy - solar - cheap - expensive, 0) },
            { color: colors.expensive, value: expensive },
          ];
        }
      }
      return part;
    });
    return this._by === "consumer" ? parts.sort((a, b) => b.value - a.value) : parts;
  }

  private _value(value: number): string {
    return this._figure === "cost" && !this._byStatistics
      ? this._fmt.value(value, "money")
      : this._fmt.value(value, "energy");
  }

  private _title(): string {
    const t = this._localize;
    if (this._config.title) return this._config.title;
    if (this._byStatistics) return "";
    // Until the integration answered, the configured split names the card.
    const by = this._area() ? this._by : (this._config.by ?? "source");
    if (by === "source") return t("breakdown_mix");
    return t(this._figure === "cost" ? "breakdown_cost_by_consumer" : "breakdown_energy_by_consumer");
  }

  private _ring(parts: Part[], total: number): TemplateResult {
    const t = this._localize;
    let offset = 0;
    const segments = parts
      .filter((part) => part.value > 0)
      .map((part) => {
        const length = (part.value / total) * CIRCUMFERENCE;
        const gap = parts.length > 1 ? Math.min(2, length / 2) : 0;
        const segment = svg`<circle cx="80" cy="80" r=${RADIUS} fill="none" stroke=${part.color}
          stroke-width="22" stroke-dasharray="${length - gap} ${CIRCUMFERENCE - length + gap}"
          stroke-dashoffset=${-offset} transform="rotate(-90 80 80)"></circle>`;
        offset += length;
        return segment;
      });
    const unitLabel = this._byStatistics ? "kWh" : t(this._figure === "cost" ? "breakdown_total_cost" : "breakdown_total_energy");
    const center = this._figure === "cost" && !this._byStatistics ? this._fmt.value(total, "money") : this._fmt.number(total, total < 100 ? 1 : 0);
    return html`<div class="ring">
      <svg viewBox="0 0 160 160" role="img" aria-label=${parts.map((p) => `${p.name} ${this._value(p.value)}`).join(", ")}>
        <circle cx="80" cy="80" r=${RADIUS} fill="none" stroke="var(--divider-color)" stroke-width="22"></circle>
        ${segments}
        <text x="80" y="78" text-anchor="middle" class="center">${center}</text>
        <text x="80" y="98" text-anchor="middle" class="center-label">${this._figure === "cost" && !this._byStatistics ? "" : unitLabel}</text>
      </svg>
      <div class="legend">
        ${parts.map(
          (part) => html`<div class="legend-row">
            <span class="dot" style="background: ${part.color}"></span>
            <span class="name">${part.name}</span>
            <span class="amount">${this._fmt.value(total > 0 ? (part.value / total) * 100 : 0, "percent")} · ${this._value(part.value)}</span>
          </div>`
        )}
      </div>
    </div>`;
  }

  private _bars(parts: Part[]): TemplateResult {
    const max = Math.max(...parts.map((part) => part.value), 0);
    const split = this._config.color_by_source === true && this._by === "consumer";
    const t = this._localize;
    return html`<div class="bars">
      ${parts.map((part) => {
        const width = max > 0 ? Math.max((part.value / max) * 100, 0) : 0;
        const mixTotal = part.mix?.reduce((sum, item) => sum + item.value, 0) ?? 0;
        let line = "";
        if (part.energy !== undefined) {
          line = this._fmt.value(part.energy, "energy");
          if (this._figure === "cost" && part.energy > 0) {
            line += ` · ${t("line_average_price", { price: this._fmt.value(part.value / part.energy, "price") })}`;
          }
        }
        return html`<div class="bar-row">
          <div class="bar-text">
            <span class="name">${part.name}</span>
            <span class="amount">${this._value(part.value)}</span>
          </div>
          ${line ? html`<div class="bar-line">${line}</div>` : nothing}
          <div class="track">
            <div class="fill" style="width: ${width}%; ${split ? "" : `background: ${part.color}`}">
              ${split && part.mix && mixTotal > 0
                ? part.mix.map((item) => html`<span style="width: ${(item.value / mixTotal) * 100}%; background: ${item.color}"></span>`)
                : nothing}
            </div>
          </div>
        </div>`;
      })}
      ${split
        ? html`<div class="key">
            ${(["solar", "cheap", "grid", "expensive"] as const)
              .filter(
                (key) =>
                  (key !== "cheap" || this._info?.levels.cheap_until != null) &&
                  (key !== "expensive" || this._info?.levels.expensive_from != null)
              )
              .map(
              (key) => html`<span><span class="dot" style="background: ${CSS_COLORS[key]}"></span>${t(
                key === "grid"
                  ? this._info?.levels.cheap_until != null || this._info?.levels.expensive_from != null
                    ? "source.normal"
                    : "source.grid"
                  : `source.${key}`
              )}</span>`
            )}
          </div>`
        : nothing}
    </div>`;
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;
    const t = this._localize;
    const range = this._range();
    const parts = this._sums ? this._parts() : [];
    const total = parts.reduce((sum, part) => sum + Math.max(part.value, 0), 0);
    const calculating = !this._byStatistics && this._info?.calculating === true;
    const missing = !this._byStatistics && this._info !== undefined && !this._area();
    let chip = range ? rangeLabel(range, this._language) : "";
    if (this._sums && !this._sums.failed && total > 0) {
      const solar = parts.find((part) => part.id === "solar");
      chip = solar
        ? t("breakdown_solar_chip", { percent: this._fmt.value((solar.value / total) * 100, "percent") })
        : this._value(total);
    }
    let body: TemplateResult;
    if (calculating) body = html`<p class="summary">${t("calculating_all")}</p>`;
    else if (missing) body = html`<p class="summary">${t(this._info === null ? "editor_not_loaded" : "figures_unavailable")}</p>`;
    else if (this._sums?.failed) body = html`<p class="summary">${t("figures_failed")}</p>`;
    else if (!this._sums) body = html`<p class="summary">${t("calculating")}</p>`;
    else if (total <= 0) body = html`<p class="summary">${t("history_empty_figure")}</p>`;
    else {
      const display =
        this._config.display ??
        (!this._byStatistics && this._by === "consumer" ? "bars" : "ring");
      body = display === "bars" ? this._bars(parts) : this._ring(parts, total);
    }
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
        ${chip ? html`<span class="chip">${chip}</span>` : nothing}
      </div>
      ${body}
    </ha-card>`;
  }

  static styles = [
    cardStyles,
    css`
      .header {
        min-height: 32px;
      }
      /* The ring with HA's chart legend centered below it. */
      .ring {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ha-space-3, 12px);
        padding: var(--ha-space-4, 16px);
      }
      .ring svg {
        width: 180px;
        height: 180px;
        flex: none;
      }
      .center {
        font-size: 24px;
        fill: var(--primary-text-color);
      }
      .center-label {
        font-size: 11px;
        fill: var(--secondary-text-color);
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--ha-space-2, 8px) var(--ha-space-3, 12px);
        font-size: var(--ha-font-size-s, 12px);
      }
      .legend-row {
        display: inline-flex;
        align-items: center;
        gap: var(--ha-space-1, 4px);
        white-space: nowrap;
      }
      .legend-row .amount {
        color: var(--secondary-text-color);
      }
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 4px;
      }
      .legend-row .dot {
        margin: 0;
      }
      .percent,
      .bar-line {
        color: var(--secondary-text-color);
      }
      .amount,
      .percent {
        text-align: right;
        white-space: nowrap;
      }
      .bars {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px 16px 16px;
      }
      .bar-text {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 14px;
      }
      .bar-line {
        font-size: 12px;
      }
      .track {
        height: 10px;
        margin-top: 4px;
        border-radius: 5px;
        overflow: hidden;
        background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      }
      .fill {
        display: flex;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
      .fill span {
        height: 100%;
      }
      .key {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `,
  ];
}
