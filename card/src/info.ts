// The integration's areas, shared by all cards on a page: one request for
// all of them, kept for a few minutes. A failed request is tried again soon,
// for example while Home Assistant is still starting.

import { DOMAIN } from "./model";
import type { FiguresInfo, HomeAssistant } from "./types";

const KEEP_MS = 5 * 60 * 1000;
export const RETRY_MS = 5 * 1000;

let cache: { at: number; value: FiguresInfo | null } | undefined;
let pending: Promise<FiguresInfo | null> | undefined;

/** The cached areas: undefined before the first answer, null when the
 * integration is not loaded. */
export const cachedInfo = (): FiguresInfo | null | undefined => cache?.value;

/** Whether the cached areas should be asked for again. */
export function infoStale(): boolean {
  if (!cache) return true;
  const keep = cache.value && !cache.value.calculating ? KEEP_MS : RETRY_MS;
  return Date.now() - cache.at > keep;
}

export function loadInfo(hass: HomeAssistant): Promise<FiguresInfo | null> {
  if (!infoStale()) return Promise.resolve(cache?.value ?? null);
  pending ??= hass
    .callWS<FiguresInfo>({ type: `${DOMAIN}/figures` })
    .then((value) => value)
    .catch(() => null)
    .then((value) => {
      cache = { at: Date.now(), value };
      pending = undefined;
      return value;
    });
  return pending;
}
