// Dashboard card of the Electricity Lens integration. It needs no options but a title: it
// finds the integration's sensors by itself and renders from the states the
// frontend already has, so it appears without loading delay. The integration
// computes every figure; the head shows the balance, the rows what each saved.

import { css, html, nothing, type TemplateResult } from "lit";

import { consumerColors, palette } from "./colors";
import { numberFormat } from "./format";
import { cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { localizer, type Localize } from "./localize";
import { noCategoriesText, readBalance, readCategories } from "./model";
import { cardStyles } from "./styles";
import type { BalanceFigures, CategoryFigures, FiguresInfo, HomeAssistant } from "./types";

interface BalanceCardConfig {
  title?: string;
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

  private get _language(): string {
    return this.hass?.locale?.language ?? "en";
  }

  private _money(value: number, signed = false): string {
    return numberFormat(this.hass?.locale, {
      style: "currency",
      currency: this.hass?.config.currency ?? "EUR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      signDisplay: signed ? "exceptZero" : "auto",
    }).format(value);
  }

  private _month(value: Date): string {
    return new Intl.DateTimeFormat(this._language, {
      month: "long",
      year: "numeric",
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
    if (!categories.length || !balance) {
      return html`<ha-card>
        <div class="header"><h2 class="title">${this._config?.title || t("title")}</h2></div>
        <p class="summary">${t(noCategoriesText(this.hass))}</p>
      </ha-card>`;
    }
    const known = this._info ? consumerColors(this._info, palette(this)) : undefined;
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${this._config?.title || t("title")}</h2>
        ${balance.balance === null
          ? nothing
          : html`<span class="chip">${this._money(balance.balance, true)}</span>`}
      </div>
      <p class="summary">${this._summary(balance, categories)}</p>
      <ul class="rows">
        ${categories.map((category) =>
          this._row(category, balance, known?.get(category.category))
        )}
      </ul>
    </ha-card>`;
  }

  private _summary(balance: BalanceFigures, categories: CategoryFigures[]): string {
    const t = this._localize;
    if (categories.some((category) => category.calculating)) return t("calculating");
    const saved = this._money(balance.saved);
    if (balance.invested <= 0) return t("saved_only", { saved });
    const parts = [t("saved_invested", { saved, invested: this._money(balance.invested) })];
    if (balance.balance !== null && balance.balance >= 0) parts.push(t("in_the_plus"));
    else if (balance.inThePlusFrom)
      parts.push(t("in_the_plus_from", { date: this._month(balance.inThePlusFrom) }));
    return parts.join(" · ");
  }

  private _row(category: CategoryFigures, balance: BalanceFigures, color?: string): TemplateResult {
    const t = this._localize;
    const waiting = category.calculating || category.saving === null;
    return html`<li class="row ${category.category}" style=${color ? `--color: ${color}` : ""}>
      <span class="swatch" aria-hidden="true"></span>
      <div class="row-body">
        <div class="line">
          <span>${t(`category.${category.category}`)}</span>
          <span class="amount ${waiting ? "waiting" : ""}"
            >${waiting ? "–" : this._money(category.saving ?? 0)}</span
          >
        </div>
        <div class="sub">
          ${category.calculating ? t("calculating") : this._details(category, balance)}
        </div>
      </div>
    </li>`;
  }

  /** Since when a row counts, what that makes per year, and what to know about it. */
  private _details(category: CategoryFigures, balance: BalanceFigures): string {
    const t = this._localize;
    const parts: string[] = [];
    if (category.countingSince)
      parts.push(t("since", { date: this._month(category.countingSince) }));
    if (category.perYear !== null)
      parts.push(t("per_year", { amount: this._money(category.perYear) }));
    else if (category.yearlyFrom)
      parts.push(t("yearly_from", { date: this._month(category.yearlyFrom) }));
    // Only worth saying when others have an investment to compare with.
    if (balance.invested > 0 && !category.investment) parts.push(t("no_investment"));
    if (category.heatEstimated) parts.push(t("heat_estimated"));
    return parts.join(" · ");
  }

  static styles = [
    cardStyles,
    css`
      .rows {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .row {
        display: flex;
        gap: 16px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--divider-color);
      }
      .row:last-child {
        border-bottom: none;
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
      .swatch {
        flex: none;
        width: 32px;
        height: 16px;
        margin-top: 2px;
        border-radius: 4px;
        border: 1px solid var(--color);
        background: color-mix(in srgb, var(--color) 50%, transparent);
      }
      .row-body {
        flex: 1;
        min-width: 0;
      }
      .line {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        color: var(--primary-text-color);
      }
      .amount {
        flex: none;
        font-variant-numeric: tabular-nums;
      }
      .amount.waiting {
        color: var(--secondary-text-color);
      }
      .sub {
        margin-top: 6px;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      .sub:empty {
        display: none;
      }
    `,
  ];
}
