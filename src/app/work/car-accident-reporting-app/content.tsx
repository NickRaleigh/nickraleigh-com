import type { Mosaic } from "@/app/types";
import type { WestwoodLawPage } from "./types";

export const WestwoodLawMosaic: Mosaic = {
  title: "Westwood Law",
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
    title: ["260", <span className="arrow" key="arrow">›</span>, "2,000+"],
    description: "monthly organic clicks in 4 months",
  },
};

export const WestwoodLawPageContent: WestwoodLawPage = {
  mosaic: [WestwoodLawMosaic],
  title: "Westwood Law",
  opener: {
    title: `A Django platform I designed and built in-house for a personal
    injury and employment law firm.`,
    description: `A programmatic blog, an accident-report tool built on
    public crash data, and a childcare-safety lookup tool, backed by
    technical SEO.`,
  },
  metaRows: [
    { title: "Role", description: "Strategy, design, development, SEO" },
    { title: "Company", description: "In-house, sister brand of Overture" },
    { title: "Stack", description: "Python, Django" },
    { title: "Focus", description: "Programmatic SEO, Agentic Development" },
  ],
  statsBar: [
    {
      title: { text: ["260", <span className="arrow" key="a">›</span>, "2,000+"] },
      description: "monthly organic clicks, May to September",
    },
    {
      title: { text: ["7,000+"] },
      description: "pages generated from public crash data",
    },
    {
      title: { text: ["2.3%", <span className="arrow" key="a">›</span>, "5.6%"] },
      description: "click-through rate",
    },
  ],
  sections: [
    {
      label: "the build",
      body: (
        <>
          <h3>A Django platform, built in-house</h3>
          <p>
            I designed and built this in-house for Westwood Law, a personal
            injury and employment law firm and a sister brand of Overture,
            where I work full time. It is a full Django platform that runs
            the firm&rsquo;s entire web presence.
          </p>
          <p>
            The accident tool was my idea. The site was underperforming and
            had very little local authority, so I pitched a public-data
            crash tool to our CEO with rounds of designs and prototypes,
            then built the whole system.
          </p>
          <h3>What I built</h3>
          <ul>
            <li>A Django backend and CMS with a programmatic blog system</li>
            <li>
              An accident-report tool that turns California Highway Patrol
              collision records, TomTom traffic-speed data, and local news
              coverage into interactive maps, dangerous-intersection
              rankings, and a searchable crash feed
            </li>
            <li>
              An automated pipeline that publishes new crash pages every day
              with no manual work
            </li>
            <li>
              A childcare-facility complaint tracker built on California DSS
              licensing data
            </li>
            <li>Full visual design and front-end build across all of it</li>
          </ul>
          <p>
            See it live:{" "}
            <a
              href="https://westwood.law/accidents"
              target="_blank"
              rel="noopener noreferrer"
            >
              the accident-report tool
            </a>{" "}
            and{" "}
            <a
              href="https://westwood.law/granada-hills-ca/crash/2026-09-28-rear-end-haskell-av-chatsworth-st"
              target="_blank"
              rel="noopener noreferrer"
            >
              an individual crash page
            </a>
            .
          </p>
          <h3>Built with Claude Code</h3>
          <p>
            I built this with Claude Code as my main tool. I audited several
            public data APIs and chose CHP and CA DSS, designed every page,
            and set the SEO strategy. Claude Code drafted much of the
            implementation under my direction. I reviewed what it wrote and
            iterated on the code by hand from there. Working this way is how
            one person built and launched a platform of this size.
          </p>
        </>
      ),
    },
    {
      label: "the seo problem",
      body: (
        <>
          <h3>A site invisible in search</h3>
          <p>
            The site had been live for years but was barely showing up in
            search: competing against far more established firms for
            generic, high-competition keywords, with no real presence for
            the long-tail, hyper-local searches that actually convert for
            personal injury cases.
          </p>
          <p>
            On the technical side, indexation was a mess: pages Google
            should have been ranking weren&rsquo;t indexed at all, canonical
            tags were inconsistent, and there was no real internal linking
            strategy connecting related content.
          </p>
        </>
      ),
    },
    {
      label: "programmatic local seo",
      body: (
        <>
          <h3>Public data as local landing pages</h3>
          <p>
            The accident-report tool doubles as a programmatic local SEO
            system. Instead of one generic service-area page, every crash
            and dangerous-road page is a genuinely unique answer to a real
            local search, generated from CHP collision data rather than a
            templated city-name swap. Programmatic done well is not thin
            content at scale; it is a real answer to a real local search,
            generated efficiently.
          </p>
          <h3>Technical foundation</h3>
          <ul>
            <li>
              Fixed indexation issues so Google could actually crawl and
              rank the pages that mattered
            </li>
            <li>
              Cleaned up canonical structure to stop pages from competing
              with each other
            </li>
            <li>
              Rebuilt internal linking so new pages fed authority into the
              firm&rsquo;s core commercial pages, not the other way around
            </li>
          </ul>
          <h3>What did not work</h3>
          <p>
            I also ran an outreach campaign offering the tool as a free
            resource to more than 200 local newspapers, neighborhood
            councils, and school groups. It produced zero links. The growth
            below happened without them.
          </p>
        </>
      ),
    },
    {
      label: "the result",
      body: (
        <>
          <h3>A fast turnaround in search visibility</h3>
          <p>
            Over the first four months, average search position moved from
            16.8 to 10.6, from the middle of page 2 to the edge of page 1,
            and click-through rate more than doubled, from 2.3% to 5.6%. The
            crash pages themselves average around position 6.
          </p>
          <p>Site-wide monthly organic clicks:</p>
          <ul>
            <li>May: 260</li>
            <li>June: 470</li>
            <li>July: 1,000</li>
            <li>August: 1,700</li>
            <li>September: 2,000+</li>
          </ul>
          <p>
            About 7,000 pages are now indexed, and qualified leads have come
            in through the crash pages.
          </p>
          <p>
            AI Overview impressions grew alongside, from a peak of 237 in
            May to 1,500 in a single day in September.
          </p>
          <p className="case-section__note">
            This was in-house work, done as part of my full-time role.
          </p>
        </>
      ),
    },
  ],
  gallery: {
    label: "a few screens",
    picture: {
      src: "/uploads/car-accident-reporting-app/crash-reports.jpg",
      alt: "The CHP crash-report tool listing recent injury and fatal crashes",
      width: 1319,
      height: 1198,
    },
    caption: "The CHP crash-report tool",
  },
  nextCase: {
    label: "Next case study",
    title: "Overture",
    href: "/work/overture",
  },
};
