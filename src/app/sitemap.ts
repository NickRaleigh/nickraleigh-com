import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { config } from "@/config/site";

const APP_DIR = join(process.cwd(), "src/app");

// Required by `output: "export"` (next.config.ts): without it, Next.js
// refuses to prerender this route at build time.
export const dynamic = "force-static";

// Walks src/app for every directory that has a page.tsx, turning its path
// into a URL. Assumes the flat, static-only route structure this site
// actually has today (no dynamic segments, route groups, or parallel
// routes) — adding a page.tsx anywhere under src/app shows up here with
// nothing to keep in sync by hand.
function findRoutes(dir: string, base = ""): string[] {
  const entries = readdirSync(dir);
  const routes = entries.includes("page.tsx") ? [base || "/"] : [];

  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...findRoutes(full, `${base}/${entry}`));
    }
  }

  return routes;
}

// Mirrors nr-symfony's SitemapController scheme: home at priority 1.0,
// everything else at 0.7, no per-page tuning.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = findRoutes(APP_DIR).sort();
  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${config.global.url}${path}`,
    lastModified,
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
