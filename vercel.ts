import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  redirects: [
    // Old Symfony site: the status banner feature had its own page.
    // It's now a section on the Overture case study.
    {
      source: "/work/overture/status-banner",
      destination: "/work/overture#status-banner-showcase",
      permanent: true,
    },
  ],
};
