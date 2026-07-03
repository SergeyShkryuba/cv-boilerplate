// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import {
  ogAlt,
  ogContentType,
  ogSize,
  renderCvOgImage,
} from '@/shared/og-image'
import { defaultLocale } from '@/shared/site'

// INFO: force-static is mandatory under `output: export` — without it the image
// route fails the export build (see also robots.ts / sitemap.ts).
export const dynamic = 'force-static'

export const size = ogSize
export const contentType = ogContentType
export const alt = ogAlt(defaultLocale)

// WARN: metadata image files cannot live under the optional catch-all
// [[...locale]] route (Next appends a [__metadata_id__] segment, which an
// optional catch-all may not parent). So the OG card lives at the app root and
// renders the DEFAULT locale; it cascades to every route. If you add locales
// and want a per-locale card, generate them here via generateImageMetadata and
// override openGraph.images per locale in src/shared/metadata.ts.
export default function OpengraphImage() {
  return renderCvOgImage(defaultLocale)
}
