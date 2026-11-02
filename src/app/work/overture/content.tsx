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
      "I designed the brand from scratch, translating early whiteboard sessions into high-fidelity mockups, then crafted the entire frontend with React. I've owned every new UI feature, bugfix, and UX improvement since 2022",
  },
  metaRows: [
    {
      title: "Role",
      description: "Founding Designer & Senior Frontend Developer",
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
      text: "Inner Circle",
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
      text: "Brand & design system",
      href: "#brand-showcase",
    },
    {
      text: "Looking back",
      href: "#growth",
    },
  ],
  statsBar: [
    {
      title: {
        text: ["6,000+"],
      },
      description: "attorneys on the network",
    },
    {
      title: {
        variant: "sm",
        text: ["Vendor of the Year"],
      },
      description: "California Lawyers Association",
    },
    {
      title: {
        text: ["~50", <span className="arrow">›</span>, "~850"],
      },
      description: "daily organic clicks from one SEO initiative",
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
      label: "overview",
      body: (
        <>
          <h3>A peer referral platform for small firms and solo attorneys</h3>
          <p>
            Overtue was built around giving attorneys the tools to legally refer
            work outside of their wheelhouse to a network of vetted, qualified
            attorneys, while collecting referral fees.
          </p>
          <p>
            The main workflow of the platform includes posting referrals,
            viewing and chatting with candidates, selecting one (or several)
            attorneys simultanously to engage the client, and sending out a
            client-attorney introduction for the selected attorney(s) handling
            the referral.
          </p>
          <p>
            Overture also tracks the status of every referral so both sides know
            who needs to take the next step, step-by-step engagement agreement
            e-signature delivery to client, and simplified client invoicing that
            automatically splits fees to all parties.
          </p>
          <p>
            In early 2022 the CEO of our parent company asked me to put together
            a few simple Figma screens to show colleagues and potential
            investors. In a few short months thereafter, with some strong
            initial interest, I was delighted to be the founding designer for
            all things Overture. I worked with our small team to expand the
            initial Figma mockup into a real platform, starting with the brand
            and design system, and mapping our whiteboard UX sessions into
            designed mockups.
          </p>
          <p>
            In a larger company, branding, UI design, and frontend development
            would've been handled by different actors.{" "}
            <b>
              In a small startup like Overture, I owned the full-breadth of all
              of these deliverables. It was on this project that I really was
              able to engage the work I love doing: solving a problem visually,
              technically, and how it best suits the user.
            </b>
          </p>
          <h3>My Contributions and Responsibilities:</h3>
          <ul>
            <li>
              Branding: identity, design system, marketing website & email
              templates
            </li>
            <li>
              The React frontend, integrating API endpoints built by our backend
              engineers on Django
            </li>
            <li>
              Introducing new features starting as an idea from product owners,
              developing them into Figma mockups, then building code around
              them, and finally refining them as users interact with them.
            </li>
            <li>
              The public marketing site, revised as the positioning evolved
            </li>
            <li>Keeping the codebase stable and manageable for over 4 years</li>
          </ul>
        </>
      ),
    },
  ],
  coverageMap: {
    id: "coverage-map-showcase",
    label: "Trusted networks",
    title: "Inner Circle",
    description: (
      <p>
        Inner Circle is a coverage map I designed and built. As attorneys add
        colleagues to their network, the map lights up every state those
        colleagues practice in. The idea was to “gamify” referral coverage and
        give people a reason to connect with more attorneys.
        <br />
        <br />
        We wanted attorneys to see at a glance where their network had coverage
        and, more importantly, where it didn’t. I designed a plain list of
        colleagues first, but it was hard to spot the gaps. A map makes them
        obvious: any unlit state is somewhere you can’t send a referral yet. The
        goal was to fill the whole map, so attorneys would have someone to send
        any referral to, anywhere in the country.
        <br />
        <br />
        The concept was already dense, so instead of adding drill-down views,
        hovering a state shows every connection you have there. All the detail
        stays in one place without making the map harder to navigate. The
        animation was meant to make lighting up a new state feel like a small
        reward.
        <br />
        <br />I built the SVG map as a custom React component, used Redux to
        keep it in sync as the network changes, wrote a tooltip that follows the
        cursor and fills in each state’s details, and timed the animations with
        homemade SCSS mixins. Below is a working demo, separated from the live
        app and running on mock data, alongside the code.
      </p>
    ),
    previewLabel:
      "Shipped feature of the Overture member dashboard. Live demo, running on mock data.",
    mobileNote:
      "Recorded preview: the interactive demo runs on larger screens.",
    mobileVideo: {
      src: "/uploads/overture/hero-map-preview.webm",
      alt: "Recorded preview of the trusted network map",
      width: 982,
      height: 605,
    },
  },
  profilePage: {
    id: "profile-showcase",
    label: "the profile page",
    title: "From contact card to trust signals",
    description: (
      <>
        <p>
          When an attorney posts a referral, several colleagues respond, and the
          poster has to choose one, usually by reading each responder's profile.
          V1 shipped to meet our launch deadline and was little more than a
          contact card. Profiles looked alike, so people were choosing on very
          little information.
        </p>
        <p>
          Over three rounds of design, I reworked the page around one question:
          can I trust this person with my client? Signals are ordered by
          strength. Common ground comes first, because a shared school, bar
          association or network is the strongest reason to trust someone.
          Client reviews from Avvo, Martindale and Google come next, then peer
          recommendations, which are fewer but carry real weight with other
          attorneys.
        </p>
        <p>
          Later we made these profiles publically available and indexed by
          search engines. Organic search clicks grew from about 50 a day to
          around 850, and the directory now brings in a steady flow of new
          signups on its own.
        </p>
      </>
    ),
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
    label: "brand and design systems",
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
      sansCaption: "Jost, for body copy and UI",
    },
    swatches: [
      { label: "Black", color: "#0b0d12", textColor: "#f4f2ec" },
      { label: "Grey 1", color: "#3a3f47" },
      { label: "Grey 2", color: "#6b7078" },
      { label: "Grey 3", color: "#9aa3b2" },
      { label: "Grey 4", color: "#d7dade" },
      { label: "Link Blue", color: "#1890ff", textColor: "#f4f2ec" },
      { label: "Orange", color: "#e66b0e", textColor: "#f4f2ec" },
    ],
    colorNote: `Grayscale carried the UI; color was reserved for meaning.
    Blue marked primary actions and links, orange was kept for upgrade and
    premium CTAs, and photography supplied everything else.`,
    system: {
      note: `The same restraint became the interface: paper surfaces,
      black text, a hairline grey border, one muted grey for secondary
      text. Blue and orange were the only colors let in beyond that: blue
      for messaging, orange for the primary call to action, and a neutral
      grey outline for everything else.`,
      tokens: [
        { role: "Surface", label: "Paper", color: "#f4f2ec" },
        { role: "Text", label: "Black", color: "#0b0d12" },
        { role: "Border", label: "Grey 4", color: "#d7dade" },
        { role: "Muted text", label: "Grey 2", color: "#6b7078" },
        { role: "Accent", label: "Link blue", color: "#1890ff" },
        { role: "CTA", label: "Orange", color: "#e66b0e" },
      ],
      buttons: [
        { label: "Send Message", variant: "solid", accent: "#1890ff" },
        { label: "Send Direct Referral", variant: "solid", accent: "#e66b0e" },
        { label: "Back", variant: "secondary" },
      ],
    },
    studies: [
      {
        num: "Study 01",
        title: "The branded preloader",
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
    label: "a few screens",
    items: [
      {
        video: {
          src: "/uploads/overture/onboarding-workflow.webm",
          alt: "Recorded capture of the Overture onboarding flow",
          width: 2307,
          height: 1215,
        },
        caption: "The onboarding flow",
      },
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
          src: "/uploads/overture/attorney-directory.png",
          alt: "The Overture attorney directory and search",
          width: 1966,
          height: 1127,
        },
        caption: "Attorney directory and search",
      },
      {
        picture: {
          src: "/uploads/overture/referral-status-tracker.png",
          alt: "The referral status tracker, showing each step of a referral",
          width: 2317,
          height: 1219,
        },
        caption: "Referral status tracker",
      },
      {
        picture: {
          src: "/uploads/overture/esign-upload-flow.png",
          alt: "The e-signature upload flow for an engagement agreement",
          width: 1480,
          height: 1014,
        },
        caption: "E-signature upload flow",
      },
      {
        picture: {
          src: "/uploads/overture/invoice-preview.png",
          alt: "A client invoice preview, with fees split across parties",
          width: 2479,
          height: 2250,
        },
        caption: "Client invoice preview",
      },
      {
        picture: {
          src: "/uploads/overture/client-introduction-modal.png",
          alt: "The client-attorney introduction modal",
          width: 2318,
          height: 1165,
        },
        caption: "Client-attorney introduction",
      },
    ],
  },
  nextCase: {
    label: "Next case study",
    title: "Law Firm Website with Local Car Accident Reporting App",
    href: "/work/car-accident-reporting-app",
  },
};
