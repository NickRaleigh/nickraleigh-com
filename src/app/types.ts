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
};
