import { Fragment, type CSSProperties } from "react";
import type { Metadata } from "next";
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
import { StatusBannerDemo } from "./status-banner/StatusBannerDemo";
import { StatusBannerTabs } from "./status-banner/StatusBannerTabs";
import { StatusBannerProvider } from "./status-banner/StatusBannerContext";
import { MediaGallery } from "./MediaGallery";

export const metadata: Metadata = {
  title: "Overture · Design and Frontend for a Lawyer Referral Network · Nick Raleigh",
  description:
    "How I helped start Overture in 2022: the brand, the product design, and the React frontend for a nationwide lawyer-to-lawyer referral network, owned since.",
  alternates: { canonical: "/work/overture" },
  openGraph: { images: ["/uploads/overture/marketing-laptop.jpg"] },
  twitter: { images: ["/uploads/overture/marketing-laptop.jpg"] },
};

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
              <Card imgs={OvertureMosaic.imgs} glow="amber" />
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
                  {stat.title.text.map((x, i) => (
                    <Fragment key={i}>{x}</Fragment>
                  ))}
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
              <span className="case-section__label eyebrow">
                {section.label}
              </span>
              <div className="case-section__layout">
                <div className="case-section__body">{section.body}</div>
                <aside className="case-section__contents">
                  <span className="case-section__contents-label eyebrow">
                    Jump to
                  </span>
                  <nav aria-label="Section links">
                    {quickLinks.map((link) => (
                      <Link
                        href={link.href}
                        className="case-section__contents-link"
                        key={link.href}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </aside>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="case-section" id={coverageMap.id}>
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label eyebrow">
              {coverageMap.label}
            </span>
            <div className="case-section__body">
              <h3>{coverageMap.title}</h3>
              {coverageMap.description}
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="coverage-map-panel">
            <div className="coverage-map-panel__preview">
              <span className="coverage-map-panel__preview-label eyebrow">
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
              <p className="coverage-map-panel__mobile-note">
                {coverageMap.mobileNote}
              </p>
            </div>
            <CodeShowcase />
          </div>
        </div>
      </section>

      <section className="case-section" id="status-banner-showcase">
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label eyebrow">Status banner</span>
            <StatusBannerProvider>
              <div className="case-section__row">
                <div className="case-section__body">
                  <h3>Live AI suggestions for busy attorneys</h3>
                  <p>
                    We recently started surfacing more data on every referral to
                    help attorneys decide whether to apply: whether it’s
                    trending, whether it matches their practice areas, and
                    whether the poster is engaging with responses.
                  </p>
                  <p>
                    The page was already dense, so rather than adding more
                    numbers, I wanted to turn that data into one
                    plain-language suggestion. My first version was a
                    rules-based banner. It was accurate, but every attorney
                    saw the same message. So I built this prototype, which
                    reads the attorney’s profile along with the referral’s
                    performance and tells them, in a sentence or two,
                    whether it’s worth their time.
                  </p>
                  <p>
                    The demo calls Claude’s API and streams the response as it’s
                    generated. It starts on a cached example; hit Regenerate for
                    a live call, and pick a referral state to see how the
                    message changes. If the endpoint fails, the banner falls
                    back to a rules-based version.
                  </p>
                </div>
                <aside className="case-section__aside">
                  <StatusBannerDemo />
                  <StatusBannerTabs />
                </aside>
              </div>
            </StatusBannerProvider>
          </div>
        </div>
      </section>

      <section className="case-section" id={profilePage.id}>
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label eyebrow">
              {profilePage.label}
            </span>
            <div className="case-section__body">
              <h3>{profilePage.title}</h3>
              {profilePage.description}
              <ProfileShowcase steps={profilePage.steps} />
              <p className="case-section__note">{profilePage.footnote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section" id={brand.id}>
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label eyebrow">{brand.label}</span>
            <div className="case-section__body">
              <h3>Developing the look and feel</h3>
              <p>{brand.intro}</p>

              <div className="brand-showcase">
                <div className="brand-showcase__grid">
                  <div className="brand-showcase__col">
                    <div className="brand-tile brand-tile--sketches">
                      <div className="brand-showcase__spec-label eyebrow">
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
                      <div className="brand-showcase__spec-label eyebrow">
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

                    <div className="brand-tile brand-tile--system">
                      <div className="brand-showcase__spec-label eyebrow">
                        Brand to UI system
                      </div>
                      <p className="brand-showcase__system-note">
                        {brand.system.note}
                      </p>
                      <div className="brand-showcase__tokens">
                        {brand.system.tokens.map((token) => (
                          <div
                            className="brand-showcase__token"
                            key={token.role}
                          >
                            <span
                              className="brand-showcase__token-swatch"
                              style={{ background: token.color }}
                            />
                            <span className="brand-showcase__token-role">
                              {token.role}
                            </span>
                            <span className="brand-showcase__token-label">
                              {token.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="brand-showcase__buttons">
                        {brand.system.buttons.map((button) => (
                          <span
                            className={`brand-showcase__button brand-showcase__button--${button.variant}`}
                            key={button.label}
                            style={
                              button.accent
                                ? ({
                                    "--button-accent": button.accent,
                                  } as CSSProperties)
                                : undefined
                            }
                          >
                            {button.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="brand-showcase__col brand-showcase__col--right">
                    {brand.studies.map((study) => (
                      <div
                        className="motion-study brand-tile--study"
                        key={study.num}
                      >
                        <div className="motion-study__label">
                          <span className="eyebrow">{study.num}</span>
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
          <span className="case-gallery__label eyebrow">{screens.label}</span>
          <MediaGallery items={screens.items} />
        </div>
      </section>

      <section className="case-section" id="growth">
        <div className="wrap">
          <div className="case-section__grid">
            <span className="case-section__label eyebrow">Looking back</span>
            <div className="case-section__body">
              <h3>Four years on one project</h3>
              <p>
                Owning one product for this long changes how I work. You stop
                shipping things you’ll regret, because you’re the one who has to
                maintain them. A referral network lives or dies on trust, so the
                frontend has to feel dependable first and clever second.
              </p>

              <p>
                In hindsight, here are the biggest things I'd do differently:
              </p>
              <ul>
                <li>
                  Work close to the user, early. The profile page’s V1
                  shipped as little more than a contact card, because we
                  hadn’t yet learned what actually makes an attorney trust
                  someone with a referral. It took three more rounds,
                  working closer with the people using it, to get there.
                </li>
                <li>
                  Build rougher things first and see if they get traction. The
                  Inner Circle was a complex component to ship before knowing if
                  users would use it. The finesse and craftsmanship best serve a
                  working idea.
                </li>
                <li>
                  Build accessibility in from the start. Hover-only interactions
                  and visual-first components were easy to ship and are harder
                  to fix later. It’s the first thing I’d bake into the component
                  library if I started over.
                </li>
              </ul>
            </div>
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
