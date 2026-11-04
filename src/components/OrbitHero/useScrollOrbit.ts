import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

export type OrbitFrame = {
  readonly p: number;
  readonly t: number;
};

const T_STEP = 0.004;

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

// Drives the orbit animation from a single requestAnimationFrame loop rather
// than React state, since both p and t change on every frame while active —
// routing that through setState would re-render the whole tree at 60fps.
// Callers update the DOM imperatively from onFrame instead.
export function useScrollOrbit(
  pinRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  onFrame: (frame: OrbitFrame) => void,
): void {
  // Keeps onFrame current without putting it in the loop's effect deps
  // (which would restart the rAF loop on every render). Written in a
  // layout effect, not during render, per the rules of hooks.
  const onFrameRef = useRef(onFrame);
  useLayoutEffect(() => {
    onFrameRef.current = onFrame;
  });

  useEffect(() => {
    if (reducedMotion || typeof requestAnimationFrame !== "function") {
      onFrameRef.current({ p: 1, t: 0 });
      return;
    }

    let raf = 0;
    let t = 0;

    const tick = () => {
      t += T_STEP;

      const el = pinRef.current;
      let p = 1;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollable = rect.height - viewportHeight;
        // p=0 the instant the pin's top reaches the viewport top (sticky
        // engages); p=1 once its bottom reaches the viewport top (sticky
        // releases) — rect.top runs from 0 to -scrollable over that span.
        p = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
      }

      onFrameRef.current({ p, t });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, pinRef]);
}
