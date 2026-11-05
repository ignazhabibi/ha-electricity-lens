// What all cards share: Home Assistant hands over a new hass object on every
// state change anywhere in the house, but a card redraws only when something
// it shows has changed.

import { LitElement, type PropertyValues } from "lit";

import { DOMAIN } from "./model";
import type { HomeAssistant } from "./types";

/** Even without a change a card looks again now and then: its statistics grow,
 * and a day ends. */
const LOOK_AGAIN_MS = 60_000;

const ownEntities = new WeakMap<object, string[]>();

/** The integration's entities, looked up once per entity registry. */
function integrationEntities(hass: HomeAssistant): string[] {
  const registry = hass.entities ?? {};
  let entities = ownEntities.get(registry);
  if (!entities) {
    entities = Object.values(registry)
      .filter((entry) => entry.platform === DOMAIN)
      .map((entry) => entry.entity_id);
    ownEntities.set(registry, entities);
  }
  return entities;
}

export abstract class LensCard extends LitElement {
  hass?: HomeAssistant;
  private _lookedAt = 0;

  /** Further entities whose state the card shows. */
  protected _watched(): string[] {
    return [];
  }

  private _changedFor(old: HomeAssistant, hass: HomeAssistant): boolean {
    return (
      old.locale !== hass.locale ||
      old.language !== hass.language ||
      old.config !== hass.config ||
      old.themes !== hass.themes ||
      old.selectedTheme !== hass.selectedTheme ||
      old.entities !== hass.entities ||
      [...integrationEntities(hass), ...this._watched()].some(
        (entity) => old.states[entity] !== hass.states[entity]
      )
    );
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    const old = changed.get("hass") as HomeAssistant | undefined;
    const onlyHass = changed.size === 1 && old !== undefined && this.hass !== undefined;
    const due = Date.now() - this._lookedAt >= LOOK_AGAIN_MS;
    if (onlyHass && !due && !this._changedFor(old, this.hass!)) return false;
    this._lookedAt = Date.now();
    return true;
  }
}
