// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

// INFO: Brand tokens, JS side. The PDF (scripts/pdf-document.tsx) and the OG
// card (src/shared/og-image.tsx) import from here. The web page mirrors these
// in src/app/globals.css `@theme` — keep the two in sync (see DESIGN.md).
export const brand = {
  background: '#0d1117',
  surface: '#12181f',
  surfaceElevated: '#161d26',
  foreground: '#f0ede8',
  foregroundSoft: '#c8c4bc',
  mutedForeground: '#8a857f',
  accent: '#e8a838',
  border: '#1e2631',
  borderStrong: '#252f3d',
} as const

// INFO: the PDF is a LIGHT document (ink on white), not the dark site — it has
// its own palette. Only the accent hue is shared; on white the accent needs a
// darker, text-safe variant (accentInk) to pass contrast.
export const pdfPalette = {
  ink: '#111827',
  soft: '#3f4650',
  muted: '#6b7280',
  accent: brand.accent,
  accentInk: '#8f6114',
} as const
