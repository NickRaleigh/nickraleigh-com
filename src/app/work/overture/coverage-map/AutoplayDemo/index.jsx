"use client";

import React, { useEffect, useRef, useState } from "react";
import CoverageMapDemo from "../index";

const TABLET_QUERY = "(max-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// The two variants have different interaction models:
// - "full" mounts immediately in its static finished state (like the
//   original shipped component) and shows an always-visible button the
//   visitor can click to play or replay the entrance on demand. "Reset
//   demo" (inside CoverageMap's own DemoControls) brings that button back
//   too, since resetting the network is also resetting back to "nothing's
//   happened yet".
// - "minimal" (the hero) mounts immediately too — it's always above the
//   fold, so there's nothing to gain by waiting for it to scroll into view,
//   and doing so left the hero empty for anything that reads the page
//   without scrolling (a quick scroll, a full-page capture).
// Both play and reset remount the whole tree (key bump) to force a clean
// slate: a fresh store (see index.jsx's CoverageMapDemo) and a clean DOM
// for the CSS keyframes to replay from, which toggling a class alone
// doesn't reliably give on elements that never left the DOM.
const AutoplayDemo = ({ variant = "full", staggerOnMobile = false }) => {
  const isFull = variant === "full";
  const hostRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const [mountKey, setMountKey] = useState(0);
  const [played, setPlayed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    const mobileQuery = window.matchMedia(TABLET_QUERY);
    setIsMobile(mobileQuery.matches);
    const onMobileChange = (e) => setIsMobile(e.matches);
    mobileQuery.addEventListener("change", onMobileChange);
    return () => mobileQuery.removeEventListener("change", onMobileChange);
  }, []);

  const disableAnimation = reducedMotionRef.current
    ? true
    : isFull
    ? !played // static until the visitor presses play, same as the original
    : isMobile && !staggerOnMobile;

  const play = () => {
    setPlayed(true);
    setMountKey((k) => k + 1);
  };

  const reset = () => {
    setPlayed(false);
    setMountKey((k) => k + 1);
  };

  const showPlayTrigger = isFull && !reducedMotionRef.current && !isMobile && !played;

  return (
    <div ref={hostRef} className={`coverage-map-autoplay coverage-map-autoplay--${variant}`}>
      <CoverageMapDemo
        key={mountKey}
        variant={variant}
        disableAnimation={disableAnimation}
        showPlayTrigger={showPlayTrigger}
        onPlay={play}
        onReset={reset}
      />
    </div>
  );
};

export default AutoplayDemo;
