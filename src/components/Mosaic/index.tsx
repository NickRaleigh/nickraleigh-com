import type { Mosaic } from "@/app/types";
import { isEven, bem } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

type MosaicProps = {
  readonly content: Mosaic[];
};

export function Mosaic({ content }: MosaicProps) {
  return (
    <div className="mosaic-cards">
      {content.map((c, i) => (
        <Link className="mosaic-card" key={`${c}-${i}`} href={c.link}>
          <div className={bem("mosaic", { mirror: isEven(i) })}>
            {c.imgs.map((m, a) => (
              <span
                key={`${m}-${a}`}
                className={bem("mosaic__pane", {
                  large: a === 0,
                  "fade-right": a === 1,
                  wide: a === 2,
                  square: a === 3,
                })}
              >
                <Image
                  className="nav__logo"
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                />
              </span>
            ))}
          </div>
          <div className="mosaic-card__text">
            <div className="mosaic-card__row">
              <span className="mosaic-card__title">{c.title}</span>
              <span className="mosaic-card__highlight">
                <span className="mosaic-card__highlight-value">
                  {c.stat.title}
                </span>
                <span className="mosaic-card__highlight-label">
                  {c.stat.description}
                </span>
              </span>
            </div>
            <span className="mosaic-card__cta">
              Read the case study{" "}
              <span className="mosaic-card__arrow">&rsaquo;</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
