// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent } from '@/content'

import { displayTitle, languagesLine } from './format'
import { defaultLocale, localePath, pdfPath, siteConfig } from './site'

// INFO: llms.txt — the llmstxt.org convention. A concise Markdown map of this
// CV for LLM agents and AI crawlers: an H1 identity line, a summary, key facts,
// and links out to the full content (web page + PDF). Generated from content so
// it never drifts from the rest of the site. Kept to the default locale — the
// spec expects a single /llms.txt served from the site root.
export function buildLlmsTxt(content: CvContent): string {
  const { url, email, socials, selectedWork } = siteConfig
  const home = `${url}${localePath(defaultLocale)}`

  const lines: string[] = [`# ${displayTitle(content)}`]

  if (content.metaDescription) {
    lines.push('', `> ${content.metaDescription}`)
  }

  if (content.summary.trim()) {
    lines.push('', content.summary.trim())
  }

  const facts = [`- Location: ${content.location}`]
  if (content.languages.length > 0) {
    facts.push(`- Languages: ${languagesLine(content.languages)}`)
  }
  lines.push('', ...facts)

  lines.push(
    '',
    '## CV',
    '',
    `- [CV — web](${home}): Full interactive CV`,
    `- [CV — PDF](${url}${pdfPath(defaultLocale)}): Downloadable PDF with full experience, skills, and education`,
  )

  const profiles = [
    `- [GitHub](${socials.github.url}): ${socials.github.label}`,
    `- [LinkedIn](${socials.linkedin.url}): ${socials.linkedin.label}`,
  ]
  if (selectedWork.url) {
    profiles.push(`- [${selectedWork.label}](${selectedWork.url}): Selected work`)
  }
  lines.push('', '## Profiles', '', ...profiles)

  lines.push('', '## Contact', '', `- Email: ${email}`)

  return lines.join('\n') + '\n'
}
