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

// Each project lands as the same 5-pane bento mosaic used on production
// (see .mosaic in _mosaic.scss: a full-height pane plus a wider and a
// narrower column, each split top/bottom). Unlike the old 4-pane bento, this
// shape is already wide enough to fill the available landing space on its
// own (its own aspect ratio is close to the space around it), so there's no
// flanking column of extra tiles bolted onto the side.
type GridCell = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

// Same ratios as _mosaic.scss's grid-template-columns/-rows (1.79fr/3.35fr/
// 1fr and 1.91fr/1fr).
const BENTO_COL_FULL = 1.79 / (1.79 + 3.35 + 1);
const BENTO_COL_B = 3.35 / (1.79 + 3.35 + 1);
const BENTO_ROW_TOP = 1.91 / (1.91 + 1);
const BENTO_ROW_BOTTOM = 1 - BENTO_ROW_TOP;

// Order matches each project's imgs array: [full, colB-top, colB-bottom,
// colC-top, colC-bottom].
const BENTO_CELLS: readonly GridCell[] = [
  { x: 0, y: 0, w: BENTO_COL_FULL, h: 1 }, // full
  { x: BENTO_COL_FULL, y: 0, w: BENTO_COL_B, h: BENTO_ROW_TOP }, // colB-top
  { x: BENTO_COL_FULL, y: BENTO_ROW_TOP, w: BENTO_COL_B, h: BENTO_ROW_BOTTOM }, // colB-bottom
  { x: BENTO_COL_FULL + BENTO_COL_B, y: 0, w: 1 - BENTO_COL_FULL - BENTO_COL_B, h: BENTO_ROW_TOP }, // colC-top
  {
    x: BENTO_COL_FULL + BENTO_COL_B,
    y: BENTO_ROW_TOP,
    w: 1 - BENTO_COL_FULL - BENTO_COL_B,
    h: BENTO_ROW_BOTTOM,
  }, // colC-bottom
];

const CHIP_COUNT: Readonly<Record<0 | 1, number>> = {
  0: BENTO_CELLS.length, // 5
  1: BENTO_CELLS.length, // 5
};

// Westwood Law's static mosaic card mirrors its columns (see Card's
// `flip={index === 1}`) so the two project cards face each other. The
// orbit hero's landing mirrors the same way for the same project: its
// full-height pane leads on the left instead of trailing on the right.
function targetCellFor(project: 0 | 1, cellIndex: number): GridCell {
  const mirror = project === 1;
  const cell = BENTO_CELLS[cellIndex];
  return mirror ? { x: 1 - cell.x - cell.w, y: cell.y, w: cell.w, h: cell.h } : cell;
}

// Matches `.mosaic { aspect-ratio: 722/334 }` in _mosaic.scss — the bento
// panes were cropped against that fixed ratio, so the overall landing box
// has to keep it too (fit, not stretch) or object-fit:cover crops every
// pane far more aggressively than its source image was meant for.
const BENTO_ASPECT = 722 / 334;

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
// Orbiting chip size is a fraction of its *landed* cell size (see
// computeChipFrame's cellWidth/cellHeight below), so enlarging the landed
// grid (GRID_TOP/GRID_BOTTOM above) enlarges the orbiting chips too, even
// though the orbit's own path (ORBIT_RADIUS_X/Y) didn't change — bigger
// chips crossing the same orbit paths collide and overlap each other (and
// the name) far more visibly. Scaled down from the original 0.42 by
// roughly the grid's own size increase to keep the orbiting chips close to
// their original size while still landing at the bigger final size.
const ORBIT_SIZE_FACTOR = 0.32;

const GRID_LEFT = 0.02;
const GRID_RIGHT = 0.02;
const GRID_TOP = 0.16;
// Must stay large enough to hold the title/description/tags block that
// renders below the grid (see PROJECT_TEXT_GAP_RATIO) without it clipping
// against the stage's own overflow:hidden — the grid is height-bound here
// (see fitBentoBox), so its height is exactly stageHeight*(1-TOP-BOTTOM),
// leaving stageHeight*BOTTOM below it for the gap plus that text block.
const GRID_BOTTOM = 0.25;
// A fraction of the stage's own height (like everything else here) rather
// than a fixed px/rem value — OrbitHero/index.tsx adds this, scaled by
// metrics.height, on top of the grid's own measured height as the text's
// padding-top. A fixed value would eat a bigger bite of GRID_BOTTOM's
// margin at short stage heights than at tall ones, risking the text
// clipping against the stage's overflow:hidden; this way the gap shrinks
// and grows in lockstep with the margin that has to contain it.
export const PROJECT_TEXT_GAP_RATIO = 0.07;
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

type ProjectGridBox = {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
};

// The bounding box each project's 5 chips settle into — same box the project
// link's hit area and text are anchored to (see OrbitHero/index.tsx), so the
// clickable area and the text's left edge always line up with where the
// images actually land, instead of drifting apart at stage sizes where
// fitBentoBox's own centering (see below) shifts the grid off a fixed
// percentage.
export function computeProjectGridBox(
  project: 0 | 1,
  metrics: StageMetrics,
  stacked: boolean,
): ProjectGridBox {
  const half = getHalf(metrics, stacked, project);
  const marginWidth = half.width * (1 - GRID_LEFT - GRID_RIGHT);
  const marginHeight = half.height * (1 - GRID_TOP - GRID_BOTTOM);
  // Both projects fit a fixed-aspect box inside the available margin (see
  // fitBentoBox) rather than stretching to fill it, so every pane keeps the
  // proportions its source image was actually cropped for.
  const fitted = fitBentoBox(marginWidth, marginHeight);
  return {
    left: half.offsetX + half.width * GRID_LEFT + fitted.offsetX,
    top: half.offsetY + half.height * GRID_TOP + fitted.offsetY,
    width: fitted.width,
    height: fitted.height,
  };
}

export function computeChipFrame(
  chip: ChipStatic,
  p: number,
  t: number,
  metrics: StageMetrics,
  stacked: boolean,
): ChipFrame {
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

  const grid = computeProjectGridBox(chip.project, metrics, stacked);
  const gridWidth = grid.width;
  const gridHeight = grid.height;
  const targetCell = targetCellFor(chip.project, chip.cell);
  const cellWidth = gridWidth * targetCell.w;
  const cellHeight = gridHeight * targetCell.h;

  // The orbiting chip size is tied to the pane it will settle into, so it
  // scales with the stage instead of using a fixed pixel size — a "large"
  // pane's chip is already bigger than a "square" pane's chip while still
  // orbiting. Forced to 1:1 (instead of inheriting the cell's own aspect
  // ratio) so every chip reads as a uniform square while orbiting, and
  // based on the smaller of the two cell dimensions so a "full" pane's tall,
  // narrow cell doesn't produce an oversized square that collides with
  // neighboring orbit paths.
  const orbitSize = Math.min(cellWidth, cellHeight) * ORBIT_SIZE_FACTOR * depthScale;
  const orbitWidth = orbitSize;
  const orbitHeight = orbitSize;

  // Both axes subtract the same absolute pixel gap (based on the grid's
  // height, the smaller of its two dimensions given BENTO_ASPECT) — basing
  // each axis on its own dimension instead made the horizontal seams ~2x
  // wider than the vertical ones, since the grid is much wider than it is
  // tall.
  const gapPx = gridHeight * BENTO_GAP;
  const targetWidth = cellWidth - gapPx;
  const targetHeight = cellHeight - gapPx;
  // Chips render in one stage-wide container (not nested per project), so
  // the grid target stays in stage-relative coordinates: the project's grid
  // box, offset by its pane's position across the two bento groups within
  // that box.
  const targetCenterX = grid.left + gridWidth * targetCell.x + cellWidth / 2;
  const targetCenterY = grid.top + gridHeight * targetCell.y + cellHeight / 2;

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
