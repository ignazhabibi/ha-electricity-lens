// History card of the Energy Payback integration: a figure per hour, day,
// month, or year as bars, optionally stacked by source or consumer, with a
// share or price as a line and further lines from any statistic. Without
// options it shows what each category saved, from the statistics the
// integration keeps, which include the computed past. It follows the energy
// date selection on the same dashboard, or shows a fixed period.

import {
  LitElement,
  css,
  html,
  nothing,
  unsafeCSS,
  type PropertyValues,
  type TemplateResult,
} from "lit";

import { barChart, chartReady, type ChartLine, type ChartSeries } from "./chart";
import { followEnergyDate } from "./energy-date";
import {
  PERIODS,
  figureLabel,
  type PeriodOption,
} from "./energy-payback-figures-card";
import { valueOf, type Unit } from "./figures";
import { formatter, type Format } from "./format";
import {
  fixedRange,
  meansPerSlot,
  periodOf,
  rangeLabel,
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
import { hasText, localizer, type Localize } from "./localize";
import { DOMAIN, readCategories } from "./model";
import { cardStyles } from "./styles";
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

export interface HistoryCardConfig {
  type: string;
  title?: string;
  period?: PeriodOption;
  /** Without an area the card shows the savings of all categories. */
  area?: string;
  figure?: BarFigure;
  stack?: Stack;
  line?: LineFigure;
  lines?: HistoryLine[];
}

/** The integration computes new hours every 15 minutes. */
const REFRESH_MS = 5 * 60 * 1000;
const CHART_HEIGHT = "250px";

const CATEGORY_COLORS: Record<Category, [string, string]> = {
  pv: ["--energy-payback-pv-color", "#ff9800"],
  heat_pump: ["--energy-payback-heat-pump-color", "#8e021b"],
  wallbox: ["--energy-payback-wallbox-color", "#0f9d58"],
};
const SOURCE_COLORS = {
  solar: ["--energy-solar-color", "#ff9800"],
  grid: ["--energy-grid-consumption-color", "#488fc2"],
  cheap: ["--success-color", "#43a047"],
  expensive: ["--error-color", "#db4437"],
} as const;
const LINE_COLORS = ["#9c27b0", "#e91e63", "#009688", "#795548"];

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
  bars: Array<{ series: BarSeries; name: string }>;
  unit: Unit;
  lineFigure?: { figure: LineFigure; area: FigureArea; name: string };
  lines: HistoryLine[];
  ids: string[];
}

interface Loaded {
  key: string;
  at: number;
  plan: Plan;
  slots: number[];
  rows: StatisticsResult;
  metadata: Record<string, StatisticMetadata>;
  failed: boolean;
}

export class EnergyPaybackHistoryCard extends LitElement {
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
  private _infoAt = 0;
  private _infoLoading = false;
  /** The date selection's period; null without one, undefined until known. */
  private _selected?: Range | null;
  private _loaded?: Loaded;
  private _hasChart?: boolean;
  private _loading?: string;
  private _unfollow?: () => void;
  private _chart?: ReturnType<typeof barChart>;

  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("energy-payback-history-card-editor");
  }

  setConfig(config: HistoryCardConfig | undefined): void {
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

  private get _savings(): boolean {
    return !this._config.area;
  }

  private _follow(): void {
    if ((this._config.period ?? "energy_date") !== "energy_date") return;
    if (this._unfollow || !this.isConnected || !this.hass?.connection) return;
    this._unfollow = followEnergyDate(this.hass.connection, (range) => {
      this._selected = range;
    });
  }

  private async _loadInfo(): Promise<void> {
    if (!this.hass || this._infoLoading) return;
    this._infoLoading = true;
    try {
      this._info = await this.hass.callWS<FiguresInfo>({ type: `${DOMAIN}/figures` });
    } catch {
      this._info = null;
    }
    this._infoAt = Date.now();
    this._infoLoading = false;
  }

  private _color([variable, fallback]: readonly [string, string]): string {
    return getComputedStyle(this).getPropertyValue(variable).trim() || fallback;
  }

  /** The period shown, and how long each bar is. */
  private _range(fallback: () => Range): { range: Range; period: Period } | undefined {
    const option = this._config.period ?? "energy_date";
    if (option !== "energy_date") {
      const range = fixedRange(option);
      return { range, period: periodOf(range) };
    }
    if (this._selected === undefined) return undefined;
    if (this._selected) return { range: this._selected, period: periodOf(this._selected) };
    const range = fallback();
    return { range, period: this._savings ? "year" : periodOf(range) };
  }

  private _savingsPlan(): Plan | undefined {
    if (!this.hass) return undefined;
    const t = this._localize;
    const categories = readCategories(this.hass);
    if (!categories.length || categories.some((c) => c.calculating)) return undefined;
    const shown = this._range(() => yearsOf(categories.map((c) => c.countingSince)));
    if (!shown) return undefined;
    const bars = categories.map((category) => ({
      series: {
        id: category.category,
        name: {},
        color: this._color(CATEGORY_COLORS[category.category]),
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
    const colors = {
      solar: this._color(SOURCE_COLORS.solar),
      grid: this._color(SOURCE_COLORS.grid),
      cheap: this._color(SOURCE_COLORS.cheap),
      expensive: this._color(SOURCE_COLORS.expensive),
    };
    const bars = barSeries(info, area, figure, stack, colors).map((series) => ({
      series,
      name:
        series.name.text ??
        (series.name.key && hasText(series.name.key) ? t(series.name.key) : series.id),
    }));
    if (bars.length === 1) bars[0].name = figureLabel(t, figure, area);
    const lineFigure =
      config.line && area.statistics
        ? { figure: config.line, area, name: figureLabel(t, config.line, area) }
        : undefined;
    return this._plan(shown, bars, UNITS[figure], lineFigure, config.lines ?? []);
  }

  private _plan(
    shown: { range: Range; period: Period },
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
        bars.map((bar) => bar.series.id),
        lineFigure?.figure,
        lines,
        shown.range.start,
        shown.range.end,
        shown.period,
      ]),
      range: shown.range,
      period: shown.period,
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
      metadata: {},
      failed: false,
    };
    try {
      const statistics = plan.lines.map((line) => line.statistic);
      const [rows, metadata] = await Promise.all([
        this.hass.callWS<StatisticsResult>({
          type: "recorder/statistics_during_period",
          start_time: new Date(plan.range.start).toISOString(),
          end_time: new Date(plan.range.end + 1).toISOString(),
          statistic_ids: plan.ids,
          period: statisticsPeriod(plan.period),
          types: ["change", "mean"],
          units: { energy: "kWh" },
        }),
        statistics.length
          ? this.hass.callWS<StatisticMetadata[]>({
              type: "recorder/get_statistics_metadata",
              statistic_ids: statistics,
            })
          : Promise.resolve([]),
      ]);
      loaded.rows = rows;
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
    if (this._hasChart === undefined) {
      this._hasChart = false;
      chartReady().then((ok) => {
        this._hasChart = ok;
      });
    }
    if (!this._savings) {
      const infoStale = Date.now() - this._infoAt > REFRESH_MS;
      if ((this._info === undefined || infoStale) && !this._infoLoading) {
        void this._loadInfo();
      }
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

  private _perSlot(ids: string[]): Array<number | null> {
    const loaded = this._loaded;
    if (!loaded) return [];
    const result: Array<number | null> = loaded.slots.map(() => null);
    for (const id of ids) {
      valuesPerSlot(loaded.rows[id], loaded.slots, loaded.plan.period).forEach((value, i) => {
        if (value !== null) result[i] = (result[i] ?? 0) + value;
      });
    }
    return result;
  }

  private _barValues(series: BarSeries): Array<number | null> {
    const plus = this._perSlot(series.plus);
    const minus = this._perSlot(series.minus);
    return plus.map((value, i) => {
      if (value === null) return null;
      const result = value - (minus[i] ?? 0);
      return series.floor ? Math.max(result, 0) : result;
    });
  }

  private _lines(): ChartLine[] {
    const loaded = this._loaded;
    if (!loaded) return [];
    const { plan, slots } = loaded;
    const fmt = this._fmt;
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
        color: LINE_COLORS[0],
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
          (this.hass?.states[line.statistic]?.attributes.friendly_name as string | undefined) ??
          line.statistic,
        color: LINE_COLORS[(index + 1) % LINE_COLORS.length],
        values,
        format: (value) => `${fmt.number(value)}${unit ? ` ${unit}` : ""}`,
      });
    });
    return lines;
  }

  private _buildChart(): ReturnType<typeof barChart> | undefined {
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
    }));
    const lines = this._lines();
    const lineUnits: Partial<Record<Unit, string>> = {
      price: this.hass?.config.currency === "EUR" ? "ct/kWh" : `${fmt.currencySymbol()}/kWh`,
      percent: "%",
      per_100km: `${fmt.currencySymbol()}/100 km`,
    };
    const lineUnit =
      plan.lineFigure && !plan.lines.length
        ? (lineUnits[valueOf(plan.lineFigure.figure, plan.lineFigure.area, () => 0, null).unit] ?? "")
        : "";
    return barChart({
      labels: this._labels(loaded.slots, plan.period),
      series,
      unit: plan.unit === "money" ? fmt.currencySymbol() : plan.unit === "distance" ? "km" : "kWh",
      total: t("history_total"),
      format: (value) =>
        plan.unit === "money"
          ? fmt.value(value, "money")
          : `${fmt.number(value, Math.abs(value) < 10 ? 2 : 1)} ${plan.unit === "distance" ? "km" : "kWh"}`,
      tick: (value) => fmt.number(value, Math.abs(value) < 10 ? 2 : 0),
      lines,
      lineUnit,
    });
  }

  private _labels(slots: number[], period: Period): Array<{ axis: string; tooltip: string }> {
    const format = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(this._language, options);
    const hour = format({ hour: "2-digit", minute: "2-digit" });
    const severalYears =
      slots.length > 0 &&
      new Date(slots[0]).getFullYear() !== new Date(slots[slots.length - 1]).getFullYear();
    const axis = {
      hour,
      day: format({ day: "numeric" }),
      month: format(severalYears ? { month: "short", year: "2-digit" } : { month: "short" }),
      year: format({ year: "numeric" }),
    }[period];
    const tooltip = {
      hour,
      day: format({ weekday: "short", day: "numeric", month: "short" }),
      month: format({ month: "long", year: "numeric" }),
      year: format({ year: "numeric" }),
    }[period];
    return slots.map((slot) => ({
      axis: axis.format(slot),
      tooltip:
        period === "hour"
          ? `${hour.format(slot)} – ${hour.format(slot + 3_600_000)}`
          : tooltip.format(slot),
    }));
  }

  private _title(): string {
    const t = this._localize;
    if (this._config.title) return this._config.title;
    if (this._savings) return t("history_title");
    const area = this._info?.areas.find((item) => item.id === this._config.area);
    return area ? figureLabel(t, this._config.figure ?? "energy", area) : t("history_title");
  }

  protected render(): TemplateResult {
    const t = this._localize;
    if (!this.hass) return html``;
    const title = this._title();
    if (this._savings && !readCategories(this.hass).length) {
      return html`<ha-card>
        <div class="header"><h2 class="title">${title}</h2></div>
        <p class="summary">${t("not_set_up")}</p>
      </ha-card>`;
    }
    const calculating = this._savings
      ? readCategories(this.hass).some((category) => category.calculating)
      : this._info?.calculating === true;
    const loaded = calculating ? undefined : this._loaded;
    const values = this._chart?.data
      .filter((series) => series.type === "bar")
      .flatMap((series) => series.data.map((point) => (point as { value?: number | null }).value ?? null)) ?? [];
    const sum = values.reduce<number>((total, value) => total + (value ?? 0), 0);
    const hasData = values.some((value) => value);
    const unit = loaded?.plan.unit ?? "money";
    const missing = !this._savings && this._info !== undefined && !this._figurePlan() && !calculating;
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${title}</h2>
        ${loaded && !loaded.failed && hasData
          ? html`<span class="chip">${this._fmt.value(sum, unit)}</span>`
          : loaded
            ? html`<span class="chip">${rangeLabel(loaded.plan.range, this._language)}</span>`
            : nothing}
      </div>
      ${calculating
        ? html`<p class="summary">${t("calculating_all")}</p>`
        : missing
          ? html`<p class="summary">${t(this._info === null ? "editor_not_loaded" : "figures_unavailable")}</p>`
          : this._body(loaded, hasData)}
    </ha-card>`;
  }

  private _body(loaded: Loaded | undefined, hasData: boolean) {
    const t = this._localize;
    if (!this._hasChart) {
      return html`<p class="summary">${t("history_no_chart")}</p>`;
    }
    if (loaded?.failed) {
      return html`<p class="summary">${t("history_failed")}</p>`;
    }
    return html`<div class="chart">
      ${this._chart
        ? html`<ha-chart-base
            .hass=${this.hass}
            .data=${this._chart.data}
            .options=${this._chart.options}
            .height=${CHART_HEIGHT}
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
