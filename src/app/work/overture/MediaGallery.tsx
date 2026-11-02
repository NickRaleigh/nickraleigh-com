"use client";

/* ==========================================================================
   MediaGallery.tsx
   --------------------------------------------------------------------------
   Replaces a column of 8 full-width screenshots/recordings (one scroll-beat
   each, the old .case-gallery__items markup) with a single large preview
   plus a thumbnail strip that drives it — same idea as a product gallery:
   click a thumbnail, the preview swaps. Trades the old "scroll through the
   whole tour" pacing for something scannable in one view.

   Thumbnails carry no caption of their own — at thumbnail width there's no
   room to show one without truncating it illegibly, and the active item's
   full caption is already readable under the big preview. Clicking the
   preview opens it in a lightbox, since the same "fits the thumbnail
   strip's width" constraint applies to the default-size preview on
   anything but a wide viewport.
   ========================================================================== */

import { useEffect, useState } from "react";
import Image from "next/image";
import type { OverturePage } from "./types";

type GalleryItem = OverturePage["screens"]["items"][number];

function Media({ item, autoPlay }: { readonly item: GalleryItem; readonly autoPlay: boolean }) {
  if (item.video) {
    return (
      // key forces a remount on switch, so a newly-shown clip reliably
      // starts playing from its first frame instead of inheriting
      // playback state from whatever the <video> element last showed.
      <video key={item.video.src} src={item.video.src} autoPlay={autoPlay} muted loop playsInline />
    );
  }
  if (item.picture) {
    return (
      <Image
        key={item.picture.src}
        src={item.picture.src}
        alt={item.picture.alt}
        width={item.picture.width}
        height={item.picture.height}
        priority={autoPlay}
      />
    );
  }
  return null;
}

export function MediaGallery({ items }: { readonly items: readonly GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = items[active];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="case-gallery__viewer">
      <figure className="case-gallery__preview">
        <button type="button" className="case-gallery__preview-trigger" onClick={() => setLightboxOpen(true)}>
          <Media item={current} autoPlay />
        </button>
        <figcaption>{current.caption}</figcaption>
      </figure>

      <div className="case-gallery__thumbs" role="tablist" aria-label="Screens">
        {items.map((item, i) => {
          const src = item.picture?.src ?? item.video?.src;
          const alt = item.picture?.alt ?? item.video?.alt ?? item.caption;
          return (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={item.caption}
              className="case-gallery__thumb"
              onClick={() => setActive(i)}
            >
              {item.picture ? (
                <Image src={item.picture.src} alt={alt} width={240} height={135} />
              ) : (
                item.video && (
                  <video src={item.video.src} muted playsInline preload="metadata" aria-label={alt} />
                )
              )}
            </button>
          );
        })}
      </div>

      {lightboxOpen && (
        <div
          className="case-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="case-gallery__lightbox-close"
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <figure className="case-gallery__lightbox-media" onClick={(e) => e.stopPropagation()}>
            <Media item={current} autoPlay />
            <figcaption>{current.caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
