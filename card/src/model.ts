// Reads the integration's sensors and derives what the card shows.

import type { BalanceFigures, Category, CategoryFigures, HomeAssistant } from "./types";

export const DOMAIN = "electricity_lens";
const ORDER: Category[] = ["pv", "heat_pump", "wallbox"];

const number = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const date = (value: unknown): Date | null =>
  typeof value === "string" && value ? new Date(value) : null;

/** Returns the figures of every category, found without any card options. */
export function readCategories(hass: HomeAssistant): CategoryFigures[] {
  const entries = Object.values(hass.entities ?? {}).filter(
    (entry) => entry.platform === DOMAIN
  );
  const siblings = (deviceId: string | null | undefined, key: string) =>
    entries.find(
      (entry) => entry.device_id === deviceId && entry.translation_key === key
    );
  const value = (entityId: string | undefined) =>
    entityId ? number(hass.states[entityId]?.state) : null;

  const figures: CategoryFigures[] = [];
  for (const entry of entries) {
    if (entry.translation_key !== "saving") continue;
    const state = hass.states[entry.entity_id];
    if (!state || state.state === "unavailable") continue;
    const attributes = state.attributes;
    const category = attributes.category as Category;
    if (!ORDER.includes(category)) continue;
    figures.push({
      category,
      savingStatistic:
        typeof attributes.statistic_id === "string"
          ? attributes.statistic_id
          : `${DOMAIN}:${category}_saving`,
      calculating: attributes.calculating === true,
      saving: number(state.state),
      investment: number(attributes.investment),
      perYear: value(siblings(entry.device_id, "saving_per_year")?.entity_id),
      countingSince: date(attributes.counting_since),
      yearlyFrom: date(attributes.yearly_from),
      price: number(attributes.price),
      heating:
        attributes.heating === "gas" || attributes.heating === "oil"
          ? attributes.heating
          : null,
      heatEstimated: attributes.heat_estimated === true,
    });
  }
  return figures.sort(
    (a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category)
  );
}

/** The overall figures as the integration computed them; null when its
 * sensor has no state to read. */
export function readBalance(hass: HomeAssistant): BalanceFigures | null {
  const entry = Object.values(hass.entities ?? {}).find(
    (item) => item.platform === DOMAIN && item.translation_key === "balance"
  );
  const state = entry ? hass.states[entry.entity_id] : undefined;
  if (!state || state.state === "unavailable") return null;
  return {
    balance: number(state.state),
    saved: number(state.attributes.saved) ?? 0,
    invested: number(state.attributes.invested) ?? 0,
    inThePlusFrom: date(state.attributes.in_the_plus_from),
  };
}

/** What to say when no category can be read: their sensors exist but have no
 * state to read, or the integration is not set up. */
export function noCategoriesText(hass: HomeAssistant): "integration_unavailable" | "not_set_up" {
  const hasSensors = Object.values(hass.entities ?? {}).some(
    (entry) => entry.platform === DOMAIN && entry.translation_key === "saving"
  );
  return hasSensors ? "integration_unavailable" : "not_set_up";
}
