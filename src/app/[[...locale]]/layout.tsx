// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '../globals.css'

import { RootDocument } from '@/components/root-document'
import { cvMetadata, cvViewport } from '@/shared/metadata'
import { localeStaticParams, resolveLocale } from '@/shared/site'

// INFO: default locale renders at `/` (`[]`), every other at `/<code>`.
// Routing is config-driven — see src/shared/site localeConfigs and ADR-0002.
export function generateStaticParams() {
  return localeStaticParams()
}

interface LayoutProps {
  children: ReactNode
  params: Promise<{ locale?: string[] }>
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  return cvMetadata(resolveLocale(locale))
}

export const viewport = cvViewport

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return <RootDocument locale={resolveLocale(locale)}>{children}</RootDocument>
}
