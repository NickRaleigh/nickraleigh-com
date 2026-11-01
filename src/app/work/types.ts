import type { ReactNode } from "react";
import type { Picture } from "@/types/base";

type CTALink = {
  readonly href: string;
  readonly text: string;
  readonly variant: "primary" | "secondary";
};

export type WorkItem = {
  readonly badge?: string;
  readonly accent: string;
  readonly art: Picture;
  readonly title: string;
  readonly meta: string;
  readonly link: string;
  readonly highlightValue: readonly ReactNode[];
  readonly highlightLabel: string;
};

export type WorkIndexPage = {
  readonly pagehead: {
    readonly kicker: string;
    readonly title: string;
    readonly description: string;
  };
  readonly flagship: readonly WorkItem[];
  readonly cta: {
    readonly title: string;
    readonly description: string;
    readonly links: readonly CTALink[];
  };
};
