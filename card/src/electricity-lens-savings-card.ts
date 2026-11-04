// Savings card of the Electricity Lens integration: what was saved in the
// selected period, one row per thing replaced. It needs no options: the
// amounts are the balance's, so they add up to the same total and nothing
// counts twice. It follows the energy date selection on the same dashboard.

import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";

import { CSS_COLORS, consumerColors, palette } from "./colors";
import { followEnergyDate } from "./energy-date";
import { formatter, type Format } from "./format";
import { fixedRange, type Range } from "./history";
import { RETRY_MS, cachedInfo, infoStale, loadInfo } from "./info";
import { localizer, type Key, type Localize } from "./localize";
import { readCategories } from "./model";
import { cardStyles } from "./styles";
import { loadSums } from "./sums";
import type { CategoryFigures, FigureArea, FiguresInfo, HomeAssistant } from "./types";

/** The integration computes new hours every 15 minutes. */
const REFRESH_MS = 5 * 60 * 1000;

interface Row {
  name: Key;
  color: string;
  /** Statistics whose changes add up to the amount, and those it leaves out. */
  plus: string[];
  minus: string[];
  energy: string[];
}

interface Sums {
  key: string;
  at: number;
  values: Record<string, number> | null;
}

const add = (values: Record<string, number>, ids: string[]): number =>
  ids.reduce((total, id) => total + (values[id] ?? 0), 0);

/** The rows of the categories that are set up. The PV plant's saving includes
 * the feed-in compensation, which has a row of its own. */
export function savingsRows(
  categories: CategoryFigures[],
  info: FiguresInfo,
  colors: { heat?: string; car?: string } = {}
): Row[] {
  const statistics = (id: string): FigureArea["statistics"] =>
    info.areas.find((area) => area.id === id)?.statistics ?? {};
  const grid = info.areas.find((area) => area.kind === "grid")?.statistics ?? {};
  const rows: Row[] = [];
  for (const category of categories) {
    const saving = [category.savingStatistic];
    if (category.category === "pv") {
      const exports = grid.export?.length ? grid.export : [];
      const feedIn = exports.length ? (grid.feed_in ?? []) : [];
      rows.push({
        name: "savings_pv",
        color: CSS_COLORS.solar,
        plus: saving,
        minus: feedIn,
        energy: statistics("solar").self_used ?? [],
      });
      if (feedIn.length) {
        rows.push({ name: "savings_feed_in", color: CSS_COLORS.export, plus: feedIn, minus: [], energy: exports });
      }
    } else if (category.category === "heat_pump") {
      rows.push({
        name: category.heating === "oil" ? "savings_oil" : "savings_gas",
        color: colors.heat ?? CSS_COLORS.heat,
        plus: saving,
        minus: [],
        energy: statistics("heat_pump").energy ?? [],
      });
    } else {
      rows.push({
        name: "savings_fuel",
        color: colors.car ?? CSS_COLORS.car,
        plus: saving,
        minus: [],
        energy: statistics("wallbox").energy ?? [],
      });
    }
  }
  return rows;
}

export class ElectricityLensSavingsCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _info: { state: true },
    _selected: { state: true },
    _sums: { state: true },
  };

  hass?: HomeAssistant;
  private _info?: FiguresInfo | null;
  private _infoLoading = false;
  /** The date selection's period; null without one, undefined until known. */
  private _selected?: Range | null;
  private _sums?: Sums;
  private _loading?: string;
  private _unfollow?: () => void;
  private _retryTimer?: ReturnType<typeof setTimeout>;

  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigForm(): { schema: never[] } {
    return { schema: [] };
  }

  setConfig(_config: unknown): void {
    // The card has no options.
  }

  getCardSize(): number {
    return 4;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 12, min_columns: 6 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._follow();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unfollow?.();
    this._unfollow = undefined;
    clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  private get _fmt(): Format {
    return formatter(this.hass?.locale?.language ?? "en", this.hass?.config.currency ?? "EUR");
  }

  private _follow(): void {
    if (this._unfollow || !this.isConnected || !this.hass?.connection) return;
    this._unfollow = followEnergyDate(this.hass.connection, (range) => {
      this._selected = range;
    });
  }

  private async _loadInfo(): Promise<void> {
    if (!this.hass || this._infoLoading) return;
    this._infoLoading = true;
    this._info = await loadInfo(this.hass);
    this._infoLoading = false;
    clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
    if (this.isConnected && (!this._info || this._info.calculating)) {
      this._retryTimer = setTimeout(() => void this._loadInfo(), RETRY_MS);
    }
  }

  private _rows(): Row[] {
    if (!this.hass || !this._info) return [];
    const known = consumerColors(this._info, palette(this));
    return savingsRows(readCategories(this.hass), this._info, {
      heat: known.get("heat_pump"),
      car: known.get("wallbox"),
    });
  }

  private async _load(key: string, ids: string[], range: Range): Promise<void> {
    if (!this.hass) return;
    this._loading = key;
    let values: Record<string, number> | null = null;
    try {
      values = await loadSums(this.hass, ids, range);
    } catch {
      // The card says so.
    }
    if (this._loading !== key) return;
    this._loading = undefined;
    this._sums = { key, at: Date.now(), values };
  }

  protected willUpdate(changed: PropertyValues): void {
    if (!this.hass) return;
    if (changed.has("hass")) this._follow();
    if (this._info === undefined) this._info = cachedInfo();
    if (infoStale() && !this._infoLoading) void this._loadInfo();
    if (this._selected === undefined || !this._info || this._info.calculating) return;
    const range = this._selected ?? fixedRange("this_month");
    const ids = [
      ...new Set(this._rows().flatMap((row) => [...row.plus, ...row.minus, ...row.energy])),
    ].sort();
    if (!ids.length) return;
    const key = JSON.stringify([ids, range.start, range.end]);
    const stale = !this._sums || Date.now() - this._sums.at > REFRESH_MS;
    if (key !== this._loading && (key !== this._sums?.key || (stale && !this._loading))) {
      void this._load(key, ids, range);
    }
  }

  protected render(): TemplateResult {
    const t = this._localize;
    if (!this.hass) return html``;
    const categories = readCategories(this.hass);
    return html`<ha-card>
      <div class="header"><h2 class="title">${t("savings_title")}</h2></div>
      ${this._body(categories)}
    </ha-card>`;
  }

  private _body(categories: CategoryFigures[]) {
    const t = this._localize;
    const message = (key: Key) => html`<p class="summary">${t(key)}</p>`;
    if (!categories.length) return message("not_set_up");
    if (categories.some((category) => category.calculating) || this._info?.calculating) {
      return message("calculating_all");
    }
    if (this._info === null) return message("editor_not_loaded");
    if (!this._sums) return message("loading");
    if (!this._sums.values) return message("history_failed");
    const rows = this._rows();
    const values = this._sums.values;
    const fmt = this._fmt;
    const amount = (row: Row) => add(values, row.plus) - add(values, row.minus);
    const total = rows.reduce((sum, row) => sum + amount(row), 0);
    return html`${rows.length > 1 && categories.some((c) => c.category === "pv")
        ? html`<p class="note">${t("savings_note")}</p>`
        : nothing}
      <table>
        <thead>
          <tr>
            <th scope="col" colspan="2" class="name">${t("savings_source")}</th>
            <th scope="col">${t("savings_energy")}</th>
            <th scope="col">${t("savings_amount")}</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => {
            const energy = add(values, row.energy);
            return html`<tr>
              <td class="swatch-cell">
                <span class="swatch" style="--color: ${row.color}" aria-hidden="true"></span>
              </td>
              <td class="name">${t(row.name)}</td>
              <!-- Older periods may hold savings, but no energy to go with them. -->
              <td>${energy || !amount(row) ? fmt.value(energy, "energy") : "–"}</td>
              <td>${fmt.value(amount(row), "money")}</td>
            </tr>`;
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2" class="name">${t("savings_total")}</th>
            <td></td>
            <td>${fmt.value(total, "money")}</td>
          </tr>
        </tfoot>
      </table>`;
  }

  static styles = [
    cardStyles,
    css`
      .note {
        margin: 0;
        padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px) 0;
        font-size: var(--ha-font-size-s, 12px);
        line-height: 16px;
        color: var(--secondary-text-color);
      }
      table {
        width: 100%;
        margin-top: 8px;
        border-collapse: collapse;
        font-variant-numeric: tabular-nums;
        color: var(--primary-text-color);
      }
      th,
      td {
        padding: 12px 8px;
        text-align: end;
        white-space: nowrap;
        border-bottom: 1px solid var(--divider-color);
      }
      th:first-child,
      td:first-child {
        padding-inline-start: 16px;
      }
      th:last-child,
      td:last-child {
        padding-inline-end: 16px;
      }
      thead th {
        padding-block: 8px;
        font-size: var(--ha-font-size-s, 12px);
        font-weight: var(--ha-font-weight-medium, 500);
        color: var(--secondary-text-color);
      }
      .name {
        width: 100%;
        text-align: start;
        white-space: normal;
      }
      .swatch-cell {
        width: 32px;
        line-height: 0;
      }
      .swatch {
        display: inline-block;
        width: 32px;
        height: 16px;
        border-radius: 4px;
        border: 1px solid var(--color);
        background: color-mix(in srgb, var(--color) 50%, transparent);
        box-sizing: border-box;
      }
      tfoot th,
      tfoot td {
        border-bottom: none;
        font-weight: var(--ha-font-weight-medium, 500);
      }
    `,
  ];
}
