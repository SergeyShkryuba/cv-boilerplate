# Design

The visual system this **Template** ships with, and how to re-theme it. The
identity is intentional (see PRODUCT.md); change the tokens, keep the discipline.

## Re-theming (read this first)

Brand tokens live in **two mirrored places**, by necessity — the web page uses
CSS custom properties, the PDF and OG card need JS values:

- `src/shared/theme.ts` — the JS palette (`brand`) imported by the PDF
  (`scripts/pdf-document.tsx`) and the OG card (`src/shared/og-image.tsx`).
- `src/app/globals.css` `@theme` — the same values as CSS variables for the page.

Change **both, in sync**. They are kept identical on purpose so the page, PDF and
social card read as one identity. The PDF has its own _light_ palette
(`pdfPalette` in `theme.ts`) — it is a document (ink on white), not the dark
site; only the accent hue is shared.

## Theme

Dark, single-screen-calm engineering surface. A Recruiter opens this at a desk,
often mid-scan of many candidates — the page answers fast, in one column,
without asking for scroll stamina. Color strategy: **restrained** — tinted dark
neutrals + one amber accent reserved for the primary action (Download) and focus
states.

Print is a second, deliberate theme: white background, near-black ink, accent
dropped to a rule line — a document, not a website screenshot.

## Color palette

| Token                      | Value     | Role                                     |
| -------------------------- | --------- | ---------------------------------------- |
| `--color-background`       | `#0d1117` | page background                          |
| `--color-surface`          | `#12181f` | raised panels (experience rows on hover) |
| `--color-surface-elevated` | `#161d26` | chips, code-like fragments               |
| `--color-foreground`       | `#f0ede8` | primary text                             |
| `--color-foreground-soft`  | `#c8c4bc` | secondary text                           |
| `--color-muted-foreground` | `#8a857f` | metadata (periods, labels)               |
| `--color-accent`           | `#e8a838` | primary CTA, links, focus, ::selection   |
| `--color-border`           | `#1e2631` | hairlines                                |
| `--color-border-strong`    | `#252f3d` | emphasized rules                         |

Contrast: `#f0ede8` on `#0d1117` ≈ 15.9:1; `#c8c4bc` ≈ 11:1; `#8a857f` ≈ 5:1
(metadata only, never body copy). If you re-theme, re-check these ratios.

## Typography

- **Body / sans**: Manrope (400/600).
- **Display + mono**: JetBrains Mono (400/700) — one mono family powers both
  display headings and labels/chips.
- Denser scripts (e.g. Cyrillic) read heavier at display sizes — the
  `:lang(...)` rule in `globals.css` tightens headings for such a locale; adjust
  or remove per your configured locales.
- Body measure ≤ 70ch; `text-wrap: balance` on headings.
- PDF/OG (react-pdf, next/og): the committed TTF files in `assets/fonts` (static
  weights, Latin + Cyrillic). Standard ATS section headings set in caps mono.

## Layout

- Single centered column, `max-width: 860px` (`--container-site`), fluid padding.
- No sidebar, no card grid. Experience entries are rows on a hairline timeline:
  period in mono metadata color, role + company as the line lead, one-line
  description under it.
- The download CTA appears twice: in the header block (above the fold) and as
  the closing element.
- Language toggle sits top-right, quiet mono label — hidden when only one locale
  is configured.

## Components

- **Header**: name (display mono), title line, location, contacts (email,
  LinkedIn, GitHub), optional headshot (page only), primary Download button.
- **Download button**: accent-filled, dark text, `--shadow-accent-cta`; hover
  raises; focus ring 2px accent offset 2.
- **Experience row**: hairline-separated, dim variant (`dim: true`) for early
  roles.
- **Stack chips**: mono `--text-tag`, surface-elevated background, no icons.
- **Print block**: visible only in `@media print` — one line + URL of the PDF.
- **OG card** (`src/app/opengraph-image.tsx`): 1200×630 dark card, name in mono
  700, title + accent rule in amber, location and domain in mono muted, download
  hint bottom-right. Uses the committed TTFs; `dynamic = 'force-static'` under
  `output: export`. Lives at the app root and renders the **default** locale
  (Next forbids metadata images under the optional catch-all route) — see the
  note in that file for per-locale cards.

## Motion

Hover states are opacity/color only, nothing scroll-driven.
`prefers-reduced-motion: reduce` collapses everything to instant.
