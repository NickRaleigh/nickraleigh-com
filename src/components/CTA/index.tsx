import { config } from "@/config/site";
import Link from "next/link";

type CTALink = {
  readonly href: string;
  readonly text: string;
  readonly variant?: "primary" | "secondary";
};

type CTAProps = {
  readonly variant?: "dark" | "case";
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly links?: readonly CTALink[];
};

export function CTA({ variant, id, title, description, links }: CTAProps) {
  const resolvedLinks = links ?? [{ ...config.CTA.link, variant: "primary" as const }];
  return (
    <section
      className={`cta${variant ? ` cta--${variant}` : ""}`}
      id={id}
    >
      <div className="wrap">
        <h2 className="cta__title">{title ?? config.CTA.title}</h2>
        <p className="cta__text">{description ?? config.CTA.description}</p>
        <div className="cta__links">
          {resolvedLinks.map((link) => (
            <Link
              href={link.href}
              className={`btn btn--${link.variant ?? "primary"}`}
              key={link.href}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
