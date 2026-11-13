import { useEffect, type RefObject } from "react";

// Where the element's top/bottom must sit in the viewport (as a fraction of
// viewport height, 0 = top of viewport) for progress to read 0 and 1.
const RANGE_START = 0.82;
const RANGE_END = 0.32;

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

// Writes --progress onto the element as scroll moves it through a fixed band
// of the viewport, so CSS (not React state) drives the per-word reveal.
// Imperative DOM write instead of setState — this fires on every scroll
// tick and re-rendering the word list at that rate would be wasteful.
export function useScrollProgress(ref: RefObject<HTMLElement | null>, disabled: boolean): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (disabled) {
      el.style.setProperty("--progress", "1");
      return;
    }

    let raf = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * RANGE_START;
      const end = viewportHeight * RANGE_END;
      const progress = clamp01((start - rect.top) / (start - end));
      el.style.setProperty("--progress", String(progress));
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, disabled]);
}
