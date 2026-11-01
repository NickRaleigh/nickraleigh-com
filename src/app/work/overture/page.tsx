import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Mosaic/Card";
import { OvertureMosaic, OverturePageContent } from "./content";
import { bem } from "@/utils/helpers";
import { CTA } from "@/components/CTA";
import AutoplayDemo from "./coverage-map/AutoplayDemo";
import { CodeShowcase } from "./coverage-map/CodeShowcase";
import { ProfileShowcase } from "./ProfileShowcase";
import { PreloaderDemo } from "./PreloaderDemo";

export default function OvertureCaseStudy() {
  const {
    title,
    opener,
    metaRows,
    quickLinks,
    statsBar,
    quote,
    sections,
    coverageMap,
    profilePage,
    brand,
    screens,
    nextCase,
  } = OverturePageContent;

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
              <Card imgs={OvertureMosaic.imgs} />
              <nav className="case-head__jumplinks" aria-label="Section links">
                <span className="case-head__jumplinks-label mono">Jump to</span>
                <div className="case-head__jumplinks-row">
                  <div className="case-head__jumplinks-group">
                    {quickLinks.map((link) => (
                      <Link
                        href={link.href}
                        className="case-head__code-link"
                        key={link.href}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
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

      <section className="case-quote">
        <div className="wrap">
          <blockquote>
            <p>{quote.text}</p>
            <cite>
              {quote.author}, {quote.role}
            </cite>
          </blockquote>
        </div>
      </section>

      {sections.map((section) => (
        <section className="case-section" key={section.label}>
          <div className="wrap">
            <div className="case-section__grid">
              <span className="case-section__label mono">{section.label}</span>
              <div className="case-section__body">{section.body}</div>
            </div>
          </div>
        </section>
      ))}

      <section className="case-section" id={coverageMap.id}>
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label mono">{coverageMap.label}</span>
            <div className="case-section__body">
              {coverageMap.description}
              <div className="coverage-map-panel">
                <div className="coverage-map-panel__preview">
                  <span className="coverage-map-panel__preview-label mono">
                    {coverageMap.previewLabel}
                  </span>
                  <div id="coverage-map-demo">
                    <AutoplayDemo variant="full" />
                  </div>
                </div>
                <div className="coverage-map-panel__mobile-preview">
                  <video
                    src={coverageMap.mobileVideo.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <p className="coverage-map-panel__mobile-note">
                  {coverageMap.mobileNote}
                </p>
                <CodeShowcase />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section" id={profilePage.id}>
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label mono">{profilePage.label}</span>
            <div className="case-section__body">
              <h3>{profilePage.title}</h3>
              <p>{profilePage.description}</p>
              <ProfileShowcase steps={profilePage.steps} />
              <p className="case-section__note">{profilePage.footnote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section" id="growth">
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label mono">// where it went</span>
            <div className="case-section__body">
              <p>
                More recently the role stretched into growth. I have built
                technical SEO and content campaigns aimed at the different
                reasons an attorney joins: some want a professional
                community, some want to send referral work, some want to
                receive it.
              </p>
              <p>
                One directory SEO initiative I proposed and built took the
                site from roughly 50 organic search clicks a day to around
                850, and it now brings in a steady flow of new signups on
                its own.
              </p>
              <p>
                Owning one product for this long changes how you work. You
                stop shipping things you will regret, because you are the
                one who has to maintain them. A referral network lives or
                dies on trust, so the frontend has to feel dependable first
                and clever second.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section" id={brand.id}>
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label mono">{brand.label}</span>
            <div className="case-section__body">
              <p>{brand.intro}</p>

              <div className="brand-showcase">
                <div className="brand-showcase__grid">
                  <div className="brand-showcase__col">
                    <div className="brand-tile brand-tile--sketches">
                      <div className="brand-showcase__spec-label mono">
                        Logo process sketches
                      </div>
                      <div className="brand-showcase__sketches">
                        {brand.sketches.map((sketch) => (
                          <Image
                            key={sketch.src}
                            src={sketch.src}
                            alt={sketch.alt}
                            width={sketch.width}
                            height={sketch.height}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="brand-tile brand-tile--logo">
                      <Image
                        src={brand.logo.src}
                        alt={brand.logo.alt}
                        width={brand.logo.width}
                        height={brand.logo.height}
                      />
                      <p className="brand-tile__caption">Final logo</p>
                    </div>

                    <div className="brand-tile brand-tile--type">
                      <div className="brand-showcase__spec-label mono">
                        Typography &amp; color
                      </div>
                      <p className="brand-showcase__type-sample brand-showcase__type-sample--serif">
                        {brand.typography.serifSample}
                      </p>
                      <p className="brand-showcase__type-caption">
                        {brand.typography.serifCaption}
                      </p>
                      <p className="brand-showcase__type-sample brand-showcase__type-sample--sans">
                        {brand.typography.sansSample}
                      </p>
                      <p className="brand-showcase__type-caption">
                        {brand.typography.sansCaption}
                      </p>
                      <div className="brand-showcase__swatches">
                        {brand.swatches.map((swatch) => (
                          <div
                            className="brand-showcase__swatch"
                            key={swatch.label}
                            style={{
                              background: swatch.color,
                              color: swatch.textColor ?? "var(--color-text)",
                            }}
                          >
                            {swatch.label}
                          </div>
                        ))}
                      </div>
                      <p className="brand-showcase__color-note">
                        {brand.colorNote}
                      </p>
                    </div>
                  </div>

                  <div className="brand-showcase__col brand-showcase__col--right">
                    {brand.studies.map((study) => (
                      <div className="motion-study brand-tile--study" key={study.num}>
                        <div className="motion-study__label">
                          <span className="mono">{study.num}</span>
                          <span>{study.title}</span>
                        </div>
                        <div
                          className={`motion-study__stage${study.kind === "video" ? " motion-study__stage--globe" : ""}`}
                        >
                          {study.kind === "preloader" ? (
                            <PreloaderDemo />
                          ) : (
                            study.video && (
                              <video
                                className="motion-study__capture"
                                src={study.video.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            )
                          )}
                        </div>
                        <p className="brand-tile__caption">{study.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-gallery">
        <div className="wrap">
          <span className="case-gallery__label mono">{screens.label}</span>
          <div className="case-gallery__items">
            {screens.items.map((item) => (
              <figure className="case-gallery__item" key={item.picture.src}>
                <Image
                  src={item.picture.src}
                  alt={item.picture.alt}
                  width={item.picture.width}
                  height={item.picture.height}
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="case-next">
        <div className="wrap">
          <div>
            <div className="case-next__label">{nextCase.label}</div>
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
