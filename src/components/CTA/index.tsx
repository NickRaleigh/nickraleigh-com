import { config } from "@/config/site";

type CTAProps = {
  readonly variant?: "dark" | "case";
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly email?: string;
};

export function CTA({ variant, id = "contact", title, description, email }: CTAProps) {
  return (
    <section
      className={`cta${variant ? ` cta--${variant}` : ""}`}
      id={id}
    >
      <div className="wrap">
        <h2 className="cta__title">{title ?? config.CTA.title}</h2>
        <p className="cta__text">{description ?? config.CTA.description}</p>
        <div className="cta__actions">
          <a className="cta__email" href={`mailto:${email ?? config.CTA.email}`}>
            {email ?? config.CTA.email}
          </a>
        </div>
      </div>
    </section>
  );
}
