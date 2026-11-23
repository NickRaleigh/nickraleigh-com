import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { homeContent } from "./content";
import { OrbitHero } from "@/components/OrbitHero";
import { HandDrawnButtonOutline } from "@/components/OrbitHero/HandDrawnButtonOutline";
import { ScrollHighlight } from "@/components/ScrollHighlight";
import { CTA } from "@/components/CTA";
import { config } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Matches the mockup's two-tone pillar titles ("Front-End *Engineering*")
// without hand-splitting each one in content.tsx — every title here happens
// to be lead word(s) + one closing word.
function splitTitleEmphasis(title: string) {
  const splitIndex = title.lastIndexOf(" ");
  return {
    lead: title.slice(0, splitIndex),
    emphasis: title.slice(splitIndex + 1),
  };
}

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
          <Image
            className="position__photo"
            src={whatIDo.photo.src}
            alt={whatIDo.photo.alt}
            width={whatIDo.photo.width}
            height={whatIDo.photo.height}
          />

          <ScrollHighlight
            text={whatIDo.missionStatement.description}
            className="position__statement"
          />

          <Link href={whatIDo.aboutLink.href} className="hero__see-work position__about-link">
            <HandDrawnButtonOutline />
            <span className="hero__see-work-label">{whatIDo.aboutLink.text}</span>
          </Link>

          <div className="position__pillars">
            {whatIDo.competencies.map((area) => {
              const { lead, emphasis } = splitTitleEmphasis(area.title);
              return (
                <div className="pillar" key={area.title}>
                  <div className="pillar__icon">
                    <Image
                      src={area.icon.src}
                      alt={area.icon.alt}
                      width={area.icon.width}
                      height={area.icon.height}
                    />
                  </div>
                  <h3 className="pillar__title">
                    {lead} <em>{emphasis}</em>
                  </h3>
                  <p className="pillar__desc">{area.description}</p>
                </div>
              );
            })}
          </div>

          <ul className="position__skills">
            {whatIDo.skills.map((skill) => (
              <li className="position__skill" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA variant="dark" />
    </>
  );
}
