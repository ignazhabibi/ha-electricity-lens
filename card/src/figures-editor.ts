// Editor of the key figure card: the form fits the figure's source. Areas and
// figures come from the integration.

import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import {
  PERIODS,
  figureLabel,
  type FiguresCardConfig,
} from "./electricity-lens-figures-card";
import {
  figuresOf,
  isForecast,
  isInvestment,
  sourceOf,
  statisticValues,
  type FigureConfig,
  type Source,
} from "./figures";
import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { FiguresInfo, HomeAssistant, StatisticMetadata } from "./types";

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
    _metadata: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: FiguresCardConfig;
  /** The integration's areas; undefined while loading, null when it is not loaded. */
  private _info?: FiguresInfo | null;
  private _requested = false;
  /** The chosen statistic's metadata, which tells the values it has. */
  private _metadata?: { id: string; value: StatisticMetadata | undefined };
  private _metadataFor?: string;

  setConfig(config: FiguresCardConfig): void {
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
    const statistic = this._config?.statistic;
    if (this.hass && statistic && this._metadataFor !== statistic) {
      this._metadataFor = statistic;
      this.hass
        .callWS<StatisticMetadata[]>({ type: "recorder/get_statistics_metadata", statistic_ids: [statistic] })
        .then((found) => this._metadataLoaded(statistic, found[0]))
        .catch(() => undefined);
    }
  }

  /** The values the chosen statistic has; all of them until that is known. */
  private _values(config: FiguresCardConfig) {
    const metadata = this._metadata && this._metadata.id === config.statistic ? this._metadata.value : undefined;
    return statisticValues(metadata);
  }

  /** A value the new statistic does not have gives way to one it has. */
  private _metadataLoaded(id: string, metadata: StatisticMetadata | undefined): void {
    this._metadata = { id, value: metadata };
    const config = this._config;
    if (!config || config.statistic !== id) return;
    const values = this._values(config);
    if (!values.length || values.includes(config.value ?? "change")) return;
    const { secondary, ...rest } = config;
    this._fire({ ...rest, value: values[0], ...(values[0] === "mean" && secondary ? { secondary } : {}) });
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
            this._values(config).map((value) => ({ value, label: t(`value.${value}`) }))
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
    schema.push({ name: "name", selector: { text: {} } });
    // A state, a forecast, and an investment do not depend on a period.
    if (
      source !== "entity" &&
      !(config.figure && (isForecast(config.figure) || isInvestment(config.figure)))
    ) {
      schema.push({
        name: "period",
        selector: select(
          PERIODS.map((period) => ({ value: period, label: t(`period.${period}`) }))
        ),
      });
    }
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
    this._fire(config);
  }

  private _fire(config: FiguresCardConfig): void {
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
