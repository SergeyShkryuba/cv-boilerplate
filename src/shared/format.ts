// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent, LanguageSkill } from '@/content'

export function displayTitle(content: CvContent) {
  return `${content.name} — ${content.title}`
}

export function languagesLine(languages: LanguageSkill[], separator = ' · ') {
  return languages
    .map((entry) => `${entry.language} — ${entry.level}`)
    .join(separator)
}
