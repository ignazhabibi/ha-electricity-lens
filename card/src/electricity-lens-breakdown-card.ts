// Breakdown card of the Electricity Lens integration: shares of a whole for a
// period, as a ring or as bars. Split by source (solar power and grid power
// by price level) or by consumer (top-level devices and Other), in energy or
// costs; or the shares of any statistics, shown as they are.

import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { keyed } from "lit/directives/keyed.js";

import { chartReady, shareChart, shares } from "./chart";
import { CSS_COLORS, palette } from "./colors";
import { PERIODS, type PeriodOption } from "./electricity-lens-figures-card";
import { followEnergyDate } from "./energy-date";
import { formatter, type Format } from "./format";
import { fixedRange, rangeLabel, type Range } from "./history";
import { barSeries, type BarSeries } from "./history-figures";
import { RETRY_MS, cachedInfo, infoStale, loadInfo } from "./info";
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
// Room for the 180 px ring and its labels outside, with the legend below.
const RING_HEIGHT = "240px";
// The legend icons of HA's chart legend: a checked and an empty circle.
const CHECK =
  "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
const BLANK =
  "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";

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

export class ElectricityLensBreakdownCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
    _selected: { state: true },
    _sums: { state: true },
    _hasChart: { state: true },
    _hidden: { state: true },
  };

  hass?: HomeAssistant;
  private _config: BreakdownCardConfig = { type: "" };
  private _info?: FiguresInfo | null;
  private _infoLoading = false;
  private _selected?: Range | null;
  private _sums?: { key: string; at: number; values: Record<string, number>; names: Record<string, string>; failed: boolean };
  private _loading?: string;
  private _unfollow?: () => void;
  private _retryTimer?: ReturnType<typeof setTimeout>;
  private _hasChart?: boolean;
  /** Parts hidden in the ring's legend. */
  private _hidden = new Set<string>();

  static getStubConfig(): Partial<BreakdownCardConfig> {
    return { area: "household", by: "source", figure: "energy", display: "ring" };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("electricity-lens-breakdown-card-editor");
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
    clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
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
    clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
    if (this.isConnected && (!this._info || this._info.calculating)) {
      this._retryTimer = setTimeout(() => void this._loadInfo(), RETRY_MS);
    }
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
    if (this._hasChart === undefined) {
      this._hasChart = false;
      chartReady().then((ok) => {
        this._hasChart = ok;
      });
    }
    if (!this._byStatistics) {
      if (this._info === undefined) this._info = cachedInfo();
      if (infoStale() && !this._infoLoading) void this._loadInfo();
      else if (this.isConnected && this._info?.calculating && !this._retryTimer && !this._infoLoading) {
        this._retryTimer = setTimeout(() => void this._loadInfo(), RETRY_MS);
      }
      if (!this._info || this._info.calculating) return;
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
      // The mix takes the short source names of the energy cards, so the
      // labels around the ring fit a sidebar.
      const key = series.name.key?.replace(/^source\./, "mix.");
      const name =
        series.name.text ??
        (key && hasText(key) ? t(key) : series.name.key && hasText(series.name.key) ? t(series.name.key) : series.id);
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

  /** The ring on HA's chart element, as in the user's energy cards, with
   * HA's chart legend below: a tap hides a part and the ring closes up. */
  private _ring(parts: Part[]): TemplateResult {
    const t = this._localize;
    if (!this._hasChart) return html`<p class="summary">${t("history_no_chart")}</p>`;
    const style = getComputedStyle(this);
    const money = this._figure === "cost" && !this._byStatistics;
    const chart = shareChart({
      items: parts,
      total: t("breakdown_total"),
      format: (value) => this._value(value),
      percent: (value) => this._fmt.value(value, "percent"),
      centerColor: palette(this).line,
      labelColor: style.getPropertyValue("--primary-text-color").trim() || "#212121",
      hidden: this._hidden,
    });
    const percents = shares(parts.map((part) => (this._hidden.has(part.id) ? 0 : part.value)));
    const toggle = (id: string) => {
      const hidden = new Set(this._hidden);
      if (hidden.has(id)) hidden.delete(id);
      else hidden.add(id);
      this._hidden = hidden;
    };
    return html`<div class="ring">
      ${keyed(
        money,
        html`<ha-chart-base
          .hass=${this.hass}
          .data=${chart.data}
          .options=${chart.options}
          .height=${RING_HEIGHT}
        ></ha-chart-base>`
      )}
      <div class="chart-legend">
        <ul>
          ${parts.map((part, index) => {
            const off = this._hidden.has(part.id);
            const percent = this._fmt.value(percents[index], "percent");
            return html`<li class=${off ? "hidden" : ""}>
              <button
                type="button"
                class="leg"
                aria-pressed=${String(!off)}
                aria-label="${part.name}: ${percent}"
                @click=${() => toggle(part.id)}
              >
                <svg class="icon" viewBox="0 0 24 24" style="color: ${off ? "var(--secondary-text-color)" : part.color}">
                  <path fill="currentColor" d=${off ? BLANK : CHECK}></path>
                </svg>
                <span class="label">${part.name}</span>
                <span class="value">${percent}</span>
              </button>
            </li>`;
          })}
        </ul>
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
    const display =
      this._config.display ?? (!this._byStatistics && this._by === "consumer" ? "bars" : "ring");
    // The ring names its total in the middle; the bars name it in the chip.
    let chip = range ? rangeLabel(range, this._language) : "";
    if (display === "bars" && this._sums && !this._sums.failed && total > 0) chip = this._value(total);
    let body: TemplateResult;
    if (calculating) body = html`<p class="summary">${t("calculating_all")}</p>`;
    else if (missing) body = html`<p class="summary">${t(this._info === null ? "editor_not_loaded" : "figures_unavailable")}</p>`;
    else if (this._sums?.failed) body = html`<p class="summary">${t("figures_failed")}</p>`;
    else if (!this._sums) body = html`<p class="summary">${t("calculating")}</p>`;
    else if (total <= 0) body = html`<p class="summary">${t("history_empty_figure")}</p>`;
    else body = display === "bars" ? this._bars(parts) : this._ring(parts);
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
      /* The ring with HA's chart legend centered below it, as in the
         share cards of the energy cards. */
      .ring {
        padding: 0 var(--ha-space-4, 16px) var(--ha-space-4, 16px);
      }
      .chart-legend {
        font-size: var(--ha-font-size-s, 12px);
        color: var(--primary-text-color);
        padding: 8px 0 0;
      }
      .chart-legend ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: var(--ha-space-2, 8px) var(--ha-space-3, 12px);
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .chart-legend li {
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
      }
      .chart-legend li.hidden {
        color: var(--secondary-text-color);
      }
      .chart-legend button.leg {
        display: inline-flex;
        align-items: center;
        padding: 0 2px;
        border: none;
        background: none;
        cursor: pointer;
        font: inherit;
        color: inherit;
        border-radius: var(--ha-border-radius-sm, 4px);
      }
      .chart-legend button.leg:focus-visible {
        outline: 2px solid var(--ha-color-focus, var(--primary-color));
        outline-offset: 2px;
      }
      .chart-legend .icon {
        width: 18px;
        height: 18px;
        flex: none;
        margin-inline-end: var(--ha-space-1, 4px);
        transition: opacity 0.15s ease;
      }
      @media (hover: hover) {
        .chart-legend button.leg:hover .icon {
          opacity: 0.7;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .chart-legend .icon {
          transition: none;
        }
      }
      .chart-legend .label {
        white-space: nowrap;
        line-height: var(--ha-line-height-condensed, 20px);
      }
      .chart-legend .value {
        color: var(--secondary-text-color);
        white-space: nowrap;
        margin-inline-start: var(--ha-space-1, 4px);
        line-height: 1;
      }
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 4px;
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
