import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Mosaic/Card";
import { WestwoodLawMosaic, WestwoodLawPageContent } from "./content";
import { bem } from "@/utils/helpers";
import { CTA } from "@/components/CTA";

export default function WestwoodLawCaseStudy() {
  const {
    title,
    opener,
    metaRows,
    statsBar,
    sections,
    gallery,
    nextCase,
  } = WestwoodLawPageContent;
  return (
    <>
      <header className="case-head case-head--media">
        <div className="wrap">
          <h1 className="case-head__title">{title}</h1>
          <div className="case-head__grid">
            <div className="case-head__text">
              <p className="case-head__lead">{opener.title}</p>
              <p className="case-head__body">{opener.description}</p>
              <dl className="case-head__meta">
                {metaRows.map((row, index) => (
                  <div
                    className="case-head__meta-row"
                    key={`${row.title}-${index}`}
                  >
                    <dt>{row.title}</dt>
                    <dd>{row.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="case-head__media">
              <Card imgs={WestwoodLawMosaic.imgs} />
            </div>
          </div>
        </div>
      </header>

      <section className="case-stats">
        <div className="wrap">
          <div className="case-stats__grid">
            {statsBar.map((stat) => (
              <div className="case-stats__box" key={stat.description}>
                <div
                  className={`mono ${bem("case-stats__num", stat.title.variant ? { [stat.title.variant]: true } : {})}`}
                >
                  {stat.title.text.map((x) => x)}
                </div>
                <div className="case-stats__label">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section className="case-section" key={section.label}>
          <div className="wrap">
            <div className="case-section__grid">
              <span className="case-section__label eyebrow">{section.label}</span>
              <div className="case-section__body">{section.body}</div>
            </div>
          </div>
        </section>
      ))}

      <section className="case-gallery">
        <div className="wrap">
          <span className="case-gallery__label eyebrow">{gallery.label}</span>
          <div className="case-gallery__items">
            <figure className="case-gallery__item">
              <Image
                src={gallery.picture.src}
                alt={gallery.picture.alt}
                width={gallery.picture.width}
                height={gallery.picture.height}
              />
              <figcaption>{gallery.caption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="case-next">
        <div className="wrap">
          <div>
            <div className="case-next__label eyebrow">{nextCase.label}</div>
            <div className="case-next__title">{nextCase.title}</div>
          </div>
          <Link href={nextCase.href} className="case-next__arrow">
            ›
          </Link>
        </div>
      </section>

      <CTA variant="case" />
    </>
  );
}
