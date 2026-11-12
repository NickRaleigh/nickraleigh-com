import type { Picture } from "@/types/base";
import type { TextBlock } from "@/types/base";

// Five images, in a fixed grid position order (see Mosaic/Card): a
// full-height pane, then the top/bottom pair of the middle column, then the
// top/bottom pair of the outer column. `flip` mirrors which side the
// full-height pane lands on without changing this order.
export type Mosaic = {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly imgs: [Picture, Picture, Picture, Picture, Picture];
  readonly link: string;
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
  readonly mosaics: readonly [Mosaic, Mosaic];
  readonly whatIDo: {
    readonly missionStatement: TextBlock;
    readonly competencies: TextBlock[];
  };
};
