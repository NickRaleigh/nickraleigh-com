import { HomepageContent } from "./types";
import { OvertureMosaic } from "./work/overture/content";
import { WestwoodLawMosaic } from "./work/car-accident-reporting-app/content";

export const homeContent: HomepageContent = {
  hero: {
    firstName: "Nick",
    lastName: "Raleigh",
    italics: {
      firstName: [1],
      lastName: [1, 5],
    },
    infoBar: [
      "Design Engineer",
      "Founding Designer, Overture",
      "11 years building for the web",
      "Longmont, Colorado",
    ],
    tagLine: "I make complicated software feel simple.",
  },
  mosaics: [
    OvertureMosaic,
    // TODO: new url with 301: /work/westwood-law
    WestwoodLawMosaic,
  ],
  whatIDo: {
    missionStatement: {
      title: "Software should get out of the way.",
      description: `
	I design and build interfaces for people with something more
	important on their minds, turning complicated, multi-step
	processes into ones they can finish without a second thought. I
	own both the design and the code, from first sketch to production.`,
    },
    competencies: [
      {
        title: "Product Design",
        description: `
	Interface, interaction and brand design, from wireframes to
	final UI. I designed Overture\'s product and brand from
	scratch. `,
      },
      {
        title: "Front-End Engineering",
        description: `
	Production React, built from my own designs. Components built
	for the full range of real content, not just the typical case.`,
      },
      {
        title: "Data & Product Engineering",
        description: `
	Data pipelines and programmatic pages that turn public data into
        tools people actually find, plus the technical SEO behind them.`,
      },
    ],
  },
};
