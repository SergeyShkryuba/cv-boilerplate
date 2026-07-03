// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

'use client'

import { track } from '@vercel/analytics'

import type { Locale } from '@/content'
import { pdfPath } from '@/shared/site'

interface DownloadButtonProps {
  locale: Locale
  label: string
}

export function DownloadButton({ locale, label }: DownloadButtonProps) {
  const handleClick = () => {
    track('cv_pdf_download', { locale })
  }

  return (
    <a
      href={pdfPath(locale)}
      download
      onClick={handleClick}
      className="bg-accent text-body text-background shadow-accent-cta inline-flex items-center gap-2 rounded-md px-6 py-3 font-sans font-semibold transition-transform hover:-translate-y-0.5"
    >
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />
      </svg>
      {label}
    </a>
  )
}
