// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { MetadataRoute } from 'next'

import { localeConfigs, localePath, siteConfig } from '@/shared/site'

export const dynamic = 'force-static'

// INFO: bump when CV content changes — hardcoded instead of new Date() so the
// sitemap stays byte-identical across rebuilds that don't touch the content.
const lastModified = '2026-07-02'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {}
  for (const config of localeConfigs) {
    languages[config.code] = `${siteConfig.url}${localePath(config.code)}`
  }

  return localeConfigs.map((config) => ({
    url: `${siteConfig.url}${localePath(config.code)}`,
    lastModified,
    alternates: { languages },
  }))
}
