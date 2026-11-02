# nickraleigh.com

Source for an in-progress rebuild of [nickraleigh.com](https://nickraleigh.com) — my portfolio site — moving from a Symfony/Twig CMS to a static Next.js build. Preview: https://nr-nextjs.vercel.app

## Stack

- Next.js 16 (App Router), static export (`output: "export"`)
- React 19, TypeScript
- Sass, no CSS framework — a small hand-rolled design-token system (`src/scss/generic/_tokens.scss`, `_palette.scss`)
- Content lives as typed TS objects per route (`content.tsx` + `types.ts` next to each `page.tsx`), not a CMS

## Structure

```
src/app/              routes (home, about, two case studies)
src/components/       shared components (Nav, Footer, CTA, Mosaic)
src/config/site.ts    nav, global site config
src/types/base.ts     shared content types
src/scss/             design tokens, settings, per-component styles
public/               images, fonts, static assets
```

Each route's `content.tsx` is the single source of truth for that page's copy — `page.tsx` just renders it. `sitemap.ts` walks `src/app` for `page.tsx` files at build time, so it can't go stale as routes are added or removed.

## Notable bits

- Metadata (title/description/canonical/OpenGraph/Twitter) is set per-page via Next's Metadata API, ported over from the original site's per-page SEO config
- Homepage carries Person JSON-LD structured data
- Fonts: Boska/Switzer/Instrument Serif are self-hosted; Hanken Grotesk, Jost, and DM Serif Display load via `next/font/google`
- The `work/overture` case study embeds several standalone interactive demos (a coverage-map visualization, a status-banner rules-vs-model comparison) rebuilt from a real product feature

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export to /out
```
