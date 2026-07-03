// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { cvContent, type CvContent } from '@/content'

import { defaultLocale, siteConfig } from './site'

export function profileGraph(content: CvContent) {
  // INFO: index via a widened record — with a single configured locale the
  // Locale union is one literal, so `code !== defaultLocale` would narrow to
  // `never` and break the alternateName lookup.
  const registry = cvContent as Record<string, CvContent>
  const codes = Object.keys(registry)
  const alternateNames = codes
    .filter((code) => code !== defaultLocale)
    .map((code) => registry[code].name)

  const person = {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: registry[defaultLocale].name,
    ...(alternateNames.length > 0 ? { alternateName: alternateNames } : {}),
    jobTitle: content.title,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    sameAs: [siteConfig.socials.github.url, siteConfig.socials.linkedin.url],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressCountry: siteConfig.address.country,
    },
    knowsAbout: content.pageStack,
    knowsLanguage: codes,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${siteConfig.url}/#profile`,
        url: siteConfig.url,
        inLanguage: content.locale,
        mainEntity: { '@id': `${siteConfig.url}/#person` },
      },
      person,
    ],
  }
}
