# Decisions log

What was decided, what was rejected, and why. Raw material for the README, the "how this site is built" case study, and interview answers.

Entries marked **Why (your words): TODO** still need an explanation in my own words.

---

## 2026-10-13 · Session 1: setup (Milestone 1)

### Scope of the port

- **Decided:** Port only the static parts of the Symfony site: home, about, two case studies (Overture, Westwood Law), maybe contact.
- **Rejected for now:** the other 6 case studies, articles, packages, SEO checker, admin inbox.
- **Why:** Ship in 2–3 weeks. This is a feature-locked port, not a redesign.
- **Open:** The contact page currently POSTs to a Symfony controller. A static export has no server, so it needs a static alternative or gets deferred.

### Static export (`output: 'export'`)

- **Decided:** `next.config.ts` contains only `output: 'export'`. The build writes plain HTML/CSS/JS to `out/`.
- **Rejected:** a default server build. Also dropped the template's `cacheComponents` and `partialPrefetching` flags.
- **Why:** The site has no runtime data, so there's nothing to render per request. The output is portable (it would even run on the old PHP host). Next fails the build if I use a server-only feature, which is a useful guardrail. Template flags I couldn't explain were removed rather than set to `false`.
- **Learned:** `out/*.txt` files are React Server Component payloads. `<Link>` navigation fetches those instead of full HTML.

### Styling: keep the old SCSS

- **Decided:** Port the existing SCSS instead of switching to CSS Modules.
- **Rejected:** CSS Modules. Also rejected importing the old compiled `app.css`, because it was a build artifact with no editable source behind it.
- **Why:** The site was already built in SCSS. Porting the existing styles keeps the feature-locked port fast and faithful.

### Sass imports: relative paths

- **Decided:** Replaced the webpack-mix aliases (`@settings/…`) with relative `@use` paths. Using the `sass` package with no `sassOptions`.
- **Rejected:** Sass `loadPaths` config, and `sass-embedded`.
- **Why:** Relative paths were the simpler change, with no extra config to explain.

### Out-of-scope styles removed

- **Decided:** Deleted the `admin`, `seo-check`, `packages` and `articles` partials. Kept `coverage-map`, `profile-showcase` and `brand-showcase`, since the Overture case study uses them (checked against `case.html.twig`).
- **Why:** Dead CSS copied into a new codebase never gets removed.

---

## 2026-10-13 · Session 1: tokens (Milestone 2, in progress)

### Lighter Milestone 2

- **Decided:** Define the token system now. Convert each partial when its page is ported, starting with `_case.scss`.
- **Rejected:** converting all 14 partials up front, or skipping tokens entirely.
- **Why:** The value is in designing the structure and naming. A full audit by hand and a big-bang conversion would be grunt work.

### Audit findings (the "before" picture)

The SCSS was originally AI-generated. In-scope partials had:

- 37 distinct font sizes (eight of them between 1.1rem and 1.55rem) and 9 one-off `clamp()` headings
- 45+ hardcoded color literals, many of them palette colors with alpha written out as `rgba()`
- 47 distinct spacing values, mostly multiples of 0.8rem with a few outliers
- 11 radius values, 17 line heights, 13 letter-spacing values
- Unused variables: `$color-1` to `$color-10`, `$ink-soft`, `$black`. Duplicate breakpoints.
- The coverage map has its own Solarized palette for its code block, which is a legitimate component-scoped theme.

### Two-layer tokens: raw values feed semantic roles

- **Concept:** Raw = what the value is (`amber`). Semantic = what job it does across the site (`text-on-accent`). Component tokens (`badge-text-color`) are an optional third layer, probably unnecessary for a 5-page site.
- **Why:** One raw value can have several jobs (e.g. `$paper` is used for both background and text). Semantic names keep one decision in one place and stay accurate when a new component reuses the relationship.

### Color roles (draft)

| Raw | Primary role | Other jobs found in the code |
| --- | --- | --- |
| `$ink` | main text | inverse surface (footer, CTA, map controls), hover/focus border |
| `$slate` | muted text | — |
| `$line` | divider | — |
| `$amber` | accent | focus ring (`:focus-visible` outline) |
| `$paper` | page background | text on accent (badge), text on inverse surface |

### Semantic color tokens (decided)

Pattern: `color-` + role, base word first, then modifier (`surface` / `surface-inverse`, `text` / `text-muted`, `border` / `border-strong`). Names describe the job, never the raw color.

| Token | Raw | Job |
| --- | --- | --- |
| `color-surface` | `$paper` | page background |
| `color-text` | `$ink` | main text |
| `color-text-muted` | `$slate` | secondary text |
| `color-border` | `$line` | dividers and borders |
| `color-border-strong` | `$ink` | emphasized border (hover, focus) |
| `color-accent` | `$amber` | accent |
| `color-on-accent` | `$paper` | text/icons sitting on accent (e.g. work badge) |
| `color-surface-inverse` | `$ink` | flipped block (footer, CTA, map controls) |
| `color-on-inverse` | `$paper` | text on the inverse surface |
| `color-focus` | `$amber` | `:focus-visible` outline |

- **Naming lessons:** `on-X` names the surface underneath, not the text's own color. Semantic names never reference raw names (`color-on-paper` would break if paper changed). Name by strength, not state (`border-strong`, not `border-focused`, since 4 of 5 uses are hover). Focus ring is its own token so it can be tuned for contrast independently of the accent.
- **Rejected:** component tokens like `badge-text-color` (one decision would get duplicated across components).

### Token format: plain CSS custom properties

- **Decided:** Both layers are CSS custom properties, written by hand. Primitives in `generic/_palette.scss` (`--ink`, `--amber`…), semantic tokens in `generic/_tokens.scss` (`--color-text: var(--ink)`). Partials use `var(--color-*)` only. Both files live in `generic/` because they output CSS.
- **Sass keeps:** breakpoints and mixins (custom properties don't work inside `@media`). The old `$ink`/`$amber` Sass variables stay until every partial is converted, then get deleted.
- **Rejected:** Sass primitives feeding custom properties through a map + `@each` loop + `$color-*` bridge. Worked, but was too much machinery for 10 colors.
- **Why:** Sass variables were adding noise. One language for both layers, nothing to keep in sync, and devtools shows the full chain (`--color-text` → `--ink` → hex).
- **Trade-off:** CSS has no private variables, so nothing stops a partial from writing `var(--ink)`. Guarded by a rule (partials only use `--color-*`) that one grep can check.
- **Alpha variants:** Sass color functions (`rgba($x, .5)`) can't operate on `var()`. Use `color-mix(in srgb, var(--color-…) 85%, transparent)`. Not `opacity`, which fades the whole element including text.

### Converting partials

- **Bulk pass:** ~160 unambiguous usages converted with one scripted `sed` pass (e.g. `color: $slate` → `var(--color-text-muted)`, `1px solid $line` → `var(--color-border)`). Ambiguous ones done by hand.
- **Coverage map:** its white panel is treated as the inverse surface (`$white` → `--color-surface-inverse`, #fff → #f4f2ec). A deliberate small visual change; text inside uses `on-inverse`.
- **Rules learned:** `color:` takes text or `on-*` tokens; surface tokens go on `background`. Pick the token by what the element sits on, not by which value happens to match (`on-accent` and `on-inverse` are both `--paper` today, but they're separate decisions).
- **Bug fixed during port:** coverage map search icon handle was rotated `45deg` (pointing the wrong way); now `-45deg`.
- **Lesson:** converting styles before pages exist means no visual check. CSS silently drops invalid declarations (`ar(`, `background: solid …`, a border with no style), so the build passes while elements vanish. Hand-converted items need a browser check once ported:
  - [ ] coverage map search icon + placeholder (`on-inverse-muted`)
  - [ ] case nav `color-mix()` background
  - [ ] CTA secondary button text
  - [ ] work badge text (`on-accent`)
  - [ ] coverage map panel surface (#fff → #f4f2ec)
- **Tokens describe intent, not implementation:** choose by what the user sees, not by the CSS property. The 1px-gap grids (`background` behind `gap: 1px`) and the profile timeline rail (1px `::before`) are dividers, so they use `--color-border` even though the property is `background`. The "`color:` takes text tokens" check is a heuristic; when it disagrees with the visual role, the role wins.
- **Learned:** `var(--name)`, not `--var(name)`. Custom properties are resolved by the browser at runtime, so the tokens file doesn't need to `@use` the palette. A selector nested inside `@each` within `:root` compiles to a descendant selector (`:root .black`). Sass can't create variables dynamically or destructure maps.

### Session 1 summary (my words)

I learned about tokenizing design system values, separating them into two layers: the primitive variable and its contextual use. I learned how to set up Next.js and wire up SCSS files.

---

## Later list

- "How this site is built" case study (top priority after launch)
- Fix `include-media` Sass `if()` deprecation warnings
- Add Stylelint (would catch invalid values like `ar(` that CSS silently drops)
- Remaining 6 case studies, articles, packages
- Contact form backend
