// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent, ProjectEntry } from '@/content'

import { InlineLink } from './inline-link'
import { CvSection } from './section'

interface ProjectsSectionProps {
  content: CvContent
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  const projects = content.projects ?? []

  if (projects.length === 0) return null

  return (
    <CvSection id="projects" heading={content.labels.projects}>
      <div className="mt-8">
        {projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </CvSection>
  )
}

interface ProjectRowProps {
  project: ProjectEntry
}

function ProjectRow({ project }: ProjectRowProps) {
  const dimClass = project.dim ? 'opacity-70' : ''

  return (
    <article
      className={`border-border grid gap-x-8 gap-y-1 border-t py-6 sm:grid-cols-[168px_1fr] ${dimClass}`}
    >
      <p className="text-tag text-muted-foreground pt-1 font-mono uppercase">
        {project.period}
      </p>
      <div>
        <h3 className="text-title font-semibold">
          {project.url ? (
            <InlineLink href={project.url} rel="noopener">
              {project.name}
            </InlineLink>
          ) : (
            project.name
          )}
        </h3>
        <p className="text-body text-foreground-soft mt-2 max-w-[64ch]">
          {project.description}
        </p>
      </div>
    </article>
  )
}
