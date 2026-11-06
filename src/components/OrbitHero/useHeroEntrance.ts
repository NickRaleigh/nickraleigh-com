import { useEffect, type RefObject } from "react";
import gsap from "gsap";

type HeroEntranceRefs = {
  readonly firstName: RefObject<HTMLElement | null>;
  readonly lastName: RefObject<HTMLElement | null>;
};

// The hero's one-shot entrance timeline — gated by useHeroIntroGate (play is
// false for reduced motion, which gets its own CSS-only fade instead, and
// false on repeat mounts within a session). Each piece of the sequence
// lands in its own commit; this timeline grows to match, all on one shared
// clock so later pieces can overlap earlier ones by position.
export function useHeroEntrance(play: boolean, refs: HeroEntranceRefs): void {
  useEffect(() => {
    if (!play) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(refs.firstName.current, {
          opacity: 0,
          y: 12,
          duration: 0.48,
          ease: "power2.out",
        })
        .from(
          refs.lastName.current,
          {
            opacity: 0,
            y: 12,
            duration: 0.48,
            ease: "power2.out",
          },
          0.12,
        );
    });

    return () => ctx.revert();
    // refs are stable RefObjects whose .current is read only once the
    // timeline is built; only `play` flipping should rebuild it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
}
