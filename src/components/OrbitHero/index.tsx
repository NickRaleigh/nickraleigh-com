"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { HomepageContent, Mosaic } from "@/app/types";
import { toLowerHyphenCase } from "@/utils/helpers";
import { Card } from "@/components/Mosaic/Card";
import {
  buildChips,
  computeChipFrame,
  computeEntranceOpacity,
  computeIntroOpacity,
  computeLabelOpacity,
  computeLabelPointerEvents,
  computeNameLift,
  type StageMetrics,
} from "./chipLayout";
import { HandDrawnButtonOutline } from "./HandDrawnButtonOutline";
import { Illustration, type IllustrationHandle } from "./Illustration";
import { useHeroEntrance } from "./useHeroEntrance";
import { useHeroIntroGate } from "./useHeroIntro";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollOrbit } from "./useScrollOrbit";

function ProjectText({ project }: { readonly project: Mosaic }) {
  return (
    <>
      <span className="orbit-hero__project-title">{project.title}</span>
      <span className="orbit-hero__project-stat">
        <span className="orbit-hero__project-stat-value">
          {project.stat.title.map((g) => g)}
        </span>
        <span className="orbit-hero__project-stat-label">
          {project.stat.description}
        </span>
      </span>
      <span className="orbit-hero__project-cta">
        Read the case study{" "}
        <span className="orbit-hero__project-arrow">&rsaquo;</span>
      </span>
    </>
  );
}

type ItalicProps = {
  readonly text: string;
  readonly lettersIndex: readonly number[];
};

function ItalicName({ text, lettersIndex }: ItalicProps) {
  return Array.from(text).map((char, index) =>
    lettersIndex.includes(index) ? (
      <em key={`letter-${char}-${index}`}>{char}</em>
    ) : (
      char
    ),
  );
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const STACK_QUERY = "(max-width: 920px)";

// Slower than the browser's native smooth scroll (and driven frame-by-frame
// with behavior:"instant" so the page's CSS scroll-behavior:smooth doesn't
// layer its own easing on top) so the orbit's scroll-tied settle animation
// — see useScrollOrbit's p — is actually visible as the page scrolls past it,
// instead of being rushed through.
const SEE_WORK_SCROLL_MS = 1600;

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
}

function animateScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (delta === 0) return;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo({ top: startY + delta * easeInOutQuad(progress), behavior: "instant" });
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

type OrbitHeroProps = {
  readonly hero: HomepageContent["hero"];
  readonly mosaics: readonly [Mosaic, Mosaic];
};

export function OrbitHero({ hero, mosaics }: OrbitHeroProps) {
  const [overture, westwoodLaw] = mosaics;

  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLImageElement | null)[]>([]);
  const staticWorkRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const topRuleRef = useRef<HTMLSpanElement>(null);
  const bottomRuleRef = useRef<HTMLSpanElement>(null);
  const illustrationRef = useRef<IllustrationHandle>(null);
  // Set in an effect (declared before useScrollOrbit below, so it commits
  // first) rather than during render, since reading the clock is an impure
  // call — the chip entrance fade further down measures real elapsed time
  // against this, not scroll progress. Null for the brief window before
  // this effect runs just means that fade treats elapsed time as zero.
  const introStartRef = useRef<number | null>(null);
  useEffect(() => {
    introStartRef.current = performance.now();
  }, []);

  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const stacked = useMediaQuery(STACK_QUERY);
  const playIntro = useHeroIntroGate();

  useHeroEntrance(playIntro && !reducedMotion, {
    firstName: firstNameRef,
    lastName: lastNameRef,
    intro: introRef,
    topRule: topRuleRef,
    bottomRule: bottomRuleRef,
    illustration: illustrationRef,
    chips: chipRefs,
  });
  const [metrics, setMetrics] = useState<StageMetrics>({ width: 0, height: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setMetrics({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chips = useMemo(() => buildChips(overture, westwoodLaw), [overture, westwoodLaw]);

  // The reduced-motion layout has the project cards sitting in normal flow
  // right below, so that target just scrolls into view. The animated stage
  // instead pins/sticks for 280vh — p=1 (chips fully settled into the
  // project grid, see chipLayout's computeLabelOpacity) lands exactly when
  // the pin's own bottom edge reaches the viewport's bottom edge, which is
  // what scrollIntoView's block:"end" aligns to.
  const scrollToWork = () => {
    if (reducedMotion) {
      staticWorkRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    const pin = pinRef.current;
    if (!pin) return;
    // Same target as scrollIntoView(block:"end"): align the pin's bottom
    // edge with the viewport's bottom edge.
    const targetY = window.scrollY + pin.getBoundingClientRect().bottom - window.innerHeight;
    animateScrollTo(targetY, SEE_WORK_SCROLL_MS);
  };

  useScrollOrbit(pinRef, reducedMotion, ({ p, t }) => {
    const stage = stageRef.current;
    if (stage) {
      stage.style.setProperty("--lift", String(computeNameLift(p)));
      stage.style.setProperty("--label-opacity", String(computeLabelOpacity(p)));
      stage.style.setProperty("--label-pointer-events", computeLabelPointerEvents(p));
      stage.style.setProperty("--intro-opacity", String(computeIntroOpacity(p)));
    }

    if (!metrics.width || !metrics.height) return;

    const elapsedSeconds =
      introStartRef.current === null ? 0 : (performance.now() - introStartRef.current) / 1000;

    for (const chip of chips) {
      const el = chipRefs.current[chip.index];
      if (!el) continue;
      const frame = computeChipFrame(chip, p, t, metrics, stacked);
      const entranceOpacity = computeEntranceOpacity(chip, elapsedSeconds, playIntro && !reducedMotion);
      el.style.left = `${frame.left}px`;
      el.style.top = `${frame.top}px`;
      el.style.width = `${frame.width}px`;
      el.style.height = `${frame.height}px`;
      el.style.opacity = String(frame.opacity * entranceOpacity);
      el.style.zIndex = String(frame.zIndex);
    }
  });

  const projects: readonly [Mosaic, 0 | 1][] = [
    [overture, 0],
    [westwoodLaw, 1],
  ];

  const nameHeading = (
    <h1 className="hero__name orbit-hero__name">
      <span className="sr-only">{hero.firstName}</span>
      <span ref={firstNameRef} aria-hidden="true">
        <ItalicName text={hero.firstName} lettersIndex={hero.italics.firstName} />
      </span>{" "}
      <span className="sr-only">{hero.lastName}</span>
      <span ref={lastNameRef} aria-hidden="true">
        <ItalicName text={hero.lastName} lettersIndex={hero.italics.lastName} />
      </span>
    </h1>
  );

  // Reduced motion gets a genuinely separate, simple static layout — not
  // the animated stage frozen mid-state, since its absolute-positioned,
  // measured-stage layout has no meaningful size without the pin/sticky
  // mechanics driving it.
  if (reducedMotion) {
    return (
      <header className={`hero${playIntro ? " hero--intro-fade" : ""}`}>
        <div className="wrap">
          {nameHeading}
          <div className="hero__statement-row">
            <p className="hero__statement">{hero.tagLine}</p>
            <button type="button" className="hero__see-work" onClick={scrollToWork}>
              <HandDrawnButtonOutline />
              <span className="hero__see-work-label">See the work</span>
            </button>
          </div>
          <div className="hero__infobar">
            {hero.infoBar.map((item) => (
              <div className="hero__infobar-item" key={`infobar-${toLowerHyphenCase(item)}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="orbit-hero__illustration" aria-hidden="true">
            <Illustration />
          </div>
        </div>

        <div ref={staticWorkRef} className="wrap orbit-hero__static">
          {projects.map(([project, index]) => (
            <Link key={project.link} href={project.link} className="orbit-hero__static-card">
              <Card imgs={project.imgs} flip={index === 1} />
              <div className="orbit-hero__project-text">
                <ProjectText project={project} />
              </div>
            </Link>
          ))}
        </div>
      </header>
    );
  }

  return (
    <header className="hero">
      {/* The name/intro/rules default to entrance-hidden in CSS (see
          _orbit-hero.scss) so the static-exported HTML never flashes fully
          visible before JS hides it. This restores them for the rare
          visitor with JS fully disabled, who'd otherwise never see this
          content at all — nothing else on the page ever removes it. */}
      <noscript>
        <style>{`
          .orbit-hero__name-wrap span[aria-hidden] { opacity: 1 !important; transform: none !important; }
          .orbit-hero__intro-entrance { opacity: 1 !important; transform: none !important; }
          .orbit-hero__infobar-rule { transform: scaleX(1) !important; }
        `}</style>
      </noscript>
      <div ref={pinRef} className="orbit-hero__pin">
        <div ref={stageRef} className="orbit-hero__stage">
          <div className="orbit-hero__chips" aria-hidden="true">
            {chips.map((chip) => (
              <img
                key={chip.index}
                ref={(el) => {
                  chipRefs.current[chip.index] = el;
                }}
                className="orbit-hero__chip"
                src={chip.img.src}
                alt=""
              />
            ))}
          </div>

          <div className="orbit-hero__lockup">
            <div className="wrap orbit-hero__name-wrap">{nameHeading}</div>

            <div className="wrap orbit-hero__text orbit-hero__intro">
              <div ref={introRef} className="orbit-hero__intro-entrance">
                <div className="hero__statement-row">
                  <p className="hero__statement">{hero.tagLine}</p>
                  <button type="button" className="hero__see-work" onClick={scrollToWork}>
                    <HandDrawnButtonOutline />
                    <span className="hero__see-work-label">See the work</span>
                  </button>
                </div>
                <div className="hero__infobar">
                  <span ref={topRuleRef} className="orbit-hero__infobar-rule orbit-hero__infobar-rule--top" />
                  <span
                    ref={bottomRuleRef}
                    className="orbit-hero__infobar-rule orbit-hero__infobar-rule--bottom"
                  />
                  {hero.infoBar.map((item) => (
                    <div className="hero__infobar-item" key={`infobar-${toLowerHyphenCase(item)}`}>
                      {item}
                    </div>
                  ))}
                  <div className="orbit-hero__illustration" aria-hidden="true">
                    <Illustration ref={illustrationRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {projects.map(([project, index]) => (
            <Link
              key={project.link}
              href={project.link}
              className={`orbit-hero__project orbit-hero__project--${index === 0 ? "a" : "b"}`}
            >
              <div className="orbit-hero__project-text orbit-hero__reveal">
                <ProjectText project={project} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
