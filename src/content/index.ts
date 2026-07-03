// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { en } from './en'
import type { CvContent, Locale } from './types'

// INFO: the locale registry. One entry per configured locale (src/shared/site
// localeConfigs). The default locale must be present; add more by importing a
// new content module and adding it here.
export const cvContent: Record<Locale, CvContent> = { en }

export type {
  CvContent,
  CvLabels,
  Education,
  ExperienceEntry,
  LanguageSkill,
  Locale,
  ProjectEntry,
  SkillGroup,
} from './types'
