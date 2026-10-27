export const toLowerHyphenCase = (input: string) => {
  return input.replaceAll(" ", "-").toLowerCase();
};

export const isEven = (input: number): boolean => input % 2 === 0;

export function bem(name: string, modifiers: Record<string, boolean>): string {
  const entries = Object.entries(modifiers);
  const keys = entries
    .filter(([, value]) => value)
    .map(([key]) => `${name}--${key}`);
  return [name, ...keys].join(" ");
}
