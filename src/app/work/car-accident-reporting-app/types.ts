import type { ReactNode } from "react";
import type { Mosaic } from "@/app/types";
import type { TextBlock, Picture } from "@/types/base";

type StatSingle = {
  readonly title: {
    readonly variant?: string;
    readonly text: readonly ReactNode[];
  };
  readonly description: string;
};

type CaseSection = {
  readonly label: string;
  readonly body: ReactNode;
};

export type WestwoodLawPage = {
  readonly mosaic: Mosaic[];
  readonly title: string;
  readonly opener: TextBlock;
  readonly metaRows: readonly TextBlock[];
  readonly statsBar: readonly [StatSingle, StatSingle, StatSingle];
  readonly sections: readonly CaseSection[];
  readonly gallery: {
    readonly label: string;
    readonly picture: Picture;
    readonly caption: string;
  };
  readonly nextCase: {
    readonly label: string;
    readonly title: string;
    readonly href: string;
  };
};
