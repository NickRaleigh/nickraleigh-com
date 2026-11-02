/* ==========================================================================
   StatusBanner.tsx
   --------------------------------------------------------------------------
   v1: the rules-based banner. Picks at most one message from the age and
   response activity of a posting. First match wins. Ported unchanged from
   nr-symfony's status-banner/StatusBanner.tsx, including its ordering and
   comparison operators — this is the decision tree the case study text
   describes as "only able to say what someone wrote a template for."

   Superseded by SummaryBanner.tsx (v2), which replaces this rule tree with
   a streamed Claude summary grounded in the same stats.
   ========================================================================== */

import { useMemo } from "react";
import { Beacon } from "./Beacon";
import { icons } from "./icons";
import * as h from "./helpers";
import type { BannerKey, ReferralStats, Viewer } from "./types";

/* ---- thresholds --------------------------------------------------------- */

export const THRESHOLDS = {
  // A response from the owner this recently means they're actively reading.
  ownerActiveHours: 48,

  // Below this age a posting is still "fresh".
  freshHours: 72,

  // Staleness window: both "no response in N hours" and the age floor for
  // the slowing-momentum branch.
  staleHours: 48,

  // Past this age no banner is shown at all.
  dormantDays: 7,

  // Response-count bands for the fresh states.
  competitiveMax: 2, // 1..2 responses
  trendingMin: 3, // 3+ responses
};

/* ---- copy ---------------------------------------------------------------- */

interface BannerCopy {
  title: string;
  description: string;
  icon: string;
}

const COPY: Record<BannerKey, BannerCopy> = {
  new: {
    title: "Just posted.",
    description: "Be the first to respond and 3x your chances of being selected.",
    icon: icons.sparkle,
  },
  competitive: {
    title: "A few replies are in.",
    description: "Jump in now to make the shortlist.",
    icon: icons.graph,
  },
  trending: {
    title: "This referral is getting attention.",
    description: "Respond now to stand out.",
    icon: icons.fire,
  },
  reviewing: {
    title: "The attorney is actively reviewing responses.",
    description: "Respond to this referral now.",
    icon: icons.glass,
  },
  underperforming: {
    title: "Now is the perfect time to respond.",
    description: "A strong reply should stand out immediately.",
    icon: icons.door,
  },
};

/* ---- rules ---------------------------------------------------------------- */

export interface SelectedBanner {
  key: BannerKey;
  copy: BannerCopy;
}

export function selectBanner(
  posting: ReferralStats | null | undefined,
  viewer: Viewer | null | undefined,
  now?: number,
): SelectedBanner | null {
  if (!posting) return null;

  // Outer gate: all four must hold. The banner speaks to a prospective
  // responder, so it is hidden from the owner, from anyone who has already
  // applied, and on direct postings.
  const visible =
    h.isOpenOrPending(posting) && !h.isDirect(posting) && !h.isOwner(viewer) && !h.hasApplied(viewer);

  if (!visible) return null;

  const responses = posting.responseCount || 0;
  const isFresh = h.isWithinHours(posting.postedAt, THRESHOLDS.freshHours, now);
  const ownerActive = h.isWithinHours(posting.lastOwnerMessageAt, THRESHOLDS.ownerActiveHours, now);

  // 1. Reviewing (highest urgency): the owner replied recently.
  if (posting.ownerHasResponded && ownerActive) {
    return { key: "reviewing", copy: COPY.reviewing };
  }

  // 2. New: still fresh, nobody has responded.
  if (isFresh && responses === 0) {
    return { key: "new", copy: COPY.new };
  }

  // 3. Competitive: still fresh, a couple of responses, owner silent.
  if (isFresh && responses > 0 && responses <= THRESHOLDS.competitiveMax && !posting.ownerHasResponded) {
    return { key: "competitive", copy: COPY.competitive };
  }

  // 4. Trending: still fresh, lots of responses, owner silent.
  if (isFresh && responses >= THRESHOLDS.trendingMin && !posting.ownerHasResponded) {
    return { key: "trending", copy: COPY.trending };
  }

  // 5. Underperforming. Two branches merged in the source, which is why the
  //    copy reads as "now is a good time" rather than "nobody responded":
  //      A) past the fresh window with no responses at all
  //      B) past the stale window with responses, but none of them recent
  if (h.isWithinDays(posting.postedAt, THRESHOLDS.dormantDays, now)) {
    const noResponsesAndAging = !isFresh && responses === 0;

    const momentumSlowing =
      !h.isWithinHours(posting.postedAt, THRESHOLDS.staleHours, now) &&
      responses >= 1 &&
      !h.isWithinHours(posting.lastResponseAt, THRESHOLDS.staleHours, now);

    if (noResponsesAndAging || momentumSlowing) {
      return { key: "underperforming", copy: COPY.underperforming };
    }
  }

  // Dormant / fallback: no banner.
  return null;
}

/* ---- component -------------------------------------------------------- */

interface StatusBannerProps {
  posting: ReferralStats | null | undefined;
  viewer?: Viewer;
  now?: number;
}

export function StatusBanner({ posting, viewer, now }: StatusBannerProps) {
  const banner = useMemo(() => selectBanner(posting, viewer, now), [posting, viewer, now]);

  if (!banner) return null;

  const copy = banner.copy;

  return (
    <div className={"sb__banner sb__banner--" + banner.key} role="status">
      <div className="sb__banner__icon">
        <Beacon color="var(--sb-beacon)" />
        <img className="sb__icon" alt="" src={copy.icon} />
      </div>
      <div className="sb__banner__text">
        <span>{copy.title}</span> {copy.description}
      </div>
    </div>
  );
}
