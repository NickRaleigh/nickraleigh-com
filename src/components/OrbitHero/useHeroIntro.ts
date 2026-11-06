import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "nr-hero-intro-played";

// Whether the hero's entrance should play on this mount: false once it's
// already played earlier in the same session (repeat visits, back/forward
// nav), so the entrance is a once-per-session thing rather than replaying
// on every page view. Starts false (no entrance) so static-exported markup
// never implies motion before JS has had a chance to check sessionStorage.
export function useHeroIntroGate(): boolean {
  const [shouldPlay, setShouldPlay] = useState(false);
  const decided = useRef(false);

  useEffect(() => {
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
