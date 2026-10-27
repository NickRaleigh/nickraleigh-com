import { Picture, Anchor } from "@/types/base";
import { CTA } from "@/types/base";

export type SiteConfig = {
  readonly global: {
    readonly name: string;
    readonly location: string;
  };
  readonly nav: {
    readonly logo: Picture;
    readonly links: readonly Anchor[];
  };
  readonly CTA: CTA;
};

export const config: SiteConfig = {
  global: {
    name: "Nick Raleigh",
    location: "Longmont, CO",
  },
  nav: {
    logo: {
      src: "/uploads/logo-white-lines.png",
      alt: "",
      width: 163,
      height: 163,
    },
    links: [
      {
        href: "/about",
        text: "About",
      },
      {
        href: "/contact",
        text: "Contact",
      },
    ],
  },
  CTA: {
    title: "Contact Nick",
    description: `I like working with teams that care as much about how something feels to use as how it&#039;s built. If that sounds like yours, let's talk.`,
    link: {
      href: "/contact",
      text: "Get in touch",
    },
  },
};
