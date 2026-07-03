// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { Fragment } from 'react'

import type { Locale } from '@/content'
import { localeConfigs, localePath } from '@/shared/site'

interface LocaleToggleProps {
  locale: Locale
}

// INFO: full page navigation by design — static per-locale layouts, no client
// router state to preserve. Renders nothing when only one locale is configured.
// Use language labels, never country names (e.g. УКР, not UK — reads as
// Britain — CONTEXT.md).
export function LocaleToggle({ locale }: LocaleToggleProps) {
  if (localeConfigs.length < 2) return null

  return (
    <nav aria-label="Language" className="print-hidden text-tag font-mono">
      {localeConfigs.map((config, index) => (
        <Fragment key={config.code}>
          {index > 0 && (
            <span aria-hidden="true" className="text-border-strong mx-2">
              /
            </span>
          )}
          <LocaleLink
            active={locale === config.code}
            href={localePath(config.code)}
            hrefLang={config.code}
            label={config.label}
          />
        </Fragment>
      ))}
    </nav>
  )
}

interface LocaleLinkProps {
  active: boolean
  href: string
  hrefLang: string
  label: string
}

function LocaleLink({ active, href, hrefLang, label }: LocaleLinkProps) {
  if (active) {
    return (
      <span aria-current="page" className="text-accent">
        {label}
      </span>
    )
  }

  return (
    <a
      href={href}
      hrefLang={hrefLang}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </a>
  )
}
