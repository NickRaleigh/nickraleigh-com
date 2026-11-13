import type { Metadata } from "next";
import { homeContent } from "./content";
import { OrbitHero } from "@/components/OrbitHero";
import { CTA } from "@/components/CTA";
import { config } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: config.global.name,
  url: config.global.url,
  jobTitle: "Design Engineer & Senior Frontend Developer",
  email: config.CTA.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Longmont",
    addressRegion: "CO",
    addressCountry: "US",
  },
  knowsAbout: [
    "React",
    "Technical SEO",
    "Full-Stack Development",
    "Frontend Development",
    "UI/UX Design",
    "Programmatic SEO",
  ],
};

export default function Home() {
  const { hero, mosaics, whatIDo } = homeContent;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <OrbitHero hero={hero} mosaics={mosaics} />

      <section className="position" id="about">
        <div className="wrap">
          <p className="position__statement">
            {whatIDo.missionStatement.title}
            <span className="dim"> {whatIDo.missionStatement.description}</span>
          </p>

          <div className="position__pillars">
            {whatIDo.competencies.map((area, index) => (
              <div className="pillar" key={`${area.title}-${index}`}>
                <div className="pillar__idx mono">0{index + 1}</div>
                <h3 className="pillar__title">{area.title}</h3>
                <p className="pillar__desc">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA variant="dark" />
    </>
  );
}
