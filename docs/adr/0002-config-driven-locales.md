---
status: accepted
date: 2026-07-03
---

# Locales are config-driven, not hardcoded route groups

## Context

This is a giveaway template. Most Owners want a single language; some want two
or more. The original CV it derives from hand-wrote one App Router route group
per language (`(en)`, `(uk)`), with the locale codes hardcoded across routing,
metadata, sitemap, the language toggle, the PDF build loop, the OG image and the
JSON-LD graph. Changing languages meant a routing refactor in ~10 files — a poor
fit for "just fill it in".

## Decision

A single source of truth — `localeConfigs` in `src/shared/site.ts` — drives
everything. The first entry is the default locale and renders at `/`; every
other renders at `/<code>`. One optional catch-all route, `app/[[...locale]]/`,
resolves the segment to a locale; `generateStaticParams`, the sitemap, the OG
images, the PDF build loop and the parity check all iterate the same list. The
`Locale` type is derived from the array, so the content registry must match the
configured locales (enforced by the compiler). Ships with English only.

## Considered alternatives

- **Hand-written route group per locale.** The original approach — clearest to
  read, but forces every Owner into a routing refactor to add or drop a language.
- **Required dynamic segment `app/[locale]/`.** Would put the default locale at
  `/en` instead of `/`, hurting the canonical URL and the "one language, no
  prefix" common case.

## Consequences

- One optional catch-all segment is less obvious to read than explicit route
  groups — hence this ADR and the `resolveLocale` / `localeStaticParams` helpers
  in `site.ts`.
- Adding a language is: append a `localeConfigs` entry, add
  `src/content/<code>.ts`, register it in `src/content/index.ts`. No routing
  changes.
- Static export (`output: 'export'`, ADR-friendly) is preserved — the route is
  fully enumerated by `generateStaticParams`.
