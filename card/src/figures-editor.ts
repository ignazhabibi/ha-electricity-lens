// Editor of the key figure card: title, period, and columns, then the list
// of tiles. Each tile is edited in a form that fits its source, so no YAML is
// needed. Areas and figures come from the integration.

import { mdiDelete, mdiPencil } from "@mdi/js";
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import {
  PERIODS,
  figureLabel,
  type FiguresCardConfig,
} from "./energy-payback-figures-card";
import {
  STATISTIC_VALUES,
  figuresOf,
  sourceOf,
  type Source,
  type Tile,
} from "./figures";
import { localizer, type Localize } from "./localize";
import { DOMAIN } from "./model";
import type { FiguresInfo, HomeAssistant } from "./types";

type FormData = Record<string, unknown>;
const SOURCES: Source[] = ["energy", "statistic", "entity"];

const select = (options: Array<{ value: string; label: string }>) => ({
  select: { mode: "dropdown", options },
});

export class EnergyPaybackFiguresCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
    _editing: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: FiguresCardConfig;
  private _info?: FiguresInfo | null;
  private _editing?: number;

  setConfig(config: FiguresCardConfig): void {
    this._config = config;
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  private get _tiles(): Tile[] {
    return this._config?.tiles ?? [];
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

  private _changed(config: FiguresCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _setTiles(tiles: Tile[]): void {
    if (!this._config) return;
    this._changed({ ...this._config, tiles });
  }

  // Card options

  private _cardSchema() {
    const t = this._localize;
    return [
      { name: "title", selector: { text: {} } },
      {
        name: "period",
        selector: select(
          PERIODS.map((period) => ({ value: period, label: t(`period.${period}`) }))
        ),
      },
      {
        name: "columns",
        selector: select([
          { value: "auto", label: t("editor_columns_auto") },
          ...["1", "2", "3", "4"].map((value) => ({ value, label: value })),
        ]),
      },
    ];
  }

  private _cardChanged(event: CustomEvent<{ value: FormData }>): void {
    if (!this._config) return;
    const { title, period, columns } = event.detail.value;
    const config: FiguresCardConfig = { ...this._config };
    if (typeof title === "string" && title) config.title = title;
    else delete config.title;
    config.period = (period as FiguresCardConfig["period"]) ?? "energy_date";
    if (columns && columns !== "auto") config.columns = Number(columns);
    else delete config.columns;
    this._changed(config);
  }

  // Tiles

  private _describe(tile: Tile): { title: string; detail: string } {
    const t = this._localize;
    const source = sourceOf(tile);
    if (source === "statistic") {
      return {
        title: tile.name ?? tile.statistic ?? "",
        detail: `${tile.statistic ?? ""} · ${t(`value.${tile.value ?? "change"}`)}`,
      };
    }
    if (source === "entity") {
      return {
        title: tile.name ?? tile.entity ?? "",
        detail: `${tile.entity ?? ""} · ${t("value_current")}`,
      };
    }
    const area = this._info?.areas.find((item) => item.id === tile.area);
    const label =
      area && tile.figure ? figureLabel(t, tile.figure, area) : (tile.figure ?? "");
    return {
      title: tile.name ?? label,
      detail: `${area?.name ?? tile.area ?? ""} · ${t("source.energy")}`,
    };
  }

  private _tileSchema(tile: Tile) {
    const t = this._localize;
    const source = sourceOf(tile);
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
      const area = areas.find((item) => item.id === tile.area);
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
      if ((tile.value ?? "change") === "mean") {
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
    return schema;
  }

  private _tileData(tile: Tile): FormData {
    return {
      source: sourceOf(tile),
      ...tile,
      value: tile.value ?? "change",
      secondary: tile.secondary ?? "none",
    };
  }

  private _tileChanged(index: number, event: CustomEvent<{ value: FormData }>): void {
    const value = event.detail.value;
    const old = this._tiles[index];
    // A cleared selection keeps what the tile had.
    const source = (value.source as Source | undefined) ?? sourceOf(old);
    const name = typeof value.name === "string" && value.name ? value.name : undefined;
    let tile: Tile;
    if (source !== sourceOf(old)) {
      tile =
        source === "energy"
          ? { area: "household", figure: "cost" }
          : source === "statistic"
            ? { statistic: "", value: "change" }
            : { entity: "" };
    } else if (source === "energy") {
      const areaId = (value.area as string | undefined) ?? old.area;
      const area = this._info?.areas.find((item) => item.id === areaId);
      const figures = area ? figuresOf(area) : [];
      const figure = figures.includes(value.figure as never)
        ? (value.figure as Tile["figure"])
        : figures[0];
      tile = { area: areaId, figure };
    } else if (source === "statistic") {
      tile = {
        statistic: (value.statistic as string) ?? "",
        value: (value.value as Tile["value"]) ?? "change",
      };
      if (tile.value === "mean" && value.secondary === "range") tile.secondary = "range";
    } else {
      tile = { entity: (value.entity as string) ?? "" };
    }
    if (name) tile.name = name;
    this._setTiles(this._tiles.map((item, i) => (i === index ? tile : item)));
  }

  private _add(): void {
    const tiles = [...this._tiles, { area: "household", figure: "cost" } as Tile];
    this._setTiles(tiles);
    this._editing = tiles.length - 1;
  }

  private _remove(index: number): void {
    this._setTiles(this._tiles.filter((_, i) => i !== index));
  }

  private _label = (schema: { name: string }): string => {
    const t = this._localize;
    const key = `editor_${schema.name}`;
    return t(key as Parameters<Localize>[0]);
  };

  private _helper = (schema: { name: string }): string | undefined =>
    schema.name === "period" ? this._localize("editor_period_hint") : undefined;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const t = this._localize;
    if (this._editing !== undefined && this._tiles[this._editing]) {
      const index = this._editing;
      const tile = this._tiles[index];
      return html`<div class="editor">
        <div class="heading">
          <ha-icon-button-arrow-prev
            .label=${t("editor_back")}
            @click=${() => (this._editing = undefined)}
          ></ha-icon-button-arrow-prev>
          <span>${t("editor_edit_tile", { number: String(index + 1) })}</span>
        </div>
        ${sourceOf(tile) === "energy" && this._info === null
          ? html`<p class="hint">${t("editor_not_loaded")}</p>`
          : nothing}
        <ha-form
          .hass=${this.hass}
          .data=${this._tileData(tile)}
          .schema=${this._tileSchema(tile)}
          .computeLabel=${this._label}
          @value-changed=${(event: CustomEvent<{ value: FormData }>) =>
            this._tileChanged(index, event)}
        ></ha-form>
      </div>`;
    }
    return html`<div class="editor">
      <ha-form
        .hass=${this.hass}
        .data=${{
          title: this._config.title ?? "",
          period: this._config.period ?? "energy_date",
          columns: this._config.columns ? String(this._config.columns) : "auto",
        }}
        .schema=${this._cardSchema()}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._cardChanged}
      ></ha-form>
      <div class="heading"><span>${t("editor_tiles")}</span></div>
      <div class="tiles">
        ${this._tiles.map((tile, index) => {
          const { title, detail } = this._describe(tile);
          return html`<div class="tile">
            <div class="text">
              <div class="name">${title || "–"}</div>
              <div class="detail">${detail}</div>
            </div>
            <ha-icon-button
              .path=${mdiPencil}
              .label=${t("editor_edit")}
              @click=${() => (this._editing = index)}
            ></ha-icon-button>
            <ha-icon-button
              .path=${mdiDelete}
              .label=${t("editor_remove")}
              @click=${() => this._remove(index)}
            ></ha-icon-button>
          </div>`;
        })}
      </div>
      <ha-button @click=${this._add}>${t("editor_add_tile")}</ha-button>
    </div>`;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .heading {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;
    }
    .tiles {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
    }
    .tiles:empty {
      display: none;
    }
    .tile {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 16px;
      border-bottom: 1px solid var(--divider-color);
    }
    .tile:last-child {
      border-bottom: none;
    }
    .text {
      flex: 1;
      min-width: 0;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detail {
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
    }
    ha-button {
      align-self: flex-start;
    }
  `;
}
