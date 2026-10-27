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
        title: "6,000+",
        description: "attorneys on the platform",
      },
    },
    {
      title: "Overture",
      link: "/work/westwood",
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
        title: "6,000+",
        description: "attorneys on the platform",
      },
    },
  ],
};
