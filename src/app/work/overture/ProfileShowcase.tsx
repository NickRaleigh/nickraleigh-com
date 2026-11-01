"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Picture } from "@/types/base";

type ProfileStep = {
  readonly num: string;
  readonly title: string;
  readonly caption: string;
  readonly changes?: readonly string[];
  readonly image: Picture;
};

type ProfileShowcaseProps = {
  readonly steps: readonly ProfileStep[];
};

export function ProfileShowcase({ steps }: ProfileShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="profile-showcase profile-showcase--enhanced">
      <div className="profile-showcase__control" role="tablist" aria-label="Profile design steps">
        {steps.map((step, index) => (
          <button
            key={step.num}
            type="button"
            role="tab"
            className="profile-showcase__tab"
            aria-selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span className="profile-showcase__tab-num mono">{step.num}</span>
            <span className="profile-showcase__tab-title">{step.title}</span>
          </button>
        ))}
      </div>

      <div className="profile-showcase__list">
        {steps.map((step, index) => (
          <div
            className={`profile-showcase__step${index === activeIndex ? " profile-showcase__step--active" : ""}`}
            key={step.num}
          >
            <div className="profile-showcase__step-head">
              <div className="profile-showcase__step-label">
                <span className="profile-showcase__rail">
                  <span
                    className={`profile-showcase__node${index === activeIndex ? " profile-showcase__node--accent" : ""}`}
                  />
                </span>
                <span>
                  <span className="profile-showcase__num mono">{step.num}</span>
                  <span className="profile-showcase__title">{step.title}</span>
                </span>
              </div>
              <p className="profile-showcase__caption">{step.caption}</p>
            </div>

            {step.changes && (
              <div className="profile-showcase__changes">
                <div className="profile-showcase__changes-label eyebrow">
                  What improved in this round
                </div>
                <ul className="profile-showcase__changes-list">
                  {step.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="profile-showcase__media">
              <Link
                href={step.image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-showcase__thumb"
              >
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                />
                <span className="profile-showcase__fade" />
                <span className="profile-showcase__view-label">View full design</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
