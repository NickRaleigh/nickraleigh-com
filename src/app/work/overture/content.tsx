import type { Mosaic } from "@/app/types";
import type { OverturePage } from "./types";

export const OvertureMosaic: Mosaic = {
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
};

export const OverturePageContent: OverturePage = {
  mosaic: [OvertureMosaic],
  title: "Overture",
  opener: {
    title:
      "A nationwide lawyer-to-lawyer referral network I helped start in 2022.",
    description:
      "I built the brand, turned our whiteboard sessions into the product design, and built and still own the React frontend.",
  },
  metaRows: [
    {
      title: "Role",
      description: "Founding Designer & Frontend Developer",
    },
    {
      title: "Timeline",
      description: "2022 to present",
    },
    {
      title: "Team",
      description: "Five-person founding group",
    },
    {
      title: "Stack",
      description: "React, Django",
    },
  ],
  quickLinks: [
    {
      text: "Trusted network map",
      href: "#coverage-map-showcase",
    },
    {
      text: "Status banner: rules vs. a model",
      href: "/work/overture/status-banner",
    },
    {
      text: "Profile page",
      href: "#profile-showcase",
    },
    {
      text: "Growth",
      href: "#growth",
    },
    {
      text: "Brand",
      href: "#brand-showcase",
    },
  ],
  statsBar: [
    {
      title: {
	text: [ "6,000+" ],
      },
      description: "attorneys on the network",
    },
    {
      title: {
        variant: "sm",
        text: [ "Vendor of the Year" ],
      },
      description: "California Lawyers Association",
    },
    {
      title: {
	text: [ "~50", <span className='arrow'>›</span>, "~850" ]
      },
	description: "daily organic clicks from one SEO initiative"
    },
  ],
  quote: {
    text: `Nick has an ability to make everything look extremely polished,
    top-of-the-line, and just flow perfectly. He's always gone above and
    beyond, rapidly adapting to changes at impressive speed, juggling
    multiple projects and tasks expertly under tight deadlines.`,
    author: "Alex Lopez",
    role: "Backend Developer at Overture",
  },
  sections: [
    {
      label: "// overview",
      body: (
        <>
          <h3>A lawyer referral network for small firms</h3>
          <p>
            Overture is a lawyer referral network. When a firm takes a case
            outside its expertise, it can hand the matter to a trusted
            colleague through the platform and ethically share the fee.
            Both attorneys have to trust it completely, and their shared
            client has to be able to follow along.
          </p>
          <p>
            In 2022 I was the design and frontend half of the five-person
            group that started it. I built the brand from nothing, turned
            our whiteboard sessions into UI mockups, and built the entire
            React frontend from my own designs. I have owned it ever
            since.
          </p>
          <h3>What I own</h3>
          <ul>
            <li>
              The brand: identity, voice, and the visual system the whole
              product is built on
            </li>
            <li>The React frontend end to end, on a Django backend</li>
            <li>
              The member dashboard, where attorneys manage and track
              referrals
            </li>
            <li>
              The referral lifecycle, from posting a matter through
              engagement and payment
            </li>
            <li>The attorney directory and search</li>
            <li>
              The public marketing site, revised as the positioning
              evolved
            </li>
          </ul>
        </>
      ),
    },
  ],
  coverageMap: {
    id: "coverage-map-showcase",
    label: "// trusted networks",
    title: "Trusted networks",
    description: (
      <p>
        The trusted-network map is some of the most involved frontend work
        I did on Overture: an animated US map, live state highlighting,
        and an info panel that tracks mouse position and network data at
        once. The original relies on Overture&rsquo;s live Redux store, so
        what&rsquo;s mounted below is a decoupled rebuild running on mock
        data, using the same components and styles shown in the tabs
        underneath it.
      </p>
    ),
    previewLabel:
      "Shipped feature of the Overture member dashboard. Live demo, running on mock data.",
    mobileNote: "Recorded preview — the interactive demo runs on larger screens.",
    mobileVideo: {
      src: "/uploads/overture/hero-map-preview.webm",
      alt: "Recorded preview of the trusted network map",
      width: 982,
      height: 605,
    },
  },
  profilePage: {
    id: "profile-showcase",
    label: "// the profile page",
    title: "From contact card to referral decision",
    description: `Every referral on Overture starts with one attorney
    deciding whether to trust another with a client. The profile page is
    where that decision gets made. It took three rounds of design to get
    the page to answer the right question.`,
    steps: [
      {
        num: "01",
        title: "A contact card",
        caption: `Name, location, practice areas, a statement, and a way
        to get in touch. It tells you who the attorney is. It doesn't
        help you decide anything.`,
        image: {
          src: "/uploads/overture/profile-v1.png",
          alt: "First profile page design, a basic contact card",
          width: 1477,
          height: 949,
        },
      },
      {
        num: "02",
        title: "Common ground",
        caption: `Highlights compare you to the attorney: shared
        connections, schools, awards, and affiliations. A referral button
        joins messaging. The page now speaks to the person viewing it,
        but the actions are stuck at the bottom of a sidebar.`,
        changes: [
          "New: shared-connections list",
          "Referral button added, bottom of sidebar",
        ],
        image: {
          src: "/uploads/overture/profile-v2.png",
          alt: "Second profile page design, with shared connections highlighted",
          width: 1213,
          height: 1076,
        },
      },
      {
        num: "03",
        title: "Trust, in order",
        caption: `Actions move under the name, and mutual connections
        move into the header. Highlights shrink to a compact card, which
        makes room for client reviews and peer recommendations.`,
        changes: [
          "Actions moved under the name",
          "Mutual connections moved into the header",
          "New: client reviews and recommendations",
        ],
        image: {
          src: "/uploads/overture/profile-v3.png",
          alt: "Third profile page design, with actions moved under the name",
          width: 1400,
          height: 1079,
        },
      },
      {
        num: "Shipped",
        title: "In production",
        caption: `Built in React from the third design. School and
        association logos replaced the generic icons, a verified badge
        replaced the online indicator, and Recommend became an outline
        button so messaging and referring stay the two main actions.`,
        changes: [
          "Verified badge replaced the online indicator",
          "School and association logos replaced generic icons",
        ],
        image: {
          src: "/uploads/overture/profile-shipped.png",
          alt: "Shipped profile page design, live in production",
          width: 1526,
          height: 1136,
        },
      },
    ],
    footnote: "Names, photos, and details are placeholders.",
  },
  brand: {
    id: "brand-showcase",
    label: "// brand conceptualization",
    intro: `Before any of the frontend existed, Overture was a brand style
    guide: a type pairing, a deliberately restrained palette, and a logo
    mark built from a simple geometric lockup. Two motion studies below
    came out of that same design pass: the preloader, still running in
    production today, and a network globe that once ran on the marketing
    site's About page.`,
    sketches: [
      {
        src: "/uploads/overture/brand/process-sketch-1.png",
        alt: "Overture logo process sketch 1",
        width: 441,
        height: 468,
      },
      {
        src: "/uploads/overture/brand/process-sketch-2.png",
        alt: "Overture logo process sketch 2",
        width: 441,
        height: 468,
      },
      {
        src: "/uploads/overture/brand/process-sketch-3.png",
        alt: "Overture logo process sketch 3",
        width: 441,
        height: 468,
      },
      {
        src: "/uploads/overture/brand/process-sketch-4.png",
        alt: "Overture logo process sketch 4",
        width: 441,
        height: 468,
      },
    ],
    logo: {
      src: "/uploads/overture/brand/logo-lockup.png",
      alt: "Final Overture logo lockup",
      width: 692,
      height: 377,
    },
    typography: {
      serifSample: "Overture",
      serifCaption: "DM Serif Display, for headings",
      sansSample: "Overture",
      sansCaption: "Gilroy, for body copy and UI",
    },
    swatches: [
      { label: "Black", color: "#0b0d12", textColor: "#f4f2ec" },
      { label: "Grey 1", color: "#3a3f47" },
      { label: "Grey 2", color: "#6b7078" },
      { label: "Grey 3", color: "#9aa3b2" },
      { label: "Grey 4", color: "#d7dade" },
    ],
    colorNote: `Color was deliberately left out of the UI system. It was
    reserved for photography, not chrome.`,
    studies: [
      {
        num: "Study 01",
        title: "The preloader, shipped and still live in production",
        caption: `A motion aesthetic built from the same geometric
        lockup as the logo mark, still running in production today.`,
        kind: "preloader",
      },
      {
        num: "Study 02",
        title: "A network globe, once part of the marketing site",
        caption: `A motion aesthetic that ran on the About page for a
        while, hand-written with custom graphics, HTML, JS, and SCSS.
        It's no longer live, but this is a capture of it in motion.`,
        kind: "video",
        video: {
          src: "/uploads/overture/brand/globe-network.webm",
          alt: "Recorded capture of the Overture network globe motion study",
          width: 1159,
          height: 433,
        },
      },
    ],
  },
  screens: {
    label: "// a few screens",
    items: [
      {
        picture: {
          src: "/uploads/overture/dashboard-anonymized.png",
          alt: "The Overture member dashboard",
          width: 1893,
          height: 1060,
        },
        caption: "The member dashboard",
      },
      {
        picture: {
          src: "/uploads/overture/marketing-hero.jpg",
          alt: "The Overture public marketing site",
          width: 1600,
          height: 900,
        },
        caption: "The public marketing site",
      },
      {
        picture: {
          src: "/uploads/overture/directory.jpg",
          alt: "The Overture attorney directory and search",
          width: 1600,
          height: 900,
        },
        caption: "Attorney directory and search",
      },
    ],
  },
  nextCase: {
    label: "Next case study",
    title: "Law Firm Website with Local Car Accident Reporting App",
    href: "/work/car-accident-reporting-app",
  },
};
