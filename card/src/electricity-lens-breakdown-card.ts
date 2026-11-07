// Breakdown card of the Electricity Lens integration: shares of a whole for a
// period, as a ring or as bars. Split by source (solar power and grid power
// by price level) or by device (top-level devices and Other), in energy or
// costs; or the shares of any statistics, shown as they are, in their unit.
// With the date selection's comparison the compared period shows inside the
// ring, or as a thin bar under each bar.

import { css, html, nothing, type TemplateResult } from "lit";
import { keyed } from "lit/directives/keyed.js";

import { shareChart, shares, watchChart } from "./chart";
import { CSS_COLORS, consumerColors, palette } from "./colors";
import { PERIODS, type PeriodOption } from "./electricity-lens-figures-card";
import { checkCollectionKey } from "./energy-date";
import { barSeries, type BarSeries } from "./history-figures";
import { hasText } from "./localize";
import { PeriodSumsCard } from "./period-sums-card";
import { cardStyles } from "./styles";
import type { FigureArea } from "./types";

export { PERIODS };

export interface BreakdownCardConfig {
  type: string;
  collection_key?: string;
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
  /** The value in the compared period, if the date selection compares. */
  compare?: number;
  /** The entity whose dialog a tap opens, if the part is one. */
  entity?: string;
  /** For consumers: the value per source, to split the bar. */
  mix?: Array<{ color: string; value: number }>;
  /** For consumers by costs: their energy, for the average price. */
  energy?: number;
}

export class ElectricityLensBreakdownCard extends PeriodSumsCard {
  static properties = {
    ...PeriodSumsCard.properties,
    _config: { state: true },
    _hasChart: { state: true },
    _hidden: { state: true },
  };

  private _config: BreakdownCardConfig = { type: "" };
  /** Whether HA's chart element is there; undefined while it may still load. */
  private _hasChart?: boolean;
  private _watchingChart = false;
  /** The ring's chart, kept until what it shows changes. */
  private _ringChart?: { key: string; chart: ReturnType<typeof shareChart> };
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
    checkCollectionKey(config?.collection_key);
    this._config = config ?? { type: "" };
    this._collectionKey = this._config.collection_key;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 6, min_columns: 4 };
  }

  private get _byStatistics(): boolean {
    return !!this._config.statistics?.length;
  }

  protected _period(): PeriodOption {
    return this._config.period ?? "energy_date";
  }

  protected _showsCompare(): boolean {
    return true;
  }

  protected _needsInfo(): boolean {
    return !this._byStatistics;
  }

  protected _described(): string[] {
    return this._byStatistics ? (this._config.statistics ?? []).map((item) => item.statistic) : [];
  }

  private _area(): FigureArea | undefined {
    return this._info?.areas.find((area) => area.id === (this._config.area ?? "household"));
  }

  private get _by(): "source" | "consumer" {
    const area = this._area();
    if (
      this._config.by === "consumer" &&
      (area?.kind === "household" || (area?.kind === "category" && (area.statistics.energy?.length ?? 0) > 1))
    ) {
      return "consumer";
    }
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

  protected _ids(): string[] {
    const ids = new Set<string>();
    if (this._byStatistics) {
      this._config.statistics?.forEach((item) => ids.add(item.statistic));
    } else {
      for (const series of this._series()) [...series.plus, ...series.minus].forEach((id) => ids.add(id));
      if (this._by === "consumer" && this._info) {
        // Each consumer's energy and its sources, for the line and the split bar.
        for (const series of this._series()) {
          const area = this._info.areas.find((item) => item.id === series.id);
          for (const key of [
            "energy",
            "solar",
            "cheap",
            "expensive",
            "cost",
            "solar_cost",
            "cheap_cost",
            "expensive_cost",
          ]) {
            (area?.statistics[key] ?? []).forEach((id) => ids.add(id));
          }
        }
      }
    }
    return [...ids].sort();
  }

  protected willUpdate(): void {
    super.willUpdate();
    if (this.hass && !this._watchingChart) {
      this._watchingChart = true;
      watchChart((ok) => {
        this._hasChart = ok;
      });
    }
  }

  private _sum(ids: string[], compared = false): number {
    const values = (compared ? this._sums?.compare : this._sums?.values) ?? {};
    return ids.reduce((total, id) => total + (values[id] ?? 0), 0);
  }

  /** Whether the compared period is there to show. */
  private get _compared(): boolean {
    return this._sums?.compare !== undefined;
  }

  /** The entity behind statistics, if they are one entity's. */
  private _entityOf(ids: string[] | undefined): string | undefined {
    return ids?.length === 1 && this.hass?.states[ids[0]] ? ids[0] : undefined;
  }

  /** The unit of the statistics shown, from their metadata; energy in kWh. */
  private get _unit(): string | undefined {
    if (!this._byStatistics) return undefined;
    const units = (this._config.statistics ?? []).map((item) => {
      const metadata = this._sums?.metadata[item.statistic];
      return metadata?.unit_class === "energy" ? "kWh" : (metadata?.statistics_unit_of_measurement ?? "");
    });
    return units[0];
  }

  private _parts(): Part[] {
    const t = this._localize;
    if (this._byStatistics) {
      // A configured device keeps its device color; other statistics take the
      // consumer colors in their order.
      const colors = palette(this);
      const known = this._info ? consumerColors(this._info, colors) : new Map<string, string>();
      return (this._config.statistics ?? []).map((item, index) => {
        const device = this._info?.areas.find(
          (area) =>
            area.kind === "device" &&
            (area.statistics.energy?.[0] === item.statistic || area.statistics.heat?.[0] === item.statistic)
        );
        return {
          id: item.statistic,
          name:
            item.name ??
            device?.name ??
            (this._sums?.metadata[item.statistic]?.name ||
              (this.hass?.states[item.statistic]?.attributes.friendly_name as string | undefined) ||
              item.statistic),
          color: (device && known.get(device.id)) ?? colors.consumers[index % colors.consumers.length],
          value: this._sum([item.statistic]),
          compare: this._compared ? this._sum([item.statistic], true) : undefined,
          entity: this._entityOf([item.statistic]),
        };
      });
    }
    const parts = this._series().map((series) => {
      const value = this._sum(series.plus) - this._sum(series.minus);
      const compared = this._sum(series.plus, true) - this._sum(series.minus, true);
      // The mix takes the short source names of the energy cards, so the
      // labels around the ring fit a sidebar.
      const key = series.name.key?.replace(/^source\./, "mix.");
      const name =
        series.name.text ??
        (key && hasText(key) ? t(key) : series.name.key && hasText(series.name.key) ? t(series.name.key) : series.id);
      const floor = (amount: number) => (series.floor ? Math.max(amount, 0) : amount);
      const part: Part = {
        id: series.id,
        name,
        color: series.color,
        value: floor(value),
        compare: this._compared ? floor(compared) : undefined,
      };
      if (this._by === "consumer" && this._info) {
        const colors = palette(this);
        const area = this._info.areas.find((item) => item.id === series.id);
        if (area) {
          part.entity = this._entityOf(area.statistics.energy);
          const of = (key: string) => this._sum(area.statistics[key] ?? []);
          const energy = of("energy");
          const solar = of("solar");
          const cheap = of("cheap");
          const expensive = of("expensive");
          part.energy = energy;
          // A bar of money splits by money: a kWh of solar power costs far less.
          const money = this._figure === "cost";
          const sources = {
            solar: money ? of("solar_cost") : solar,
            cheap: money ? of("cheap_cost") : cheap,
            expensive: money ? of("expensive_cost") : expensive,
          };
          part.mix = [
            { color: colors.solar, value: sources.solar },
            { color: colors.cheap, value: sources.cheap },
            {
              color: colors.grid,
              value: Math.max(
                (money ? of("cost") : energy) - sources.solar - sources.cheap - sources.expensive,
                0
              ),
            },
            { color: colors.expensive, value: sources.expensive },
          ];
        }
      }
      return part;
    });
    return this._by === "consumer" ? parts.sort((a, b) => b.value - a.value) : parts;
  }

  private _value(value: number): string {
    const unit = this._unit;
    if (unit !== undefined && unit !== "kWh") return unit ? `${this._fmt.number(value)} ${unit}` : this._fmt.number(value);
    return this._figure === "cost" && !this._byStatistics
      ? this._fmt.value(value, "money")
      : this._fmt.value(value, "energy");
  }

  /** Opens the dialog of a part's entity, as HA's devices graph does. */
  private _open(entity: string | undefined): void {
    if (!entity) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true })
    );
  }

  private _title(): string {
    const t = this._localize;
    if (this._config.title) return this._config.title;
    if (this._byStatistics) return "";
    // Until the integration answered, the configured split names the card.
    const by = this._area() ? this._by : (this._config.by ?? "source");
    if (by === "source") return t("breakdown_mix");
    return t(this._figure === "cost" ? "breakdown_cost_by_device" : "breakdown_energy_by_device");
  }

  /** The ring on HA's chart element, as in the user's energy cards, with
   * HA's chart legend below: a tap hides a part and the ring closes up. */
  private _ring(parts: Part[]): TemplateResult {
    const t = this._localize;
    if (this._hasChart === undefined) return html`<p class="summary">${t("loading")}</p>`;
    if (!this._hasChart) return html`<p class="summary">${t("history_no_chart")}</p>`;
    const money = this._figure === "cost" && !this._byStatistics;
    const centerColor = palette(this).line;
    const labelColor = getComputedStyle(this).getPropertyValue("--primary-text-color").trim() || "#212121";
    const key = JSON.stringify([parts, [...this._hidden], money, centerColor, labelColor, this.hass?.locale]);
    if (this._ringChart?.key !== key) {
      this._ringChart = {
        key,
        chart: shareChart({
          items: parts,
          total: t("breakdown_total"),
          format: (value) => this._value(value),
          percent: (value) => this._fmt.value(value, "percent"),
          compare: this._compared ? parts.map((part) => part.compare ?? 0) : undefined,
          compared: t("breakdown_compare_period"),
          centerColor,
          labelColor,
          hidden: this._hidden,
        }),
      };
    }
    const { chart } = this._ringChart;
    const percents = shares(parts.map((part) => (this._hidden.has(part.id) ? 0 : part.value)));
    const toggle = (id: string) => {
      const hidden = new Set(this._hidden);
      if (hidden.has(id)) hidden.delete(id);
      else hidden.add(id);
      this._hidden = hidden;
    };
    return html`<div class="ring">
      ${keyed(
        // ECharts keeps a series' first drawing: a new kind of ring needs a new chart.
        `${money}-${this._compared}`,
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
    // A consumer that would read as zero only pushes the others apart.
    const zero = this._value(0);
    const shown = parts.filter(
      (part) => this._value(part.value) !== zero || (part.compare !== undefined && this._value(part.compare) !== zero)
    );
    const max = Math.max(...shown.map((part) => Math.max(part.value, part.compare ?? 0)), 0);
    const widthOf = (value: number) => (max > 0 ? Math.max((value / max) * 100, 0) : 0);
    const split = this._config.color_by_source === true && this._by === "consumer";
    const t = this._localize;
    return html`<div class="bars">
      ${shown.map((part) => {
        const width = widthOf(part.value);
        const mixTotal = part.mix?.reduce((sum, item) => sum + item.value, 0) ?? 0;
        let line = "";
        if (this._figure === "cost" && part.energy !== undefined) {
          line = this._fmt.value(part.energy, "energy");
          if (part.energy > 0) {
            line += ` · ${t("line_average_price", { price: this._fmt.value(part.value / part.energy, "price") })}`;
          }
        }
        if (part.compare !== undefined) {
          const compared = t("breakdown_compared", { amount: this._value(part.compare) });
          line = line ? `${line} · ${compared}` : compared;
        }
        // A part with an entity of its own opens its dialog, as in HA's devices graph.
        const open = part.entity
          ? {
              role: "button",
              tabindex: "0",
              click: () => this._open(part.entity),
              key: (event: KeyboardEvent) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                this._open(part.entity);
              },
            }
          : undefined;
        return html`<div
          class="bar-row ${open ? "clickable" : ""}"
          role=${open?.role ?? nothing}
          tabindex=${open?.tabindex ?? nothing}
          @click=${open?.click}
          @keydown=${open?.key}
        >
          <div class="bar-text">
            <span class="name">${part.name}</span>
            <span class="amount">${this._value(part.value)}</span>
          </div>
          ${line ? html`<div class="bar-line">${line}</div>` : nothing}
          <div class="track">
            <div class="fill" style="width: ${width}%; ${split ? "" : `--c: ${part.color}`}">
              ${split && part.mix && mixTotal > 0
                ? part.mix.map((item) => html`<span style="width: ${(item.value / mixTotal) * 100}%; --c: ${item.color}"></span>`)
                : nothing}
            </div>
          </div>
          ${part.compare !== undefined
            ? html`<div class="track compare">
                <div class="fill" style="width: ${widthOf(part.compare)}%; --c: ${part.color}"></div>
              </div>`
            : nothing}
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
              (key) => html`<span><span class="dot" style="--c: ${CSS_COLORS[key]}"></span>${t(
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
    const parts = this._sums?.values ? this._parts() : [];
    const total = parts.reduce((sum, part) => sum + Math.max(part.value, 0), 0);
    const calculating = !this._byStatistics && this._info?.calculating === true;
    const missing = !this._byStatistics && this._info !== undefined && !this._area();
    const display =
      this._config.display ?? (!this._byStatistics && this._by === "consumer" ? "bars" : "ring");
    // No chip: the ring holds the total in its middle, the bars name each
    // amount, and the date selection or the title says the period.
    let body: TemplateResult;
    if (calculating) body = html`<p class="summary">${this._waitingText("calculating")}</p>`;
    else if (missing) body = html`<p class="summary">${t(this._info === null ? "editor_not_loaded" : "figures_unavailable")}</p>`;
    else if (this._sums && !this._sums.values) body = html`<p class="summary">${t("figures_failed")}</p>`;
    else if (!this._sums) body = html`<p class="summary">${t("loading")}</p>`;
    else if (total <= 0) body = html`<p class="summary">${t("history_empty_figure")}</p>`;
    else body = display === "bars" ? this._bars(parts) : this._ring(parts);
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${this._title()}</h2>
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
        width: 12px;
        height: 12px;
        border-radius: var(--ha-border-radius-circle, 50%);
        margin-right: 6px;
        vertical-align: -1px;
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
        height: 12px;
        margin-top: 6px;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        overflow: hidden;
        background-color: var(
          --ha-bar-background-color,
          var(--secondary-background-color)
        );
      }
      .fill {
        display: flex;
        height: 100%;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        overflow: hidden;
      }
      .fill span {
        height: 100%;
      }
      /* The compared period: thin and paler, as in HA's energy graphs. */
      .track.compare {
        height: 4px;
        margin-top: 2px;
        background: none;
      }
      .track.compare .fill {
        background: color-mix(in srgb, var(--c, transparent) 20%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c, transparent) 50%, transparent);
      }
      .bar-row.clickable {
        cursor: pointer;
        border-radius: var(--ha-border-radius-sm, 4px);
      }
      .bar-row.clickable:focus-visible {
        outline: 2px solid var(--ha-color-focus, var(--primary-color));
        outline-offset: 4px;
      }
      /* HA's energy look: the color at half strength, framed by the full color. */
      .fill,
      .fill span,
      .dot {
        background: color-mix(in srgb, var(--c, transparent) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--c, transparent);
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
