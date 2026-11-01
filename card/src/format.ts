// Numbers, energy, money, prices, and shares in the user's format.

import type { Unit } from "./figures";

export interface Format {
  number(value: number, digits?: number): string;
  value(value: number, unit: Unit): string;
  /** The currency's symbol, for example as an axis name. */
  currencySymbol(): string;
}

export function formatter(language: string, currency: string): Format {
  const number = (value: number, digits?: number): string => {
    const abs = Math.abs(value);
    const fraction = digits ?? (abs < 10 ? 2 : abs < 100 ? 1 : 0);
    return new Intl.NumberFormat(language, {
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
        return new Intl.NumberFormat(language, {
          style: "currency",
          currency,
          maximumFractionDigits: cents ? 2 : 0,
          minimumFractionDigits: cents ? 2 : 0,
        }).format(amount);
      }
      case "price":
        if (currency === "EUR") return `${number(amount * 100, 1)} ct/kWh`;
        return `${new Intl.NumberFormat(language, {
          style: "currency",
          currency,
          maximumFractionDigits: 3,
        }).format(amount)}/kWh`;
      case "percent":
        return new Intl.NumberFormat(language, {
          style: "percent",
          maximumFractionDigits: 0,
        }).format(amount / 100);
      case "number":
        return number(amount, Math.abs(amount) < 10 ? 2 : Math.abs(amount) < 100 ? 1 : 0);
      case "distance":
        return `${number(amount, Math.abs(amount) < 100 ? 1 : 0)} km`;
      case "per_100km":
        return `${new Intl.NumberFormat(language, {
          style: "currency",
          currency,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(amount)}/100 km`;
    }
  };
  const currencySymbol = (): string =>
    new Intl.NumberFormat(language, { style: "currency", currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? "";
  return { number, value, currencySymbol };
}
