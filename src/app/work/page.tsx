import Image from "next/image";
import Link from "next/link";
import { workContent } from "./content";
import { CTA } from "@/components/CTA";

export default function Work() {
  const { pagehead, flagship, cta } = workContent;
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <div className="pagehead__kicker eyebrow">{pagehead.kicker}</div>
          <h1 className="pagehead__title">{pagehead.title}</h1>
          <p className="pagehead__lead">{pagehead.description}</p>
        </div>
      </header>

      <section className="work">
        <div className="wrap">
          <div className="gallery-grid">
            {flagship.map((item) => (
              <Link
                href={item.link}
                className="gallery-card gallery-card--flagship"
                data-accent={item.accent}
                key={item.link}
              >
                <div className="gallery-card__art">
                  {item.badge && (
                    <span className="gallery-card__badge">{item.badge}</span>
                  )}
                  <Image
                    src={item.art.src}
                    alt={item.art.alt}
                    width={item.art.width}
                    height={item.art.height}
                  />
                </div>
                <div className="gallery-card__row">
                  <div className="gallery-card__info">
                    <span className="gallery-card__title">{item.title}</span>
                    <span className="gallery-card__meta">{item.meta}</span>
                  </div>
                  <div className="gallery-card__highlight">
                    <span className="gallery-card__highlight-value mono">
                      {item.highlightValue}
                    </span>
                    <span className="gallery-card__highlight-label">
                      {item.highlightLabel}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA title={cta.title} description={cta.description} links={cta.links} />
    </>
  );
}
