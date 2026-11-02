/* ==========================================================================
   SummaryBanner.tsx
   --------------------------------------------------------------------------
   v2: renders a streamed Claude summary grounded in the same stats
   StatusBanner.tsx (v1) reads, in place of its rule tree. Presentational
   only — it doesn't fetch, stream, or decide anything; useStreamedSummary.ts
   feeds `state`, `activityText`, and `matterText` in. Ported from
   nr-symfony's status-banner/SummaryBanner.tsx.
   ========================================================================== */

import { Beacon } from "./Beacon";
import type { BannerState } from "./types";

interface SummaryBannerProps {
  state: BannerState;
  activityText?: string;
  matterText?: string;
  error?: string; // shown when state === "error"
}

export function SummaryBanner({ state, activityText, matterText, error }: SummaryBannerProps) {
  if (state === "loading") {
    return (
      <div className="sb__banner sb__banner--loading" role="status">
        <div className="sb__banner__icon">
          <Beacon color="var(--sb-beacon)" />
        </div>
        <div className="sb__banner__text sb__banner__text--loading">
          <span className="sb__skeleton" aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="sb__banner sb__banner--error" role="status">
        <div className="sb__banner__text">{error || "Couldn't generate a summary."}</div>
      </div>
    );
  }

  const matterStarted = Boolean(matterText);
  const activityTyping = state === "streaming" && !matterStarted;
  const matterTyping = state === "streaming" && matterStarted;

  return (
    <div className={"sb__banner sb__banner--summary sb__banner--" + state} role="status">
      <div className="sb__banner__icon">
        <Beacon color="var(--sb-beacon)" />
      </div>
      <div className="sb__banner__text">
        <span className={activityTyping ? "sb__banner__caret" : ""}>{activityText}</span>
        {matterStarted && (
          <div className={"sb__banner__text__matter" + (matterTyping ? " sb__banner__caret" : "")}>
            {matterText}
          </div>
        )}
      </div>
    </div>
  );
}
