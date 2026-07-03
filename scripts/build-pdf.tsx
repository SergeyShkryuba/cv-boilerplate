// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import fs from 'node:fs/promises'
import path from 'node:path'

import { Font, renderToFile } from '@react-pdf/renderer'

import { cvContent, type Locale } from '../src/content'
import { contentParityIssues } from '../src/shared/content-parity'
import { localeConfigs, pdfFile } from '../src/shared/site'
import { CvPdfDocument } from './pdf-document'

const repoRoot = path.resolve(import.meta.dirname, '..')
const fontsDir = path.join(repoRoot, 'assets', 'fonts')
const outputDir = path.join(repoRoot, 'public')

// WARN: built-in PDF fonts have no Ukrainian glyphs — the committed brand
// TTFs are mandatory for the uk document (ADR-0001).
Font.register({
  family: 'Manrope',
  fonts: [
    { src: path.join(fontsDir, 'Manrope-400.ttf'), fontWeight: 400 },
    { src: path.join(fontsDir, 'Manrope-700.ttf'), fontWeight: 700 },
  ],
})

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    { src: path.join(fontsDir, 'JetBrainsMono-400.ttf'), fontWeight: 400 },
    { src: path.join(fontsDir, 'JetBrainsMono-500.ttf'), fontWeight: 500 },
    { src: path.join(fontsDir, 'JetBrainsMono-700.ttf'), fontWeight: 700 },
  ],
})

// ATS text extraction must yield whole words — never hyphenate.
Font.registerHyphenationCallback((word) => [word])

async function buildPdf(locale: Locale) {
  const outputPath = path.join(outputDir, pdfFile(locale))
  await renderToFile(<CvPdfDocument content={cvContent[locale]} />, outputPath)
  console.log(`built ${path.relative(repoRoot, outputPath)}`)
}

async function main() {
  const issues = contentParityIssues(cvContent)

  if (issues.length > 0) {
    const report = issues.map((issue) => `  - ${issue}`).join('\n')
    throw new Error(`Content parity check failed:\n${report}`)
  }

  await fs.mkdir(outputDir, { recursive: true })

  for (const config of localeConfigs) {
    await buildPdf(config.code)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
