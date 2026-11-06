// Editor of the savings card: all categories, or one area's saving reckoned up.

import { LitElement, html, type TemplateResult } from "lit";

import type { SavingsCardConfig } from "./electricity-lens-savings-card";
import { localizer, type Localize } from "./localize";
import { readCategories } from "./model";
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
    const set = new Set<string>(readCategories(this.hass).map((category) => category.category));
    const schema = [
      {
        name: "area",
        selector: {
          select: {
            mode: "dropdown",
            // Only the categories that are set up, and the one already chosen.
            options: [
              { value: ALL, label: t("editor_savings") },
              ...(["heat_pump", "wallbox"] as const)
                .filter((area) => area === this._config?.area || set.has(area))
                .map((area) => ({ value: area, label: t(`category.${area}`) })),
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
