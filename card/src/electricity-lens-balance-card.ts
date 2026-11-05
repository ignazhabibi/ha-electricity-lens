// Dashboard card of the Electricity Lens integration. It needs no options but a title: it
// finds the integration's sensors by itself and renders from the states the
// frontend already has, so it appears without loading delay. The integration
// computes every figure; the card lays them out as Home Assistant's totals table.

import { css, html, nothing, type TemplateResult } from "lit";

import { consumerColors, palette } from "./colors";
import { numberFormat } from "./format";
import { cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { localizer, type Localize } from "./localize";
import { noCategoriesText, readBalance, readCategories } from "./model";
import { cardStyles } from "./styles";
import type { Category, FiguresInfo, HomeAssistant } from "./types";

interface BalanceCardConfig {
  title?: string;
}

/** What one row shows; null is a figure not known yet, undefined one that does not apply. */
interface RowFigures {
  name: string;
  entityId: string;
  perYear: number | null;
  saving: number | null;
  investment?: number;
  balance: number | null;
  /** The category of a row with a bullet; a row without one is the sums. */
  category?: Category;
}

/** The columns this household needs. */
interface Columns {
  perYear: boolean;
  invested: boolean;
}

export class ElectricityLensBalanceCard extends LensCard {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: BalanceCardConfig;
  private _info?: FiguresInfo | null;
  private _infoLoading = false;

  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigForm(): { schema: { name: string; selector: { text: object } }[] } {
    return { schema: [{ name: "title", selector: { text: {} } }] };
  }

  setConfig(config: BalanceCardConfig): void {
    this._config = config;
  }

  getCardSize(): number {
    return 4;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 12, min_columns: 6 };
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  private _money(value: number | null | undefined, signed = false): string {
    if (value === undefined) return "";
    if (value === null) return "–";
    return numberFormat(this.hass?.locale, {
      style: "currency",
      currency: this.hass?.config.currency ?? "EUR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      signDisplay: signed ? "exceptZero" : "auto",
    }).format(value);
  }

  protected willUpdate(): void {
    // The areas only give the categories the colors of the other cards.
    if (!this.hass) return;
    if (this._info === undefined) this._info = cachedInfo();
    if (infoStale() && !this._infoLoading) {
      this._infoLoading = true;
      void loadInfo(this.hass).then((info) => {
        this._info = info;
        this._infoLoading = false;
      });
    }
  }

  protected render(): TemplateResult {
    const t = this._localize;
    if (!this.hass) return html``;
    const categories = readCategories(this.hass);
    const balance = readBalance(this.hass);
    const title = html`<div class="header">
      <h2 class="title">${this._config?.title || t("title")}</h2>
    </div>`;
    if (!categories.length || !balance) {
      return html`<ha-card>
        ${title}
        <p class="summary">${t(noCategoriesText(this.hass))}</p>
      </ha-card>`;
    }
    const known = this._info ? consumerColors(this._info, palette(this)) : undefined;
    const calculating = categories.some((category) => category.calculating);
    const columns: Columns = {
      perYear: categories.some((category) => category.perYear !== null),
      invested: balance.invested > 0,
    };
    return html`<ha-card>
      ${title}
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="bullet-cell"></th>
              <th class="name" scope="col">${t("column_area")}</th>
              ${columns.perYear
                ? html`<th class="number per-year" scope="col">${t("column_per_year")}</th>`
                : nothing}
              <th class="number" scope="col">${t("column_saving")}</th>
              ${columns.invested
                ? html`<th class="number" scope="col">${t("column_investment")}</th>
                    <th class="number" scope="col">${t("column_balance")}</th>`
                : nothing}
            </tr>
          </thead>
          <tbody>
            ${categories.map((category) =>
              this._row(
                {
                  name: t(`category.${category.category}`),
                  entityId: category.entityId,
                  perYear: category.perYear,
                  saving: category.calculating ? null : category.saving,
                  investment: category.investment ?? undefined,
                  balance: category.balance,
                  category: category.category,
                },
                columns,
                known
              )
            )}
            ${this._row(
              {
                name: t("total"),
                entityId: balance.entityId,
                perYear: balance.perYear,
                saving: calculating ? null : balance.saved,
                investment: balance.invested,
                balance: balance.balance,
              },
              columns
            )}
          </tbody>
        </table>
      </div>
      ${calculating ? html`<p class="note">${t("calculating")}</p>` : nothing}
    </ha-card>`;
  }

  private _row(
    figures: RowFigures,
    columns: Columns,
    known?: Map<string, string>
  ): TemplateResult {
    const { name, entityId, perYear, saving, investment, balance, category } = figures;
    const color = category ? known?.get(category) : undefined;
    return html`<tr
      class=${category ?? "total"}
      style=${color ? `--color: ${color}` : ""}
      @click=${() => this._moreInfo(entityId)}
    >
      <td class="bullet-cell">
        ${category ? html`<span class="bullet" aria-hidden="true"></span>` : nothing}
      </td>
      <th class="name" scope="row" title=${name}>
        <button type="button">${name}</button>
      </th>
      ${columns.perYear
        ? html`<td class="number per-year">
            ${perYear === null
              ? "–"
              : this._localize("average", { amount: this._money(perYear) })}
          </td>`
        : nothing}
      <td class="number">${this._money(saving)}</td>
      ${columns.invested
        ? html`<td class="number">${this._money(investment)}</td>
            <td class="number">${this._money(balance, true)}</td>`
        : nothing}
    </tr>`;
  }

  private _moreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    cardStyles,
    css`
      ha-card {
        container-type: inline-size;
      }
      .pv {
        --color: var(--electricity-lens-pv-color);
      }
      .heat_pump {
        --color: var(--electricity-lens-heat-pump-color);
      }
      .wallbox {
        --color: var(--electricity-lens-wallbox-color);
      }
      /* The table of Home Assistant's totals card. */
      .table {
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-spacing: 0;
        white-space: nowrap;
        font-size: var(--ha-font-size-m, 14px);
        line-height: var(--ha-line-height-normal, 20px);
        color: var(--primary-text-color);
      }
      thead tr {
        height: 56px;
      }
      tbody tr {
        height: 52px;
        cursor: pointer;
      }
      tbody tr:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.04);
      }
      th,
      td {
        box-sizing: border-box;
        padding: 0 16px;
        border-bottom: 1px solid var(--divider-color);
        font-weight: var(--ha-font-weight-normal, 400);
        text-align: start;
      }
      thead th {
        font-weight: var(--ha-font-weight-medium, 500);
      }
      tbody tr:last-child > * {
        border-bottom: none;
      }
      .total > * {
        font-weight: var(--ha-font-weight-medium, 500);
      }
      .bullet-cell {
        width: 48px;
        padding-inline-end: 0;
      }
      .bullet {
        display: block;
        box-sizing: border-box;
        width: 32px;
        height: 16px;
        border-radius: var(--ha-border-radius-sm, 4px);
        border: 1px solid var(--color);
        background: color-mix(in srgb, var(--color) 50%, transparent);
      }
      .name {
        max-width: 0;
        min-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* Reaches the row by keyboard and for screen readers; the row takes the click. */
      button {
        all: unset;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .number {
        width: 1%;
        text-align: end;
        font-variant-numeric: tabular-nums;
      }
      .note {
        margin: 0;
        padding: 0 16px 12px;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      /* A phone, or half a column: the names need the room of the yearly figure and the bullets. */
      @container (max-width: 480px) {
        .per-year,
        .bullet-cell {
          display: none;
        }
        th.number,
        td.number {
          padding: 0 8px;
        }
        th.number:last-child,
        td.number:last-child {
          padding-inline-end: 16px;
        }
        .name {
          padding-inline-end: 8px;
        }
      }
    `,
  ];
}
