// Periods and their slots for the history card, and the statistics rows
// summed per slot.

import type { StatisticsResult } from "./types";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const MAX_SLOTS = 400;

/** A period from its first to its last millisecond. */
export interface Range {
  start: number;
  end: number;
}

export type Period = "hour" | "day" | "month" | "year";

/** Whole days from start to end, counted on the calendar as date-fns'
 * differenceInDays does, so a change to summer time costs no day. */
function wholeDays(start: number, end: number): number {
  const from = new Date(start);
  const to = new Date(end);
  const calendar = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.round((calendar(to) - calendar(from)) / DAY);
  const timeOfDay = (date: Date) => date.getTime() - new Date(date).setHours(0, 0, 0, 0);
  return timeOfDay(to) < timeOfDay(from) ? days - 1 : days;
}

/** The slot length for a period, as Home Assistant's energy graphs choose it:
 * months for whole months longer than 35 days, days for more than two days,
 * hours otherwise. Years are only asked for, by "all years". */
export function periodOf({ start, end }: Range): Period {
  const days = wholeDays(start, end);
  const lastDay = new Date(end);
  const wholeMonths =
    new Date(start).getDate() === 1 &&
    new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 1).getDate() === 1;
  if (wholeMonths && days > 35) return "month";
  return days > 2 ? "day" : "hour";
}

/** The statistics period to request for a slot length. The recorder has no
 * years, so years are summed from months. */
export const statisticsPeriod = (period: Period): string =>
  period === "year" ? "month" : period;

const slotStart = (time: number, period: Period): number => {
  const date = new Date(time);
  if (period === "hour") return date.setMinutes(0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (period === "day") return date.getTime();
  date.setDate(1);
  if (period === "month") return date.getTime();
  return date.setMonth(0);
};

const nextSlot = (time: number, period: Period): number => {
  const date = new Date(time);
  if (period === "hour") date.setHours(date.getHours() + 1);
  else if (period === "day") date.setDate(date.getDate() + 1);
  else if (period === "month") date.setMonth(date.getMonth() + 1);
  else date.setFullYear(date.getFullYear() + 1);
  return date.getTime();
};

/** The starts of the slots that make up a period. */
export function slotsOf({ start, end }: Range, period: Period): number[] {
  const slots: number[] = [];
  for (
    let time = slotStart(start, period);
    time <= end && slots.length < MAX_SLOTS;
    time = nextSlot(time, period)
  ) {
    slots.push(time);
  }
  return slots;
}

/** Whole years from the first year that counts to the current one. */
export function yearsOf(firstDates: Array<Date | null>, now = new Date()): Range {
  const years = firstDates
    .filter((date): date is Date => date !== null)
    .map((date) => date.getFullYear());
  const first = Math.min(now.getFullYear(), ...years);
  return {
    start: new Date(first, 0, 1).getTime(),
    end: new Date(now.getFullYear() + 1, 0, 1).getTime() - 1,
  };
}

/** The first year statistics can hold; "all years" starts here and drops the
 * empty years before the first value. */
export const FIRST_YEAR = 2000;

/** The slots from the first one with a value on; all of them if none has one. */
export function fromFirstValue(columns: Array<Array<number | null>>, slots: number): number {
  for (let i = 0; i < slots; i += 1) {
    if (columns.some((values) => values[i] !== null && values[i] !== undefined)) return i;
  }
  return 0;
}

/** The change of one statistic summed per slot; null where it has no rows. */
export function valuesPerSlot(
  rows: StatisticsResult[string],
  slots: number[],
  period: Period
): Array<number | null> {
  const values: Array<number | null> = slots.map(() => null);
  // Days and longer begin at midnight of the server's time zone, which may
  // be a few hours off the browser's.
  const tolerance = period === "hour" ? 0 : 12 * HOUR;
  for (const row of rows ?? []) {
    if (row.change === null || row.change === undefined) continue;
    const at =
      (typeof row.start === "number" ? row.start : Date.parse(row.start)) +
      tolerance;
    let index = -1;
    for (let i = 0; i < slots.length && slots[i] <= at; i += 1) index = i;
    if (index < 0) continue;
    values[index] = (values[index] ?? 0) + row.change;
  }
  return values;
}

/** Fixed periods a card can show instead of following the date selection. */
export type FixedPeriod =
  | "today"
  | "yesterday"
  | "this_month"
  | "last_month"
  | "this_year"
  | "last_year";

/** The range of a fixed period, in the browser's time zone. */
export function fixedRange(period: FixedPeriod, now = new Date()): Range {
  const range = (start: Date, end: Date): Range => ({
    start: start.getTime(),
    end: end.getTime() - 1,
  });
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  switch (period) {
    case "today":
      return range(new Date(y, m, d), new Date(y, m, d + 1));
    case "yesterday":
      return range(new Date(y, m, d - 1), new Date(y, m, d));
    case "this_month":
      return range(new Date(y, m, 1), new Date(y, m + 1, 1));
    case "last_month":
      return range(new Date(y, m - 1, 1), new Date(y, m, 1));
    case "this_year":
      return range(new Date(y, 0, 1), new Date(y + 1, 0, 1));
    case "last_year":
      return range(new Date(y - 1, 0, 1), new Date(y, 0, 1));
  }
}

/** A short name of a range: a day, a month, a year, or from–to. */
export function rangeLabel({ start, end }: Range, language: string): string {
  const from = new Date(start);
  const to = new Date(end);
  const format = (options: Intl.DateTimeFormatOptions, date: Date) =>
    new Intl.DateTimeFormat(language, options).format(date);
  const sameDay = from.toDateString() === to.toDateString();
  if (sameDay) return format({ day: "numeric", month: "short" }, from);
  const wholeMonths =
    from.getDate() === 1 && new Date(end + 1).getDate() === 1;
  if (wholeMonths && from.getMonth() === 0 && to.getMonth() === 11 &&
      from.getFullYear() === to.getFullYear()) {
    return format({ year: "numeric" }, from);
  }
  if (wholeMonths && from.getMonth() === to.getMonth() &&
      from.getFullYear() === to.getFullYear()) {
    return format({ month: "short", year: "numeric" }, from);
  }
  return new Intl.DateTimeFormat(language, {
    day: "numeric",
    month: "short",
  }).formatRange(from, to);
}

/** The mean of one statistic per slot; null where it has no rows. */
export function meansPerSlot(
  rows: StatisticsResult[string],
  slots: number[],
  period: Period
): Array<number | null> {
  const sums = slots.map(() => 0);
  const counts = slots.map(() => 0);
  const tolerance = period === "hour" ? 0 : 12 * HOUR;
  for (const row of rows ?? []) {
    if (row.mean === null || row.mean === undefined) continue;
    const at =
      (typeof row.start === "number" ? row.start : Date.parse(row.start)) +
      tolerance;
    let index = -1;
    for (let i = 0; i < slots.length && slots[i] <= at; i += 1) index = i;
    if (index < 0) continue;
    sums[index] += row.mean;
    counts[index] += 1;
  }
  return sums.map((sum, i) => (counts[i] ? sum / counts[i] : null));
}
