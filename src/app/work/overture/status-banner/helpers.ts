/* ==========================================================================
   helpers.ts
   --------------------------------------------------------------------------
   Pure functions, ported from nr-symfony's status-banner/helpers.ts. No
   store, no fetching, no React.
   ========================================================================== */

import type { DateLike, ReferralStats, Viewer } from "./types";

const MINUTE = 60e3;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Accepts a Date, an ISO string, or an epoch number. Returns NaN for
// anything unusable, including the empty strings the source API used for
// "never happened".
export function toTime(value: DateLike): number {
  if (value === null || value === undefined || value === "") return NaN;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  return new Date(value).getTime();
}

export function isWithinHours(value: DateLike, hours: number, now?: number): boolean {
  const t = toTime(value);
  if (!isFinite(t)) return false;
  return t > (now === undefined ? Date.now() : now) - hours * HOUR;
}

export function isWithinDays(value: DateLike, days: number, now?: number): boolean {
  return isWithinHours(value, days * 24, now);
}

// Mirrors moment's `fromNow()` thresholds closely enough for this UI.
export function fromNow(value: DateLike, now?: number): string {
  const t = toTime(value);
  if (!isFinite(t)) return "";

  const ref = now === undefined ? Date.now() : now;
  const diff = ref - t;
  const future = diff < 0;
  const ms = Math.abs(diff);

  let text: string;
  if (ms < 45e3) text = "a few seconds";
  else if (ms < 90e3) text = "a minute";
  else if (ms < 45 * MINUTE) text = Math.round(ms / MINUTE) + " minutes";
  else if (ms < 90 * MINUTE) text = "an hour";
  else if (ms < 22 * HOUR) text = Math.round(ms / HOUR) + " hours";
  else if (ms < 36 * HOUR) text = "a day";
  else if (ms < 26 * DAY) text = Math.round(ms / DAY) + " days";
  else if (ms < 46 * DAY) text = "a month";
  else if (ms < 320 * DAY) text = Math.round(ms / (30 * DAY)) + " months";
  else if (ms < 548 * DAY) text = "a year";
  else text = Math.round(ms / (365 * DAY)) + " years";

  return future ? "in " + text : text + " ago";
}

// Stands in for moment's `lll` format, e.g. "Oct 16, 2026 3:04 PM".
export function formatDate(value: DateLike): string {
  const t = toTime(value);
  if (!isFinite(t)) return "";
  return new Date(t).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ---- visibility gating --------------------------------------------------
   NOTE: ported faithfully from the source, bug included. The trailing
   `|| state !== "signed"` makes the whole expression true for every state
   except "signed", so the earlier two checks never matter. Kept as-is so
   this stays a byte-for-byte port of the v1 rule tree the case study text
   is actually describing; see isOpenOrPendingStrict for the intended
   version.
   -------------------------------------------------------------------------- */

export function isOpenOrPending(posting: ReferralStats | null | undefined): boolean {
  if (!posting) return false;
  const state = String(posting.state || "").toLowerCase();
  return state === "open" || state === "pending" || state !== "signed";
}

export function isOpenOrPendingStrict(posting: ReferralStats | null | undefined): boolean {
  if (!posting) return false;
  const state = String(posting.state || "").toLowerCase();
  return state === "open" || state === "pending";
}

export function isDirect(posting: ReferralStats | null | undefined): boolean {
  return Boolean(posting && posting.isDirect);
}

export function isOwner(viewer: Viewer | null | undefined): boolean {
  return Boolean(viewer && viewer.isOwner);
}

export function hasApplied(viewer: Viewer | null | undefined): boolean {
  return Boolean(viewer && viewer.hasApplied);
}

// Replaces the shared `plurify` utility, reduced to the one form used here.
export function plurify(word: string, quantity: number): string {
  return word + (quantity === 1 ? "" : "s");
}
