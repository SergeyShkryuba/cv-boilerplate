// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { Metadata, Viewport } from 'next'

import { cvContent, type Locale } from '@/content'

import { displayTitle } from './format'
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: content.metaDescription,
    },
  }
}

export const cvViewport: Viewport = {
  themeColor: brand.background,
}
