// Dashboard card of the Electricity Lens integration: where the power comes
// from right now and where it goes, as two bars of the same length. In equals
// out, so a household with any sources and any number of devices fits in the
// same two bars; the lists below name each part with its power.

import { css, html, nothing, type TemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { palette, type Palette } from "./colors";
import { powerFlow, powerSensors, readKw, type Flow, type FlowPart, type FlowSummary } from "./flow";
import { formatPower, formatter } from "./format";
import { cachedInfo, infoStale, loadInfo } from "./info";
import { LensCard } from "./lens-card";
import { localizer, type Localize } from "./localize";
import { cardStyles } from "./styles";
import type { FiguresInfo, HomeAssistant } from "./types";

interface FlowCardConfig {
  title?: string;
}

export class ElectricityLensFlowCard extends LensCard {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _info: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: FlowCardConfig;
  private _info?: FiguresInfo | null;
  private _infoLoading = false;
  private _palette?: { themes: unknown; selected: unknown; colors: Palette };

  static getStubConfig(): Record<string, never> {
    return {};
  }

  static getConfigForm(): { schema: { name: string; selector: { text: object } }[] } {
    return { schema: [{ name: "title", selector: { text: {} } }] };
  }

  setConfig(config: FlowCardConfig): void {
    this._config = config;
  }

  getCardSize(): number {
    return 3;
  }

  getGridOptions(): { columns: number; min_columns: number } {
    return { columns: 12, min_columns: 6 };
  }

  protected _watched(): string[] {
    return powerSensors(this._info) ?? [];
  }

  private get _localize(): Localize {
    return localizer(this.hass?.locale?.language ?? this.hass?.language ?? "en");
  }

  protected willUpdate(): void {
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

  /** The theme's colors, read again only when the theme changes. */
  private _colors(): Palette {
    const themes = this.hass?.themes;
    const selected = this.hass?.selectedTheme;
    if (!this._palette || this._palette.themes !== themes || this._palette.selected !== selected) {
      this._palette = { themes, selected, colors: palette(this) };
    }
    return this._palette.colors;
  }

  private _power(kw: number): string {
    return formatPower(this.hass?.locale, kw);
  }

  private _summary(summary: FlowSummary): string {
    const t = this._localize;
    switch (summary.kind) {
      case "idle":
        return t("flow.idle");
      case "grid":
        return t("flow.grid");
      case "share":
        return t(`flow.share_${summary.by}`, {
          share: formatter(this.hass?.locale, this.hass?.config.currency ?? "EUR").value(summary.share * 100, "percent"),
          grid: this._power(summary.grid),
        });
      case "covered": {
        const surplus =
          summary.export && summary.charge
            ? t("flow.surplus_both", { grid: this._power(summary.export), battery: this._power(summary.charge) })
            : summary.export
              ? t("flow.surplus_grid", { power: this._power(summary.export) })
              : summary.charge
                ? t("flow.surplus_battery", { power: this._power(summary.charge) })
                : "";
        return `${t(`flow.covered_${summary.by}`)}${surplus ? `, ${surplus}` : ""}.`;
      }
    }
  }

  private _name(part: FlowPart): string {
    return "key" in part.name ? this._localize(part.name.key) : part.name.text;
  }

  /** Opens the dialog of a part's sensor, as Home Assistant's energy cards do. */
  private _open(entity: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true })
    );
  }

  private _bar(label: string, parts: FlowPart[], total: number, scale: number): TemplateResult {
    return html`<div class="label" aria-hidden="true">${label}</div>
      <div class="track" aria-hidden="true">
        <div class="fill" style="width: ${scale > 0 ? (total / scale) * 100 : 0}%">
          ${repeat(
            parts,
            (part) => part.id,
            (part) => html`<span style="flex-grow: ${part.kw}; --c: ${part.color}"></span>`
          )}
        </div>
      </div>`;
  }

  private _list(label: string, parts: FlowPart[]): TemplateResult {
    return html`<ul aria-label=${label}>
      ${parts.map((part) => {
        const name = this._name(part);
        const content = html`<span class="dot" style="--c: ${part.color}" aria-hidden="true"></span>
          <span class="name">${name}</span>
          <span class="power">${this._power(part.kw)}</span>`;
        const entity = part.entity;
        return html`<li>
          ${entity
            ? html`<button type="button" @click=${() => this._open(entity)}>${content}</button>`
            : html`<div class="row">${content}</div>`}
        </li>`;
      })}
    </ul>`;
  }

  private _flow(flow: Flow): TemplateResult {
    const t = this._localize;
    const total = (parts: FlowPart[]) => parts.reduce((sum, part) => sum + part.kw, 0);
    const from = total(flow.sources);
    const to = total(flow.uses);
    const scale = Math.max(from, to);
    return html`<p class="summary">${this._summary(flow.summary)}</p>
      ${scale > 0
        ? html`<div class="bars">
            ${this._bar(t("flow.from"), flow.sources, from, scale)}
            ${this._bar(t("flow.to"), flow.uses, to, scale)}
          </div>`
        : nothing}
      <div class="lists">
        ${flow.sources.length ? this._list(t("flow.from"), flow.sources) : nothing}
        ${flow.uses.length ? this._list(t("flow.to"), flow.uses) : nothing}
      </div>`;
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;
    const t = this._localize;
    const hass = this.hass;
    const info = this._info;
    const flow =
      info && powerSensors(info) ? powerFlow(info, (entity) => readKw(hass.states[entity]), this._colors()) : null;
    let body: TemplateResult;
    if (info === undefined) body = html`<p class="summary">${t("loading")}</p>`;
    else if (info === null) body = html`<p class="summary">${t("integration_unavailable")}</p>`;
    else if (!powerSensors(info)) body = html`<p class="summary">${t("flow.no_sensor")}</p>`;
    else if (!flow) body = html`<p class="summary">${t("flow.unavailable")}</p>`;
    else body = this._flow(flow);
    return html`<ha-card>
      <div class="header">
        <h2 class="title">${this._config?.title || t("flow.title")}</h2>
        ${flow ? html`<span class="chip">${t("flow.consumption", { power: this._power(flow.home) })}</span>` : nothing}
      </div>
      ${body}
    </ha-card>`;
  }

  static styles = [
    cardStyles,
    css`
      .bars {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 8px 12px;
        padding: 4px 16px 0;
      }
      .label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .track {
        height: 20px;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        background-color: var(--ha-bar-background-color, var(--secondary-background-color));
        overflow: hidden;
      }
      .fill {
        display: flex;
        height: 100%;
        border-radius: var(--ha-bar-border-radius, var(--ha-border-radius-sm, 4px));
        overflow: hidden;
        transition: width 0.6s ease;
      }
      /* HA's energy look: the color at half strength, framed by the full color. */
      .fill span,
      .dot {
        background: color-mix(in srgb, var(--c, transparent) 50%, transparent);
        box-shadow: inset 0 0 0 1px var(--c, transparent);
      }
      .fill span {
        flex-basis: 0;
        min-width: 2px;
        transition: flex-grow 0.6s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        .fill,
        .fill span {
          transition: none;
        }
      }
      .lists {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 0 24px;
        padding: 12px 16px 12px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      button,
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 4px 0;
        font: inherit;
        font-size: 14px;
        color: var(--primary-text-color);
        text-align: start;
      }
      button {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: var(--ha-border-radius-sm, 4px);
      }
      button:focus-visible {
        outline: 2px solid var(--ha-color-focus, var(--primary-color));
        outline-offset: 2px;
      }
      .dot {
        flex: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .power {
        white-space: nowrap;
        color: var(--secondary-text-color);
      }
    `,
  ];
}
