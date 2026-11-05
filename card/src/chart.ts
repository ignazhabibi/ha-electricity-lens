// The history chart on Home Assistant's own chart element `ha-chart-base`
// (ECharts), set up like HA's energy graphs: stacked bars with rounded caps,
// optional lines on a second axis, HA's legend, and the axis tooltip. `ha-chart-base` is internal to the
// frontend and loaded lazily; outside Home Assistant there is none.

const WAIT_MS = 10_000;

type CardHelpers = { createCardElement(config: Record<string, unknown>): unknown };

let ready: Promise<boolean> | undefined;

/** Resolves true once `ha-chart-base` is defined. HA loads it with its chart
 * cards, so creating a statistics graph card pulls it in. */
export function chartReady(): Promise<boolean> {
  if (customElements.get("ha-chart-base")) return Promise.resolve(true);
  const loadCardHelpers = (
    window as unknown as { loadCardHelpers?: () => Promise<CardHelpers> }
  ).loadCardHelpers;
  // Outside a dashboard the element will not come.
  if (!loadCardHelpers) return Promise.resolve(false);
  ready ??= (async () => {
    try {
      const helpers = await loadCardHelpers();
      helpers.createCardElement({ type: "statistics-graph", entities: [] });
    } catch {
      // Another card may still load it.
    }
    const timeout = new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(false), WAIT_MS)
    );
    return Promise.race([
      customElements.whenDefined("ha-chart-base").then(() => true),
      timeout,
    ]);
  })();
  return ready;
}

/** Tells whether `ha-chart-base` is there, and again if it comes after the wait. */
export function watchChart(callback: (available: boolean) => void): void {
  void chartReady().then(callback);
  void customElements.whenDefined("ha-chart-base").then(() => callback(true));
}

export interface ChartSeries {
  id: string;
  name: string;
  /** A real color: ECharts cannot read CSS variables. */
  color: string;
  values: Array<number | null>;
  /** Whether the series counts towards the total; the feed-in does not. */
  inTotal?: boolean;
}

export interface ChartLine extends ChartSeries {
  /** A value as shown in the tooltip, with its unit. */
  format: (value: number) => string;
  /** Dashed for figures of the card, dotted for other statistics. */
  dash?: "dashed" | "dotted";
  /** A value that holds for its whole slot, such as an hour's price. */
  step?: boolean;
}

export interface ChartInput {
  /** Axis label and tooltip heading of each slot. */
  labels: Array<{ axis: string; tooltip: string }>;
  series: ChartSeries[];
  /** The bars' unit, as the axis name. */
  unit: string;
  total: string;
  /** A bar's value as shown in the tooltip, with its unit. */
  format: (value: number) => string;
  /** Axis ticks in the user's number format. */
  tick: (value: number) => string;
  /** The second axis's ticks; without it as the first's. */
  lineTick?: (value: number) => string;
  /** Lines on a second axis, for example a price or a temperature. */
  lines?: ChartLine[];
  lineUnit?: string;
}

const hex2 = (alpha: number) =>
  Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

/** A color with alpha, for ECharts. */
export function withAlpha(color: string, alpha: number): string {
  const value = color.trim();
  if (/^#[0-9a-f]{6}$/i.test(value)) return value + hex2(alpha);
  if (/^#[0-9a-f]{3}$/i.test(value))
    return `#${[...value.slice(1)].map((c) => c + c).join("")}${hex2(alpha)}`;
  const rgb = value.match(/^rgba?\(([^)]+)\)/i);
  if (rgb) {
    const [r, g, b] = rgb[1].split(/[ ,/]+/).filter(Boolean);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return value;
}

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => `&#${c.charCodeAt(0)};`
  );

const marker = (color: string) =>
  `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color}"></span>`;

interface TooltipParam {
  dataIndex: number;
  seriesName?: string;
  color?: string;
  value?: number | null;
}

/** The next round step at or above a value: 1, 2, 2.5, or 5 times a power of ten. */
function roundStep(value: number): number {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const fraction = value / power;
  const factor = [1, 2, 2.5, 5, 10].find((item) => fraction <= item * (1 + 1e-9)) ?? 10;
  return factor * power;
}

const clean = (value: number) => Number(value.toFixed(10));

export interface AxisRange {
  min: number;
  max: number;
  interval: number;
}

/** Ranges of the bar and the line axis that put both zeros on one height, with
 * ticks on the same grid lines. Only needed where a side goes below zero. */
export function alignedAxes(
  bars: { min: number; max: number },
  lines: { min: number; max: number }
): { bar: AxisRange; line: AxisRange } | undefined {
  if (bars.min >= 0 && lines.min >= 0) return undefined;
  const step = roundStep((bars.max - bars.min) / 6);
  const up = Math.max(Math.ceil(clean(bars.max / step)), lines.max > 0 ? 1 : 0);
  const down = Math.max(Math.ceil(clean(-bars.min / step)), lines.min < 0 ? 1 : 0);
  const lineStep = roundStep(
    Math.max(up ? lines.max / up : 0, down ? -lines.min / down : 0)
  );
  return {
    bar: { min: clean(-down * step), max: clean(up * step), interval: step },
    line: { min: clean(-down * lineStep), max: clean(up * lineStep), interval: lineStep },
  };
}

/** The data and options for `ha-chart-base`. Values can be negative, for
 * example a heat pump's saving in a month of cheap gas: those bars stack
 * downwards. */
export function barChart(input: ChartInput) {
  const lines = input.lines ?? [];
  const bars = input.series.map((series, k) => ({
    id: series.id,
    type: "bar",
    name: series.name,
    stack: "savings",
    cursor: "default",
    barMaxWidth: 50,
    color: withAlpha(series.color, 0.5),
    itemStyle: { borderColor: series.color },
    data: series.values.map((value, i) => {
      // The outermost bar of each side gets the rounded cap.
      const outer = input.series
        .slice(k + 1)
        .every((other) => Math.sign(other.values[i] ?? 0) !== Math.sign(value ?? 0));
      return {
        value,
        itemStyle: !value
          ? { borderWidth: 0 }
          : outer
            ? { borderRadius: value > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4] }
            : undefined,
      };
    }),
  }));
  // Lines explain the bars and stay behind them: thin, dashed, no symbols.
  const lineData = lines.map((line) => ({
    id: line.id,
    type: "line",
    name: line.name,
    yAxisIndex: 1,
    color: line.color,
    symbol: "none",
    showSymbol: false,
    step: line.step ? "middle" : false,
    lineStyle: { width: 1.5, type: line.dash ?? "dashed", color: line.color },
    z: 1,
    connectNulls: true,
    data: line.values,
  }));
  const data = [...bars, ...lineData];
  const lineFormat = new Map(lines.map((line) => [line.name, line.format]));

  const tooltip = (params: unknown): Node => {
    const list = (Array.isArray(params) ? params : [params]) as TooltipParam[];
    const element = document.createElement("div");
    if (!list.length) return element;
    const isLine = (p: TooltipParam) => lineFormat.has(p.seriesName ?? "");
    const shown = list.filter((p) => p.value && !isLine(p));
    const shownLines = list.filter(
      (p) => isLine(p) && p.value !== null && p.value !== undefined
    );
    const rows = shown.map(
      (p) =>
        `${marker(String(p.color ?? ""))}${escape(p.seriesName ?? "")}: ${input.format(p.value ?? 0)}`
    );
    const lineRows = shownLines.map(
      (p) =>
        `${marker(String(p.color ?? ""))}${escape(p.seriesName ?? "")}: ${lineFormat.get(p.seriesName ?? "")?.(p.value ?? 0) ?? ""}`
    );
    const excluded = new Set(
      input.series.filter((series) => series.inTotal === false).map((series) => series.name)
    );
    const sum = shown
      .filter((p) => !excluded.has(p.seriesName ?? ""))
      .reduce((total, p) => total + (p.value ?? 0), 0);
    element.innerHTML =
      `<b>${escape(input.labels[list[0].dataIndex]?.tooltip ?? "")}</b>` +
      (rows.length ? `<br>${rows.join("<br>")}` : "") +
      (shown.length > 1 ? `<br><b>${escape(input.total)}: ${input.format(sum)}</b>` : "") +
      (lineRows.length ? `<br>${lineRows.join("<br>")}` : "");
    return element;
  };

  const barAxis = {
    type: "value",
    name: input.unit,
    nameGap: 2,
    nameTextStyle: { align: "left" },
    axisLabel: { formatter: input.tick },
    splitLine: { show: true },
  };
  const lineAxis = {
    type: "value",
    name: input.lineUnit ?? "",
    nameGap: 2,
    nameTextStyle: { align: "right" },
    axisLabel: { formatter: input.lineTick ?? input.tick },
    splitLine: { show: false },
  };
  if (lines.length) {
    // Bars stack, so each side's extent is the sum of a slot.
    const stacked = input.labels.map((_, i) => {
      const values = input.series.map((series) => series.values[i] ?? 0);
      return {
        up: values.filter((value) => value > 0).reduce((sum, value) => sum + value, 0),
        down: values.filter((value) => value < 0).reduce((sum, value) => sum + value, 0),
      };
    });
    const lineValues = lines.flatMap((line) =>
      line.values.filter((value): value is number => value !== null)
    );
    const lineMin = Math.min(0, ...lineValues);
    const aligned = alignedAxes(
      {
        min: Math.min(0, ...stacked.map((slot) => slot.down)),
        max: Math.max(0, ...stacked.map((slot) => slot.up)),
      },
      { min: lineMin, max: Math.max(0, ...lineValues) }
    );
    if (aligned) {
      Object.assign(barAxis, aligned.bar);
      Object.assign(lineAxis, aligned.line);
      // A line that never goes below zero needs no ticks there.
      const lineTick = input.lineTick ?? input.tick;
      if (lineMin >= 0) {
        lineAxis.axisLabel = { formatter: (value: number) => (value < 0 ? "" : lineTick(value)) };
      }
    }
  }
  const options = {
    xAxis: {
      type: "category",
      data: input.labels.map((label) => label.axis),
      axisTick: { show: false },
    },
    // One axis is given as an object, as HA's own energy graphs do.
    yAxis: lines.length ? [barAxis, lineAxis] : barAxis,
    grid: { top: 15, bottom: 0, left: 1, right: 1, containLabel: true },
    legend: {
      show: true,
      type: "custom",
      data: [...input.series, ...lines].map((series) => ({
        id: series.id,
        name: series.name,
      })),
    },
    // HA renders the tooltip with lit, which shows a string as text.
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: tooltip },
  };
  return { data, options };
}

export interface ShareItem {
  id: string;
  name: string;
  /** A real color: ECharts cannot read CSS variables. */
  color: string;
  value: number;
}

export interface ShareChartInput {
  items: ShareItem[];
  /** Label of the sum in the middle. */
  total: string;
  /** The sum and each value, with their unit. */
  format: (value: number) => string;
  percent: (value: number) => string;
  centerColor: string;
  labelColor: string;
  /** Parts hidden in the legend. */
  hidden: Set<string>;
}

/** Shares of a whole, in percent; zero when there is nothing. */
export function shares(values: number[]): number[] {
  const sum = values.reduce((total, value) => total + Math.max(0, value), 0);
  return values.map((value) => (sum > 0 ? (Math.max(0, value) / sum) * 100 : 0));
}

/** The data and options for a donut like HA's devices graph in its pie mode:
 * a ring of parts with their labels outside and the sum in the middle. HA's
 * ECharts build loads the pie chart only for its own cards, so each part is a
 * custom series that draws its sector; a part hidden in the legend leaves the
 * ring to the others. The ring has a fixed diameter, so it is the same size
 * wherever the card sits. */
export function shareChart(input: ShareChartInput) {
  const values = input.items.map((item) => (input.hidden.has(item.id) ? 0 : item.value));
  const pct = shares(values);
  const sum = values.reduce((total, value) => total + Math.max(0, value), 0);
  // Start at twelve o'clock and go clockwise, as ECharts' pie does.
  const angles: Array<[number, number]> = [];
  let at = -Math.PI / 2;
  for (const p of pct) {
    const to = at + (p / 100) * 2 * Math.PI;
    angles.push([at, to]);
    at = to;
  }
  // ECharts may keep the first renderItem of a series when the data changes,
  // so everything that changes travels in the data and is read with value().
  type Api = { getWidth(): number; getHeight(): number; value(dim: number): number };
  const ring = (api: Api) => {
    const r = Math.min(90, api.getWidth() / 2 - 8, api.getHeight() / 2 - 8);
    return { cx: api.getWidth() / 2, cy: api.getHeight() / 2, r, r0: (r * 40) / 70 };
  };
  const data: Array<Record<string, unknown>> = input.items.map((item, k) => ({
    id: item.id,
    type: "custom",
    name: item.name,
    coordinateSystem: "none",
    cursor: "default",
    color: withAlpha(item.color, 0.5),
    data: [[values[k], angles[k][0], angles[k][1], pct[k]]],
    renderItem: (_params: unknown, api: Api) => {
      const from = api.value(1);
      const to = api.value(2);
      if (!(to - from > 0)) return null;
      const g = ring(api);
      const children: Array<Record<string, unknown>> = [
        {
          type: "sector",
          shape: { ...g, startAngle: from, endAngle: to, cornerRadius: 4 },
          style: { fill: withAlpha(item.color, 0.5), stroke: item.color, lineWidth: 1 },
        },
      ];
      // Labels outside the ring, from 15 degrees up, as HA's pie.
      if (to - from >= (15 * Math.PI) / 180) {
        const mid = (from + to) / 2;
        const right = Math.cos(mid) >= 0;
        const p0 = [g.cx + Math.cos(mid) * g.r, g.cy + Math.sin(mid) * g.r];
        const p1 = [g.cx + Math.cos(mid) * (g.r + 10), g.cy + Math.sin(mid) * (g.r + 10)];
        const p2 = [p1[0] + (right ? 10 : -10), p1[1]];
        children.push(
          { type: "polyline", silent: true, shape: { points: [p0, p1, p2] }, style: { stroke: item.color, fill: "none" } },
          {
            type: "text",
            silent: true,
            x: p2[0] + (right ? 4 : -4),
            y: p2[1],
            style: {
              text: `${item.name}\n${input.percent(api.value(3))}`,
              fill: input.labelColor,
              fontSize: 12,
              lineHeight: 16,
              align: right ? "left" : "right",
              verticalAlign: "middle",
            },
          }
        );
      }
      return { type: "group", children };
    },
  }));
  data.push({
    id: "total",
    type: "custom",
    coordinateSystem: "none",
    silent: true,
    tooltip: { show: false },
    data: [[sum]],
    renderItem: (_params: unknown, api: Api) => {
      const g = ring(api);
      return {
        type: "text",
        x: g.cx,
        y: g.cy,
        style: {
          text: `${input.total}\n${input.format(api.value(0))}`,
          fill: input.centerColor,
          fontSize: 14,
          lineHeight: 24,
          fontWeight: "bold",
          align: "center",
          verticalAlign: "middle",
        },
      };
    },
  });
  const options = {
    xAxis: { show: false },
    yAxis: { show: false },
    // The card draws its own legend below the chart.
    legend: { show: false },
    tooltip: {
      show: true,
      trigger: "item",
      formatter: (p: { seriesId?: string; value?: number[] }): Node | string => {
        const k = input.items.findIndex((item) => item.id === p.seriesId);
        if (k < 0) return "";
        const item = input.items[k];
        const element = document.createElement("div");
        element.innerHTML =
          `<b>${escape(item.name)}</b><br>${marker(item.color)}` +
          `${input.format(p.value?.[0] ?? values[k])} (${input.percent(p.value?.[3] ?? pct[k])})`;
        return element;
      },
    },
  };
  return { data, options };
}
