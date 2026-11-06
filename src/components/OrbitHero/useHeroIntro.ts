import { useEffect, useState } from "react";

// Whether the hero's entrance should play on this mount. Currently always
// true once mounted — the once-per-session sessionStorage gate is on hold
// for now while the entrance itself is still being tuned, so it's easy to
// see on every reload. Starts false (no entrance) so static-exported
// markup never implies motion before this effect has even run.
export function useHeroIntroGate(): boolean {
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    // One-time flip to true post-mount, not a subscription — runs once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldPlay(true);
  }, []);

  return shouldPlay;
}
