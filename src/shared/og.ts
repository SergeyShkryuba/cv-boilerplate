// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { cvContent, type Locale } from '@/content'

import { displayTitle } from './format'
import { siteConfig } from './site'

// INFO: the light half of the OG surface — card geometry, alt text and the
// per-locale URL, free of next/og so cvMetadata and the image route can import
// it without pulling the image renderer (og-image.tsx) into their bundle.
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export function ogAlt(locale: Locale) {
  const content = cvContent[locale]
  return `${displayTitle(content)}. ${content.labels.download}.`
}

// INFO: per-locale OG card URL. Cards emit at /opengraph-image/<code> (the id
// set in app/opengraph-image.tsx). Referenced explicitly in cvMetadata because
// the file-convention auto-injection does not cross the optional catch-all
// [[...locale]] route, so the localized pages would otherwise carry no og:image.
export function ogImageUrl(locale: Locale) {
  return `${siteConfig.url}/opengraph-image/${locale}`
}
