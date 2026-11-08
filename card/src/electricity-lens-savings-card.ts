// Savings card of the Electricity Lens integration: what was saved in the
// selected period. Without options it has one row per thing replaced, with the
// balance's amounts, so they add up to the same total and nothing counts twice.
// With an area it reckons up that area's saving, including its solar power.

import { html, type TemplateResult } from "lit";

import { CSS_COLORS, consumerColors, palette } from "./colors";
import type { Key } from "./localize";
import { checkCollectionKey } from "./energy-date";
import { readCategories } from "./model";
import { PeriodSumsCard, addUp } from "./period-sums-card";
import { cardStyles, tableStyles } from "./styles";
import { lensTable } from "./table";
import type { CategoryFigures, FigureArea, FiguresInfo } from "./types";

export interface SavingsCardConfig {
  type?: string;
  /** "heat_pump" or "wallbox"; without one the card shows all categories. */
  area?: string;
  collection_key?: string;
}

interface Row {
  name: Key;
  color: string;
  /** Statistics whose changes add up to the amount, and those it leaves out. */
  plus: string[];
  minus: string[];
  energy: string[];
}

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
        name: `savings_${category.heating ?? "gas"}`,
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

export class ElectricityLensSavingsCard extends PeriodSumsCard {
  private _config: SavingsCardConfig = {};

  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("electricity-lens-savings-card-editor");
  }

  setConfig(config: SavingsCardConfig | undefined): void {
    checkCollectionKey(config?.collection_key);
    this._config = config ?? {};
    this._collectionKey = this._config.collection_key;
    this.requestUpdate();
  }

  private get _area(): FigureArea | undefined {
    return this._info?.areas.find((area) => area.id === this._config.area);
  }

  private _rows(): Row[] {
    if (!this.hass || !this._info) return [];
    const known = consumerColors(this._info, palette(this));
    return savingsRows(readCategories(this.hass), this._info, {
      heat: known.get("heat_pump"),
      car: known.get("wallbox"),
    });
  }

  protected _ids(): string[] {
    if (this._config.area) {
      const statistics = this._area?.statistics;
      return statistics?.alternative_cost?.length && statistics.cost?.length && statistics.saving?.length
        ? [
            ...statistics.alternative_cost,
            ...statistics.cost,
            ...statistics.saving,
            ...(statistics.solar_saving ?? []),
          ]
        : [];
    }
    return this._rows().flatMap((row) => [...row.plus, ...row.minus, ...row.energy]);
  }

  protected render(): TemplateResult {
    const t = this._localize;
    if (!this.hass) return html``;
    const waiting = this._waiting();
    return html`<ha-card>
      <div class="header"><h2 class="title">${t("savings_title")}</h2></div>
      ${waiting
        ? html`<p class="summary">${this._waitingText(waiting)}</p>`
        : this._config.area
          ? this._reckoning()
          : this._table()}
    </ha-card>`;
  }

  /** One area's saving: what the alternative would have cost, less its power. */
  private _reckoning(): TemplateResult {
    const t = this._localize;
    const fmt = this._fmt;
    const area = this._area;
    const values = this._sums?.values ?? {};
    const alternative = addUp(values, area?.statistics.alternative_cost);
    const cost = addUp(values, area?.statistics.cost);
    const solar = addUp(values, area?.statistics.solar_saving);
    // The balance gives the benefit of solar power to the PV plant alone.
    const inBalance = addUp(values, area?.statistics.saving);
    const saving = inBalance + solar;
    const heating = readCategories(this.hass!).find((category) => category.category === area?.id)?.heating;
    const instead: Key = area?.id === "wallbox" ? "savings_instead_fuel" : `savings_instead_${heating ?? "gas"}`;
    const hasSolar = Math.abs(solar) >= 0.005;
    return lensTable(
      {
        rows: [
          { name: t(instead), cells: [fmt.value(alternative, "money")] },
          {
            name:
              area?.id === "wallbox"
                ? t("strategy.charging_cost")
                : t("savings_electricity", { name: area?.name ?? "" }),
            cells: [fmt.value(-cost, "money")],
          },
        ],
        foot: [
          { name: t("savings_saved"), cells: [fmt.value(saving, "money")] },
          ...(hasSolar
            ? [
                { name: t("savings_solar_part"), cells: [fmt.value(solar, "money")], kind: "quiet" as const },
                { name: t("savings_in_balance"), cells: [fmt.value(inBalance, "money")], kind: "quiet" as const },
              ]
            : []),
        ],
      },
      this
    );
  }

  private _table(): TemplateResult {
    const t = this._localize;
    const fmt = this._fmt;
    const rows = this._rows();
    const values = this._sums?.values ?? {};
    const amount = (row: Row) => addUp(values, row.plus) - addUp(values, row.minus);
    const total = rows.reduce((sum, row) => sum + amount(row), 0);
    return lensTable(
      {
        head: [t("savings_source"), t("savings_energy"), t("savings_amount")],
        rows: rows.map((row) => {
          const energy = addUp(values, row.energy);
          return {
            name: t(row.name),
            color: row.color,
            // Older periods may hold savings, but no energy to go with them.
            cells: [energy || !amount(row) ? fmt.value(energy, "energy") : "–", fmt.value(amount(row), "money")],
          };
        }),
        foot: [{ name: t("savings_total"), cells: ["", fmt.value(total, "money")] }],
        swatches: true,
      },
      this
    );
  }

  static styles = [cardStyles, tableStyles];
}
