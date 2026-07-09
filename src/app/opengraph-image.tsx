// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { ogAlt, ogContentType, ogSize } from '@/shared/og'
import { renderCvOgImage } from '@/shared/og-image'
import { localeConfigs, resolveLocale } from '@/shared/site'

// INFO: force-static is mandatory under `output: export` — without it the image
// route fails the export build (see also robots.ts / sitemap.ts).
export const dynamic = 'force-static'

// INFO: one OG card per configured locale — id is the locale code, so the cards
// emit at /opengraph-image/<code>. The per-locale <meta og:image> is wired
// explicitly in cvMetadata (src/shared/metadata.ts): this file lives at the app
// root (it cannot sit under the optional catch-all [[...locale]] route — Next
// appends a [__metadata_id__] segment an optional catch-all may not parent), so
// the file-convention auto-injection does not reach the localized pages.
export function generateImageMetadata() {
  return localeConfigs.map((config) => ({
    id: config.code,
    alt: ogAlt(config.code),
    size: ogSize,
    contentType: ogContentType,
  }))
}

export default async function OpengraphImage({ id }: { id: Promise<string> }) {
  return renderCvOgImage(resolveLocale([await id]))
}
