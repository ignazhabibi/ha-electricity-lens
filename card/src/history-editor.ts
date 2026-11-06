// Editor of the history card: what to show as bars, how they stack, and the
// lines. Areas and their figures come from the integration.

import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import { PERIODS, figureLabel } from "./electricity-lens-figures-card";
import type { HistoryCardConfig, HistoryLine } from "./electricity-lens-history-card";
import { barFiguresOf, lineFiguresOf, stacksOf, type BarFigure } from "./history-figures";
import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { FiguresInfo, HomeAssistant } from "./types";

const SAVINGS = "savings";

const select = (options: Array<{ value: string; label: string }>) => ({
  select: { mode: "dropdown", options },
});

export class ElectricityLensHistoryCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: HistoryCardConfig;
  /** The integration's areas; undefined while loading, null when it is not loaded. */
  private _info?: FiguresInfo | null;
  private _requested = false;

  setConfig(config: HistoryCardConfig): void {
    this._config = config;
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  protected willUpdate(): void {
    if (this.hass && !this._requested) {
      this._requested = true;
      this.hass
        .callWS<FiguresInfo>({ type: `${DOMAIN}/figures` })
        .then((info) => {
          this._info = info;
        })
        .catch(() => {
          this._info = null;
        });
    }
  }

  private _schema() {
    const t = this._localize;
    const config = this._config ?? { type: "" };
    const areas = this._info?.areas ?? [];
    const schema: Array<Record<string, unknown>> = [
      { name: "title", selector: { text: {} } },
      {
        name: "period",
        selector: select(
          [...PERIODS, "all" as const].map((value) => ({ value, label: t(`period.${value}`) }))
        ),
      },
      {
        name: "area",
        selector: select([
          { value: SAVINGS, label: t("editor_savings") },
          ...areas
            .filter((area) => barFiguresOf(area).length)
            .map((area) => ({ value: area.id, label: area.name })),
        ]),
      },
    ];
    const area = areas.find((item) => item.id === config.area);
    if (area) {
      const figures = barFiguresOf(area);
      const figure = config.figure && figures.includes(config.figure) ? config.figure : figures[0];
      schema.push(
        {
          name: "figure",
          selector: select(
            figures.map((value) => ({ value, label: figureLabel(t, value, area) }))
          ),
        },
        {
          name: "stack",
          selector: select(
            stacksOf(area, figure).map((value) => ({ value, label: t(`stack.${value}`) }))
          ),
        },
        {
          name: "line",
          selector: select([
            { value: "none", label: t("editor_line_none") },
            ...lineFiguresOf(area).map((value) => ({
              value,
              label: figureLabel(t, value, area),
            })),
          ]),
        },
        { name: "lines", selector: { statistic: { multiple: true } } }
      );
    }
    return schema;
  }

  private _data(): Record<string, unknown> {
    const config = this._config ?? { type: "" };
    const area = this._info?.areas.find((item) => item.id === config.area);
    const figures = area ? barFiguresOf(area) : [];
    const figure = config.figure && figures.includes(config.figure) ? config.figure : figures[0];
    return {
      title: config.title ?? "",
      period: config.period ?? "energy_date",
      area: config.area ?? SAVINGS,
      figure,
      stack: config.stack ?? (area && figure ? stacksOf(area, figure)[0] : undefined),
      line: config.line ?? "none",
      lines: (config.lines ?? []).map((line) => line.statistic),
    };
  }

  private _changed(event: CustomEvent<{ value: Record<string, unknown> }>): void {
    if (!this._config) return;
    const value = event.detail.value;
    // Only the form's own keys change; layout options and the like stay.
    const { title, period, area: _area, figure: _figure, stack, line, lines, ...rest } = this._config;
    const config: HistoryCardConfig = rest;
    if (typeof value.title === "string" && value.title) config.title = value.title;
    config.period = (value.period as HistoryCardConfig["period"]) ?? "energy_date";
    const areaId = value.area as string | undefined;
    if (areaId && areaId !== SAVINGS) {
      config.area = areaId;
      const area = this._info?.areas.find((item) => item.id === areaId);
      const figures = area ? barFiguresOf(area) : [];
      const figure = figures.includes(value.figure as BarFigure)
        ? (value.figure as BarFigure)
        : figures[0];
      if (figure) config.figure = figure;
      const stacks = area && figure ? stacksOf(area, figure) : [];
      if (stacks.includes(value.stack as never)) config.stack = value.stack as HistoryCardConfig["stack"];
      const lines = area ? lineFiguresOf(area) : [];
      if (lines.includes(value.line as never)) config.line = value.line as HistoryCardConfig["line"];
      const old = new Map((this._config.lines ?? []).map((line) => [line.statistic, line]));
      const ids = Array.isArray(value.lines) ? (value.lines as string[]) : [];
      const chosen: HistoryLine[] = ids.filter(Boolean).map((id) => old.get(id) ?? { statistic: id });
      if (chosen.length) config.lines = chosen;
    }
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  private _label = (schema: { name: string }): string =>
    this._localize(`editor_${schema.name}` as Parameters<Localize>[0]);

  /** What the card shows without a date selection: an area this month, the
   * savings all years. */
  private _helper = (schema: { name: string }): string | undefined =>
    schema.name === "period"
      ? this._localize(this._config?.area ? "editor_period_hint" : "editor_period_hint_years")
      : undefined;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    return html`<div class="editor">
      ${this._info === null
        ? html`<p class="hint">${this._localize("editor_not_loaded")}</p>`
        : nothing}
      <ha-form
        .hass=${this.hass}
        .data=${this._data()}
        .schema=${this._schema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._changed}
      ></ha-form>
    </div>`;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
  `;
}
