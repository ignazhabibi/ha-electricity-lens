// What the table cards share: they add up statistics over the period of the
// energy date selection on the same dashboard, this month without one. Rows
// follow from the sums in each card.

import { css, type TemplateResult } from "lit";

import { followEnergyDate } from "./energy-date";
import { formatter, type Format } from "./format";
import { fixedRange, type Range } from "./history";
import { RETRY_MS, cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { localizer, type Key, type Localize } from "./localize";
import { noCategoriesText, readCategories } from "./model";
import { loadSums } from "./sums";
import type { FiguresInfo, HomeAssistant } from "./types";

/** The integration computes new hours every 15 minutes. */
const REFRESH_MS = 5 * 60 * 1000;

interface Sums {
  key: string;
  at: number;
  values: Record<string, number> | null;
}

export const addUp = (values: Record<string, number>, ids: string[] | undefined): number =>
  (ids ?? []).reduce((total, id) => total + (values[id] ?? 0), 0);

export abstract class PeriodSumsCard extends LensCard {
  static properties = {
    hass: { attribute: false },
    _info: { state: true },
    _selected: { state: true },
    _sums: { state: true },
  };

  hass?: HomeAssistant;
  protected _info?: FiguresInfo | null;
  private _infoLoading = false;
  /** The date selection's period; null without one, undefined until known. */
  private _selected?: Range | null;
  protected _sums?: Sums;
  private _loading?: string;
  private _unfollow?: () => void;
  private _retryTimer?: ReturnType<typeof setTimeout>;

  /** The statistics the card adds up. */
  protected abstract _ids(): string[];

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

  protected get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  protected get _fmt(): Format {
    return formatter(this.hass?.locale, this.hass?.config.currency ?? "EUR");
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

  protected willUpdate(): void {
    if (!this.hass) return;
    this._follow();
    if (this._info === undefined) this._info = cachedInfo();
    if (infoStale() && !this._infoLoading) void this._loadInfo();
    if (this._selected === undefined || !this._info || this._info.calculating) return;
    const range = this._selected ?? fixedRange("this_month");
    const ids = [...new Set(this._ids())].sort();
    if (!ids.length) return;
    const key = JSON.stringify([ids, range.start, range.end]);
    const stale = !this._sums || Date.now() - this._sums.at > REFRESH_MS;
    if (key !== this._loading && (key !== this._sums?.key || (stale && !this._loading))) {
      void this._load(key, ids, range);
    }
  }

  /** What the card says instead of its table, if it has nothing to show yet. */
  protected _waiting(): Key | undefined {
    if (!this.hass) return undefined;
    const categories = readCategories(this.hass);
    if (!categories.length) return noCategoriesText(this.hass);
    if (categories.some((category) => category.calculating) || this._info?.calculating) {
      return "calculating_all";
    }
    if (this._info === null) return "editor_not_loaded";
    if (this._info === undefined) return "loading";
    if (!this._ids().length) return "figures_unavailable";
    if (!this._sums) return "loading";
    return this._sums.values ? undefined : "history_failed";
  }

  protected abstract render(): TemplateResult;
}

export const tableStyles = css`
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
  tbody tr:last-child th,
  tbody tr:last-child td {
    border-bottom: none;
  }
  tfoot tr:first-child th,
  tfoot tr:first-child td {
    border-top: 1px solid var(--divider-color);
  }
  .quiet th,
  .quiet td {
    padding-block-start: 0;
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
  }
`;
