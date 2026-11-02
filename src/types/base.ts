export type Picture = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type Anchor = {
  readonly href: string;
  readonly text: string;
};

export type TextBlock = {
  readonly title: string;
  readonly description: string;
};

export type CTA = TextBlock & {
  readonly email: string;
};
