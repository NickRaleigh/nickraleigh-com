import { HomepageContent } from "./types";

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
    tagLine: "I design the product, then build it.",
  },
  mosaics: [
    {
      title: "Overture",
      link: "/work/overture",
      imgs: [
        {
          src: "/uploads/overture/mosaic-large@1x.webp",
          alt: "Coverage map of US states with active Overture attorneys",
          width: 542,
          height: 312,
        },
        {
          src: "/uploads/overture/mosaic-tall@1x.webp?v=1791576132",
          alt: "An attorney's profile page on Overture",
          width: 176,
          height: 313,
        },
        {
          src: "/uploads/overture/mosaic-wide@1x.webp?v=1791478611",
          alt: "Referral status tracker showing the steps of a referral",
          width: 542,
          height: 151,
        },
        {
          src: "/uploads/overture/mosaic-square@1x.webp?v=1791478611",
          alt: "The Overture wordmark",
          width: 177,
          height: 148,
        },
      ],
      stat: {
        title: ["6,000+"],
        description: "attorneys on the platform",
      },
    },
    {
      title: "Westwood Law",
      // TODO: new url with 301: /work/westwood-law
      link: "/work/car-accident-reporting-app",
      imgs: [
        {
          src: "/uploads/car-accident-reporting-app/mosaic-large@1x.webp?v=1791478611",
          alt: "Map of reported crashes clustered by location",
          width: 542,
          height: 312,
        },
        {
          src: "/uploads/car-accident-reporting-app/mosaic-tall@1x.webp?v=1791478611",
          alt: "Ranked list of the most dangerous roads by crash count",
          width: 176,
          height: 313,
        },
        {
          src: "/uploads/car-accident-reporting-app/mosaic-wide@1x.webp?v=1791478611",
          alt: "Charts of collision types and crash time of day",
          width: 542,
          height: 151,
        },
        {
          src: "/uploads/car-accident-reporting-app/mosaic-square@1x.webp?v=1791478611",
          alt: "The Westwood Law logo",
          width: 177,
          height: 148,
        },
      ],
      stat: {
        title: ["260", <span className="arrow">›</span>, "2,000+"],
        description: "monthly organic clicks in 4 months",
      },
    },
  ],
  whatIDo: {
    missionStatement: {
      title: "Software should get out of the way.",
      description: ` 
	I design and build interfaces for people with something more
	important on their minds, turning complicated, multi-step
	processes into ones they can finish without a second thought. Then
	I write the front end myself, from first sketch to production.`,
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
        title: "Data & Growth Engineering",
        description: `
	Data pipelines and programmatic pages that turn public data into
        tools people actually find, plus the technical SEO behind them.`,
      },
    ],
  },
};
