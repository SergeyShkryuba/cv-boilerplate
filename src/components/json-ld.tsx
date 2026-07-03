// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { CvContent } from '@/content'
import { profileGraph } from '@/shared/profile-graph'

interface JsonLdProps {
  content: CvContent
}

export function JsonLd({ content }: JsonLdProps) {
  const graph = profileGraph(content)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
      }}
    />
  )
}
