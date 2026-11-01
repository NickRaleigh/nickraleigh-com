import type { WorkIndexPage } from "./types";

export const workContent: WorkIndexPage = {
  pagehead: {
    kicker: "Work",
    title: "All Work",
    description: `Eight projects spanning React, full-stack development, and
    technical SEO: product frontends, custom builds, and the SEO work that
    decided whether any of it got found.`,
  },
  flagship: [
    {
      badge: "Flagship",
      accent: "navy",
      art: {
        src: "/uploads/overture/marketing-laptop.jpg",
        alt: "Overture marketing site shown on a laptop",
        width: 1800,
        height: 1200,
      },
      title: "Overture",
      meta: "Legal referral platform · React + Django",
      link: "/work/overture",
      highlightValue: ["6,000+"],
      highlightLabel: "attorneys on the platform",
    },
    {
      badge: "Flagship",
      accent: "navy-amber",
      art: {
        src: "/uploads/car-accident-reporting-app/mosaic-large@1x.webp",
        alt: "Crash report map shown on a laptop",
        width: 542,
        height: 312,
      },
      title: "Law Firm + Accident Reporting App",
      meta: "In-house build - Django",
      link: "/work/car-accident-reporting-app",
      highlightValue: ["260", <span className="arrow" key="arrow">›</span>, "2,000+"],
      highlightLabel: "monthly organic clicks, May to Aug 2026",
    },
  ],
  cta: {
    title: "Have a project like one of these?",
    description: `Send me your site or the idea and I'll tell you honestly
    where I'd start.`,
    links: [
      { href: "mailto:hello@nickraleigh.com", text: "Email me ›", variant: "primary" },
    ],
  },
};
