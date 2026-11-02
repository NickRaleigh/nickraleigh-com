import type { Mosaic } from "@/app/types";
import type { Picture, TextBlock } from "@/types/base";
import type { Anchor } from "@/types/base";
import { ReactElement, ReactNode } from "react";

type statSingle = {
  readonly title: {
    readonly variant?: string;
    readonly text: (string | ReactElement)[];
  };
  readonly description: string;
};

type CaseSection = {
  readonly label: string;
  readonly body: ReactNode;
};

type ProfileStep = {
  readonly num: string;
  readonly title: string;
  readonly caption: string;
  readonly changes?: readonly string[];
  readonly image: Picture;
};

type BrandSwatch = {
  readonly label: string;
  readonly color: string;
  readonly textColor?: string;
};

type MotionStudy = {
  readonly num: string;
  readonly title: string;
  readonly caption: string;
  readonly kind: "preloader" | "video";
  readonly video?: Picture & { readonly poster?: string };
};

type GalleryItem = {
  readonly picture: Picture;
  readonly caption: string;
};

export type OverturePage = {
  readonly mosaic: Mosaic[];
  readonly title: string;
  readonly opener: TextBlock;
  readonly metaRows: TextBlock[];
  readonly quickLinks: Anchor[];
  readonly statsBar: [first: statSingle, second: statSingle, third: statSingle];
  readonly quote: {
    readonly text: string;
    readonly author: string;
    readonly role: string;
  };
  readonly sections: readonly CaseSection[];
  readonly coverageMap: {
    readonly id: string;
    readonly label: string;
    readonly title: string;
    readonly description: ReactNode;
    readonly previewLabel: string;
    readonly mobileNote: string;
    readonly mobileVideo: Picture;
  };
  readonly profilePage: {
    readonly id: string;
    readonly label: string;
    readonly title: string;
    readonly description: ReactNode;
    readonly steps: readonly ProfileStep[];
    readonly footnote: string;
  };
  readonly brand: {
    readonly id: string;
    readonly label: string;
    readonly intro: string;
    readonly sketches: readonly Picture[];
    readonly logo: Picture;
    readonly typography: {
      readonly serifSample: string;
      readonly serifCaption: string;
      readonly sansSample: string;
      readonly sansCaption: string;
    };
    readonly swatches: readonly BrandSwatch[];
    readonly colorNote: string;
    readonly studies: readonly MotionStudy[];
  };
  readonly screens: {
    readonly label: string;
    readonly items: readonly GalleryItem[];
  };
  readonly nextCase: {
    readonly label: string;
    readonly title: string;
    readonly href: string;
  };
};
