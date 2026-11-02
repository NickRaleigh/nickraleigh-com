"use client";

/* ==========================================================================
   StatusBannerTabs.tsx
   --------------------------------------------------------------------------
   The state-preset picker, living in the left (prose) column next to the
   case-study text rather than inside the demo card itself — see
   StatusBannerContext.tsx for the shared state both this and
   StatusBannerDemo.tsx (the card, in the right column) read from.

   Flat text + a left rule on the active one, the same idiom
   .profile-showcase__tab uses elsewhere on this site — not a pill/chip.
   ========================================================================== */

import { STATE_PRESETS } from "./presets";
import { useStatusBanner } from "./StatusBannerContext";

export function StatusBannerTabs() {
  const { activeTab, selectPreset } = useStatusBanner();

  return (
    <div className="sb-tabs" role="tablist">
      <span className="sb-tabs__label eyebrow">Pick a referral state</span>
      {STATE_PRESETS.map((p, i) => (
        <button
          key={p.label}
          type="button"
          role="tab"
          aria-selected={i === activeTab}
          className="sb-tabs__tab"
          onClick={() => selectPreset(p.controls)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
