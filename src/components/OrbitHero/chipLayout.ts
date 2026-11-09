import type { Mosaic } from "@/app/types";
import type { Picture } from "@/types/base";

export type StageMetrics = {
  readonly width: number;
  readonly height: number;
};

export type ChipStatic = {
  readonly index: number;
  readonly project: 0 | 1;
  readonly cell: number;
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

// Each project lands as the same 4-pane bento mosaic used on production
// (see .mosaic in _mosaic.scss: a 3fr/1fr column split and a 2fr/1fr row
// split, "large tall / wide square") plus a flanking column of 4 simpler,
// uniform tiles bolted onto its outer edge — the bento alone was narrower
// than the available width (a 3:2 block is just a slimmer shape than the
// space around it), and stretching it to fill that space instead cropped
// every pane far more aggressively than its source image was meant for.
// The flanking column spans the same width honestly, with real content
// instead of a wider box, and — unlike a second full bento — only needs
// 4 more ordinary screenshots, not 4 more specifically large/tall/wide/
// square crops.
type GridCell = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

const BENTO_COL_WIDE = 3 / 4;
const BENTO_COL_NARROW = 1 / 4;
const BENTO_ROW_TALL = 2 / 3;
const BENTO_ROW_SHORT = 1 / 3;

// Order matches each project's imgs array: [large, tall, wide, square].
const BENTO_CELLS: readonly GridCell[] = [
  { x: 0, y: 0, w: BENTO_COL_WIDE, h: BENTO_ROW_TALL }, // large
  { x: BENTO_COL_WIDE, y: 0, w: BENTO_COL_NARROW, h: BENTO_ROW_TALL }, // tall
  { x: 0, y: BENTO_ROW_TALL, w: BENTO_COL_WIDE, h: BENTO_ROW_SHORT }, // wide
  { x: BENTO_COL_WIDE, y: BENTO_ROW_TALL, w: BENTO_COL_NARROW, h: BENTO_ROW_SHORT }, // square
];

const FLANK_COUNT = 4;
// The bento's share of the total composite width — the flanking column
// takes the rest. Cell indices [0, BENTO_CELLS.length) are the bento's
// panes; [BENTO_CELLS.length, BENTO_CELLS.length + FLANK_COUNT) are the
// flanking column's tiles, top to bottom.
const BENTO_SHARE = 0.7;
const FLANK_SHARE = 1 - BENTO_SHARE;

const CHIP_COUNT: Readonly<Record<0 | 1, number>> = {
  0: BENTO_CELLS.length + FLANK_COUNT, // 8
  1: BENTO_CELLS.length + FLANK_COUNT, // 8
};

// Westwood Law's static mosaic card mirrors its columns (see Card's
// `flip={index === 1}`) so the two project cards face each other. The
// orbit hero's landing mirrors the same way for the same project: its
// bento sits on the left with the "tall"/"square" column leading (instead
// of trailing), and its flanking column moves to the outer right edge to
// match — the two projects' bentos end up adjacent near the stage's
// center, with both flanking columns bookending the whole composition.
function targetCellFor(project: 0 | 1, cellIndex: number): GridCell {
  const mirror = project === 1;
  const bentoOffsetX = mirror ? 0 : FLANK_SHARE;
  const flankOffsetX = mirror ? BENTO_SHARE : 0;

  if (cellIndex < BENTO_CELLS.length) {
    const cell = BENTO_CELLS[cellIndex];
    const local = mirror ? { x: 1 - cell.x - cell.w, y: cell.y, w: cell.w, h: cell.h } : cell;
    return {
      x: bentoOffsetX + local.x * BENTO_SHARE,
      y: local.y,
      w: local.w * BENTO_SHARE,
      h: local.h,
    };
  }

  const flankIndex = cellIndex - BENTO_CELLS.length;
  return {
    x: flankOffsetX,
    y: flankIndex / FLANK_COUNT,
    w: FLANK_SHARE,
    h: 1 / FLANK_COUNT,
  };
}

// Matches `.mosaic { aspect-ratio: 3/2 }` in _mosaic.scss, widened by
// BENTO_SHARE to account for the flanking column sitting alongside it. The
// bento panes were cropped against that fixed 3:2 ratio, so the overall
// landing box has to keep it too (fit, not stretch) or object-fit:cover
// crops every pane far more aggressively than its source image was meant
// for.
const BENTO_ASPECT = 3 / 2 / BENTO_SHARE;

type FittedBox = {
  readonly width: number;
  readonly height: number;
  readonly offsetX: number;
  readonly offsetY: number;
};

function fitBentoBox(width: number, height: number): FittedBox {
  const idealHeight = width / BENTO_ASPECT;
  if (idealHeight <= height) {
    return { width, height: idealHeight, offsetX: 0, offsetY: (height - idealHeight) / 2 };
  }
  const idealWidth = height * BENTO_ASPECT;
  return { width: idealWidth, height, offsetX: (width - idealWidth) / 2, offsetY: 0 };
}

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
const GRID_TOP = 0.26;
const GRID_BOTTOM = 0.24;
// A fraction of the whole grid box (not of each cell, like production's
// fixed-px CSS `gap`) so the seam reads the same width next to the big
// "large" pane as it does next to the small "square" one.
const BENTO_GAP = 0.03;

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
    const count = CHIP_COUNT[project];
    const cycled = cycleImages(mosaic.imgs, count);
    for (let k = 0; k < count; k++) {
      chips.push({
        index: index++,
        project,
        cell: k,
        angle: (k / count) * Math.PI * 2 + (k % 3) * 0.3 + project * Math.PI,
        ry: ((k % 5) / 4) * 2 - 1,
        stagger: (k / count) * STAGGER_SPAN,
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

  const marginWidth = half.width * (1 - GRID_LEFT - GRID_RIGHT);
  const marginHeight = half.height * (1 - GRID_TOP - GRID_BOTTOM);
  // Both projects fit a fixed-aspect box inside the available margin (see
  // fitBentoBox) rather than stretching to fill it, so every pane keeps the
  // proportions its source image was actually cropped for.
  const fitted = fitBentoBox(marginWidth, marginHeight);
  const gridWidth = fitted.width;
  const gridHeight = fitted.height;
  const targetCell = targetCellFor(chip.project, chip.cell);
  const cellWidth = gridWidth * targetCell.w;
  const cellHeight = gridHeight * targetCell.h;

  // The orbiting chip size is tied to the pane it will settle into, so it
  // scales with the stage instead of using a fixed pixel size — a "large"
  // pane's chip is already bigger than a "square" pane's chip while still
  // orbiting.
  const orbitWidth = cellWidth * ORBIT_SIZE_FACTOR * depthScale;
  const orbitHeight = cellHeight * ORBIT_SIZE_FACTOR * depthScale;

  const targetWidth = cellWidth - gridWidth * BENTO_GAP;
  const targetHeight = cellHeight - gridHeight * BENTO_GAP;
  // Chips render in one stage-wide container (not nested per project), so
  // the grid target stays in stage-relative coordinates: the shared orbit
  // center offset by this chip's half, plus its pane's position across the
  // two bento groups within that half.
  const targetCenterX =
    half.offsetX + half.width * GRID_LEFT + fitted.offsetX + gridWidth * targetCell.x + cellWidth / 2;
  const targetCenterY =
    half.offsetY + half.height * GRID_TOP + fitted.offsetY + gridHeight * targetCell.y + cellHeight / 2;

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

// The project links share this opacity, but CSS opacity alone doesn't stop
// hit-testing — without this, their hit area (sized by layout, not by what's
// actually painted) is clickable well before LABEL_START, when nothing is
// visible there yet. Same threshold as computeLabelOpacity so pointer-events
// turns on exactly when opacity starts rising off zero.
export function computeLabelPointerEvents(p: number): "auto" | "none" {
  return p > LABEL_START ? "auto" : "none";
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
