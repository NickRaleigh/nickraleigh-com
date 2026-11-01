import type { MetadataRoute } from "next";
import { workContent } from "./work/content";

const SITE_URL = "https://nickraleigh.com";

// Required by `output: "export"` (next.config.ts): without it, Next.js
// refuses to prerender this route at build time.
export const dynamic = "force-static";

// Mirrors nr-symfony's SitemapController: every work case study (currently
// `work/content.tsx`'s own flagship list, the single source of truth the
// work index page already renders from) plus the handful of other static
// routes, home at priority 1.0 and everything else at 0.7 — same scheme the
// original used, no per-page tuning. Adding a flagship entry there adds it
// here too, with nothing to keep in sync by hand.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/contact", "/work"];
  const workPaths = workContent.flagship.map((item) => item.link);
  const paths = Array.from(new Set([...staticPaths, ...workPaths])).sort();

  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
