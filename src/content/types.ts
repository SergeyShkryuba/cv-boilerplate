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

export interface ProjectEntry {
  name: string
  description: string
  highlights: string[]
  stack: string[]
  period?: string
  url?: string
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
  projects: string
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

// INFO: name/title/location/metaDescription are the identity — always required
// and always rendered. Everything else is a section that self-hides when empty:
// an empty array (experience, projects, skills, pageStack, languages), an
// empty/whitespace `summary`, or an omitted `education`/`projects` renders
// nothing (page and PDF). Newcomers with no jobs fill `projects` and leave
// `experience: []`.
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
  projects?: ProjectEntry[]
  education?: Education
  languages: LanguageSkill[]
  labels: CvLabels
}
