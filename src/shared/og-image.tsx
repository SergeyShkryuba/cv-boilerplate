// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { cvContent, type Locale } from '@/content'

import { ogSize } from './og'
import { localeConfig, siteConfig } from './site'
import { brand } from './theme'

// INFO: the committed brand TTFs carry Cyrillic glyphs — needed so a Cyrillic
// locale renders its name instead of tofu. Swap these for your own display
// font (assets/fonts) if you re-brand.
const fontsDir = join(process.cwd(), 'assets', 'fonts')
const displayFont = readFileSync(join(fontsDir, 'JetBrainsMono-700.ttf'))
const labelFont = readFileSync(join(fontsDir, 'JetBrainsMono-400.ttf'))

const domain = siteConfig.url.replace(/^https?:\/\//, '')

export function renderCvOgImage(locale: Locale) {
  const content = cvContent[locale]

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: brand.background,
        color: brand.foreground,
        fontFamily: 'JetBrains Mono',
      }}
    >
      <div style={{ display: 'flex' }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: brand.mutedForeground,
          }}
        >
          {content.location}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: localeConfig[locale].ogNameLetterSpacing,
          }}
        >
          {content.name}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontSize: 36,
            fontWeight: 400,
            color: brand.accent,
          }}
        >
          {content.title}
        </div>
        <div
          style={{
            marginTop: 34,
            width: 140,
            height: 5,
            borderRadius: 3,
            background: brand.accent,
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: brand.mutedForeground,
          }}
        >
          {domain}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 24,
            fontWeight: 400,
            color: brand.accent,
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke={brand.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />
          </svg>
          {content.labels.download}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: displayFont,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: labelFont,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )
}
