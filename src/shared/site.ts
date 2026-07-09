// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

// INFO: Site config — the Owner's non-career settings. Fill these in together
// with the content file(s) in src/content to make the template yours. See
// CONTEXT.md for the vocabulary and README.md for the fill-in steps.
export const siteConfig = {
  url: 'https://your-domain.example',
  email: 'you@example.com',
  // Base name of the downloadable CV PDF. The default locale ships as
  // `${pdfBaseName}.pdf`; every other locale as `${pdfBaseName}-<CODE>.pdf`.
  pdfBaseName: 'Your-Name-CV',
  socials: {
    github: {
      url: 'https://github.com/your-handle',
      label: 'github.com/your-handle',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/your-handle',
      label: 'linkedin.com/in/your-handle',
    },
  },
  // INFO: canonical, locale-independent address for schema.org (see
  // profile-graph.ts). content.location is the localized display string — a
  // different representation, not a duplicate.
  address: {
    locality: 'Your City',
    country: 'US',
  },
  // Optional "selected work" link in the footer (e.g. a portfolio or main
  // site). Leave `url` empty to hide the block entirely.
  selectedWork: {
    url: '',
    label: '',
  },
} as const

// INFO: The configured locales. The FIRST entry is the DEFAULT — it renders at
// `/`; every other renders at `/<code>` (ISO 639-1). Ships with English only.
// Add a locale by appending an entry here AND a matching src/content/<code>.ts
// file (kept structurally parallel — see content-parity.ts).
export const localeConfigs = [
  {
    code: 'en',
    // Human-facing toggle label. Never use a country name — it is a language.
    label: 'ENG',
    ogLocale: 'en_US',
    // Optical tightening of the display name on the OG card. Denser scripts
    // (e.g. Cyrillic) read heavier — use a tighter value like '-0.04em' there.
    ogNameLetterSpacing: '-0.03em',
  },
] as const

export type Locale = (typeof localeConfigs)[number]['code']

type LocaleConfig = (typeof localeConfigs)[number]

export const localeConfig = Object.fromEntries(
  localeConfigs.map((config) => [config.code, config]),
) as Record<Locale, LocaleConfig>

export const defaultLocale: Locale = localeConfigs[0].code

export function isDefaultLocale(locale: Locale) {
  return locale === defaultLocale
}

export function localePath(locale: Locale) {
  return isDefaultLocale(locale) ? '/' : `/${locale}`
}

export function pdfFile(locale: Locale) {
  return isDefaultLocale(locale)
    ? `${siteConfig.pdfBaseName}.pdf`
    : `${siteConfig.pdfBaseName}-${locale.toUpperCase()}.pdf`
}

export function pdfPath(locale: Locale) {
  return `/${pdfFile(locale)}`
}

// INFO: resolve the optional catch-all route segment (`/` → default, `/<code>`
// → that locale) to a concrete Locale. Unknown segments fall back to default.
export function resolveLocale(segments?: string[]): Locale {
  const code = segments?.[0]
  const match = localeConfigs.find((config) => config.code === code)
  return match ? match.code : defaultLocale
}

// INFO: static params for the [[...locale]] route — default locale as the
// index (`['']`, the empty slug `output: export` requires; a bare `[]` makes
// Next drop the root path), every other locale as its own single-segment path.
export function localeStaticParams(): { locale: string[] }[] {
  return localeConfigs.map((config, index) =>
    index === 0 ? { locale: [''] } : { locale: [config.code] },
  )
}
