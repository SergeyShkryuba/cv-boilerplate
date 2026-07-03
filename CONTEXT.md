# CV Template (cv-boilerplate)

A giveaway starting point for a recruiter-facing CV one-pager with a build-time
PDF. Clone it, replace the placeholder **Content source** and **Site config**,
deploy. The product domain it generates (Visitor/Recruiter, CV page, CV PDF) is
inherited from the deployed site — see PRODUCT.md and DESIGN.md.

## Language

**Template** (aka Boilerplate):
This repository as a starting point — structurally complete, filled with
placeholder data, meant to be cloned and populated.
_Avoid_: starter kit, scaffold.

**Owner**:
The developer who clones the **Template** and fills it with their own career
data and config. The primary user of _this repo_.
_Avoid_: user, author.

**Visitor** (Recruiter):
The end audience of the generated **CV page** — the person the deployed site
serves. Scans many candidates; decides in seconds whether to open the PDF.
_Avoid_: user.

**Content source**:
The fill-in career data at `src/content/<locale>.ts`, typed by `types.ts` — the
single source both the **CV page** and **CV PDF** render from.
_Avoid_: data file, model.

**Site config**:
The **Owner**'s non-career settings at `src/shared/site.ts` — canonical URL,
email, socials, postal address, and the **Locale** list.
_Avoid_: settings, env.

**Placeholder content**:
The structurally-valid but deliberately-fake data the **Template** ships with
(e.g. "Your Name", one example role) so the site and PDF build and render out of
the box. The **Owner** replaces it.
_Avoid_: demo data, sample.

**Theme** (Brand tokens):
The palette and typography — one dark accent, mono display type. Centralized so
re-theming touches a JS `theme.ts` plus a mirrored CSS `@theme` block.
_Avoid_: skin, style.

**Locale**:
A configured language rendering. Config-driven list; the default **Locale**
renders at `/`, each additional at `/<code>` (ISO 639-1). Ships English only.
_Avoid_: language file, translation, country.

**CV page** / **CV PDF**:
The two renderings of the **Content source** — the web storefront one-pager and
the build-time PDF the **Visitor** downloads. The page is a storefront (one-line
depth); the PDF is the full document (highlights, per-role stacks, education).
_Avoid_: resume, about page (for CV page); static asset (for CV PDF).

## Relationships

- The **Template** ships one **Locale** (English); the **Owner** adds more by
  extending the **Site config** locale list and adding a **Content source** file.
- Every **Locale** has exactly one **Content source** file; all locale files
  stay structurally parallel (parity check).
- The **CV page** and **CV PDF** are two renderings of one **Content source**
  per **Locale** — never edited independently (ADR-0001).
- The **Theme** feeds three surfaces: the **CV page** (CSS `@theme`), the
  **CV PDF** (`theme.ts`), and the OG image (`theme.ts`).
- The **Owner** edits **Content source**, **Site config** and **Theme**;
  everything else is the reusable frame.

## Example dialogue

> **Owner:** "I only need English — do I have to touch the routing?"
> **Template:** "No. The **Locale** list ships as `['en']` and English renders
> at `/`. Routing reads that list; add a **Locale** by appending its code and
> dropping in a matching **Content source** — the route and PDF generate
> themselves (ADR-0002). The OG card renders the default locale; wire per-locale
> cards only if you want them."

> **Owner:** "Can I just put my real data straight into the placeholder file?"
> **Template:** "Yes — that file _is_ the fill-in surface. The placeholders are
> structurally valid on purpose, so the build never breaks between empty and
> filled."

## Flagged ambiguities

- **"user"** — split into **Owner** (fills the template) and **Visitor** (reads
  the deployed site). Never use "user" unqualified.
- **"template"** — means this whole repo-as-starting-point, not a per-component
  markup template.
