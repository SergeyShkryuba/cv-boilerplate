// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { Metadata, Viewport } from 'next'

import { cvContent, type Locale } from '@/content'

import { displayTitle } from './format'
import { ogAlt, ogImageUrl, ogSize } from './og'
import {
  defaultLocale,
  localeConfig,
  localeConfigs,
  localePath,
  siteConfig,
} from './site'
import { brand } from './theme'

export function cvMetadata(locale: Locale): Metadata {
  const content = cvContent[locale]
  const title = displayTitle(content)

  const languages: Record<string, string> = {}
  for (const config of localeConfigs) {
    languages[config.code] = localePath(config.code)
  }
  languages['x-default'] = localePath(defaultLocale)

  // INFO: point og:image / twitter:image at this locale's card explicitly. The
  // OG file convention lives at the app root and cannot auto-inject across the
  // optional catch-all [[...locale]] route, so without this the localized pages
  // carry no image. See src/shared/og.ts and src/app/opengraph-image.tsx.
  const ogImage = {
    url: ogImageUrl(locale),
    width: ogSize.width,
    height: ogSize.height,
    alt: ogAlt(locale),
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${title} | CV`,
    description: content.metaDescription,
    alternates: {
      canonical: localePath(locale),
      languages,
    },
    openGraph: {
      type: 'profile',
      url: localePath(locale),
      title,
      description: content.metaDescription,
      locale: localeConfig[locale].ogLocale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: content.metaDescription,
      images: [ogImage],
    },
  }
}

export const cvViewport: Viewport = {
  themeColor: brand.background,
}
