// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { Locale } from '@/shared/site'

export type { Locale }

export interface ExperienceEntry {
  period: string
  role: string
  company: string
  description: string
  highlights: string[]
  stack: string[]
  current?: boolean
  dim?: boolean
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Education {
  degree: string
  field: string
  institution: string
  period: string
}

export interface LanguageSkill {
  language: string
  level: string
}

export interface CvLabels {
  summary: string
  experience: string
  stack: string
  skills: string
  education: string
  languages: string
  download: string
  downloadHint: string
  clientWork: string
  printNote: string
  technologyStack: string
}

export interface CvContent {
  locale: Locale
  name: string
  title: string
  location: string
  metaDescription: string
  summary: string
  pageStack: string[]
  skills: SkillGroup[]
  experience: ExperienceEntry[]
  education: Education
  languages: LanguageSkill[]
  labels: CvLabels
}
