// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { ReactNode } from 'react'

interface CvSectionProps {
  id: string
  heading: string
  children: ReactNode
}

export function CvSection({ id, heading, children }: CvSectionProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-20">
      <h2 id={`${id}-heading`} className="font-display text-h2 font-bold">
        {heading}
      </h2>
      {children}
    </section>
  )
}
