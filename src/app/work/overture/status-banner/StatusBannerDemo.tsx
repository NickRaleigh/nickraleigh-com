"use client";

/* ==========================================================================
   StatusBannerDemo.tsx
   --------------------------------------------------------------------------
   The right-column card: the streamed Claude summary for whichever posting
   StatusBannerTabs.tsx (left column) currently has selected — see
   StatusBannerContext.tsx for the shared state both read from.

   v1's rules-based banner used to render here too, for an explicit
   side-by-side comparison; dropped from the main UI since the case-study
   prose no longer frames this as a v1-vs-v2 contrast. It still shows up
   in one place: V2Slot below falls back to it when a real v2 call fails
   (rate limit, a rejected Turnstile token, a guardrail mismatch), on the
   theory that a wrong-but-safe rules-based message beats a bare error —
   selectBanner also drives the tab-matching in StatusBannerContext.tsx,
   and the real API runs it server-side as v2's guardrail regardless (see
   referral-signals-api's README).

   Every real summary is a billed model call (see referral-signals-api's
   README), and picking a different tab (StatusBannerContext.tsx) does
   fire one automatically — on request from whoever's reading this, aware
   that means a visitor clicking through every tab is several real calls,
   not one.
   ========================================================================== */

import { StatsRow } from "./StatsRow";
import { StatusBanner, selectBanner } from "./StatusBanner";
import { SummaryBanner } from "./SummaryBanner";
import type { useStreamedSummary } from "./useStreamedSummary";
import { useStatusBanner, viewer } from "./StatusBannerContext";
import { now, DEFAULT_V2_CACHE } from "./mockData";
import type { ReferralStats } from "./types";

function V2Slot({
  stream,
  posting,
}: {
  stream: ReturnType<typeof useStreamedSummary>;
  posting: ReferralStats;
}) {
  if (stream.state === "error") {
    const chosen = selectBanner(posting, viewer, now);
    if (!chosen) {
      return <SummaryBanner state="error" error={stream.error} />;
    }
    return (
      <div>
        <StatusBanner posting={posting} viewer={viewer} now={now} />
        <p className="v2-fallback-note">v2 unavailable right now, showing the rule-based summary instead.</p>
      </div>
    );
  }

  return (
    <SummaryBanner
      state={stream.state}
      activityText={stream.activityText}
      matterText={stream.matterText}
      error={stream.error}
    />
  );
}

export function StatusBannerDemo() {
  const { posting, isDefaultState, hasFired, stream, fire } = useStatusBanner();

  return (
    <div className="sb-widget">
      <div className="sb-widget__head">
        <span className="eyebrow">Live demo</span>
      </div>

      <div className="case__stage">
        <div className="sb">
          <StatsRow posting={posting} viewer={viewer} now={now} />

          <div className={"banner-version" + (hasFired && stream.stale ? " banner-version--stale" : "")}>
            {hasFired ? (
              <>
                <V2Slot stream={stream} posting={posting} />
                <div className="v2-actions">
                  <button type="button" onClick={fire} disabled={!stream.stale && stream.state !== "error"}>
                    Regenerate
                  </button>
                  <span className="v2-actions__note">
                    {stream.state === "error"
                      ? "That attempt failed or was rejected. Try again."
                      : stream.stale
                        ? "Inputs changed since this was generated."
                        : "Live result."}
                  </span>
                </div>
              </>
            ) : isDefaultState ? (
              <>
                <SummaryBanner
                  state="done"
                  activityText={DEFAULT_V2_CACHE.activityText}
                  matterText={DEFAULT_V2_CACHE.matterText}
                />
                <div className="v2-actions">
                  <button type="button" onClick={fire}>
                    Regenerate
                  </button>
                  <span className="v2-actions__note">Cached example. Regenerate for a live call.</span>
                </div>
              </>
            ) : (
              <>
                <div className="v2-idle">
                  Nothing requested yet. Each summary is a real model call, so this only asks when you do.
                </div>
                <div className="v2-actions">
                  <button type="button" onClick={fire}>
                    Generate
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
