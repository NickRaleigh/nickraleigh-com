import { useLayoutEffect, useState } from "react";

// Whether the hero's entrance should play on this mount. Currently always
// true once mounted — the once-per-session sessionStorage gate is on hold
// for now while the entrance itself is still being tuned, so it's easy to
// see on every reload. Starts false (no entrance) so static-exported
// markup never implies motion before this effect has even run — a
// useLayoutEffect, not useEffect, so it flips before the browser's first
// paint rather than after it. (useHeroEntrance's own hiding of the
// not-yet-animated elements is also a layout effect, for the same reason:
// if either link in this chain waited for a regular effect, the browser
// would paint the plain, fully-visible markup for a frame before anything
// gets hidden — a visible flash, backwards from the intended entrance.)
export function useHeroIntroGate(): boolean {
  const [shouldPlay, setShouldPlay] = useState(false);

  useLayoutEffect(() => {
    // One-time flip to true post-mount, not a subscription — runs once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldPlay(true);
  }, []);

  return shouldPlay;
}
