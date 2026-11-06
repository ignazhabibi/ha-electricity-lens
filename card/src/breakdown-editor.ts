// Editor of the breakdown card: an area split by source or consumer, or the
// shares of any statistics, as a ring or as bars.

import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import { PERIODS, type BreakdownCardConfig } from "./electricity-lens-breakdown-card";
import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { FigureArea, FiguresInfo, HomeAssistant } from "./types";

const select = (options: Array<{ value: string; label: string }>) => ({
  select: { mode: "dropdown", options },
});

/** Whether an area splits by device: the household, and a category with
 * several meters, as the heat pump with heating and hot water. */
const byDevice = (area: FigureArea | undefined): boolean =>
  area?.kind === "household" || (area?.kind === "category" && (area.statistics.energy?.length ?? 0) > 1);

/** Areas that can be split: by source where solar power is shared out, or by device. */
const splittable = (area: FigureArea): boolean => byDevice(area) || !!area.statistics.solar?.length;

export class ElectricityLensBreakdownCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: BreakdownCardConfig;
  /** The integration's areas; undefined while loading, null when it is not loaded. */
  private _info?: FiguresInfo | null;
  private _requested = false;

  setConfig(config: BreakdownCardConfig): void {
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

  private _data(): Record<string, unknown> {
    const config = this._config ?? { type: "" };
    const statistics = !!config.statistics?.length || (config.statistics !== undefined && !config.area);
    return {
      title: config.title ?? "",
      period: config.period ?? "energy_date",
      source: statistics ? "statistics" : "energy",
      area: config.area ?? "household",
      by: config.by ?? "source",
      figure: config.figure ?? "energy",
      display: config.display ?? (!statistics && config.by === "consumer" ? "bars" : "ring"),
      color_by_source: config.color_by_source ?? false,
      statistics: (config.statistics ?? []).map((item) => item.statistic),
    };
  }

  private _schema(data: Record<string, unknown>) {
    const t = this._localize;
    const schema: Array<Record<string, unknown>> = [
      { name: "title", selector: { text: {} } },
      { name: "period", selector: select(PERIODS.map((value) => ({ value, label: t(`period.${value}`) }))) },
      {
        name: "breakdown_source",
        selector: select(
          (["energy", "statistics"] as const).map((value) => ({ value, label: t(`breakdown_source.${value}`) }))
        ),
      },
    ];
    if (data.source === "statistics") {
      schema.push({ name: "statistics", selector: { statistic: { multiple: true } } });
    } else {
      const areas = (this._info?.areas ?? []).filter(splittable);
      const area = areas.find((item) => item.id === data.area);
      const bys = [
        ...(area?.statistics.solar?.length ? ["source"] : []),
        ...(byDevice(area) ? ["consumer"] : []),
      ];
      schema.push(
        { name: "area", selector: select(areas.map((item) => ({ value: item.id, label: item.name }))) },
        { name: "by", selector: select(bys.map((value) => ({ value, label: t(`by.${value}` as Parameters<Localize>[0]) }))) }
      );
      if (data.by === "consumer") {
        schema.push({
          name: "figure",
          selector: select((["energy", "cost"] as const).map((value) => ({ value, label: t(`figure_choice.${value}`) }))),
        });
      }
    }
    schema.push({
      name: "display",
      selector: select((["ring", "bars"] as const).map((value) => ({ value, label: t(`display.${value}`) }))),
    });
    if (data.source !== "statistics" && data.by === "consumer" && data.display === "bars") {
      schema.push({ name: "color_by_source", selector: { boolean: {} } });
    }
    return schema;
  }

  private _changed(event: CustomEvent<{ value: Record<string, unknown> }>): void {
    if (!this._config) return;
    const value = { ...this._data(), ...event.detail.value };
    if ("breakdown_source" in event.detail.value) value.source = event.detail.value.breakdown_source;
    // Only the form's own keys change; layout options and the like stay.
    const { title, period, area: _area, by, figure, display, color_by_source, statistics, ...rest } = this._config;
    const config: BreakdownCardConfig = rest;
    if (typeof value.title === "string" && value.title) config.title = value.title;
    config.period = (value.period as BreakdownCardConfig["period"]) ?? "energy_date";
    if (value.source === "statistics") {
      const old = new Map((this._config.statistics ?? []).map((item) => [item.statistic, item]));
      const ids = Array.isArray(value.statistics) ? (value.statistics as string[]).filter(Boolean) : [];
      config.statistics = ids.map((id) => old.get(id) ?? { statistic: id });
    } else {
      config.area = (value.area as string) ?? "household";
      const area = this._info?.areas.find((item) => item.id === config.area);
      const canConsumer = byDevice(area);
      const canSource = !!area?.statistics.solar?.length;
      config.by = value.by === "consumer" && canConsumer ? "consumer" : canSource ? "source" : "consumer";
      if (config.by === "consumer" && value.figure === "cost") config.figure = "cost";
      else config.figure = "energy";
    }
    config.display = value.display === "bars" ? "bars" : "ring";
    if (config.by === "consumer" && config.display === "bars" && value.color_by_source === true) {
      config.color_by_source = true;
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  private _label = (schema: { name: string }): string =>
    this._localize(`editor_${schema.name}` as Parameters<Localize>[0]);

  private _helper = (schema: { name: string }): string | undefined =>
    schema.name === "period" ? this._localize("editor_period_hint") : undefined;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const data = this._data();
    return html`<div class="editor">
      ${data.source !== "statistics" && this._info === null
        ? html`<p class="hint">${this._localize("editor_not_loaded")}</p>`
        : nothing}
      <ha-form
        .hass=${this.hass}
        .data=${{ ...data, breakdown_source: data.source }}
        .schema=${this._schema(data)}
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
