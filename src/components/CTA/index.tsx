import { config } from "@/config/site";
import Link from "next/link";

export function CTA() {
  return (
    <section className="cta cta--dark" id="contact">
      <div className="wrap">
        <h2 className="cta__title">{config.CTA.title}</h2>
        <p className="cta__text">{config.CTA.description}</p>
        <div className="cta__links">
          <Link href={config.CTA.link.href} className="btn btn--primary">
            {config.CTA.link.text}
          </Link>
        </div>
      </div>
    </section>
  );
}
