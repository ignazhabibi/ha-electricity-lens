// Reads the integration's sensors and derives what the card shows.

import type {
  BalanceFigures,
  Category,
  CategoryFigures,
  FiguresInfo,
  HomeAssistant,
} from "./types";

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
      balance: number(attributes.balance),
      perYear: value(siblings(entry.device_id, "saving_per_year")?.entity_id),
      countingSince: date(attributes.counting_since),
      entityId: entry.entity_id,
      heating:
        attributes.heating === "gas" || attributes.heating === "oil"
          ? attributes.heating
          : null,
    });
  }
  return figures.sort(
    (a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category)
  );
}

/** The categories with an investment, and the sensors about it. */
export function investmentSensors(
  hass: HomeAssistant
): { category: Category; payback: string; annualReturn: string }[] {
  const entries = Object.values(hass.entities ?? {}).filter((entry) => entry.platform === DOMAIN);
  return entries
    .filter((entry) => entry.translation_key === "saving")
    .flatMap((entry) => {
      const attributes = hass.states[entry.entity_id]?.attributes;
      const sibling = (key: string) =>
        entries.find((item) => item.device_id === entry.device_id && item.translation_key === key)?.entity_id;
      const payback = sibling("payback");
      const annualReturn = sibling("annual_return");
      const category = attributes?.category as Category;
      return ORDER.includes(category) && Number(attributes?.investment) > 0 && payback && annualReturn
        ? [{ category, payback, annualReturn }]
        : [];
    })
    .sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category));
}

/** The area of the figures that shows a category. */
export const areaOfCategory = (category: Category): string =>
  category === "pv" ? "solar" : category;

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
    perYear: number(state.attributes.per_year),
    progress: number(state.attributes.progress),
    entityId: entry!.entity_id,
  };
}

/** How far the integration has computed the past, in percent; null once it
 * has, or when nothing tells. The balance sensor follows each computed
 * chunk; the cached areas only every few seconds. */
export const readProgress = (
  hass: HomeAssistant | undefined,
  info?: FiguresInfo | null
): number | null => (hass ? readBalance(hass)?.progress : null) ?? info?.progress ?? null;

/** What to say when no category can be read: their sensors exist but have no
 * state to read, or the integration is not set up. */
export function noCategoriesText(hass: HomeAssistant): "integration_unavailable" | "not_set_up" {
  const hasSensors = Object.values(hass.entities ?? {}).some(
    (entry) => entry.platform === DOMAIN && entry.translation_key === "saving"
  );
  return hasSensors ? "integration_unavailable" : "not_set_up";
}
