import type { Mosaic } from "@/app/types";
import Link from "next/link";
import { Card } from "./Card";
import { isEven } from "@/utils/helpers";

type MosaicProps = {
  readonly content: Mosaic[];
};

export function Mosaic({ content }: MosaicProps) {
  return (
    <div className="mosaic-cards">
      {content.map((c, i) => (
        <Link className="mosaic-card" key={`${c}-${i}`} href={c.link}>
          <Card imgs={c.imgs} flip={isEven(i)} />
          <div className="mosaic-card__text">
            <div className="mosaic-card__row">
              <span className="mosaic-card__title">{c.title}</span>
              <span className="mosaic-card__highlight">
                <span className="mosaic-card__highlight-value">
                  {c.stat.title.map((g) => g)}
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
