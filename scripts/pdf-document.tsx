// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Oleksandr Bilostotskyi

import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import type {
  CvContent,
  ExperienceEntry,
  ProjectEntry,
  SkillGroup,
} from '../src/content'
import { displayTitle, languagesLine } from '../src/shared/format'
import { siteConfig } from '../src/shared/site'
import { pdfPalette } from '../src/shared/theme'

// INFO: ATS parsers read PDFs linearly — the layout stays single-column,
// text-selectable, photo-free, with standard section names (CONTEXT.md).
// WARN: the accent is a graphic accent only (rules, markers) — at text sizes
// on white it fails contrast; text-level accents use accentInk (dark amber).
const { ink, soft, muted, accent, accentInk } = pdfPalette

// WARN: react-pdf resolves the page's unitless lineHeight against the page
// fontSize and inherits it as an ABSOLUTE value — large text (name, title)
// must set its own lineHeight or the lines collapse into each other.
const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 52,
    fontFamily: 'Manrope',
    fontSize: 9.5,
    lineHeight: 1.55,
    color: soft,
  },
  brandTick: {
    width: 42,
    height: 5,
    backgroundColor: accent,
    marginBottom: 18,
  },
  name: {
    fontFamily: 'JetBrains Mono',
    fontSize: 23,
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: -0.4,
    color: ink,
  },
  title: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: 0.3,
    marginTop: 7,
    color: accentInk,
  },
  contactsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 14,
    fontFamily: 'JetBrains Mono',
    fontSize: 8,
    lineHeight: 1.6,
    color: muted,
  },
  contactLink: {
    color: soft,
    textDecoration: 'none',
  },
  contactDivider: {
    color: accent,
  },
  headerRule: {
    borderBottomWidth: 2,
    borderBottomColor: ink,
    marginTop: 18,
  },
  section: {
    marginTop: 18,
  },
  sectionHeading: {
    fontFamily: 'JetBrains Mono',
    fontSize: 9,
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: ink,
    borderBottomWidth: 1,
    borderBottomColor: accent,
    paddingBottom: 5,
    marginBottom: 10,
  },
  entry: {
    marginTop: 11,
    paddingBottom: 2,
  },
  entryFirst: {
    marginTop: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  entryRole: {
    flex: 1,
    paddingRight: 12,
    fontSize: 10.5,
    fontWeight: 700,
    lineHeight: 1.35,
    color: ink,
  },
  entryCompany: {
    color: accentInk,
  },
  entryPeriod: {
    fontFamily: 'JetBrains Mono',
    fontSize: 8,
    lineHeight: 1.35,
    color: muted,
  },
  bulletList: {
    marginTop: 5,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2.5,
  },
  bulletMarker: {
    width: 13,
    color: accent,
    fontWeight: 700,
  },
  bulletText: {
    flex: 1,
  },
  entryStack: {
    marginTop: 5,
    fontSize: 8.5,
    lineHeight: 1.5,
    color: muted,
  },
  entryStackLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 7.5,
    color: muted,
  },
  entryUrl: {
    marginTop: 3,
    fontFamily: 'JetBrains Mono',
    fontSize: 7.5,
    color: accentInk,
    textDecoration: 'none',
  },
  skillGroupRow: {
    marginTop: 5,
  },
  skillLabel: {
    fontWeight: 700,
    color: ink,
  },
  educationInstitution: {
    marginTop: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 52,
    right: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'JetBrains Mono',
    fontSize: 7.5,
    color: muted,
  },
})

interface CvPdfDocumentProps {
  content: CvContent
}

export function CvPdfDocument({ content }: CvPdfDocumentProps) {
  return (
    <Document
      title={displayTitle(content)}
      author={content.name}
      subject="CV"
      language={content.locale}
    >
      <Page size="A4" style={styles.page}>
        <PdfHeader content={content} />

        {content.summary.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{content.labels.summary}</Text>
            <Text>{content.summary}</Text>
          </View>
        )}

        {content.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>
              {content.labels.experience}
            </Text>
            {content.experience.map((entry, index) => (
              <PdfExperienceEntry
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                first={index === 0}
                stackLabel={content.labels.technologyStack}
              />
            ))}
          </View>
        )}

        {content.projects && content.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{content.labels.projects}</Text>
            {content.projects.map((project, index) => (
              <PdfProjectEntry
                key={project.name}
                project={project}
                first={index === 0}
                stackLabel={content.labels.technologyStack}
              />
            ))}
          </View>
        )}

        {content.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionHeading}>{content.labels.skills}</Text>
            {content.skills.map((group) => (
              <PdfSkillGroup key={group.label} group={group} />
            ))}
          </View>
        )}

        {content.education && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionHeading}>
              {content.labels.education}
            </Text>
            <View style={styles.entryHeader}>
              <Text style={styles.entryRole}>
                {content.education.degree}, {content.education.field}
              </Text>
              <Text style={styles.entryPeriod}>{content.education.period}</Text>
            </View>
            <Text style={styles.educationInstitution}>
              {content.education.institution}
            </Text>
          </View>
        )}

        {content.languages.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionHeading}>
              {content.labels.languages}
            </Text>
            <Text>{languagesLine(content.languages, '   ·   ')}</Text>
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text>{siteConfig.url.replace('https://', '')}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}

function PdfHeader({ content }: { content: CvContent }) {
  return (
    <View>
      <View style={styles.brandTick} />
      <Text style={styles.name}>{content.name}</Text>
      <Text style={styles.title}>{content.title}</Text>
      <View style={styles.contactsRow}>
        <Link src={`mailto:${siteConfig.email}`} style={styles.contactLink}>
          {siteConfig.email}
        </Link>
        <Text style={styles.contactDivider}>·</Text>
        <Link src={siteConfig.socials.linkedin.url} style={styles.contactLink}>
          {siteConfig.socials.linkedin.label}
        </Link>
        <Text style={styles.contactDivider}>·</Text>
        <Link src={siteConfig.socials.github.url} style={styles.contactLink}>
          {siteConfig.socials.github.label}
        </Link>
        <Text style={styles.contactDivider}>·</Text>
        <Text>{content.location}</Text>
      </View>
      <View style={styles.headerRule} />
    </View>
  )
}

interface PdfExperienceEntryProps {
  entry: ExperienceEntry
  first: boolean
  stackLabel: string
}

function PdfExperienceEntry({
  entry,
  first,
  stackLabel,
}: PdfExperienceEntryProps) {
  const entryStyle = first ? [styles.entry, styles.entryFirst] : styles.entry

  return (
    <View style={entryStyle} wrap={false}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryRole}>
          {entry.role}
          {'  '}
          <Text style={styles.entryCompany}>— {entry.company}</Text>
        </Text>
        <Text style={styles.entryPeriod}>{entry.period}</Text>
      </View>
      <View style={styles.bulletList}>
        {entry.highlights.map((highlight) => (
          <View key={highlight} style={styles.bulletRow}>
            <Text style={styles.bulletMarker}>›</Text>
            <Text style={styles.bulletText}>{highlight}</Text>
          </View>
        ))}
      </View>
      {entry.stack.length > 0 && (
        <Text style={styles.entryStack}>
          <Text style={styles.entryStackLabel}>{stackLabel}: </Text>
          {entry.stack.join(', ')}
        </Text>
      )}
    </View>
  )
}

interface PdfProjectEntryProps {
  project: ProjectEntry
  first: boolean
  stackLabel: string
}

function PdfProjectEntry({ project, first, stackLabel }: PdfProjectEntryProps) {
  const entryStyle = first ? [styles.entry, styles.entryFirst] : styles.entry

  return (
    <View style={entryStyle} wrap={false}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryRole}>{project.name}</Text>
        {project.period !== undefined && (
          <Text style={styles.entryPeriod}>{project.period}</Text>
        )}
      </View>
      <View style={styles.bulletList}>
        {project.highlights.map((highlight) => (
          <View key={highlight} style={styles.bulletRow}>
            <Text style={styles.bulletMarker}>›</Text>
            <Text style={styles.bulletText}>{highlight}</Text>
          </View>
        ))}
      </View>
      {project.stack.length > 0 && (
        <Text style={styles.entryStack}>
          <Text style={styles.entryStackLabel}>{stackLabel}: </Text>
          {project.stack.join(', ')}
        </Text>
      )}
      {project.url !== undefined && (
        <Link src={project.url} style={styles.entryUrl}>
          {project.url.replace(/^https?:\/\//, '')}
        </Link>
      )}
    </View>
  )
}

function PdfSkillGroup({ group }: { group: SkillGroup }) {
  return (
    <Text style={styles.skillGroupRow}>
      <Text style={styles.skillLabel}>{group.label}: </Text>
      {group.items.join(', ')}
    </Text>
  )
}
