# Product

The product intent this **Template** embodies. It describes the deployed site an
**Owner** produces, not the template repo itself (that is CONTEXT.md). Keep these
principles as-is, or adapt them — but read them first: the design only makes
sense once you know the job it is doing.

## Register

brand

## Users

Recruiters — in-house TA, agency recruiters, hiring managers, state HR — who
land on the deployed page from a LinkedIn/GitHub profile link or a name search.
They scan dozens of candidates a day; their context is "decide in 30 seconds
whether this person is worth a conversation, then file the CV into an ATS". The
generated page has one audience: the Recruiter (the **Visitor** in CONTEXT.md).

## Product Purpose

A storefront one-pager whose single job is to get the Recruiter to download the
CV PDF — the "real CV" they submit to an ATS. The page carries a summary,
one-line-depth experience entries, a curated stack, contacts and languages;
everything deeper (highlights, per-role stacks, education) lives in the PDF only.
Page and PDF render from one **Content source** and never drift (ADR-0001).
Optionally bilingual: the default locale at `/`, others at `/<code>` (ADR-0002).
Success = PDF downloads and the CV becoming the canonical result for the Owner's
name search.

## Brand Personality

Senior, precise, calm. Dark terminal surface, one amber accent, mono display
type. The page should feel like it was built by the person it describes — an
engineer with taste — not like a resume template. Confidence through restraint
and typographic discipline, not decoration. (Re-theme freely — see DESIGN.md —
but keep the restraint.)

## Anti-references

- Resume-builder templates (Canva/Zety look): sidebar layouts, skill-percent
  bars, star ratings, icon rows for every fact.
- Sales grammar: no service pitches, no testimonials, no contact form, no "hire
  me for your project" CTAs — a Recruiter reading sales copy files this under
  "not actually looking".
- Tool dumps: 40-item skill lists, responsibility prose instead of
  accomplishments.
- Generic AI landing-page scaffolding: hero-metric blocks, gradient text, card
  grids.

## Design Principles

1. **The download is the page's one job.** Every section either builds the case
   for clicking Download or gets out of the way. One primary CTA, visible
   without scrolling and again at the end.
2. **Practice what you preach.** The page itself is evidence of seniority —
   perfect type rhythm, instant load, flawless print output.
3. **Storefront, not archive.** One-line depth on the page; depth belongs to the
   PDF. Resist every urge to add "just one more detail" to the page.
4. **Two renderings, one truth.** Page, PDF and print all read from the same
   **Content source**. Anything hand-maintained is treated as already stale.
5. **Machine-readable person.** ATS parsers and search engines are first-class
   readers: standard section names in the PDF, Person/ProfilePage JSON-LD,
   correct hreflang.

## Accessibility & Inclusion

- WCAG 2.1 AA: ≥4.5:1 body contrast on the dark surface, visible focus rings,
  semantic landmarks and heading order.
- Full keyboard path to the download CTA and language toggle.
- `prefers-reduced-motion` honoured — entrance motion collapses to instant.
- Print stylesheet is an accessibility feature here, not an extra: recruiters
  print pages.
- No photo in the PDF (ATS parsing + anti-bias hiring practice); an optional
  headshot appears on the page header only.
