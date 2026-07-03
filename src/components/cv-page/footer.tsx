// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent } from '@/content'
import { languagesLine } from '@/shared/format'
import { pdfPath, siteConfig } from '@/shared/site'

import { DownloadButton } from '../download-button'
import { InlineLink } from './inline-link'

interface CvFooterProps {
  content: CvContent
}

export function CvFooter({ content }: CvFooterProps) {
  const pdfUrl = `${siteConfig.url}${pdfPath(content.locale)}`

  return (
    <footer className="border-border-strong mt-20 border-t pt-10 pb-16">
      <p className="text-cap text-muted-foreground font-mono">
        {content.labels.languages}:{' '}
        <span className="text-foreground-soft">
          {languagesLine(content.languages)}
        </span>
      </p>

      <div className="print-hidden mt-10">
        <DownloadButton
          locale={content.locale}
          label={content.labels.download}
        />
      </div>

      {siteConfig.selectedWork.url && (
        <p className="print-hidden text-cap text-muted-foreground mt-10">
          {content.labels.clientWork}{' '}
          <InlineLink href={siteConfig.selectedWork.url}>
            {siteConfig.selectedWork.label}
          </InlineLink>
        </p>
      )}

      <p className="print-visible text-cap hidden">
        {content.labels.printNote} <a href={pdfUrl}>{pdfUrl}</a>
      </p>
    </footer>
  )
}
