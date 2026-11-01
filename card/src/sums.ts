// Sums of statistics over a period, as the cards need them: the change of
// each statistic between the start and the end of the period.

import { periodOf, statisticsPeriod, type Range } from "./history";
import type { HomeAssistant, StatisticsResult } from "./types";

const HOUR = 3_600_000;

/** The change of each statistic within the period. Days and months begin at
 * midnight of the server's time zone, which may be a few hours off the
 * browser's, so rows just outside the period are left out. */
export async function loadSums(
  hass: HomeAssistant,
  ids: string[],
  range: Range
): Promise<Record<string, number>> {
  if (!ids.length) return {};
  const period = statisticsPeriod(periodOf(range));
  const rows = await hass.callWS<StatisticsResult>({
    type: "recorder/statistics_during_period",
    start_time: new Date(range.start).toISOString(),
    end_time: new Date(range.end + 1).toISOString(),
    statistic_ids: ids,
    period,
    types: ["change"],
    units: { energy: "kWh" },
  });
  const tolerance = period === "hour" ? 0 : 12 * HOUR;
  const sums: Record<string, number> = {};
  for (const id of ids) {
    sums[id] = 0;
    for (const row of rows[id] ?? []) {
      const at =
        (typeof row.start === "number" ? row.start : Date.parse(row.start)) + tolerance;
      if (at >= range.start && at <= range.end) sums[id] += row.change ?? 0;
    }
  }
  return sums;
}
