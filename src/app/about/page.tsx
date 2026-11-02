import type { Metadata } from "next";
import Image from "next/image";
import { aboutContent } from "./content";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Nick Raleigh · Design Engineer, Longmont",
  description:
    "Senior design engineer in Longmont, CO with 11+ years of experience. Bridging brand, product, and code to ship fast, performant, and search-optimized web apps.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const { pagehead, intro, timeline, values, personal, cta } = aboutContent;
  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <div className="pagehead__kicker eyebrow">{pagehead.kicker}</div>
          <h1 className="pagehead__title">{pagehead.title}</h1>
        </div>
      </header>

      <section className="intro">
        <div className="wrap">
          <div className="intro__grid">
            <div className="intro__aside">
              <span className="intro__label eyebrow">{intro.label}</span>
              <Image
                className="intro__photo"
                src={intro.photo.src}
                alt={intro.photo.alt}
                width={intro.photo.width}
                height={intro.photo.height}
              />
            </div>
            <div className="intro__body">
              {intro.paragraphs.map((paragraph, index) => (
                <p key={`intro-p-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="timeline">
        <div className="wrap">
          <div className="section-head">
            <h2>{timeline.sectionHead.title}</h2>
            {timeline.sectionHead.subtitle && (
              <span>{timeline.sectionHead.subtitle}</span>
            )}
          </div>
          {timeline.rows.map((row) => (
            <div className="tl-row" key={row.title}>
              <div className="tl-row__year mono">{row.year}</div>
              <div>
                <h3 className="tl-row__title">{row.title}</h3>
                <p>{row.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="values">
        <div className="wrap">
          <div className="section-head">
            <h2>{values.sectionHead.title}</h2>
            {values.sectionHead.subtitle && (
              <span>{values.sectionHead.subtitle}</span>
            )}
          </div>
          <div className="values__grid">
            {values.items.map((item) => (
              <div className="value" key={item.title}>
                <h3 className="value__title">{item.title}</h3>
                <p className="value__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="personal">
        <div className="wrap">
          <div className="section-head">
            <h2>{personal.sectionHead.title}</h2>
            {personal.sectionHead.subtitle && (
              <span>{personal.sectionHead.subtitle}</span>
            )}
          </div>
          <p className="personal__body">{personal.body}</p>
        </div>
      </section>

      <CTA title={cta.title} description={cta.description} />
    </>
  );
}
