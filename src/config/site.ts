import { Picture, Anchor } from "@/types/base";

export type SiteConfig = {
    readonly global: {
        readonly name: string;
        readonly location: string;
    },
    readonly nav: {
        readonly logo: Picture;
        readonly links: readonly Anchor[];
    }
}

export const config: SiteConfig = {
  global: {
    name: "Nick Raleigh",
    location: "Longmont, CO",
  },
  nav: {
    logo: {
      src: "/uploads/logo-white-lines.png",
      alt: "Logo",
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
};