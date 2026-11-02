/* ==========================================================================
   mockData.ts
   --------------------------------------------------------------------------
   The fixed cast for this widget, fictional end to end: no Overture
   postings, matters, or attorneys. The posting itself is built from
   selectable presets (presets.ts) instead of living here — this file just
   holds what stays constant across every preset: the matter and viewer v2
   grounds its summary in, the shared reference time, and the cached
   default v2 result shown before any real call has been made.
   ========================================================================== */

import type { Matter, ViewerProfile } from "./types";

// Fixed, not Date.now(): this module evaluates once in the server render
// and again in the client bundle at hydration, at two different real
// moments. A live timestamp here made postedAt/lastResponseAt (and every
// relative-time string derived from them) disagree between the two,
// which React reports as a hydration mismatch. Picking a fixed instant
// keeps the whole demo deterministic — same story on both environments,
// forever, at the cost of a display age ("4 days ago") that slowly grows
// stale as real time moves past this constant.
const NOW = Date.parse("2026-11-02T12:00:00Z");

export const matter: Matter = {
  id: "auto-rear-end",
  practiceArea: "Auto accident",
  state: "California",
  description: "a rear-end collision on the freeway during evening traffic.",
  feeSplit: "30/70",
};

// Overlaps the matter above (Auto accident) on purpose, so the model's fit
// sentence has something to say immediately.
export const viewerProfile: ViewerProfile = {
  id: "whitfield",
  name: "Dana Whitfield",
  practiceAreas: ["Auto accident", "Premises liability"],
  pastCaseTypes: ["rear-end collisions", "slip and fall cases", "dog bite claims"],
};

export const now = NOW;

// A real v2 result for the posting/matter/viewer above, generated once
// against the live API and checked against the same guardrails the server
// runs, then pasted in here. Without this, a page load shows an empty
// "Nothing requested yet" box, hiding what the card is for behind a click.
// Shown only until the visitor asks for a live call (Regenerate).
export const DEFAULT_V2_CACHE = {
  category: "underperforming",
  activityText: "Initial interest has faded without any engagement from the owner.",
  matterText:
    "This rear-end collision matches your auto accident practice and reads like cases you've handled before.",
};
