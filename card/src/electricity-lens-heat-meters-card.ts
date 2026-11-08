// Heat meters card of the Electricity Lens integration: heat, electricity, and
// seasonal COP of each of the heat pump's meters, for example heating and hot
// water, in the selected period. It needs no options.

import { html, type TemplateResult } from "lit";

import { checkCollectionKey } from "./energy-date";

import { consumerColors, palette } from "./colors";
import { explanation } from "./explain";
import { heatDevices } from "./history-figures";
import { PeriodSumsCard, addUp } from "./period-sums-card";
import { cardStyles, tableStyles } from "./styles";
import { lensTable, type TableRow } from "./table";

export class ElectricityLensHeatMetersCard extends PeriodSumsCard {
  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigForm(): { schema: never[] } {
    return { schema: [] };
  }

  setConfig(config: { collection_key?: string } | undefined): void {
    // Its only option belongs to the date selection, for YAML.
    checkCollectionKey(config?.collection_key);
    this._collectionKey = config?.collection_key;
  }

  private get _devices() {
    // By name, so that the title and the rows do not depend on the setup's order.
    return this._info
      ? heatDevices(this._info).sort((a, b) => a.name.localeCompare(b.name, this.hass?.locale?.language))
      : [];
  }

  protected _ids(): string[] {
    return this._devices.flatMap((device) => [...(device.statistics.heat ?? []), ...(device.statistics.energy ?? [])]);
  }

  protected render(): TemplateResult {
    const t = this._localize;
    if (!this.hass) return html``;
    const waiting = this._waiting();
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${t("heat_meters_title")}</h2>
        ${explanation(t("info_label"), [t("info.heat_meters")])}
      </div>
      ${waiting ? html`<p class="summary">${this._waitingText(waiting)}</p>` : this._table()}
    </ha-card>`;
  }

  private _table(): TemplateResult {
    const t = this._localize;
    const fmt = this._fmt;
    const values = this._sums?.values ?? {};
    const colors = consumerColors(this._info!, palette(this));
    const devices = this._devices;
    const heat = devices.reduce((sum, device) => sum + addUp(values, device.statistics.heat), 0);
    const energy = devices.reduce((sum, device) => sum + addUp(values, device.statistics.energy), 0);
    const ratio = (of: number, by: number) => (by > 0 ? fmt.number(of / by, 2) : "–");
    const row = (name: string, heat: number, energy: number, color?: string): TableRow => ({
      name,
      color,
      cells: [fmt.value(heat, "energy"), fmt.value(energy, "energy"), ratio(heat, energy)],
    });
    return lensTable(
      {
        head: [t("meters_consumer"), t("figure.heat"), t("meters_electricity"), t("figure.scop")],
        rows: devices.map((device) =>
          row(
            device.name,
            addUp(values, device.statistics.heat),
            addUp(values, device.statistics.energy),
            colors.get(device.id) ?? ""
          )
        ),
        foot: [row(t("savings_total"), heat, energy)],
        swatches: true,
      },
      this
    );
  }

  static styles = [cardStyles, tableStyles];
}
