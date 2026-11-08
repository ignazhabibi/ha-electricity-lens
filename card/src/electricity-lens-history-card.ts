// History card of the Electricity Lens integration: a figure per hour, day,
// month, or year as bars, optionally stacked by source or consumer, with a
// share or price as a line and further lines from any statistic. Without
// options it shows what each category saved, from the statistics the
// integration keeps, which include the computed past. It follows the energy
// date selection on the same dashboard, with its comparison, or shows a fixed
// period.

import {
  css,
  html,
  nothing,
  unsafeCSS,
  type PropertyValues,
  type TemplateResult,
} from "lit";

import { barChart, watchChart, type ChartLine, type ChartSeries } from "./chart";
import { consumerColors, palette } from "./colors";
import { checkCollectionKey, followEnergyDate } from "./energy-date";
import {
  PERIODS,
  figureLabel,
  type PeriodOption,
} from "./electricity-lens-figures-card";
import { valueOf, type Unit } from "./figures";
import { entityName, formatter, hour12, type Format } from "./format";
import {
  FIRST_YEAR,
  fixedRange,
  fromFirstValue,
  meansPerSlot,
  periodOf,
  slotsOf,
  statisticsPeriod,
  valuesPerSlot,
  yearsOf,
  type Period,
  type Range,
} from "./history";
import {
  barSeries,
  stacksOf,
  type BarFigure,
  type BarSeries,
  type LineFigure,
  type Stack,
} from "./history-figures";
import { RETRY_MS, cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { calculatingText, hasText, localizer, type Localize } from "./localize";
import { noCategoriesText, readCategories, readProgress } from "./model";
import { cardStyles } from "./styles";
import { explanation, type Explanation } from "./explain";
import type {
  Category,
  FigureArea,
  FiguresInfo,
  HomeAssistant,
  StatisticMetadata,
  StatisticsResult,
} from "./types";

export { PERIODS };

export interface HistoryLine {
  statistic: string;
  value?: "mean" | "change";
  name?: string;
}

/** A history's title without one of its own: its figure in its area's words,
 * or the savings. See CONTEXT.md. */
export function historyTitle(t: Localize, config: HistoryCardConfig, info?: FiguresInfo | null): string {
  if (config.title) return config.title;
  if (!config.area) return t("history_title");
  const figure = config.figure ?? "energy";
  const area = info?.areas.find((item) => item.id === config.area);
  if (area) return figureLabel(t, figure, area);
  const generic = `figure.${figure}`;
  return hasText(generic) ? t(generic) : t("history_title");
}

export interface HistoryCardConfig {
  type: string;
  collection_key?: string;
  title?: string;
  /** "all" shows every year since counting began. */
  period?: PeriodOption | "all";
  /** Without an area the card shows the savings of all categories. */
  area?: string;
  figure?: BarFigure;
  stack?: Stack;
  line?: LineFigure;
  /** Replaces the line's name. */
  line_name?: string;
  lines?: HistoryLine[];
}

/** The integration computes new hours every 15 minutes. */
const REFRESH_MS = 5 * 60 * 1000;
/** HA's chart sizes itself like the energy graphs (half its width, 200 px at
 * least); this only keeps the space while it loads. */
const CHART_HEIGHT = "200px";

const UNITS: Record<BarFigure, Unit> = {
  energy: "energy",
  cost: "money",
  saving: "money",
  export: "energy",
  heat: "energy",
  distance: "distance",
  alternative_cost: "money",
};

interface Plan {
  key: string;
  range: Range;
  period: Period;
  /** The period compared with, from the date selection. */
  compare?: Range;
  /** Whether the years before the first value are left out. */
  fromFirstValue: boolean;
  bars: Array<{ series: BarSeries; name: string }>;
  unit: Unit;
  lineFigure?: { figure: LineFigure; area: FigureArea; name: string };
  lines: HistoryLine[];
  ids: string[];
}

interface Shown {
  range: Range;
  period: Period;
  compare?: Range;
  fromFirstValue: boolean;
}

interface Loaded {
  key: string;
  at: number;
  plan: Plan;
  slots: number[];
  rows: StatisticsResult;
  compareSlots: number[];
  compareRows: StatisticsResult;
  metadata: Record<string, StatisticMetadata>;
  failed: boolean;
}

interface Chart extends ReturnType<typeof barChart> {
  /** The bars' total, without the feed-in, and whether anything has a value. */
  total: number;
  hasData: boolean;
}

export class ElectricityLensHistoryCard extends LensCard {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
    _selected: { state: true },
    _loaded: { state: true },
    _hasChart: { state: true },
  };

  hass?: HomeAssistant;
  private _config: HistoryCardConfig = { type: "" };
  private _info?: FiguresInfo | null;
  private _infoLoading = false;
  /** The date selection's period; null without one, undefined until known. */
  private _selected?: Range | null;
  /** The period the date selection compares with, if it does. */
  private _compare?: Range;
  private _loaded?: Loaded;
  /** Whether HA's chart element is there; undefined while it may still load. */
  private _hasChart?: boolean;
  private _watchingChart = false;
  private _loading?: string;
  private _unfollow?: () => void;
  private _retryTimer?: ReturnType<typeof setTimeout>;
  private _chart?: Chart;

  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("electricity-lens-history-card-editor");
  }

  setConfig(config: HistoryCardConfig | undefined): void {
    checkCollectionKey(config?.collection_key);
    this._config = config ?? { type: "" };
  }

  getCardSize(): number {
    return 5;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 12, min_columns: 6 };
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
    return formatter(this.hass?.locale, this.hass?.config.currency ?? "EUR");
  }

  private get _savings(): boolean {
    return !this._config.area;
  }

  private _follow(): void {
    if ((this._config.period ?? "energy_date") !== "energy_date") return;
    if (this._unfollow || !this.isConnected || !this.hass?.connection) return;
    this._unfollow = followEnergyDate(this.hass.connection, this._config.collection_key, (range, compare) => {
      this._selected = range;
      this._compare = compare;
    });
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

  /** The period shown, how long each bar is, and the period compared with. */
  private _range(fallback: () => Range): Shown | undefined {
    const option = this._config.period ?? "energy_date";
    if (option === "all") {
      const end = new Date(new Date().getFullYear() + 1, 0, 1).getTime() - 1;
      return { range: { start: new Date(FIRST_YEAR, 0, 1).getTime(), end }, period: "year", fromFirstValue: true };
    }
    if (option !== "energy_date") {
      const range = fixedRange(option);
      return { range, period: periodOf(range), fromFirstValue: false };
    }
    if (this._selected === undefined) return undefined;
    if (this._selected) {
      return {
        range: this._selected,
        period: periodOf(this._selected),
        compare: this._compare,
        fromFirstValue: false,
      };
    }
    const range = fallback();
    return { range, period: this._savings ? "year" : periodOf(range), fromFirstValue: false };
  }

  private _savingsPlan(): Plan | undefined {
    if (!this.hass) return undefined;
    const t = this._localize;
    const categories = readCategories(this.hass);
    if (!categories.length || categories.some((c) => c.calculating)) return undefined;
    const shown = this._range(() => yearsOf(categories.map((c) => c.countingSince)));
    if (!shown) return undefined;
    const colors = palette(this);
    const known = this._info ? consumerColors(this._info, colors) : undefined;
    const categoryColors: Record<Category, string> = {
      pv: colors.solar,
      heat_pump: known?.get("heat_pump") ?? colors.heat,
      wallbox: known?.get("wallbox") ?? colors.car,
    };
    const bars = categories.map((category) => ({
      series: {
        id: category.category,
        name: {},
        color: categoryColors[category.category],
        plus: [category.savingStatistic],
        minus: [],
      },
      name: t(`category.${category.category}`),
    }));
    return this._plan(shown, bars, "money", undefined, []);
  }

  private _figurePlan(): Plan | undefined {
    const info = this._info;
    const config = this._config;
    if (!info || info.calculating) return undefined;
    const area = info.areas.find((item) => item.id === config.area);
    const figure = config.figure ?? "energy";
    if (!area || !area.statistics[figure]?.length) return undefined;
    const shown = this._range(() => fixedRange("this_month"));
    if (!shown) return undefined;
    const t = this._localize;
    const stacks = stacksOf(area, figure);
    const stack = config.stack && stacks.includes(config.stack) ? config.stack : stacks[0];
    const bars = barSeries(info, area, figure, stack, palette(this)).map((series) => ({
      series,
      name:
        series.name.text ??
        (series.name.key && hasText(series.name.key) ? t(series.name.key) : series.id),
    }));
    if (bars.length === 1) bars[0].name = figureLabel(t, figure, area);
    // The grid price comes from the grid, whichever area the bars show.
    const lineArea =
      config.line === "grid_price"
        ? (info.areas.find((item) => item.kind === "grid") ?? area)
        : area;
    const lineFigure =
      config.line && area.statistics
        ? { figure: config.line, area: lineArea, name: config.line_name ?? figureLabel(t, config.line, lineArea) }
        : undefined;
    return this._plan(shown, bars, UNITS[figure], lineFigure, config.lines ?? []);
  }

  private _plan(
    shown: Shown,
    bars: Plan["bars"],
    unit: Unit,
    lineFigure: Plan["lineFigure"],
    lines: HistoryLine[]
  ): Plan {
    const ids = new Set<string>();
    for (const { series } of bars) [...series.plus, ...series.minus].forEach((id) => ids.add(id));
    if (lineFigure) {
      for (const list of Object.values(lineFigure.area.statistics)) {
        (list ?? []).forEach((id) => ids.add(id));
      }
    }
    lines.forEach((line) => ids.add(line.statistic));
    const sorted = [...ids].sort();
    return {
      key: JSON.stringify([
        sorted,
        bars.map((bar) => [bar.series.id, bar.series.color]),
        lineFigure?.figure,
        lines,
        shown.range.start,
        shown.range.end,
        shown.period,
        shown.compare?.start,
        shown.compare?.end,
      ]),
      range: shown.range,
      period: shown.period,
      compare: shown.compare,
      fromFirstValue: shown.fromFirstValue,
      bars,
      unit,
      lineFigure,
      lines,
      ids: sorted,
    };
  }

  private async _load(plan: Plan): Promise<void> {
    if (!this.hass) return;
    this._loading = plan.key;
    const loaded: Loaded = {
      key: plan.key,
      at: Date.now(),
      plan,
      slots: slotsOf(plan.range, plan.period),
      rows: {},
      compareSlots: plan.compare ? slotsOf(plan.compare, plan.period) : [],
      compareRows: {},
      metadata: {},
      failed: false,
    };
    const hass = this.hass;
    const request = (range: Range, ids: string[]) =>
      hass.callWS<StatisticsResult>({
        type: "recorder/statistics_during_period",
        start_time: new Date(range.start).toISOString(),
        end_time: new Date(range.end + 1).toISOString(),
        statistic_ids: ids,
        period: statisticsPeriod(plan.period),
        types: ["change", "mean"],
        units: { energy: "kWh" },
      });
    try {
      const statistics = plan.lines.map((line) => line.statistic);
      // The compared period shows the bars only, as in HA's energy graphs.
      const barIds = [...new Set(plan.bars.flatMap(({ series }) => [...series.plus, ...series.minus]))];
      const [rows, compareRows, metadata] = await Promise.all([
        request(plan.range, plan.ids),
        plan.compare ? request(plan.compare, barIds) : Promise.resolve({}),
        statistics.length
          ? this.hass.callWS<StatisticMetadata[]>({
              type: "recorder/get_statistics_metadata",
              statistic_ids: statistics,
            })
          : Promise.resolve([]),
      ]);
      loaded.rows = rows;
      loaded.compareRows = compareRows;
      loaded.metadata = Object.fromEntries(metadata.map((m) => [m.statistic_id, m]));
    } catch {
      loaded.failed = true;
    }
    if (this._loading !== plan.key) return;
    this._loading = undefined;
    this._loaded = loaded;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (!this.hass) return;
    if (changed.has("hass") || changed.has("_config")) this._follow();
    if (!this._watchingChart) {
      this._watchingChart = true;
      watchChart((ok) => {
        this._hasChart = ok;
      });
    }
    if (this._info === undefined) this._info = cachedInfo();
    if (infoStale() && !this._infoLoading) void this._loadInfo();
    else if (
      !this._savings &&
      this.isConnected &&
      this._info?.calculating &&
      !this._retryTimer &&
      !this._infoLoading
    ) {
      this._retryTimer = setTimeout(() => void this._loadInfo(), RETRY_MS);
    }
    const plan = this._savings ? this._savingsPlan() : this._figurePlan();
    const stale = !this._loaded || Date.now() - this._loaded.at > REFRESH_MS;
    if (
      plan &&
      plan.key !== this._loading &&
      (plan.key !== this._loaded?.key || (stale && !this._loading))
    ) {
      void this._load(plan);
    }
    if (changed.has("_loaded")) this._chart = this._buildChart();
  }

  // Values per slot

  private _perSlot(ids: string[], compared = false): Array<number | null> {
    const loaded = this._loaded;
    if (!loaded) return [];
    const slots = compared ? loaded.compareSlots : loaded.slots;
    const rows = compared ? loaded.compareRows : loaded.rows;
    const result: Array<number | null> = slots.map(() => null);
    for (const id of ids) {
      valuesPerSlot(rows[id], slots, loaded.plan.period).forEach((value, i) => {
        if (value !== null) result[i] = (result[i] ?? 0) + value;
      });
    }
    return result;
  }

  private _barValues(series: BarSeries, compared = false): Array<number | null> {
    const plus = this._perSlot(series.plus, compared);
    const minus = this._perSlot(series.minus, compared);
    return plus.map((value, i) => {
      if (value === null && minus[i] === null) return null;
      const result = (value ?? 0) - (minus[i] ?? 0);
      const shown = series.floor ? Math.max(result, 0) : result;
      return series.negative ? -shown : shown;
    });
  }

  private _lines(): ChartLine[] {
    const loaded = this._loaded;
    if (!loaded) return [];
    const { plan, slots } = loaded;
    const fmt = this._fmt;
    const colors = palette(this);
    // Prices show in cents where the currency has them.
    const scale = this.hass?.config.currency === "EUR" ? 100 : 1;
    const lines: ChartLine[] = [];
    if (plan.lineFigure) {
      const { figure, area, name } = plan.lineFigure;
      const sums = Object.fromEntries(
        Object.entries(area.statistics).map(([key, ids]) => [key, this._perSlot(ids ?? [])])
      );
      const values = slots.map((_, i) => {
        const result = valueOf(figure, area, (key) => sums[key]?.[i] ?? null, null);
        return result.value;
      });
      const unit = valueOf(figure, area, () => 0, null).unit;
      lines.push({
        id: `line_${figure}`,
        name,
        color: colors.line,
        dash: "dashed",
        step: unit === "price" && plan.period === "hour",
        values: unit === "price" ? values.map((v) => (v === null ? null : v * scale)) : values,
        format: (value) => fmt.value(unit === "price" ? value / scale : value, unit),
      });
    }
    plan.lines.forEach((line, index) => {
      const metadata = loaded.metadata[line.statistic];
      const kind = line.value ?? (metadata?.has_sum ? "change" : "mean");
      const unit =
        metadata?.unit_class === "energy"
          ? "kWh"
          : (metadata?.statistics_unit_of_measurement ?? "");
      const values =
        kind === "mean"
          ? meansPerSlot(loaded.rows[line.statistic], slots, plan.period)
          : valuesPerSlot(loaded.rows[line.statistic], slots, plan.period);
      lines.push({
        id: `statistic_${index}`,
        name:
          line.name ??
          metadata?.name ??
          entityName(this.hass, line.statistic) ??
          line.statistic,
        // The first line of the card is grey; further ones take quiet colors.
        color: index === 0 && !plan.lineFigure ? colors.line : colors.consumers[index % colors.consumers.length],
        dash: "dotted",
        values,
        format: (value) => `${fmt.number(value)}${unit ? ` ${unit}` : ""}`,
      });
    });
    return lines;
  }

  private _buildChart(): Chart | undefined {
    const loaded = this._loaded;
    if (!loaded || loaded.failed) return undefined;
    const t = this._localize;
    const fmt = this._fmt;
    const { plan } = loaded;
    const series: ChartSeries[] = plan.bars.map(({ series: bar, name }) => ({
      id: bar.id,
      name,
      color: bar.color,
      values: this._barValues(bar),
      inTotal: !bar.negative,
    }));
    let lines = this._lines();
    // "All years" begins with the first year that has a value.
    const first = plan.fromFirstValue
      ? fromFirstValue([...series, ...lines].map((item) => item.values), loaded.slots.length)
      : 0;
    const from = <T,>(values: T[]) => values.slice(first);
    series.forEach((item) => (item.values = from(item.values)));
    lines = lines.map((line) => ({ ...line, values: from(line.values) }));
    const slots = from(loaded.slots);
    const labels = this._labels(slots, plan.period);
    const compare = plan.compare
      ? {
          series: plan.bars.map(({ series: bar, name }) => ({
            id: bar.id,
            name,
            color: bar.color,
            values: this._barValues(bar, true),
            inTotal: !bar.negative,
          })),
          labels: this._labels(loaded.compareSlots, plan.period),
        }
      : undefined;
    const lineUnits: Partial<Record<Unit, string>> = {
      price: this.hass?.config.currency === "EUR" ? "ct/kWh" : `${fmt.currencySymbol()}/kWh`,
      percent: "%",
      per_100km: `${fmt.currencySymbol()}/100 km`,
    };
    const lineUnit =
      plan.lineFigure && !plan.lines.length
        ? (lineUnits[valueOf(plan.lineFigure.figure, plan.lineFigure.area, () => 0, null).unit] ?? "")
        : "";
    const last = slots[slots.length - 1] ?? plan.range.start;
    const chart = barChart({
      slots,
      // As Home Assistant's energy graphs: hours end half an hour after the last.
      axis: {
        min: slots[0] ?? plan.range.start,
        max: plan.period === "hour" ? last + 1_800_000 : last,
        period: plan.period === "month" || plan.period === "year" ? plan.period : undefined,
        language: this._language,
      },
      labels,
      series,
      compare,
      unit: plan.unit === "money" ? fmt.currencySymbol() : plan.unit === "distance" ? "km" : "kWh",
      total: t("history_total"),
      format: (value) =>
        plan.unit === "money"
          ? fmt.value(value, "money")
          : `${fmt.number(value, Math.abs(value) < 10 ? 2 : 1)} ${plan.unit === "distance" ? "km" : "kWh"}`,
      tick: (value) => fmt.number(value),
      lineTick: (value) => fmt.number(value, Number.isInteger(value) ? 0 : 1),
      lines,
      lineUnit,
    });
    const counted = series.filter((item) => item.inTotal !== false);
    const total = counted.flatMap((item) => item.values).reduce<number>((sum, value) => sum + (value ?? 0), 0);
    const hasData = [...series, ...lines].some((item) => item.values.some((value) => value));
    return { ...chart, total, hasData };
  }

  /** Each slot's tooltip heading; the axis labels come from `ha-chart-base`. */
  private _labels(slots: number[], period: Period): string[] {
    const format = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(this._language, options);
    const hour = format({ hour: "numeric", minute: "2-digit", hour12: hour12(this.hass?.locale) });
    const tooltip = {
      hour,
      day: format({ weekday: "short", day: "numeric", month: "short" }),
      month: format({ month: "long", year: "numeric" }),
      year: format({ year: "numeric" }),
    }[period];
    return slots.map((slot) =>
      period === "hour" ? `${hour.format(slot)} – ${hour.format(slot + 3_600_000)}` : tooltip.format(slot)
    );
  }


  /** How the costs are valued, where the bars need it: the bill's items, or
   * PV power at the feed-in compensation. */
  private _explanation(): Explanation {
    const t = this._localize;
    const area = this._info?.areas.find((item) => item.id === this._config.area);
    if (this._savings || !area || this._config.figure !== "cost") return [];
    const stacks = stacksOf(area, "cost");
    const stack = this._config.stack && stacks.includes(this._config.stack) ? this._config.stack : stacks[0];
    if (stack === "bill") return [t("info.bill")];
    if (stack !== "source" || !area.statistics.solar_cost?.length) return [];
    return [t("info.cost_by_source"), ...(area.kind === "household" ? [t("info.cost_by_source.feed_in")] : [])];
  }

  private _title(): string {
    return historyTitle(this._localize, this._config, this._info);
  }


  protected render(): TemplateResult {
    const t = this._localize;
    if (!this.hass) return html``;
    const title = this._title();
    if (this._savings && !readCategories(this.hass).length) {
      return html`<ha-card>
        <div class="header"><h2 class="title">${title}</h2></div>
        <p class="summary">${t(noCategoriesText(this.hass))}</p>
      </ha-card>`;
    }
    const calculating = this._savings
      ? readCategories(this.hass).some((category) => category.calculating)
      : this._info?.calculating === true;
    const loaded = calculating ? undefined : this._loaded;
    const hasData = this._chart?.hasData ?? false;
    const unit = loaded?.plan.unit ?? "money";
    // Missing only once the integration answered without this area.
    const missing =
      !this._savings &&
      this._info !== undefined &&
      !this._info?.areas.some(
        (area) => area.id === this._config.area && area.statistics[this._config.figure ?? "energy"]?.length
      );
    // As HA's energy graphs, the chip holds the total, and only that.
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${title}</h2>
        ${loaded && !loaded.failed && hasData && this._chart
          ? html`<span class="chip">${this._fmt.value(this._chart.total, unit)}</span>`
          : nothing}
        ${calculating ? nothing : explanation(t("info_label"), this._explanation())}
      </div>
      ${calculating
        ? html`<p class="summary">${calculatingText(t, readProgress(this.hass, this._info))}</p>`
        : missing
          ? html`<p class="summary">${t(this._info === null ? "editor_not_loaded" : "figures_unavailable")}</p>`
          : this._body(loaded, hasData)}
    </ha-card>`;
  }

  private _body(loaded: Loaded | undefined, hasData: boolean) {
    const t = this._localize;
    if (this._hasChart === false) {
      return html`<p class="summary">${t("history_no_chart")}</p>`;
    }
    if (loaded?.failed) {
      return html`<p class="summary">${t("history_failed")}</p>`;
    }
    return html`<div class="chart">
      ${this._chart && this._hasChart
        ? html`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
          ></ha-chart-base>`
        : nothing}
      ${loaded && !hasData
        ? html`<div class="empty">
            ${t(this._savings ? "history_empty" : "history_empty_figure")}
          </div>`
        : nothing}
    </div>`;
  }

  static styles = [
    cardStyles,
    css`
      .chart {
        position: relative;
        min-height: ${unsafeCSS(CHART_HEIGHT)};
        padding: 8px 16px 16px;
      }
      .empty {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        background: color-mix(in srgb, var(--card-background-color, #fff) 70%, transparent);
      }
    `,
  ];
}
