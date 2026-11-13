import { test, expect } from "vitest";
import type { Mosaic } from "@/app/types";
import { buildChips, ease } from "./chipLayout";

function mosaic(title: string, link: string): Mosaic {
  return {
    title,
    description: "test description",
    tags: ["one", "two"],
    link,
    imgs: [
      { src: `/${link}/full.webp`, alt: "full", width: 362, height: 609 },
      { src: `/${link}/colB-top.webp`, alt: "colB-top", width: 679, height: 390 },
      { src: `/${link}/colB-bottom.webp`, alt: "colB-bottom", width: 679, height: 204 },
      { src: `/${link}/colC-top.webp`, alt: "colC-top", width: 202, height: 390 },
      { src: `/${link}/colC-bottom.webp`, alt: "colC-bottom", width: 202, height: 204 },
    ],
  };
}

const overture = mosaic("Overture", "/work/overture");
const westwoodLaw = mosaic("Westwood Law", "/work/car-accident-reporting-app");

test("buildChips returns 5 chips per project (one per bento pane), 10 total", () => {
  const chips = buildChips(overture, westwoodLaw);
  expect(chips).toHaveLength(10);
  expect(chips.filter((c) => c.project === 0)).toHaveLength(5);
  expect(chips.filter((c) => c.project === 1)).toHaveLength(5);
});

test("each chip carries its project's matching source image in order", () => {
  const chips = buildChips(overture, westwoodLaw);
  const project0Srcs = chips.filter((c) => c.project === 0).map((c) => c.img.src);
  expect(project0Srcs).toEqual(overture.imgs.map((img) => img.src));
});

test("assigns each chip a unique cell (0-4)", () => {
  const chips = buildChips(overture, westwoodLaw).filter((c) => c.project === 1);
  const cells = new Set(chips.map((c) => c.cell));
  expect(cells).toEqual(new Set([0, 1, 2, 3, 4]));
});

test("each chip has a unique, stable index across both projects", () => {
  const chips = buildChips(overture, westwoodLaw);
  const indexes = chips.map((c) => c.index);
  expect(new Set(indexes).size).toBe(10);
  expect(Math.min(...indexes)).toBe(0);
  expect(Math.max(...indexes)).toBe(9);
});

test("ease is a cubic in-out curve anchored at its endpoints and midpoint", () => {
  expect(ease(0)).toBe(0);
  expect(ease(1)).toBe(1);
  expect(ease(0.5)).toBe(0.5);
});
