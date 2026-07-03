// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import type { Locale } from '@/content'
import { fontMono, fontSans } from '@/shared/fonts'

interface RootDocumentProps {
  locale: Locale
  children: ReactNode
}

export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html lang={locale} className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
