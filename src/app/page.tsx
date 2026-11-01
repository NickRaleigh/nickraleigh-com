import { homeContent } from "./content";
import { toLowerHyphenCase } from "@/utils/helpers";
import { Mosaic } from "@/components/Mosaic";
import { CTA } from "@/components/CTA";

type ItalicProps = {
  readonly text: string;
  readonly lettersIndex: readonly number[];
};
function ItalicName({ text, lettersIndex }: ItalicProps) {
  return Array.from(text).map((char, index) =>
    lettersIndex.includes(index) ? (
      <em key={`letter-${char}-${index}`}>{char}</em>
    ) : (
      char
    ),
  );
}

export default function Home() {
  const { hero, mosaics, whatIDo } = homeContent;
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <h1 className="hero__name">
            <span className="sr-only">{hero.firstName}</span>
            <span aria-hidden="true">
              <ItalicName
                text={hero.firstName}
                lettersIndex={hero.italics.firstName}
              />
            </span>{" "}
            <span className="sr-only">{hero.lastName}</span>
            <span aria-hidden="true">
              <ItalicName
                text={hero.lastName}
                lettersIndex={hero.italics.lastName}
              />
            </span>
          </h1>
          <div className="hero__infobar">
            {hero.infoBar.map((item) => (
              <div
                className="hero__infobar-item"
                key={`infobar-${toLowerHyphenCase(item)}`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="hero__statement-row">
            <p className="hero__statement">{hero.tagLine}</p>
          </div>
        </div>

        <div className="wrap">
          <Mosaic content={mosaics} />
        </div>
      </header>

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

      <CTA variant="dark" id="contact" />
    </>
  );
}
