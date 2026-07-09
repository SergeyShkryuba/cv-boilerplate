// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { cvContent } from '@/content'
import { buildLlmsTxt } from '@/shared/llms-txt'
import { defaultLocale } from '@/shared/site'

export const dynamic = 'force-static'

export function GET() {
  const body = buildLlmsTxt(cvContent[defaultLocale])

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
