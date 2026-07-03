# cv-boilerplate

A giveaway **template** for a recruiter-facing CV one-pager with a build-time
PDF. A bilingual-capable storefront whose single job is to get a recruiter to
download your CV PDF. The web page and the PDF render from **one content
source** and never drift.

You fill in three things — your content, your config, optionally your theme —
and deploy. Everything else is the reusable frame.

> Created by **Oleksandr Bilostotskyi**. Licensed under **Apache-2.0** — you may
> use it for your own CV and redistribute it, but you must keep the `LICENSE`
> and `NOTICE` attribution in any redistributed copy of the template itself.
> See [`NOTICE`](NOTICE).

## How it works

The site ships two renderings of the same dataset at different depths:

- **CV page** — the web one-pager (summary, one-line experience entries, a
  curated stack, contacts, languages). Its job is the PDF download.
- **CV PDF** — the "real CV" a recruiter submits to an ATS. A superset of the
  page: per-entry highlights and stacks, full skills, education, languages. No
  photo, structured for ATS parseability.

Both read from `src/content/<locale>.ts`. The PDF is generated at build time by
`scripts/build-pdf.tsx` using `@react-pdf/renderer` — **never edited by hand**
([ADR-0001](docs/adr/0001-pdf-generated-from-content-at-build-time.md)). A
parity check fails the build if locales drift structurally. Printing the page
(Ctrl+P) is a separate, shallower path that appends a link to the full PDF.

Routing is **config-driven**
([ADR-0002](docs/adr/0002-config-driven-locales.md)): the default locale renders
at `/`, additional ones at `/<code>`. Ships with English only.

## Fill it in (the 3 surfaces you own)

Read [`CONTEXT.md`](CONTEXT.md) for the vocabulary first. Then:

### 1. Content — `src/content/en.ts`

Your career data. Every field ships as a structurally-valid placeholder ("Your
Name", one example role) so the build works before you touch it. Replace the
values; keep the shape (enforced by `src/content/types.ts`). The `labels` block
is UI chrome (section titles, button text), not personal data.

### 2. Config — `src/shared/site.ts`

Your non-career settings: `url`, `email`, `pdfBaseName`, `socials`, `address`,
optional `selectedWork` footer link, and the `localeConfigs` list.

### 3. Theme (optional) — `src/shared/theme.ts` + `src/app/globals.css`

Colors and fonts. The JS palette (`brand`) in `theme.ts` feeds the PDF and OG
card; the `@theme` block in `globals.css` is its mirror for the web page. Change
both, in sync — see [`DESIGN.md`](DESIGN.md).

## Adding a language

1. Append an entry to `localeConfigs` in `src/shared/site.ts` (the **first**
   entry is the default and renders at `/`; others render at `/<code>`).
2. Add `src/content/<code>.ts` and register it in `src/content/index.ts`.
3. Keep locales structurally parallel — the parity check compares
   language-independent facts (entry counts, company names, page stack).
4. If the script needs extra font subsets (e.g. Cyrillic), add them in
   `src/shared/fonts.ts` and confirm the committed TTFs in `assets/fonts` cover
   the glyphs (they carry Latin + Cyrillic by default).

## Tech stack

- **Next.js 16** (App Router, static export) + **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
- **@react-pdf/renderer 4** — build-time PDF generation
- **@vercel/analytics** + **speed-insights**
- **pnpm**

## Getting started

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Command          | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `pnpm dev`       | Start the Next.js dev server                              |
| `pnpm build`     | Production build (runs `prebuild` → PDF generation first) |
| `pnpm pdf`       | Regenerate the CV PDF(s) from content                     |
| `pnpm lint`      | ESLint                                                    |
| `pnpm format`    | Prettier write                                            |
| `pnpm typecheck` | `tsc --noEmit`                                            |

`pnpm build` runs `prebuild` automatically, which validates content parity and
writes the PDF(s) (named from `pdfBaseName`) into `public/`.

## Project layout

```
src/
  app/              Next.js App Router — [[...locale]] route, robots, sitemap
  components/       CV page components, download button, locale toggle, JSON-LD
  content/          Content source: en.ts (placeholders), index.ts, types.ts
  shared/           site config, theme tokens, metadata, fonts, parity, profile
scripts/            build-pdf.tsx + pdf-document.tsx (react-pdf layout)
assets/fonts/       Manrope + JetBrains Mono TTFs (OFL — for PDF/OG glyphs)
docs/adr/           Architecture decision records
```

## Deployment

Deployed as static HTML (`output: 'export'`). Every content edit regenerates the
PDF on build, so the download link can never serve a stale CV.

## License

[Apache-2.0](LICENSE) © 2026 Oleksandr Bilostotskyi. Attribution required — see
[`NOTICE`](NOTICE). The attribution covers the template; the CV content you
author on top of it is yours.
