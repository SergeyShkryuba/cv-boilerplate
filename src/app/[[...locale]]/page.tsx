// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import { CvPage } from '@/components/cv-page'
import { cvContent } from '@/content'
import { localeStaticParams, resolveLocale } from '@/shared/site'

export function generateStaticParams() {
  return localeStaticParams()
}

interface PageProps {
  params: Promise<{ locale?: string[] }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  return <CvPage content={cvContent[resolveLocale(locale)]} />
}
