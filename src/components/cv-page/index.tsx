// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent } from '@/content'

import { JsonLd } from '../json-ld'
import { ExperienceSection } from './experience'
import { CvFooter } from './footer'
import { CvHeader } from './header'
import { CvSection } from './section'
import { StackSection } from './stack'

interface CvPageProps {
  content: CvContent
}

export function CvPage({ content }: CvPageProps) {
  return (
    <main className="mx-auto max-w-(--container-site) px-6 py-14 sm:px-10 sm:py-20">
      <JsonLd content={content} />
      <CvHeader content={content} />

      <CvSection id="summary" heading={content.labels.summary}>
        <p className="text-copy text-foreground-soft mt-6 max-w-[70ch]">
          {content.summary}
        </p>
      </CvSection>

      <ExperienceSection content={content} />
      <StackSection content={content} />
      <CvFooter content={content} />
    </main>
  )
}
