"use client";

/* ==========================================================================
   StatusBannerContext.tsx
   --------------------------------------------------------------------------
   Shared state for the status-banner demo, split across two places in the
   case-study section: the state-preset tabs sit in the left (prose)
   column, the stats/AI-summary card sits in the right column. Both need
   the same selected posting, so a plain lifted-useState in one of the two
   components isn't enough — this Provider owns it and both read/write it
   through the context below.

   Also owns the one Turnstile <Script>/widget container for the whole
   section (StatusBannerTabs.tsx and StatusBannerDemo.tsx don't each need
   their own).
   ========================================================================== */

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Script from "next/script";
import { selectBanner } from "./StatusBanner";
import { useStreamedSummary, type StreamResult } from "./useStreamedSummary";
import { useTurnstileToken } from "./useTurnstileToken";
import { matter, viewerProfile, now } from "./mockData";
import { STATE_PRESETS, DEFAULT_CONTROLS, depsKeyOf, buildPosting, type Controls } from "./presets";
import type { BannerKey, ReferralStats, Viewer } from "./types";

export const viewer: Viewer = { isOwner: false, hasApplied: false, profile: viewerProfile };

interface StatusBannerContextValue {
  controls: Controls;
  selectPreset: (controls: Controls) => void;
  activeTab: number;
  posting: ReferralStats;
  key: BannerKey | null;
  isDefaultState: boolean;
  hasFired: boolean;
  stream: StreamResult;
  fire: () => void;
}

const StatusBannerContext = createContext<StatusBannerContextValue | null>(null);

export function useStatusBanner(): StatusBannerContextValue {
  const ctx = useContext(StatusBannerContext);
  if (!ctx) throw new Error("useStatusBanner must be used within a StatusBannerProvider");
  return ctx;
}

export function StatusBannerProvider({ children }: { children: ReactNode }) {
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);
  const [hasFired, setHasFired] = useState(false);
  // The getter itself polls for window.turnstile internally (see
  // useTurnstileToken.ts), so it's safe to wire in as soon as it exists —
  // no need to wait on the <Script> tag's own onReady first.
  const getTurnstileToken = useTurnstileToken("#sb-turnstile-widget");

  const posting = useMemo(() => buildPosting(controls, now), [controls]);
  const depsKey = depsKeyOf(controls);
  const isDefaultState = depsKey === depsKeyOf(DEFAULT_CONTROLS);

  const stream = useStreamedSummary(posting, viewer, matter, now, depsKey, {
    auto: false,
    getTurnstileToken,
  });

  function fire() {
    setHasFired(true);
    stream.regenerate();
  }

  // A tab click fires a real request for the posting it selects. The
  // request has to wait for that posting's values to actually land in
  // state first — regenerate() reads posting/matter/viewer off the
  // current render's closure, so firing synchronously inside the click
  // handler would send the previous tab's inputs instead of the new one.
  const fireOnNextDeps = useRef(false);

  useEffect(() => {
    if (!fireOnNextDeps.current) return;
    fireOnNextDeps.current = false;
    fire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  const chosen = selectBanner(posting, viewer, now);
  const key = chosen ? chosen.key : null;

  // Exactly one tab is active. An exact match on the current controls wins;
  // failing that (e.g. the initial "busy but cooling" default, which isn't
  // itself one of the named presets), whichever tab shares the outcome the
  // rules currently produce.
  let activeTab = -1;
  let byOutcome = -1;
  STATE_PRESETS.forEach((p, i) => {
    if (activeTab < 0 && depsKeyOf({ ...controls, ...p.controls }) === depsKey) activeTab = i;
    if (byOutcome < 0 && p.key === (key || "none")) byOutcome = i;
  });
  if (activeTab < 0) activeTab = byOutcome;

  function selectPreset(presetControls: Controls) {
    const next = { ...controls, ...presetControls };
    // Re-clicking the tab already selected leaves depsKey unchanged, so
    // the effect above would never run: fire directly instead.
    if (depsKeyOf(next) === depsKey) {
      fire();
      return;
    }
    setControls(next);
    fireOnNextDeps.current = true;
  }

  const value: StatusBannerContextValue = {
    controls,
    selectPreset,
    activeTab,
    posting,
    key,
    isDefaultState,
    hasFired,
    stream,
    fire,
  };

  return (
    <StatusBannerContext.Provider value={value}>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <div id="sb-turnstile-widget" className="sb-widget__turnstile" />
      {children}
    </StatusBannerContext.Provider>
  );
}
