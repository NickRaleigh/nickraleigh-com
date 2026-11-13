"use client";

import { useRef, type CSSProperties } from "react";
import { useMediaQuery } from "../OrbitHero/useMediaQuery";
import { useScrollProgress } from "./useScrollProgress";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Props = {
  readonly text: string;
  readonly className?: string;
};

// Renders text whose words brighten from muted grey to full white as the
// paragraph scrolls through the viewport. Word thresholds are static inline
// vars (--i/--total); only --progress on the container changes per frame,
// so CSS color-mix does the per-word interpolation instead of React re-rendering
// a word list on every scroll tick.
export function ScrollHighlight({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  useScrollProgress(ref, reducedMotion);

  const words = text.trim().split(/\s+/);

  return (
    <p
      ref={ref}
      className={className ? `scroll-highlight ${className}` : "scroll-highlight"}
      style={{ "--total": words.length - 1 } as CSSProperties}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="scroll-highlight__word"
          style={{ "--i": index } as CSSProperties}
        >
          {word}{index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
