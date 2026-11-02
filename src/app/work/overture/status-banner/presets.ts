/* ==========================================================================
   presets.ts
   --------------------------------------------------------------------------
   The state-tab presets, ported from nr-symfony's Sandbox.tsx
   (STATE_PRESETS/DEFAULT_CONTROLS/depsKeyOf/clampLastResponse). Each one
   drops a posting's numbers into the prerequisites a specific v1 rule
   needs — e.g. "Underperforming · stalled" is rule 5's momentum-slowing
   branch — without hand-picking values that happen to satisfy it.

   Two "Underperforming" entries because that rule has two branches (no
   responses at all vs. responses that have gone quiet) and nothing else on
   screen distinguishes them.
   ========================================================================== */

import type { BannerKey, ReferralStats } from "./types";

export interface Controls {
  viewCount: number;
  responseCount: number;
  postedHoursAgo: number;
  lastResponseHoursAgo: number;
  ownerHasResponded: boolean;
  ownerMessageHoursAgo: number;
}

export interface StatePreset {
  key: BannerKey | "none";
  label: string;
  controls: Controls;
}

const HOUR = 3600e3;

export const STATE_PRESETS: StatePreset[] = [
  {
    key: "new",
    label: "New",
    controls: {
      viewCount: 34,
      responseCount: 0,
      postedHoursAgo: 2,
      lastResponseHoursAgo: 0,
      ownerHasResponded: false,
      ownerMessageHoursAgo: 1,
    },
  },
  {
    key: "competitive",
    label: "Competitive",
    controls: {
      viewCount: 86,
      responseCount: 2,
      postedHoursAgo: 30,
      lastResponseHoursAgo: 5,
      ownerHasResponded: false,
      ownerMessageHoursAgo: 1,
    },
  },
  {
    key: "trending",
    label: "Trending",
    controls: {
      viewCount: 412,
      responseCount: 7,
      postedHoursAgo: 20,
      lastResponseHoursAgo: 1,
      ownerHasResponded: false,
      ownerMessageHoursAgo: 1,
    },
  },
  {
    key: "reviewing",
    label: "Reviewing",
    controls: {
      viewCount: 230,
      responseCount: 5,
      postedHoursAgo: 26,
      lastResponseHoursAgo: 4,
      ownerHasResponded: true,
      ownerMessageHoursAgo: 1,
    },
  },
  {
    key: "underperforming",
    label: "Underperforming · no responses",
    controls: {
      viewCount: 58,
      responseCount: 0,
      postedHoursAgo: 120,
      lastResponseHoursAgo: 0,
      ownerHasResponded: false,
      ownerMessageHoursAgo: 1,
    },
  },
  {
    key: "underperforming",
    label: "Underperforming · stalled",
    controls: {
      viewCount: 143,
      responseCount: 3,
      postedHoursAgo: 96,
      lastResponseHoursAgo: 72,
      ownerHasResponded: false,
      ownerMessageHoursAgo: 1,
    },
  },
  {
    key: "none",
    label: "Dormant · no banner",
    controls: {
      viewCount: 77,
      responseCount: 4,
      postedHoursAgo: 216,
      lastResponseHoursAgo: 192,
      ownerHasResponded: false,
      ownerMessageHoursAgo: 1,
    },
  },
];

// "Busy but cooling": plenty of activity, no response in a while, owner
// silent. Posted age is past the 72h fresh cutoff on purpose — within that
// window v1's rule tree can only ever say "trending" once there are 3+
// responses, no matter how stale the last one is, so this is a case v1
// and an independent model read very differently. Not itself one of the
// named presets above (it predates them); the active-tab logic in
// StatusBannerDemo.tsx falls back to whichever preset shares its outcome.
export const DEFAULT_CONTROLS: Controls = {
  viewCount: 340,
  responseCount: 15,
  postedHoursAgo: 100,
  lastResponseHoursAgo: 60,
  ownerHasResponded: false,
  ownerMessageHoursAgo: 1,
};

// A response can't arrive before the posting existed.
export function clampLastResponse(c: Controls): number {
  return Math.min(c.lastResponseHoursAgo, c.postedHoursAgo);
}

// Collapses the inputs v1/v2 actually care about into one string, so
// useStreamedSummary only restarts when one of them really changes, and so
// a preset can be compared against the current controls to find the active
// tab.
export function depsKeyOf(c: Controls): string {
  return [
    c.viewCount,
    c.responseCount,
    c.postedHoursAgo,
    clampLastResponse(c),
    c.ownerHasResponded,
    c.ownerHasResponded ? c.ownerMessageHoursAgo : "-",
  ].join("|");
}

export function buildPosting(c: Controls, now: number): ReferralStats {
  const lastResponseHoursAgo = clampLastResponse(c);
  return {
    state: "open",
    isDirect: false,
    postedAt: new Date(now - c.postedHoursAgo * HOUR),
    viewCount: c.viewCount,
    responseCount: c.responseCount,
    lastResponseAt: c.responseCount > 0 ? new Date(now - lastResponseHoursAgo * HOUR) : null,
    ownerHasResponded: c.ownerHasResponded,
    lastOwnerMessageAt: c.ownerHasResponded ? new Date(now - c.ownerMessageHoursAgo * HOUR) : null,
  };
}
