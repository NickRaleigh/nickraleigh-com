import { useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "nr-hero-intro-played";

// Whether the hero's entrance should play on this mount: false once it's
// already played earlier in the same session (repeat visits, back/forward
// nav), so the entrance is a once-per-session thing rather than replaying
// on every page view. Starts false (no entrance) so static-exported markup
// never implies motion before this effect has even run — a useLayoutEffect,
// not useEffect, so it flips before the browser's first paint rather than
// after it. (useHeroEntrance's own hiding of the not-yet-animated elements
// is also a layout effect, for the same reason: if either link in this
// chain waited for a regular effect, the browser would paint the plain,
// fully-visible markup for a frame before anything gets hidden — a visible
// flash, backwards from the intended entrance.)
export function useHeroIntroGate(): boolean {
  const [shouldPlay, setShouldPlay] = useState(false);
  const decided = useRef(false);

  useLayoutEffect(() => {
    if (decided.current) return;
    decided.current = true;

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
      if (!alreadyPlayed) sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (private browsing, disabled storage) —
      // fall back to treating every mount as a fresh session.
    }
    setShouldPlay(!alreadyPlayed);
  }, []);

  return shouldPlay;
}
