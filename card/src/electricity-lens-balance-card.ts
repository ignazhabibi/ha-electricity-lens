// Dashboard card of the Electricity Lens integration. It needs no options but a title: it
// finds the integration's sensors by itself and renders from the states the
// frontend already has, so it appears without loading delay. The integration
// computes every figure; the card lays them out in the tables of the other cards.

import { css, html, nothing, type TemplateResult } from "lit";

import { consumerColors, palette } from "./colors";
import { numberFormat } from "./format";
import { cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { calculatingText, localizer, type Localize } from "./localize";
import { noCategoriesText, readBalance, readCategories } from "./model";
import { cardStyles, tableStyles } from "./styles";
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
  /** The category of a row with a swatch; a row without one is the sums. */
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
              <th class="swatch-cell"></th>
              <th class="name" scope="col">${t("column_area")}</th>
              ${columns.perYear ? html`<th class="per-year" scope="col">${t("column_per_year")}</th>` : nothing}
              <th scope="col">${t("column_saving")}</th>
              ${columns.invested
                ? html`<th scope="col">${t("column_investment")}</th>
                    <th scope="col">${t("column_balance")}</th>`
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
          </tbody>
          <tfoot>
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
          </tfoot>
        </table>
      </div>
      ${calculating ? html`<p class="note">${calculatingText(t, balance.progress)}</p>` : nothing}
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
      <td class="swatch-cell">
        ${category ? html`<span class="swatch" aria-hidden="true"></span>` : nothing}
      </td>
      <th class="name" scope="row">
        <button type="button">${name}</button>
      </th>
      ${columns.perYear
        ? html`<td class="per-year">
            ${perYear === null
              ? "–"
              : this._localize("average", { amount: this._money(perYear) })}
          </td>`
        : nothing}
      <td>${this._money(saving)}</td>
      ${columns.invested
        ? html`<td>${this._money(investment)}</td>
            <td>${this._money(balance, true)}</td>`
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
    tableStyles,
    css`
      .pv {
        --color: var(--electricity-lens-pv-color);
      }
      .heat_pump {
        --color: var(--electricity-lens-heat-pump-color);
      }
      .wallbox {
        --color: var(--electricity-lens-wallbox-color);
      }
      .table {
        overflow-x: auto;
      }
      /* Each row opens its sensor's dialog. */
      tr[class] {
        cursor: pointer;
      }
      tr[class]:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.04);
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
      .note {
        margin: 0;
        padding: 0 16px 12px;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      /* A phone, or half a column: the names need the room of the yearly figure. */
      @container (max-width: 480px) {
        .per-year {
          display: none;
        }
      }
    `,
  ];
}
