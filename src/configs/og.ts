export const OG_ROUTES = [
  'home',
  'about',
  'projects',
  'bookshelf',
  'notebook',
  'tech-stack',
  'contact',
] as const

export type OgRoute = (typeof OG_ROUTES)[number]

export type OgCopy = {
  eyebrow: string
  title: string
  alt: string
}

// Plan 3 owns the final copy; keep titles short (≤ 40 chars per line, 2 lines).
export const ogCopy: Record<OgRoute, OgCopy> = {
  home: {
    eyebrow: '§ FELIPE MATEUS',
    title: 'I BUILD THE FRONT-END AND QUESTION THE ROADMAP.',
    alt: 'Felipe Mateus — front-end engineer who thinks like a product owner',
  },
  about: {
    eyebrow: '§ 01 — ABOUT',
    title: 'HOW I DECIDE.',
    alt: 'About Felipe Mateus',
  },
  projects: {
    eyebrow: '§ 02 — PROJECTS',
    title: 'THE CALL AND THE RESULT.',
    alt: 'Projects by Felipe Mateus',
  },
  bookshelf: {
    eyebrow: '§ 03 — BOOKSHELF',
    title: 'WHAT I READ.',
    alt: 'Felipe Mateus bookshelf',
  },
  notebook: {
    eyebrow: '§ 04 — NOTEBOOK',
    title: 'NOTES IN PROGRESS.',
    alt: 'Felipe Mateus notebook',
  },
  'tech-stack': {
    eyebrow: '§ 05 — TECH STACK',
    title: 'TOOLS, NOT HEADLINES.',
    alt: 'Felipe Mateus tech stack',
  },
  contact: {
    eyebrow: '§ 06 — CONTACT',
    title: "TELL ME WHAT'S STUCK.",
    alt: 'Contact Felipe Mateus',
  },
}
