// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent } from '@/content'
import { siteConfig } from '@/shared/site'

import { DownloadButton } from '../download-button'
import { LocaleToggle } from '../locale-toggle'
import { InlineLink } from './inline-link'

interface CvHeaderProps {
  content: CvContent
}

// INFO: to add a headshot, place it next to the name here — page header only,
// never the PDFs (ATS parsing + anti-bias hiring practice, see PRODUCT.md).
export function CvHeader({ content }: CvHeaderProps) {
  return (
    <header>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-tag text-muted-foreground font-mono uppercase">
          {content.location}
        </p>
        <LocaleToggle locale={content.locale} />
      </div>

      <h1 className="font-display text-hero mt-10 font-bold">{content.name}</h1>
      <p className="text-title text-accent mt-3 font-mono">{content.title}</p>

      <ul className="text-cap mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono">
        <ContactItem
          href={`mailto:${siteConfig.email}`}
          label={siteConfig.email}
        />
        <ContactItem
          href={siteConfig.socials.linkedin.url}
          label="LinkedIn"
          external
        />
        <ContactItem
          href={siteConfig.socials.github.url}
          label="GitHub"
          external
        />
      </ul>

      <div className="print-hidden mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <DownloadButton
          locale={content.locale}
          label={content.labels.download}
        />
        <p className="text-cap text-foreground-soft max-w-[34ch]">
          {content.labels.downloadHint}
        </p>
      </div>
    </header>
  )
}

interface ContactItemProps {
  href: string
  label: string
  external?: boolean
}

function ContactItem({ href, label, external }: ContactItemProps) {
  return (
    <li>
      <InlineLink href={href} rel={external ? 'me noopener' : undefined}>
        {label}
      </InlineLink>
    </li>
  )
}
