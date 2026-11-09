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

test("buildChips returns 8 chips per project (two bento groups), 16 total", () => {
  const chips = buildChips(overture, westwoodLaw);
  expect(chips).toHaveLength(16);
  expect(chips.filter((c) => c.project === 0)).toHaveLength(8);
  expect(chips.filter((c) => c.project === 1)).toHaveLength(8);
});

test("cycles each project's 4 source images to fill its two bento groups", () => {
  const chips = buildChips(overture, westwoodLaw);
  const project0Srcs = chips.filter((c) => c.project === 0).map((c) => c.img.src);
  expect(new Set(project0Srcs).size).toBe(4);
  expect(project0Srcs.slice(0, 4)).toEqual(overture.imgs.map((img) => img.src));
  expect(project0Srcs.slice(4, 8)).toEqual(overture.imgs.map((img) => img.src));
});

test("assigns each chip a unique cell across both bento groups (0-7)", () => {
  const chips = buildChips(overture, westwoodLaw).filter((c) => c.project === 1);
  const cells = new Set(chips.map((c) => c.cell));
  expect(cells).toEqual(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
});

test("each chip has a unique, stable index across both projects", () => {
  const chips = buildChips(overture, westwoodLaw);
  const indexes = chips.map((c) => c.index);
  expect(new Set(indexes).size).toBe(16);
  expect(Math.min(...indexes)).toBe(0);
  expect(Math.max(...indexes)).toBe(15);
});

test("ease is a cubic in-out curve anchored at its endpoints and midpoint", () => {
  expect(ease(0)).toBe(0);
  expect(ease(1)).toBe(1);
  expect(ease(0.5)).toBe(0.5);
});
