import { useLayoutEffect, type RefObject } from "react";
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
  // Layout effect, not a regular effect — see useHeroIntroGate's comment.
  // The hidden gsap.set() state below needs to land before the browser's
  // first paint, not after it.
  useLayoutEffect(() => {
    if (!play) {
      // No entrance this mount (reduced motion, or already played earlier
      // this session) — but firstName/lastName/intro/the infobar rules all
      // default to hidden in CSS specifically so the entrance has
      // something to reveal (see those rules' own comments). With no
      // entrance running, nothing else ever un-hides them, so they'd stay
      // invisible for the rest of the session. Land everything at its
      // normal resting state immediately instead.
      const ctx = gsap.context(() => {
        gsap.set([refs.firstName.current, refs.lastName.current], { opacity: 1, y: 0 });
        gsap.set(refs.intro.current, { opacity: 1, y: 0 });
        gsap.set([refs.topRule.current, refs.bottomRule.current], { scaleX: 1 });
        gsap.set(refs.chips.current.filter((el): el is HTMLImageElement => el !== null), {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
        });
      });
      return () => ctx.revert();
    }

    let timeline: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const chipEls = refs.chips.current.filter((el): el is HTMLImageElement => el !== null);
      const rules = [refs.topRule.current, refs.bottomRule.current];

      // Every target's hidden starting state, applied synchronously right
      // here — before the timeline below is even built, let alone played.
      // A .from() tween nested at a non-zero timeline position doesn't
      // reliably apply its starting values until the playhead reaches that
      // position (immediateRender can get overridden by the timeline's own
      // self-render pass), so anything after 0s would otherwise sit fully
      // visible in its plain CSS/DOM state and only *pop* to hidden once
      // its turn came. Setting the starting state explicitly up front and
      // animating everything *to* its resting state below sidesteps that
      // entirely: nothing is ever ambiguous about what it looks like before
      // its tween starts.
      gsap.set(refs.firstName.current, { opacity: 0, y: 12 });
      gsap.set(refs.lastName.current, { opacity: 0, y: 12 });
      gsap.set(refs.intro.current, { opacity: 0, y: 10 });
      gsap.set(rules, { scaleX: 0 });
      gsap.set(chipEls, {
        x: () => gsap.utils.random(28, 52),
        y: () => gsap.utils.random(-52, -28),
        rotate: () => (Math.random() < 0.5 ? -1 : 1) * gsap.utils.random(5, 12),
        scale: 0.72,
        filter: "blur(6px)",
      });

      timeline = gsap
        .timeline()
        .to(refs.firstName.current, {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease: "power2.out",
        })
        .to(
          refs.lastName.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            ease: "power2.out",
          },
          0.12,
        )
        // Byline/CTA/meta bar/doodle, as one group (the intro wrapper owns
        // none of its own opacity/transform otherwise, unlike the name
        // spans' parent — so this tween's inline styles are never fighting
        // a CSS-driven value, no cleanup needed after it finishes).
        .to(
          refs.intro.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          0.4,
        )
        // The infobar's rules, scaleX back to 1 with a left transform-origin
        // (set in CSS) so they draw left to right alongside the meta text.
        .to(
          rules,
          {
            scaleX: 1,
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
        .to(
          chipEls,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
            stagger: TILE_ENTRANCE_STAGGER,
          },
          TILE_ENTRANCE_START,
        );
    });

    // GSAP's default ticker runs on requestAnimationFrame, which browsers
    // throttle (often to a near-stop) for a backgrounded/hidden tab — a
    // visitor who switches away mid-entrance and comes back later would
    // otherwise find it frozen partway through (chips still scattered, name
    // still invisible) for however long it takes the ticker to catch up,
    // which can be a very long time. Jumping straight to the end the moment
    // the tab goes hidden means there's nothing left to catch up on: the
    // next time it's visible, the entrance has already resolved.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        timeline?.progress(1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ctx.revert();
    };
    // refs are stable RefObjects whose .current is read only once the
    // timeline is built; only `play` flipping should rebuild it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);
}
