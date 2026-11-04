import { test, expect } from "vitest";
import type { Mosaic } from "@/app/types";
import { buildChips, ease } from "./chipLayout";

function mosaic(title: string, link: string): Mosaic {
  return {
    title,
    link,
    imgs: [
      { src: `/${link}/large.webp`, alt: "large", width: 542, height: 312 },
      { src: `/${link}/tall.webp`, alt: "tall", width: 176, height: 313 },
      { src: `/${link}/wide.webp`, alt: "wide", width: 542, height: 151 },
      { src: `/${link}/square.webp`, alt: "square", width: 177, height: 148 },
    ],
    stat: { title: ["1,000+"], description: "test stat" },
  };
}

const overture = mosaic("Overture", "/work/overture");
const westwoodLaw = mosaic("Westwood Law", "/work/car-accident-reporting-app");

test("buildChips returns 16 chips per project, 32 total", () => {
  const chips = buildChips(overture, westwoodLaw);
  expect(chips).toHaveLength(32);
  expect(chips.filter((c) => c.project === 0)).toHaveLength(16);
  expect(chips.filter((c) => c.project === 1)).toHaveLength(16);
});

test("cycles the 4 source images to fill 16 chips per project", () => {
  const chips = buildChips(overture, westwoodLaw);
  const project0Srcs = chips.filter((c) => c.project === 0).map((c) => c.img.src);
  const uniqueSrcs = new Set(project0Srcs);
  expect(uniqueSrcs.size).toBe(4);
  expect(project0Srcs[0]).toBe(overture.imgs[0].src);
  expect(project0Srcs[4]).toBe(overture.imgs[0].src);
});

test("lays out each project as a clean 4x4 column/row grid", () => {
  const chips = buildChips(overture, westwoodLaw);
  const cols = new Set(chips.map((c) => c.col));
  const rows = new Set(chips.map((c) => c.row));
  expect(cols).toEqual(new Set([0, 1, 2, 3]));
  expect(rows).toEqual(new Set([0, 1, 2, 3]));
});

test("each chip has a unique, stable index across both projects", () => {
  const chips = buildChips(overture, westwoodLaw);
  const indexes = chips.map((c) => c.index);
  expect(new Set(indexes).size).toBe(32);
  expect(Math.min(...indexes)).toBe(0);
  expect(Math.max(...indexes)).toBe(31);
});

test("ease is a cubic in-out curve anchored at its endpoints and midpoint", () => {
  expect(ease(0)).toBe(0);
  expect(ease(1)).toBe(1);
  expect(ease(0.5)).toBe(0.5);
});
