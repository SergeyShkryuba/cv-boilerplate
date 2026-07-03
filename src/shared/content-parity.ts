// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent, Locale } from '@/content'

// The type system enforces each locale's shape but not that translations stay
// structurally parallel. This compares only language-independent facts
// (counts, company names, page stack) across locales — never translated prose,
// which legitimately differs. An empty result means the locales are in sync.
export function contentParityIssues(
  content: Record<Locale, CvContent>,
): string[] {
  const [reference, ...others] = Object.keys(content) as Locale[]

  if (reference === undefined) return []

  const base = content[reference]
  const issues: string[] = []

  for (const locale of others) {
    const candidate = content[locale]

    countMismatch(
      issues,
      locale,
      'experience',
      base.experience,
      candidate.experience,
    )
    countMismatch(
      issues,
      locale,
      'projects',
      base.projects ?? [],
      candidate.projects ?? [],
    )
    countMismatch(issues, locale, 'skills', base.skills, candidate.skills)
    countMismatch(
      issues,
      locale,
      'languages',
      base.languages,
      candidate.languages,
    )

    if (base.pageStack.join('|') !== candidate.pageStack.join('|')) {
      issues.push(
        `pageStack differs between "${reference}" and "${locale}" — it is language-independent and must match`,
      )
    }

    base.experience.forEach((entry, index) => {
      const company = candidate.experience[index]?.company

      if (company !== undefined && company !== entry.company) {
        issues.push(
          `experience[${index}].company: "${reference}"="${entry.company}", "${locale}"="${company}"`,
        )
      }
    })
  }

  return issues
}

function countMismatch(
  issues: string[],
  locale: Locale,
  field: string,
  reference: unknown[],
  candidate: unknown[],
) {
  if (reference.length !== candidate.length) {
    issues.push(
      `${field}: "${locale}" has ${candidate.length}, expected ${reference.length}`,
    )
  }
}
