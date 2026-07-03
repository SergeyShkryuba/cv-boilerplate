// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { JetBrains_Mono, Manrope } from 'next/font/google'

// INFO: web-page fonts only (the PDF/OG use the committed TTFs in assets/fonts).
// Add a subset (e.g. 'cyrillic', 'greek') when you configure a locale whose
// script needs it — keeping it to 'latin' by default trims the download.
export const fontSans = Manrope({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
