// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent } from '@/content'

import { CvSection } from './section'

interface StackSectionProps {
  content: CvContent
}

export function StackSection({ content }: StackSectionProps) {
  if (content.pageStack.length === 0) return null

  return (
    <CvSection id="stack" heading={content.labels.stack}>
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {content.pageStack.map((item) => (
          <li
            key={item}
            className="border-border bg-surface-elevated text-tag text-foreground-soft rounded border px-2.5 py-1.5 font-mono uppercase"
          >
            {item}
          </li>
        ))}
      </ul>
    </CvSection>
  )
}
