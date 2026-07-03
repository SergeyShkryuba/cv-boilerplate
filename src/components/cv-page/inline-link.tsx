// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { ReactNode } from 'react'

interface InlineLinkProps {
  href: string
  rel?: string
  children: ReactNode
}

export function InlineLink({ href, rel, children }: InlineLinkProps) {
  return (
    <a
      href={href}
      rel={rel}
      className="text-foreground-soft decoration-border-strong hover:text-accent hover:decoration-accent underline underline-offset-4 transition-colors"
    >
      {children}
    </a>
  )
}
