// The parts of Home Assistant's frontend objects the card uses.

export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform: string;
  translation_key?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntityState>;
  entities: Record<string, HassEntityRegistryEntry>;
  locale: { language: string; number_format?: string; time_format?: string };
  language?: string;
  themes?: unknown;
  selectedTheme?: unknown;
  config: { currency: string; state?: string };
  /** The websocket connection; the energy date selection keeps its period here. */
  connection?: object;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

/** Rows of `recorder/statistics_during_period`, by statistic id. */
export type StatisticsResult = Record<
  string,
  | Array<{ start: number | string; change?: number | null; mean?: number | null }>
  | undefined
>;

export type Category = "pv" | "heat_pump" | "wallbox";

export interface CategoryFigures {
  category: Category;
  /** The statistic that holds the saving per hour, kept by the integration. */
  savingStatistic: string;
  calculating: boolean;
  saving: number | null;
  investment: number | null;
  payback: number | null;
  perYear: number | null;
  countingSince: Date | null;
  yearlyFrom: Date | null;
  /** The gas, oil, or fuel price in effect now. */
  price: number | null;
  heating: "gas" | "oil" | null;
  heatEstimated: boolean;
}

/** One area of `electricity_lens/figures`: where each of its figures is kept. */
export interface FigureArea {
  id: string;
  kind: "household" | "grid" | "solar" | "category" | "device" | "other";
  name: string;
  /** Statistics whose changes add up, by figure key such as "energy". */
  statistics: Record<string, string[] | undefined>;
  /** Whether the energy dashboard has a solar forecast. */
  forecast?: boolean;
  /** For devices: whether it is not part of another device. */
  top_level?: boolean;
}

export interface FiguresInfo {
  calculating: boolean;
  levels: { cheap_until: number | null; expensive_from: number | null };
  areas: FigureArea[];
}

/** Rows of `recorder/statistics_during_period` with all types. */
export type StatisticsRows = Record<
  string,
  | Array<{
      start: number | string;
      change?: number | null;
      mean?: number | null;
      min?: number | null;
      max?: number | null;
    }>
  | undefined
>;

/** An entry of `recorder/get_statistics_metadata`. */
export interface StatisticMetadata {
  statistic_id: string;
  name?: string | null;
  has_sum?: boolean;
  statistics_unit_of_measurement?: string | null;
  unit_class?: string | null;
}
