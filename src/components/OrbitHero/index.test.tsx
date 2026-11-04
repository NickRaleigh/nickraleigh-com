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
    link,
    imgs: [
      { src: `${link}/large.webp`, alt: "large", width: 542, height: 312 },
      { src: `${link}/tall.webp`, alt: "tall", width: 176, height: 313 },
      { src: `${link}/wide.webp`, alt: "wide", width: 542, height: 151 },
      { src: `${link}/square.webp`, alt: "square", width: 177, height: 148 },
    ],
    stat: { title: ["1,000+"], description: "test stat" },
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
