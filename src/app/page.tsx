import { homeContent } from "./content";
import { toLowerHyphenCase } from "@/utils/helpers";

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
  const { hero } = homeContent;
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
          <div className="mosaic-cards">
            <a className="mosaic-card" href="/work/overture">
              <div className="mosaic">
                <span className="mosaic__pane mosaic__pane--large">
                  <img
                    src="/uploads/overture/mosaic-large@1x.webp?v=1791478611"
                    srcSet="/uploads/overture/mosaic-large@1x.webp?v=1791478611 1x, /uploads/overture/mosaic-large.webp?v=1791478611 2x"
                    width="542"
                    height="312"
                    alt="Coverage map of US states with active Overture attorneys"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="mosaic__pane mosaic__pane--tall mosaic__pane--fade-right">
                  <img
                    src="/uploads/overture/mosaic-tall@1x.webp?v=1791576132"
                    srcSet="/uploads/overture/mosaic-tall@1x.webp?v=1791576132 1x, /uploads/overture/mosaic-tall.webp?v=1791576132 2x"
                    width="176"
                    height="313"
                    alt="An attorney&#039;s profile page on Overture"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="mosaic__pane mosaic__pane--wide">
                  <img
                    src="/uploads/overture/mosaic-wide@1x.webp?v=1791478611"
                    srcSet="/uploads/overture/mosaic-wide@1x.webp?v=1791478611 1x, /uploads/overture/mosaic-wide.webp?v=1791478611 2x"
                    width="542"
                    height="151"
                    alt="Referral status tracker showing the steps of a referral"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="mosaic__pane mosaic__pane--square">
                  <img
                    src="/uploads/overture/mosaic-square@1x.webp?v=1791478611"
                    srcSet="/uploads/overture/mosaic-square@1x.webp?v=1791478611 1x, /uploads/overture/mosaic-square.webp?v=1791478611 2x"
                    width="177"
                    height="148"
                    alt="The Overture wordmark"
                    loading="eager"
                    decoding="async"
                  />
                </span>
              </div>
              <div className="mosaic-card__text">
                <div className="mosaic-card__row">
                  <span className="mosaic-card__title">Overture</span>
                  <span className="mosaic-card__highlight">
                    <span className="mosaic-card__highlight-value">6,000+</span>
                    <span className="mosaic-card__highlight-label">
                      attorneys on the platform
                    </span>
                  </span>
                </div>
                <span className="mosaic-card__cta">
                  Read the case study{" "}
                  <span className="mosaic-card__arrow">&rsaquo;</span>
                </span>
              </div>
            </a>
            <a className="mosaic-card" href="/work/car-accident-reporting-app">
              <div className="mosaic mosaic--mirror">
                <span className="mosaic__pane mosaic__pane--large">
                  <img
                    src="/uploads/car-accident-reporting-app/mosaic-large@1x.webp?v=1791478611"
                    srcSet="/uploads/car-accident-reporting-app/mosaic-large@1x.webp?v=1791478611 1x, /uploads/car-accident-reporting-app/mosaic-large.webp?v=1791478611 2x"
                    width="542"
                    height="312"
                    alt="Map of reported crashes clustered by location"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="mosaic__pane mosaic__pane--tall mosaic__pane--fade-bottom">
                  <img
                    src="/uploads/car-accident-reporting-app/mosaic-tall@1x.webp?v=1791478611"
                    srcSet="/uploads/car-accident-reporting-app/mosaic-tall@1x.webp?v=1791478611 1x, /uploads/car-accident-reporting-app/mosaic-tall.webp?v=1791478611 2x"
                    width="176"
                    height="313"
                    alt="Ranked list of the most dangerous roads by crash count"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="mosaic__pane mosaic__pane--wide">
                  <img
                    src="/uploads/car-accident-reporting-app/mosaic-wide@1x.webp?v=1791478611"
                    srcSet="/uploads/car-accident-reporting-app/mosaic-wide@1x.webp?v=1791478611 1x, /uploads/car-accident-reporting-app/mosaic-wide.webp?v=1791478611 2x"
                    width="542"
                    height="151"
                    alt="Charts of collision types and crash time of day"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="mosaic__pane mosaic__pane--square">
                  <img
                    src="/uploads/car-accident-reporting-app/mosaic-square@1x.webp?v=1791478611"
                    srcSet="/uploads/car-accident-reporting-app/mosaic-square@1x.webp?v=1791478611 1x, /uploads/car-accident-reporting-app/mosaic-square.webp?v=1791478611 2x"
                    width="177"
                    height="148"
                    alt="The Westwood Law logo"
                    loading="eager"
                    decoding="async"
                  />
                </span>
              </div>
              <div className="mosaic-card__text">
                <div className="mosaic-card__row">
                  <span className="mosaic-card__title">Westwood Law</span>
                  <span className="mosaic-card__highlight">
                    <span className="mosaic-card__highlight-value">
                      260<span className="arrow">›</span>2,000+
                    </span>
                    <span className="mosaic-card__highlight-label">
                      monthly organic clicks, May to Aug 2026
                    </span>
                  </span>
                </div>
                <span className="mosaic-card__cta">
                  Read the case study{" "}
                  <span className="mosaic-card__arrow">&rsaquo;</span>
                </span>
              </div>
            </a>
          </div>

          <div className="hero__more">
            <a href="/work">Earlier work &rsaquo;</a>
          </div>
        </div>
      </header>

      <section className="position" id="about">
        <div className="wrap">
          <p className="position__statement">
            Software should get out of the way.
            <span className="dim">
              {" "}
              I design and build interfaces for people with something more
              important on their minds, turning complicated, multi-step
              processes into ones they can finish without a second thought. Then
              I write the front end myself, from first sketch to production.
            </span>
          </p>

          <div className="position__pillars">
            <div className="pillar">
              <div className="pillar__idx mono">01</div>
              <h3 className="pillar__title">Product Design</h3>
              <p className="pillar__desc">
                Interface, interaction and brand design, from wireframes to
                final UI. I designed Overture&#039;s product and brand from
                scratch.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar__idx mono">02</div>
              <h3 className="pillar__title">Front-End Engineering</h3>
              <p className="pillar__desc">
                Production React, built from my own designs. Components built
                for the full range of real content, not just the typical case.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar__idx mono">03</div>
              <h3 className="pillar__title">Data &amp; Growth Engineering</h3>
              <p className="pillar__desc">
                Data pipelines and programmatic pages that turn public data into
                tools people actually find, plus the technical SEO behind them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta cta--dark" id="contact">
        <div className="wrap">
          <h2 className="cta__title">Let&#039;s talk.</h2>
          <p className="cta__text">
            I like working with teams that care as much about how something
            feels to use as how it&#039;s built. If that sounds like yours,
            let&#039;s talk.
          </p>
          <div className="cta__links">
            <a href="/contact" className="btn btn--primary">
              Get in touch &rsaquo;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
