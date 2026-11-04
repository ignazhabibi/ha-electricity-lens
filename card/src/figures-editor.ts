// Editor of the key figure card: the form fits the figure's source, so no YAML
// is needed. Areas and figures come from the integration.

import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import {
  PERIODS,
  figureLabel,
  figuresConfig,
  type FiguresCardConfig,
} from "./electricity-lens-figures-card";
import {
  STATISTIC_VALUES,
  figuresOf,
  sourceOf,
  type FigureConfig,
  type Source,
} from "./figures";
import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { FiguresInfo, HomeAssistant } from "./types";

type FormData = Record<string, unknown>;
const SOURCES: Source[] = ["energy", "statistic", "entity"];

const select = (options: Array<{ value: string; label: string }>) => ({
  select: { mode: "dropdown", options },
});

export class ElectricityLensFiguresCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: FiguresCardConfig;
  private _info?: FiguresInfo | null;

  setConfig(config: FiguresCardConfig): void {
    this._config = figuresConfig(config);
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  protected willUpdate(): void {
    if (this.hass && this._info === undefined) {
      this._info = null;
      this.hass
        .callWS<FiguresInfo>({ type: `${DOMAIN}/figures` })
        .then((info) => {
          this._info = info;
        })
        .catch(() => undefined);
    }
  }

  private _schema(config: FiguresCardConfig) {
    const t = this._localize;
    const source = sourceOf(config);
    const schema: FormData[] = [
      {
        name: "source",
        selector: select(
          SOURCES.map((value) => ({ value, label: t(`source.${value}`) }))
        ),
      },
    ];
    if (source === "energy") {
      const areas = this._info?.areas ?? [];
      const area = areas.find((item) => item.id === config.area);
      schema.push(
        {
          name: "area",
          selector: select(areas.map((item) => ({ value: item.id, label: item.name }))),
        },
        {
          name: "figure",
          selector: select(
            area
              ? figuresOf(area).map((figure) => ({
                  value: figure,
                  label: figureLabel(t, figure, area),
                }))
              : []
          ),
        }
      );
    } else if (source === "statistic") {
      schema.push(
        { name: "statistic", selector: { statistic: {} } },
        {
          name: "value",
          selector: select(
            STATISTIC_VALUES.map((value) => ({ value, label: t(`value.${value}`) }))
          ),
        }
      );
      if ((config.value ?? "change") === "mean") {
        schema.push({
          name: "secondary",
          selector: select(
            (["none", "range"] as const).map((value) => ({
              value,
              label: t(`secondary.${value}`),
            }))
          ),
        });
      }
    } else {
      schema.push({ name: "entity", selector: { entity: {} } });
    }
    schema.push(
      { name: "name", selector: { text: {} } },
      {
        name: "period",
        selector: select(
          PERIODS.map((period) => ({ value: period, label: t(`period.${period}`) }))
        ),
      }
    );
    return schema;
  }

  private _figureFrom(value: FormData, old: FiguresCardConfig): FigureConfig {
    // A cleared selection keeps what the card had.
    const source = (value.source as Source | undefined) ?? sourceOf(old);
    if (source !== sourceOf(old)) {
      return source === "energy"
        ? { area: "household", figure: "cost" }
        : source === "statistic"
          ? { statistic: "", value: "change" }
          : { entity: "" };
    }
    if (source === "energy") {
      const areaId = (value.area as string | undefined) ?? old.area;
      const area = this._info?.areas.find((item) => item.id === areaId);
      const figures = area ? figuresOf(area) : [];
      const figure = figures.includes(value.figure as never)
        ? (value.figure as FigureConfig["figure"])
        : figures[0];
      return { area: areaId, figure, ...(old.secondary === "none" ? { secondary: "none" } : {}) };
    }
    if (source === "statistic") {
      const figure: FigureConfig = {
        statistic: (value.statistic as string) ?? "",
        value: (value.value as FigureConfig["value"]) ?? "change",
      };
      if (figure.value === "mean" && value.secondary === "range") figure.secondary = "range";
      return figure;
    }
    return { entity: (value.entity as string) ?? "" };
  }

  private _changed(event: CustomEvent<{ value: FormData }>): void {
    if (!this._config) return;
    const value = event.detail.value;
    // Only the figure's own keys change; layout options and the like stay.
    const { area, figure, statistic, value: kind, secondary, entity, name, ...rest } =
      this._config;
    const config: FiguresCardConfig = {
      ...rest,
      period: (value.period as FiguresCardConfig["period"]) ?? "energy_date",
      ...this._figureFrom(value, this._config),
    };
    if (typeof value.name === "string" && value.name) config.name = value.name;
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _label = (schema: { name: string }): string =>
    this._localize(`editor_${schema.name}` as Parameters<Localize>[0]);

  private _helper = (schema: { name: string }): string | undefined =>
    schema.name === "period" ? this._localize("editor_period_hint") : undefined;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const config = this._config;
    return html`<div class="editor">
      ${sourceOf(config) === "energy" && this._info === null
        ? html`<p class="hint">${this._localize("editor_not_loaded")}</p>`
        : nothing}
      <ha-form
        .hass=${this.hass}
        .data=${{
          source: sourceOf(config),
          ...config,
          value: config.value ?? "change",
          secondary: config.secondary ?? "none",
          period: config.period ?? "energy_date",
        }}
        .schema=${this._schema(config)}
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
