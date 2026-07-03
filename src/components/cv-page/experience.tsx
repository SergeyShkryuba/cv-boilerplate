// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent, ExperienceEntry } from '@/content'

import { CvSection } from './section'

interface ExperienceSectionProps {
  content: CvContent
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <CvSection id="experience" heading={content.labels.experience}>
      <div className="mt-8">
        {content.experience.map((entry) => (
          <ExperienceRow
            key={`${entry.company}-${entry.period}`}
            entry={entry}
          />
        ))}
      </div>
    </CvSection>
  )
}

interface ExperienceRowProps {
  entry: ExperienceEntry
}

function ExperienceRow({ entry }: ExperienceRowProps) {
  const dimClass = entry.dim ? 'opacity-70' : ''
  const periodClass = entry.current ? 'text-accent' : 'text-muted-foreground'

  return (
    <article
      className={`border-border grid gap-x-8 gap-y-1 border-t py-6 sm:grid-cols-[168px_1fr] ${dimClass}`}
    >
      <p className={`text-tag font-mono uppercase ${periodClass} pt-1`}>
        {entry.period}
      </p>
      <div>
        <h3 className="text-title font-semibold">
          {entry.role} ·{' '}
          <span className="text-foreground-soft">{entry.company}</span>
        </h3>
        <p className="text-body text-foreground-soft mt-2 max-w-[64ch]">
          {entry.description}
        </p>
      </div>
    </article>
  )
}
