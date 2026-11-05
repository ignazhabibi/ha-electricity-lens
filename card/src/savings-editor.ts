// Editor of the savings card: all categories, or one area's saving reckoned up.

import { LitElement, html, type TemplateResult } from "lit";

import type { SavingsCardConfig } from "./electricity-lens-savings-card";
import { localizer, type Localize } from "./localize";
import type { HomeAssistant } from "./types";

const ALL = "all";

export class ElectricityLensSavingsCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: SavingsCardConfig;

  setConfig(config: SavingsCardConfig): void {
    this._config = config;
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  private _changed(event: CustomEvent<{ value: { area?: string } }>): void {
    const { area: _area, ...rest } = this._config ?? {};
    const area = event.detail.value.area;
    const config: SavingsCardConfig = area && area !== ALL ? { ...rest, area } : rest;
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  private _label = (): string => this._localize("editor_area");

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const t = this._localize;
    const schema = [
      {
        name: "area",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: ALL, label: t("editor_savings") },
              { value: "heat_pump", label: t("category.heat_pump") },
              { value: "wallbox", label: t("category.wallbox") },
            ],
          },
        },
      },
    ];
    return html`<ha-form
      .hass=${this.hass}
      .data=${{ area: this._config.area ?? ALL }}
      .schema=${schema}
      .computeLabel=${this._label}
      @value-changed=${this._changed}
    ></ha-form>`;
  }
}
