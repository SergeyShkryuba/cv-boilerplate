import type { CvContent } from './types'

// TODO: replace every field below with your own career data. The values are
// placeholders on purpose — structurally valid so the site and PDF build and
// render out of the box, but obviously not real. Keep the shape; swap the text.
// The `labels` block is UI chrome (section titles, button text) — translate it
// per locale, but it is not personal data.
//
// Sections self-hide when empty (page and PDF): set `summary: ''`, empty an
// array (`experience: []`, `skills: []`, `pageStack: []`, `languages: []`), or
// drop the whole `education` key, and that section simply does not render.
// name / title / location are the identity and are always shown.
export const en: CvContent = {
  locale: 'en',
  name: 'Your Name',
  title: 'Your Job Title',
  location: 'Your City, Country',
  metaDescription:
    'Your Name — Your Job Title. One-line professional summary that sells the click. Download the CV as PDF.',
  summary:
    'A two-to-four sentence professional summary: who you are, your years of experience, the domains and stacks you are strongest in, and the kind of impact you deliver. Write it for a recruiter deciding in 30 seconds whether to open your PDF.',
  pageStack: [
    'Skill One',
    'Skill Two',
    'Skill Three',
    'Skill Four',
    'Skill Five',
    'Skill Six',
  ],
  skills: [
    {
      label: 'Group One',
      items: ['Item A', 'Item B', 'Item C', 'Item D'],
    },
    {
      label: 'Group Two',
      items: ['Item A', 'Item B', 'Item C', 'Item D'],
    },
    {
      label: 'Group Three',
      items: ['Item A', 'Item B', 'Item C'],
    },
  ],
  experience: [
    {
      period: 'Mon Year – Present',
      role: 'Your Role',
      company: 'Company Name',
      description:
        'One line describing the company or product and what you owned there. This line shows on the web page; the highlights below show in the PDF only.',
      highlights: [
        'Describe a concrete achievement — what you built or led, and the measurable impact.',
        'Another accomplishment framed as a result, not a responsibility.',
        'A third highlight covering scope, ownership, or a hard problem you solved.',
      ],
      stack: ['Tech A', 'Tech B', 'Tech C', 'Tech D'],
      current: true,
    },
    {
      period: 'Mon Year – Mon Year',
      role: 'Your Role',
      company: 'Previous Company',
      description:
        'One-line description of this role: the product, your remit, and the outcome.',
      highlights: [
        'A key result from this role, phrased as an accomplishment.',
        'A second highlight — a system you owned or a practice you introduced.',
      ],
      stack: ['Tech A', 'Tech B', 'Tech C'],
    },
    {
      period: 'Mon Year – Mon Year',
      role: 'Earlier Role',
      company: 'Earlier Company',
      description:
        'A one-line summary of an earlier role. Older entries can be dimmed via `dim: true`.',
      highlights: [
        'An accomplishment from earlier in your career worth keeping.',
      ],
      stack: ['Tech A', 'Tech B'],
      dim: true,
    },
  ],
  projects: [
    {
      name: 'Project Name',
      period: '2024',
      description:
        'One line on what the project is and your role. Great for pet projects, open-source, hackathons, or coursework when you are early-career — leave `experience: []` and let this section carry the weight.',
      highlights: [
        'What you built and the outcome — a feature, a result, a hard problem solved.',
        'A second highlight: scope, tech decision, or something you shipped.',
      ],
      stack: ['Tech A', 'Tech B', 'Tech C'],
      url: 'https://github.com/your-handle/project',
    },
    {
      name: 'Another Project',
      period: '2023',
      description:
        'A one-line summary of a second project. Add `url` to link the repo or live demo; omit `period`/`url` if you do not have them.',
      highlights: ['A concrete thing you made here, framed as a result.'],
      stack: ['Tech A', 'Tech B'],
      url: 'https://your-demo.example',
    },
  ],
  education: {
    degree: 'Your Degree',
    field: 'Your Field of Study',
    institution: 'Your Institution',
    period: 'Year – Year',
  },
  languages: [
    { language: 'English', level: 'Native' },
    { language: 'Another Language', level: 'Professional' },
  ],
  labels: {
    summary: 'Summary',
    experience: 'Work Experience',
    projects: 'Projects',
    stack: 'Stack',
    skills: 'Skills',
    education: 'Education',
    languages: 'Languages',
    download: 'Download CV (PDF)',
    downloadHint:
      'The full CV lives in the PDF: experience details, complete skills, education.',
    clientWork: 'Selected work:',
    printNote: 'Printed from your-domain.example. The full CV with details:',
    technologyStack: 'Technology stack',
  },
}
