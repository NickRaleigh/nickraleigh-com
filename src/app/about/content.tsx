import type { AboutPage } from "./types";

export const aboutContent: AboutPage = {
  pagehead: {
    kicker: "About",
    title: "Building web experiences that look right and get found, for over a decade.",
  },
  intro: {
    label: "background",
    photo: {
      src: "/uploads/nick-profil-square.jpg",
      alt: "Nick Raleigh",
      width: 160,
      height: 160,
    },
    paragraphs: [
      [
        "I'm a senior design engineer based in Colorado. ",
        <span className="dim" key="dim-1">
          A third-generation native with a degree in design studies and 11
          years of web experience.
        </span>,
        ` I operate across the full product spectrum, taking ideas from
        whiteboarding and brand concepts into high-fidelity design, React
        front-ends, and production code. Leveraging agentic workflows, I
        help teams ship fast, performant apps that look right, adapt to
        real user data, and deliver happier user experiences.`,
      ],
      [
        `Most developers don't know the first thing about design. Most
        designers don't have the technical ability to code. `,
        <span className="dim" key="dim-2">
          I bridge this gap.
        </span>,
        ` Because I build in both worlds, design informs the code, code
        sharpens the design, and the result is a clean, performant product.`,
      ],
    ],
  },
  timeline: {
    sectionHead: {
      title: "How I Got Here",
      subtitle: "a rough timeline",
    },
    rows: [
      {
        year: "2018 to present",
        title: "Frontend lead and designer, Overture",
        description: `Joined a legal referral platform when it was still an
        idea, helped shape the UI, and have owned the React frontend since:
        the marketing site, the member dashboard, the attorney directory,
        plus the brand and visual design across all of it. More recently I
        have driven the SEO work behind new member growth.`,
      },
      {
        year: "2015 to 2018",
        title: "Sole developer, marketing agency",
        description: `Spent three years as the only developer maintaining
        over 100 client sites for a marketing agency: plugin conflicts,
        hosting issues, and every kind of small fire a fleet of sites can
        produce. This is where that kind of maintenance work became second
        nature.`,
      },
      {
        year: "Alongside that",
        title: "Freelance frontend, React, and technical SEO work",
        description: `Custom frontend builds for agencies and nonprofits,
        React apps and frontends, and technical SEO engagements.`,
      },
    ],
  },
  values: {
    sectionHead: {
      title: "How I Work",
      subtitle: "core principles",
    },
    items: [
      {
        title: "Deep work",
        description: `I don't trade in quick hacks or superficial fixes. I
        dig into the root of complex site problems, trace the edge cases,
        and build clean, permanent solutions that hold up over time.`,
      },
      {
        title: "Evidence over guesses",
        description: `I leverage agentic tools to analyze real performance
        and usage data, predicting and adapting UX to eliminate friction
        before it hits users.`,
      },
      {
        title: "Full-spectrum craft",
        description: `Whiteboarding, branding, high-fidelity design, and
        engineering. I work across the entire build, ensuring every
        decision connects design intent directly to execution.`,
      },
      {
        title: "Built for the team",
        description: `I move fast without cutting corners. Bringing
        world-class craftsmanship, low ego, and clear communication to
        every build so the team ships better products together.`,
      },
    ],
  },
  personal: {
    sectionHead: {
      title: "Outside of Work",
    },
    body: `I am based in Longmont with my wife and kids. Outside of work and
    family, I love to cook, keep too many books going at once, think about
    running another marathon, and rotate through whatever small hobby
    currently has my attention.`,
  },
  cta: {
    title: "Hiring a design engineer?",
    description: `Happy to walk through the work above, or talk about what
    a team actually needs.`,
    links: [
      { href: "/contact", text: "Get in touch ›", variant: "primary" },
      { href: "/work", text: "See the work", variant: "secondary" },
    ],
  },
};
