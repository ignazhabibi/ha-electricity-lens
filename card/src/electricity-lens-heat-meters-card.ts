// Heat meters card of the Electricity Lens integration: heat, electricity, and
// seasonal COP of each of the heat pump's meters, for example heating and hot
// water, in the selected period. It needs no options.

import { html, type TemplateResult } from "lit";

import { consumerColors, palette } from "./colors";
import { heatDevices } from "./history-figures";
import { PeriodSumsCard, addUp, tableStyles } from "./period-sums-card";
import { cardStyles } from "./styles";

export class ElectricityLensHeatMetersCard extends PeriodSumsCard {
  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigForm(): { schema: never[] } {
    return { schema: [] };
  }

  setConfig(_config: unknown): void {
    // The card has no options.
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
    const devices = this._devices;
    const title = devices.length ? devices.map((device) => device.name).join(" & ") : t("figure.heat");
    return html`<ha-card>
      <div class="header"><h2 class="title">${title}</h2></div>
      ${waiting ? html`<p class="summary">${t(waiting)}</p>` : this._table()}
    </ha-card>`;
  }

  private _table(): TemplateResult {
    const t = this._localize;
    const fmt = this._fmt;
    const values = this._sums?.values ?? {};
    const colors = consumerColors(this._info!, palette(this));
    return html`<table>
      <thead>
        <tr>
          <th scope="col" colspan="2" class="name">${t("meters_consumer")}</th>
          <th scope="col">${t("figure.heat")}</th>
          <th scope="col">${t("meters_electricity")}</th>
          <th scope="col">${t("figure.scop")}</th>
        </tr>
      </thead>
      <tbody>
        ${this._devices.map((device) => {
          const heat = addUp(values, device.statistics.heat);
          const energy = addUp(values, device.statistics.energy);
          return html`<tr>
            <td class="swatch-cell">
              <span class="swatch" style="--color: ${colors.get(device.id) ?? ""}" aria-hidden="true"></span>
            </td>
            <td class="name">${device.name}</td>
            <td>${fmt.value(heat, "energy")}</td>
            <td>${fmt.value(energy, "energy")}</td>
            <td>${energy > 0 ? fmt.number(heat / energy, 2) : "–"}</td>
          </tr>`;
        })}
      </tbody>
    </table>`;
  }

  static styles = [cardStyles, tableStyles];
}
