// Dashboard card of the Electricity Lens integration. It needs no options but a title: it
// finds the integration's sensors by itself and renders from the states the
// frontend already has, so it appears without loading delay. The integration
// computes every figure; the card lays them out in the tables of the other cards.

import { css, html, nothing, type TemplateResult } from "lit";

import { consumerColors, palette } from "./colors";
import { numberFormat } from "./format";
import { cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { calculatingText, durationText, localizer, type Localize } from "./localize";
import { noCategoriesText, readBalance, readCategories } from "./model";
import { cardStyles, tableStyles } from "./styles";
import { lensTable, type Cell, type TableRow } from "./table";
import type { BalanceFigures, Category, FiguresInfo, HomeAssistant } from "./types";

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
  /** A part of the row above, such as the PV plant's battery. */
  part?: boolean;
}

/** The categories' colors until the integration's areas give theirs. */
const CATEGORY_COLORS: Record<Category, string> = {
  pv: "var(--electricity-lens-pv-color)",
  heat_pump: "var(--electricity-lens-heat-pump-color)",
  wallbox: "var(--electricity-lens-wallbox-color)",
};

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
    const rows: TableRow[] = categories.flatMap((category) => {
      const own = this._row(
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
      );
      if (!category.battery || category.calculating) return [own];
      const battery = category.battery;
      return [
        own,
        this._row(
          {
            name: t("battery_part"),
            entityId: category.entityId,
            perYear: battery.perYear,
            saving: battery.saving,
            investment: battery.investment ?? undefined,
            balance: battery.saving - (battery.investment ?? 0),
            part: true,
          },
          columns
        ),
      ];
    });
    const total = this._row(
      {
        name: t("total"),
        entityId: balance.entityId,
        perYear: balance.perYear,
        saving: calculating ? null : balance.saved,
        investment: balance.invested,
        balance: balance.balance,
      },
      columns
    );
    const head = [
      t("column_area"),
      ...(columns.perYear ? [{ text: t("column_per_year"), class: "per-year" }] : []),
      t("column_saving"),
      ...(columns.invested ? [t("column_investment"), t("column_balance")] : []),
    ];
    return html`<ha-card>
      ${title}
      ${!calculating ? this._summary(balance) : nothing}
      <div class="table">${lensTable({ head, rows, foot: [total], swatches: true }, this)}</div>
      ${calculating ? html`<p class="note">${calculatingText(t, balance.progress)}</p>` : nothing}
    </ha-card>`;
  }

  /** Whether everything together is paid back, and if not, when. */
  private _summary(balance: BalanceFigures): TemplateResult | typeof nothing {
    const t = this._localize;
    if (balance.payback === null) return nothing;
    if (balance.payback >= 100) return html`<p class="summary">${t("summary_paid_back")}</p>`;
    // Rounded down: 99.6 % is not yet paid back.
    const percent = numberFormat(this.hass?.locale, { style: "percent", maximumFractionDigits: 0 }).format(
      Math.floor(balance.payback) / 100
    );
    const text =
      balance.yearsLeft === null
        ? t("summary_payback", { percent })
        : t("summary_payback_left", { percent, time: durationText(t, balance.yearsLeft) });
    return html`<p class="summary">${text}</p>`;
  }

  private _row(figures: RowFigures, columns: Columns, known?: Map<string, string>): TableRow {
    const { name, entityId, perYear, saving, investment, balance, category, part } = figures;
    const cells: Cell[] = [];
    if (columns.perYear) {
      cells.push({
        text: perYear === null ? "–" : this._localize("average", { amount: this._money(perYear) }),
        class: "per-year",
      });
    }
    cells.push(this._money(saving));
    if (columns.invested) cells.push(this._money(investment), this._money(balance, true));
    return {
      name,
      cells,
      color: category ? (known?.get(category) ?? CATEGORY_COLORS[category]) : undefined,
      entity: entityId,
      kind: part ? "part" : undefined,
    };
  }

  static styles = [
    cardStyles,
    tableStyles,
    css`
      .table {
        overflow-x: auto;
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
