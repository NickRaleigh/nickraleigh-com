import type { Mosaic } from "@/app/types";
import type { Picture } from "@/types/base";

export type StageMetrics = {
  readonly width: number;
  readonly height: number;
};

export type ChipStatic = {
  readonly index: number;
  readonly project: 0 | 1;
  readonly col: number;
  readonly row: number;
  readonly angle: number;
  readonly ry: number;
  readonly stagger: number;
  readonly img: Picture;
};

export type ChipFrame = {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
  readonly opacity: number;
  readonly zIndex: number;
};

const CHIPS_PER_PROJECT = 16;
const GRID_COLS = 4;
const GRID_ROWS = 4;

// All orbit/grid geometry is expressed as fractions of the stage's measured
// size (not fixed pixels), so the same math holds at any viewport width.
const ORBIT_CENTER_X = 0.5;
// 0.26 below the stage's own top, back when .orbit-hero__name-wrap's top
// also sat at the stage's top (0%). .orbit-hero__lockup now holds the name
// instead, centered at 85% of the stage's height, so its top edge sits at
// (100% - 85%) / 2 = 7.5% of the stage — this is that same 0.26 offset
// re-based from there (0.075 + 0.26) so the orbit still clusters around
// the name's actual position instead of where it used to be.
const ORBIT_CENTER_Y = 0.335;
const ORBIT_RADIUS_X = 0.3;
const ORBIT_RADIUS_Y = 0.12;
const ORBIT_RY_SPREAD = 0.1;
const ORBIT_LIFT = 0.22;
const ORBIT_SIZE_FACTOR = 0.42;

const GRID_LEFT = 0.07;
const GRID_RIGHT = 0.07;
const GRID_TOP = 0.3;
const GRID_BOTTOM = 0.26;
const GRID_GAP = 0.16;

const STAGGER_SPAN = 0.35;
const SETTLE_SPAN = 0.55;
const LABEL_START = 0.75;

export function ease(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

function cycleImages(imgs: readonly Picture[], count: number): Picture[] {
  return Array.from({ length: count }, (_, k) => imgs[k % imgs.length]);
}

export function buildChips(overture: Mosaic, westwoodLaw: Mosaic): ChipStatic[] {
  const projects: readonly [Mosaic, 0 | 1][] = [
    [overture, 0],
    [westwoodLaw, 1],
  ];

  const chips: ChipStatic[] = [];
  let index = 0;

  for (const [mosaic, project] of projects) {
    const cycled = cycleImages(mosaic.imgs, CHIPS_PER_PROJECT);
    for (let k = 0; k < CHIPS_PER_PROJECT; k++) {
      chips.push({
        index: index++,
        project,
        col: k % GRID_COLS,
        row: Math.floor(k / GRID_COLS),
        angle: (k / CHIPS_PER_PROJECT) * Math.PI * 2 + (k % 3) * 0.3 + project * Math.PI,
        ry: ((k % 5) / 4) * 2 - 1,
        stagger: (k / CHIPS_PER_PROJECT) * STAGGER_SPAN,
        img: cycled[k],
      });
    }
  }

  return chips;
}

type HalfBox = {
  readonly offsetX: number;
  readonly offsetY: number;
  readonly width: number;
  readonly height: number;
};

// The two projects' chips share one orbit cloud near the name, but each
// settles into its own half of the stage. `stacked` picks whether that half
// is a left/right column (desktop) or a top/bottom row (mobile), matching
// the existing `.mosaic-cards` breakpoint behavior.
function getHalf(metrics: StageMetrics, stacked: boolean, project: 0 | 1): HalfBox {
  if (stacked) {
    const height = metrics.height / 2;
    return { offsetX: 0, offsetY: project * height, width: metrics.width, height };
  }
  const width = metrics.width / 2;
  return { offsetX: project * width, offsetY: 0, width, height: metrics.height };
}

export function computeChipFrame(
  chip: ChipStatic,
  p: number,
  t: number,
  metrics: StageMetrics,
  stacked: boolean,
): ChipFrame {
  const half = getHalf(metrics, stacked, chip.project);

  const a = chip.angle + t;
  const z = Math.sin(a);
  const depthScale = 0.65 + 0.35 * ((z + 1) / 2);
  const lift = ease(clamp01(p * 1.6));

  const orbitCenterX =
    metrics.width * ORBIT_CENTER_X + Math.cos(a) * metrics.width * ORBIT_RADIUS_X;
  const orbitCenterY =
    metrics.height * ORBIT_CENTER_Y +
    z * metrics.height * ORBIT_RADIUS_Y +
    chip.ry * metrics.height * ORBIT_RY_SPREAD -
    lift * metrics.height * ORBIT_LIFT;

  const gridWidth = half.width * (1 - GRID_LEFT - GRID_RIGHT);
  const gridHeight = half.height * (1 - GRID_TOP - GRID_BOTTOM);
  const cellWidth = gridWidth / GRID_COLS;
  const cellHeight = gridHeight / GRID_ROWS;

  // The orbiting chip size is tied to the grid cell it will settle into, so
  // it scales with the stage instead of using a fixed pixel size.
  const orbitWidth = cellWidth * ORBIT_SIZE_FACTOR * depthScale;
  const orbitHeight = cellHeight * ORBIT_SIZE_FACTOR * depthScale;

  const targetWidth = cellWidth * (1 - GRID_GAP);
  const targetHeight = cellHeight * (1 - GRID_GAP);
  // Chips render in one stage-wide container (not nested per project), so
  // the grid target stays in stage-relative coordinates: the shared orbit
  // center offset by this chip's half, plus its cell within that half.
  const targetCenterX = half.offsetX + half.width * GRID_LEFT + chip.col * cellWidth + cellWidth / 2;
  const targetCenterY = half.offsetY + half.height * GRID_TOP + chip.row * cellHeight + cellHeight / 2;

  const q = ease(clamp01((p - chip.stagger) / SETTLE_SPAN));

  const width = orbitWidth + (targetWidth - orbitWidth) * q;
  const height = orbitHeight + (targetHeight - orbitHeight) * q;
  const centerX = orbitCenterX + (targetCenterX - orbitCenterX) * q;
  const centerY = orbitCenterY + (targetCenterY - orbitCenterY) * q;

  const orbitOpacity = 0.35 + 0.65 * ((z + 1) / 2);
  const opacity = orbitOpacity * (1 - q) + q;
  const zIndex = q > 0.5 ? 50 : Math.round((z + 1) * 10);

  return {
    left: centerX - width / 2,
    top: centerY - height / 2,
    width,
    height,
    opacity,
    zIndex,
  };
}

export function computeNameLift(p: number): number {
  return ease(clamp01(p * 1.6));
}

export function computeLabelOpacity(p: number): number {
  return clamp01((p - LABEL_START) / (1 - LABEL_START));
}

const INTRO_FADE_END = 0.3;

// The infobar/tagline are visible immediately (while the chips are still
// orbiting) and fade away early in the scroll, clearing out before the
// grids form — the opposite timing from the project labels above.
export function computeIntroOpacity(p: number): number {
  return 1 - clamp01(p / INTRO_FADE_END);
}

// Real seconds, not scroll progress — the chips' entrance is a one-shot
// reveal timed against the page load, independent of whether the visitor
// has scrolled at all yet. TILE_ENTRANCE_START/STAGGER are also read by
// useHeroEntrance's GSAP transform/filter tween on the same chip elements
// (same two numbers, so the two mechanisms — this opacity multiplier and
// that tween — stay in lockstep instead of drifting apart as separate
// hand-tuned constants.
export const TILE_ENTRANCE_START = 0.8;
export const TILE_ENTRANCE_STAGGER = 0.02;
const TILE_ENTRANCE_FADE_DURATION = 0.45;

// Multiplied into computeChipFrame's own opacity during the entrance only
// (computeChipFrame can't own this itself — it's a pure function of scroll
// progress `p`, with no notion of wall-clock time). Always 1 once a chip's
// fade has finished, or when the entrance isn't playing at all (reduced
// motion, or it already played earlier this session).
export function computeEntranceOpacity(
  chip: ChipStatic,
  elapsedSeconds: number,
  playIntro: boolean,
): number {
  if (!playIntro) return 1;
  const delay = TILE_ENTRANCE_START + chip.index * TILE_ENTRANCE_STAGGER;
  return ease(clamp01((elapsedSeconds - delay) / TILE_ENTRANCE_FADE_DURATION));
}
