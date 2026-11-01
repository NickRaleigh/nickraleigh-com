import type { ReactNode } from "react";
import type { Picture, TextBlock } from "@/types/base";

type SectionHead = {
  readonly title: string;
  readonly subtitle?: string;
};

type TimelineRow = {
  readonly year: string;
  readonly title: string;
  readonly description: string;
};

type CTALink = {
  readonly href: string;
  readonly text: string;
  readonly variant: "primary" | "secondary";
};

export type AboutPage = {
  readonly pagehead: {
    readonly kicker: string;
    readonly title: string;
  };
  readonly intro: {
    readonly label: string;
    readonly photo: Picture;
    readonly paragraphs: readonly ReactNode[][];
  };
  readonly timeline: {
    readonly sectionHead: SectionHead;
    readonly rows: readonly TimelineRow[];
  };
  readonly values: {
    readonly sectionHead: SectionHead;
    readonly items: readonly TextBlock[];
  };
  readonly personal: {
    readonly sectionHead: SectionHead;
    readonly body: string;
  };
  readonly cta: {
    readonly title: string;
    readonly description: string;
    readonly links: readonly CTALink[];
  };
};
