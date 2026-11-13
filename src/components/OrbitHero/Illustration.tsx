"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

// Reduced-motion check lives here (not passed as a prop) so this component
// stays self-contained — OrbitHero renders it the same way in both its
// animated and static layouts, and only this file decides whether it idles.
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Pivots below are explicit points in this SVG's own viewBox/attribute
// coordinate system, passed via GSAP's `svgOrigin` (not `transformOrigin`,
// and not a percentage) — see https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/#svgOrigin.
//
// Both eyes (like the face) carry an Inkscape-authored rotate()/matrix()
// with no translate component, pivoting around the *document* origin
// rather than their own center. Two consequences:
//   1. Their raw cx/cy is NOT their rendered position — that transform
//      moves them first. The actual rendered position (what svgOrigin
//      needs to point at) was computed by applying each ellipse's own
//      rotate()/matrix() to its cx/cy — e.g. for the left eye,
//      rotate(24.16269) applied to (-215.51324, 201.39763) lands at
//      roughly (-279.07, 95.54). Re-run that if the drawing changes.
//   2. Their native getBBox() is wildly inflated by that same transform,
//      which is what made CSS `fill-box` percentages (and GSAP's
//      `transformOrigin`, which resolves the same way) land nowhere near
//      the visible shape in the first place — svgOrigin sidesteps that.
const HEAD_ORIGIN = "-270.5 128.3"; // roughly the neck
const LEFT_EYE_ORIGIN = "-279.07 95.54";
const RIGHT_EYE_ORIGIN = "-268.76 97.66";

export type IllustrationHandle = {
  // Plays one deterministic blink immediately — used for the hero entrance's
  // payoff beat, distinct from the randomized idle blinking below. A no-op
  // under reduced motion (the idle effect that defines the real blink never
  // runs, so this stays the default below).
  readonly playPayoffBlink: () => void;
};

// Hand-drawn figure beside the hero, idling via GSAP: a slow head turn plus
// occasional blinks.
export const Illustration = forwardRef<IllustrationHandle>(function Illustration(_props, ref) {
  const headRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const blinkRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    playPayoffBlink: () => blinkRef.current(),
  }));

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia(REDUCED_MOTION_QUERY).matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Head: a slow, easeable turn (not a raw sine sample), as if idly
      // glancing between the orbiting chips.
      gsap.fromTo(
        headRef.current,
        { rotate: -7, svgOrigin: HEAD_ORIGIN },
        {
          rotate: 7,
          svgOrigin: HEAD_ORIGIN,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );

      // Blink: a quick close-and-reopen. blinkRef exposes this directly (for
      // the entrance payoff); the idle loop below just calls the same
      // function on a randomized delay so it doesn't read as a metronome.
      const blink = () => {
        gsap
          .timeline()
          .to(
            leftEyeRef.current,
            {
              scaleY: 0.05,
              duration: 0.07,
              ease: "power1.in",
              svgOrigin: LEFT_EYE_ORIGIN,
            },
            0,
          )
          .to(
            rightEyeRef.current,
            {
              scaleY: 0.05,
              duration: 0.07,
              ease: "power1.in",
              svgOrigin: RIGHT_EYE_ORIGIN,
            },
            0,
          )
          .to(leftEyeRef.current, {
            scaleY: 1,
            duration: 0.07,
            ease: "power1.out",
            svgOrigin: LEFT_EYE_ORIGIN,
          })
          .to(
            rightEyeRef.current,
            {
              scaleY: 1,
              duration: 0.07,
              ease: "power1.out",
              svgOrigin: RIGHT_EYE_ORIGIN,
            },
            "<",
          );
      };
      blinkRef.current = blink;

      const scheduleIdleBlink = () => {
        gsap.delayedCall(gsap.utils.random(2, 6), () => {
          blink();
          scheduleIdleBlink();
        });
      };
      scheduleIdleBlink();
    });

    return () => {
      ctx.revert();
      blinkRef.current = () => {};
    };
  }, []);

  return (
    <svg
      className="illustration"
      // Trimmed tight to the feet at the bottom (y 83 to 173.21 — the
      // figure's own measured bbox bottom) so position: absolute; bottom:
      // 0 on the wrapper lands exactly at the feet, with no built-in gap
      // to compensate for. The top keeps ~3 units of headroom above the
      // hair.
      viewBox="-304 83 61 90.21"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <path
          style={{
            display: "inline",
            fill: "var(--color-surface)",
            fillOpacity: "1",
            stroke: "var(--color-text)",
            strokeWidth: "1.09128",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          d="m -277.82687,142.42707 c 0.35334,-4.63762 -4.10762,-15.85629 -4.37263,-16.01087 -0.26501,-0.15461 -4.88057,9.18693 -4.88057,9.18693 l -3.97511,-2.628 c 0,0 7.42022,-12.03577 8.59067,-12.78661 1.17045,-0.75087 9.58445,0 9.58445,0 0,0 8.85296,-1.93736 12.41334,3.49691 3.56039,5.43428 6.52738,9.68176 6.52738,9.68176 l -4.65349,1.1868 -5.93397,-9.68176 c 0,0 -2.96699,17.61455 -3.02946,18.17671 -0.0624,0.56217 -7.49555,1.12433 -7.77664,1.12433 -0.28108,0 -2.49397,-1.7462 -2.49397,-1.7462 z"
        />
        <path
          style={{
            fill: "var(--color-surface)",
            fillOpacity: "1",
            stroke: "var(--color-text)",
            strokeWidth: "0.410825",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          d="m -270.80432,126.21517 3.40423,-0.0937 c 0,0 0.12492,4.68473 -1.31172,4.77841 -1.43665,0.0937 -2.09251,-0.65586 -2.09251,-4.68472 z"
        />
      </g>
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "1.72268",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -272.54956,115.67919 c 0,0 1.10176,3.5936 1.01866,4.32041 -0.0405,0.35409 -0.85376,1.60405 -1.81431,1.77732 -1.97918,0.35702 -2.33795,-0.61387 -2.33795,-0.61387 0,0 0.51037,-5.17667 -0.0717,-5.56022 -0.5821,-0.3836 3.20531,0.0764 3.20531,0.0764 z"
      />
      <g
        ref={headRef}
        className="illustration__head"
        style={{ display: "inline" }}
      >
        <ellipse
          style={{
            fill: "var(--color-surface)",
            stroke: "var(--color-text)",
            strokeWidth: "1.54346",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
            fillOpacity: "1",
          }}
          cx="-270.4888"
          cy="115.55321"
          rx="15.501679"
          ry="12.736341"
          transform="rotate(2.7072434)"
        />
        <ellipse
          ref={leftEyeRef}
          className="illustration__eye"
          style={{
            fill: "none",
            stroke: "var(--color-text)",
            strokeWidth: "1.85699",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          cx="-215.51324"
          cy="201.39763"
          rx="0.65375745"
          ry="1.3402028"
          transform="rotate(24.16269)"
        />
        <ellipse
          ref={rightEyeRef}
          className="illustration__eye"
          style={{
            fill: "none",
            stroke: "var(--color-text)",
            strokeWidth: "1.74279",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          cx="-219.47221"
          cy="215.26488"
          rx="0.5778991"
          ry="1.3353759"
          transform="matrix(0.88073481,0.47360976,-0.35054274,0.93654673,0,0)"
        />
        <path
          style={{
            fill: "none",
            stroke: "var(--color-text)",
            strokeWidth: "1.85699",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          d="m -278.12617,105.84172 -3.97561,-4.29917 c 0,0 7.07285,-1.71042 7.72003,-1.52551"
        />
        <g
          transform="matrix(0.31474487,0,0,0.31474487,-209.57061,45.51466)"
          style={{ stroke: "var(--color-text)", strokeOpacity: "1" }}
        >
          <path
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "5.9",
              strokeLinejoin: "round",
              strokeDasharray: "none",
              strokeOpacity: "1",
            }}
            d="m -251.15342,160.82632 c -1.4924,-2.30937 -1.4567,-5.12982 -2.1293,-7.64295 -1.1785,-2.12287 0.8345,-3.7902 2.8405,-2.88619 2.1444,-0.11319 2.6773,2.19048 3.8665,3.2244 2.727,-0.0522 2.1578,-3.31778 1.9136,-5.12814 -0.7568,-1.95931 -1.9605,-4.31964 -0.4958,-6.24513 0.2781,-2.1076 2.4423,-3.06998 3.9503,-1.4154 1.9336,0.84815 2.836,2.84159 3.8703,4.54236 0.2786,0.76817 1.5216,4.15032 1.6408,1.81881 0.434,-2.0674 2.2292,-3.80376 1.0768,-6.0683 0.4492,-2.06657 1.6871,-4.70107 3.6568,-5.51438 2.9351,0.0116 4.424,2.88488 6.2469,4.70949 -0.3291,2.60863 3.6505,2.18572 3.3114,-0.28203 1.3031,-1.79598 2.2518,-3.75322 3.2187,-5.68458 1.3146,-1.75573 3.2434,-0.54816 3.4725,1.28157 0.8884,1.7494 1.5065,3.3616 1.7471,5.3157"
          />
          <path
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "5.9",
              strokeLinejoin: "round",
              strokeDasharray: "none",
              strokeOpacity: "1",
            }}
            d="m -204.59462,131.01103 c -1.027,1.62727 -0.8538,3.72022 -1.6156,5.43432 -0.5348,1.20328 -0.069,-0.8218 -0.5875,0.73436 -0.1276,0.383 -0.1958,0.78333 -0.2937,1.17499 -0.056,0.22523 0.073,0.51456 0,0.73437 -0.1688,0.5063 -0.1469,0.1088 -0.1469,0.44062"
          />
          <path
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "5.9",
              strokeLinejoin: "round",
              strokeDasharray: "none",
              strokeOpacity: "1",
            }}
            d="m -197.83832,132.33289 c -0.9779,1.85741 -1.6775,3.93503 -1.9094,6.02181 -0.022,0.19463 0.048,0.39751 0,0.58749 -0.1312,0.52477 -0.7343,0.92308 -0.7343,1.46873"
          />
          <path
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "5.9",
              strokeLinejoin: "round",
              strokeDasharray: "none",
              strokeOpacity: "1",
            }}
            d="m -189.31972,135.27036 c -1.7796,3.38117 -1.0827,2.88933 -4.5531,5.43431 -0.3888,0.28515 -0.9207,0.32003 -1.3219,0.5875 -0.3456,0.23043 -0.6108,0.56583 -0.8812,0.88124 -0.1679,0.19583 0.2168,0.14687 -0.1469,0.14687"
          />
          <path
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "5.9",
              strokeLinejoin: "round",
              strokeDasharray: "none",
              strokeOpacity: "1",
            }}
            d="m -180.80112,137.76721 c -1.8886,1.80139 -3.5836,4.00466 -5.728,5.43431 -0.5333,0.35551 -0.9953,0.55462 -1.4688,1.02811"
          />
          <path
            style={{
              fill: "none",
              stroke: "var(--color-text)",
              strokeWidth: "5.9",
              strokeLinejoin: "round",
              strokeDasharray: "none",
              strokeOpacity: "1",
            }}
            d="m -181.24172,148.48896 c 1.834,-2.67691 5.299,-3.35118 7.499,-5.61981 0.303,-2.45733 3.3393,-1.7849 4.3759,-0.29473 1.5776,0.39068 4.1891,1.14554 3.0369,3.29163 -0.3938,2.18362 -2.4159,3.3896 -3.4116,5.17135 -0.6439,1.0906 0.3447,2.1045 1.2122,0.93712 1.6842,-1.09559 3.7695,-1.16857 5.715,-1.15994 1.3353,-0.86014 4.3742,-1.48279 3.4184,1.08165 -0.024,1.96499 -0.1085,4.03552 -1.1763,5.75299 -0.3686,1.07256 -1.7087,3.14862 -0.6077,3.82207 1.9149,-0.86006 3.585,-2.15731 5.4318,-3.14207 1.7985,0.40792 1.2199,2.64038 0.8934,3.93873 -0.2264,1.83513 -2.0706,2.75376 -3.4429,3.70136 -1.5738,1.05828 -3.081,2.21953 -4.5853,3.37564"
          />
        </g>
        <path
          style={{
            fill: "none",
            stroke: "var(--color-text)",
            strokeWidth: "1.85699",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          d="m -290.1916,97.035358 c 0,0 -3.3284,-1.825989 -3.95247,1.363717 -0.62408,3.189705 3.13489,5.415885 3.13489,5.415885"
        />
        <path
          style={{
            fill: "none",
            stroke: "var(--color-text)",
            strokeWidth: "1.85699",
            strokeLinejoin: "round",
            strokeDasharray: "none",
            strokeOpacity: "1",
          }}
          d="m -260.14407,101.15247 c 0,0 4.00292,-0.4194 4.17748,0.0671 0.17456,0.48647 1.77976,3.72348 -4.71869,4.9988"
        />
      </g>
      <path
        style={{
          display: "inline",
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.836109",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -273.52706,141.60041 c 0.88336,0.0883 10.43567,-1.79882 11.68093,0.68521 0.92795,1.85106 -3.83456,22.11502 -4.1879,22.2917 -0.35334,0.17666 -2.51757,0.44167 -2.51757,0.44167 0,0 1.80312,-18.98417 1.1406,-19.42585 -0.66252,-0.44167 -6.26438,-0.49628 -6.26438,-0.49628 l -6.01132,0.25249 c 0,0 0.53478,19.84631 0.40228,20.11132 -0.1325,0.26502 -2.07589,0.39752 -2.07589,0.39752 0,0 -5.50923,-22.58988 -3.47898,-24.04828 1.33936,-0.9621 8.28493,-0.51221 11.31223,-0.2095 z"
      />
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.495882",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -288.0441,135.58461 -2.37359,-2.18619 c 0,0 -3.43546,9.05711 -4.55979,9.2445 -1.12434,0.1874 -6.55862,0.87446 -5.24689,1.56158 1.31171,0.68709 4.93457,0.31231 4.93457,0.31231 0,0 0.40042,2.08036 1.31172,1.74897 1.37418,-0.4997 3.24807,-4.68472 3.24807,-4.68472 z"
      />
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.495881",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -268.37419,166.8589 c 3.23457,0.24137 8.38109,1.55664 7.55969,3.56038 -0.8214,2.00377 -8.70061,0.40557 -8.87057,-0.6143 -0.16996,-1.01989 1.31088,-2.94608 1.31088,-2.94608 z"
      />
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.495882",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -268.30743,166.7846 0.11016,-1.89903 c 0,0 1.32489,-0.52295 1.87161,-0.16745 0.54671,0.3555 -0.10412,2.91647 -0.10412,2.91647 0,0 -0.57654,0.2603 -1.23291,0.0808 -0.65636,-0.1795 -0.64474,-0.93079 -0.64474,-0.93079 z"
      />
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.495882",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -258.08379,134.63143 5.21182,10.2028 c 0,0 1.59134,2.00901 2.07719,1.8765 0.48585,-0.13252 2.44049,-0.0692 0.61705,-1.39064 -0.5459,-0.39564 2.90491,-0.32211 3.47909,-0.32211 0.57419,0 0.38404,-1.21177 -2.13353,-1.38843 -2.51757,-0.17668 -2.89143,-0.67455 -3.11228,-0.89538 -0.22084,-0.22084 -2.82675,-9.31945 -2.82675,-9.31945 z"
      />
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.495881",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -279.7053,165.66051 c 0,0 0.5934,1.2805 0.18739,1.43665 -0.40601,0.15617 -1.71773,0.40601 -1.71773,0.15617 0,-0.24985 0,-1.71774 0,-1.71774 z"
      />
      <path
        style={{
          fill: "var(--color-surface)",
          fillOpacity: "1",
          stroke: "var(--color-text)",
          strokeWidth: "0.614574",
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        d="m -279.23259,167.15471 c 0.48876,2.35091 -0.65127,6.67219 -4.90931,5.56514 -3.28823,-0.85492 1.88182,-6.81937 3.04659,-5.95569 0.60818,0.45096 1.60252,-0.4756 1.86272,0.39049 z"
      />
    </svg>
  );
});
