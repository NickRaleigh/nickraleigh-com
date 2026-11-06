import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { TILE_ENTRANCE_START, TILE_ENTRANCE_STAGGER } from "./chipLayout";
import type { IllustrationHandle } from "./Illustration";

type HeroEntranceRefs = {
  readonly firstName: RefObject<HTMLElement | null>;
  readonly lastName: RefObject<HTMLElement | null>;
  readonly intro: RefObject<HTMLElement | null>;
  readonly topRule: RefObject<HTMLElement | null>;
  readonly bottomRule: RefObject<HTMLElement | null>;
  readonly illustration: RefObject<IllustrationHandle | null>;
  readonly chips: RefObject<(HTMLImageElement | null)[]>;
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
      const chipEls = refs.chips.current.filter((el): el is HTMLImageElement => el !== null);

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
        )
        // Byline/CTA/meta bar/doodle, as one group (the intro wrapper owns
        // none of its own opacity/transform otherwise, unlike the name
        // spans' parent — so this tween's inline styles are never fighting
        // a CSS-driven value, no cleanup needed after it finishes).
        .from(
          refs.intro.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "power2.out",
          },
          0.4,
        )
        // The infobar's rules, scaleX from 0 with a left transform-origin
        // (set in CSS) so they draw left to right alongside the meta text.
        .from(
          [refs.topRule.current, refs.bottomRule.current],
          {
            scaleX: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.4,
        )
        // Payoff: one deterministic blink once the entrance has settled,
        // distinct from the doodle's own randomized idle blinking.
        .call(() => refs.illustration.current?.playPayoffBlink(), [], 1.8)
        // Chips: this owns only transform/filter — left/top/width/height/
        // opacity are already being written every frame by the orbit rAF
        // loop (useScrollOrbit) from the instant the component mounts, so
        // this can't touch those without the two fighting over the same
        // inline styles. (The matching opacity fade-in is a multiplier
        // baked into that loop's own output instead — see chipLayout's
        // computeEntranceOpacity, which reads the same
        // TILE_ENTRANCE_START/STAGGER constants as this tween so the two
        // stay in sync.) Once this finishes, transform/filter are left at
        // their resolved identity values and the element is purely under
        // the orbit loop's control.
        .from(
          chipEls,
          {
            x: () => gsap.utils.random(28, 52),
            y: () => gsap.utils.random(-52, -28),
            rotate: () => (Math.random() < 0.5 ? -1 : 1) * gsap.utils.random(5, 12),
            scale: 0.72,
            filter: "blur(6px)",
            duration: 0.5,
            ease: "power2.out",
            stagger: TILE_ENTRANCE_STAGGER,
          },
          TILE_ENTRANCE_START,
        );
    });

    return () => ctx.revert();
    // refs are stable RefObjects whose .current is read only once the
    // timeline is built; only `play` flipping should rebuild it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
}
