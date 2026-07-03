---
status: accepted
date: 2026-07-02
---

# CV PDF is generated at build time from the same content source as the page, via @react-pdf/renderer

## Context

The CV surface ships two renderings of one dataset: the CV page (minimal
storefront) and the CV PDF (the full document a Recruiter submits to an ATS).
A hand-maintained PDF inevitably drifts from the page — a silent failure nobody
notices for months (e.g. a role still marked "PRESENT" after it ended).

## Decision

One structured content source in the repo (`src/content/<locale>.ts`) renders
both artifacts. The PDF is built by a Node script using `@react-pdf/renderer`
during the site build — never edited by hand. One PDF per configured locale,
named from `siteConfig.pdfBaseName`.

Printing the page (Ctrl+P) is a separate, deliberately shallower path: print CSS
renders the page-depth content cleanly and appends a link to the full PDF. It
does not attempt to reproduce the PDF.

## Considered alternatives

- **Static PDF asset, exported by hand.** How the drift happens in the first
  place; also splits the canon that CONTEXT.md assigns to the content source.
- **Print-CSS only ("download" = print dialog).** No typographic control, output
  varies per browser, and "download PDF" becomes a lie.
- **Headless-browser print (Playwright/Puppeteer) at build.** Reuses page CSS,
  but the page and the PDF have different content depth anyway, so shared markup
  is a mirage — and a headless browser is a heavy, fragile build dependency.
- **Typst/LaTeX.** Best typography, but a foreign toolchain outside Node/pnpm for
  a single document.

## Consequences

- The PDF layout is its own React component tree (react-pdf primitives),
  independent from the page components. Only the data is shared.
- Non-Latin glyphs require explicit font registration in react-pdf — the
  built-in PDF fonts do not cover them. The brand TTFs ship in `assets/fonts`
  and are registered in the build script.
- Every content edit regenerates the PDF on deploy; the download link can never
  serve a stale career history.
