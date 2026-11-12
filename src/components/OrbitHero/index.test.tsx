import { afterEach, test, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { HomepageContent, Mosaic } from "@/app/types";
import { OrbitHero } from "./index";

// This project's vitest setup doesn't register RTL's auto-cleanup, so each
// render would otherwise stack up in the DOM across tests in this file.
afterEach(cleanup);

function mosaic(title: string, link: string): Mosaic {
  return {
    title,
    description: "test description",
    tags: ["one", "two"],
    link,
    imgs: [
      { src: `${link}/full.webp`, alt: "full", width: 362, height: 609 },
      { src: `${link}/colB-top.webp`, alt: "colB-top", width: 679, height: 390 },
      { src: `${link}/colB-bottom.webp`, alt: "colB-bottom", width: 679, height: 204 },
      { src: `${link}/colC-top.webp`, alt: "colC-top", width: 202, height: 390 },
      { src: `${link}/colC-bottom.webp`, alt: "colC-bottom", width: 202, height: 204 },
    ],
  };
}

const hero: HomepageContent["hero"] = {
  firstName: "Nick",
  lastName: "Raleigh",
  italics: { firstName: [1], lastName: [1, 5] },
  infoBar: ["Design Engineer", "Founding Designer, Overture", "11 years", "Longmont, Colorado"],
  tagLine: "I design software and build it myself.",
};

const mosaics: readonly [Mosaic, Mosaic] = [
  mosaic("Overture", "/work/overture"),
  mosaic("Westwood Law", "/work/car-accident-reporting-app"),
];

test("renders the name heading and both project links", () => {
  render(<OrbitHero hero={hero} mosaics={mosaics} />);

  expect(screen.getByRole("heading", { name: "Nick Raleigh" })).toBeInTheDocument();

  const overtureLink = screen.getByRole("link", { name: /Overture/ });
  expect(overtureLink).toHaveAttribute("href", "/work/overture");

  const westwoodLink = screen.getByRole("link", { name: /Westwood Law/ });
  expect(westwoodLink).toHaveAttribute("href", "/work/car-accident-reporting-app");
});

test("renders the tagline and infobar text", () => {
  render(<OrbitHero hero={hero} mosaics={mosaics} />);
  expect(screen.getByText(hero.tagLine)).toBeInTheDocument();
  expect(screen.getByText("Design Engineer")).toBeInTheDocument();
});
