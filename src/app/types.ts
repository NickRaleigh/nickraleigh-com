import type { Picture } from "@/types/base";
import type { ReactElement } from "react";
import type { TextBlock, CTA } from "@/types/base";

export type Mosaic = {
  readonly title: string;
  readonly imgs: Picture[];
  readonly link: string;
  readonly stat: {
    readonly title: (string | ReactElement)[];
    readonly description: string;
  };
};

export type HomepageContent = {
  readonly hero: {
    readonly firstName: string;
    readonly lastName: string;
    readonly italics: {
      readonly firstName: readonly number[];
      readonly lastName: readonly number[];
    };
    readonly infoBar: [one: string, two: string, three: string, four: string];
    readonly tagLine: string;
  };
  readonly mosaics: Mosaic[];
  readonly whatIDo: {
    readonly missionStatement: TextBlock;
    readonly competencies: TextBlock[];
  };
};
