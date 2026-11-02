import type { MetadataRoute } from "next";
import { config } from "@/config/site";

// Required by `output: "export"` (next.config.ts): without it, Next.js
// refuses to prerender this route at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.global.url}/sitemap.xml`,
  };
}
