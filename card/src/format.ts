// Numbers, energy, money, prices, and shares in the user's format.

import type { Unit } from "./figures";
import type { HomeAssistant } from "./types";

/** The user's profile settings for numbers and times. */
export interface LocaleSettings {
  language: string;
  number_format?: string;
  time_format?: string;
}

/** A locale for each number format of the user's profile, as Home Assistant's own. */
const NUMBER_LOCALES: Record<string, string> = {
  comma_decimal: "en-US",
  decimal_comma: "de",
  space_comma: "fr",
  quote_decimal: "de-CH",
};

/** A number format that follows the user's profile. */
export function numberFormat(
  locale: LocaleSettings | undefined,
  options: Intl.NumberFormatOptions
): Intl.NumberFormat {
  const setting = locale?.number_format;
  const name =
    setting === "system"
      ? undefined
      : (NUMBER_LOCALES[setting ?? ""] ?? locale?.language ?? "en");
  return new Intl.NumberFormat(name, {
    ...options,
    ...(setting === "none" ? { useGrouping: false } : {}),
  });
}

/** Power in kW as Home Assistant shows it: watts below one kilowatt. */
export function formatPower(locale: LocaleSettings | undefined, kw: number): string {
  if (Math.abs(kw) < 1) {
    return `${numberFormat(locale, { maximumFractionDigits: 0 }).format(kw * 1000)} W`;
  }
  const digits = Math.abs(kw) < 100 ? 1 : 0;
  return `${numberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(kw)} kW`;
}

/** Whether times use AM and PM by the user's profile; undefined leaves it to the language. */
export function hour12(locale: LocaleSettings | undefined): boolean | undefined {
  switch (locale?.time_format) {
    case "am_pm":
      return true;
    case "24":
      return false;
    case "system":
      return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hour12;
    default:
      return undefined;
  }
}

/** A formatted value split into its number and its unit, so the unit can be
 * shown smaller, as Home Assistant's energy cards do. Values whose unit
 * comes first, such as "€437", stay whole. */
export function splitUnit(text: string): [string, string] {
  const match = /^([-−+]?[\d.,'’\u00a0\u202f ]*\d)[\u00a0\u202f ](.+)$/.exec(text);
  return match ? [match[1], match[2]] : [text, ""];
}

export interface Format {
  number(value: number, digits?: number): string;
  value(value: number, unit: Unit): string;
  /** The currency's symbol, for example as an axis name. */
  currencySymbol(): string;
}

export function formatter(locale: LocaleSettings | undefined, currency: string): Format {
  const number = (value: number, digits?: number): string => {
    const abs = Math.abs(value);
    const fraction = digits ?? (abs < 10 ? 2 : abs < 100 ? 1 : 0);
    return numberFormat(locale, {
      maximumFractionDigits: fraction,
      minimumFractionDigits: digits ?? 0,
    }).format(value);
  };
  const value = (amount: number, unit: Unit): string => {
    switch (unit) {
      case "energy":
        return `${number(amount, Math.abs(amount) < 100 ? 1 : 0)} kWh`;
      case "money": {
        const cents = Math.abs(amount) < 100;
        return numberFormat(locale, {
          style: "currency",
          currency,
          maximumFractionDigits: cents ? 2 : 0,
          minimumFractionDigits: cents ? 2 : 0,
        }).format(amount);
      }
      case "price":
        if (currency === "EUR") return `${number(amount * 100, 1)} ct/kWh`;
        return `${numberFormat(locale, {
          style: "currency",
          currency,
          maximumFractionDigits: 3,
        }).format(amount)}/kWh`;
      case "percent":
        return numberFormat(locale, {
          style: "percent",
          maximumFractionDigits: 0,
        }).format(amount / 100);
      case "number":
        return number(amount, Math.abs(amount) < 10 ? 2 : Math.abs(amount) < 100 ? 1 : 0);
      case "distance":
        return `${number(amount, Math.abs(amount) < 100 ? 1 : 0)} km`;
      case "per_100km":
        return `${numberFormat(locale, {
          style: "currency",
          currency,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(amount)}/100 km`;
    }
  };
  const currencySymbol = (): string =>
    numberFormat(locale, { style: "currency", currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? "";
  return { number, value, currencySymbol };
}

/** An entity's name as Home Assistant shows it, with its device's name where
 * the entity's own name needs it; the friendly name on older versions. */
export function entityName(hass: HomeAssistant | undefined, entityId: string): string | undefined {
  const state = hass?.states[entityId];
  if (!state) return undefined;
  return hass?.formatEntityName?.(state) || (state.attributes.friendly_name as string | undefined) || undefined;
}

/** An entity's state as Home Assistant shows it: translated, with the
 * entity's precision, and its unit apart. Undefined on older versions. */
export function entityStateParts(hass: HomeAssistant | undefined, entityId: string): [string, string] | undefined {
  const state = hass?.states[entityId];
  const parts = state && hass?.formatEntityStateToParts?.(state);
  if (!parts?.length) return undefined;
  const join = (unit: boolean) =>
    parts
      .filter((part) => (part.type === "unit") === unit)
      .map((part) => part.value)
      .join("")
      .trim();
  return [join(false), join(true)];
}
