vi.mock('@/styles/fonts', () => ({ fontVariables: '' }))
vi.mock('@/components/layout/RootLayout', () => ({ default: () => null }))
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: async () => ({ error: null }) }
  },
}))
vi.mock('@/lib/utils/supabase/server', () => ({ createClient: () => ({}) }))

import { metadata } from './layout'
import { metadata as aboutMetadata } from './about/page'
import { metadata as bookshelfMetadata } from './bookshelf/page'
import { metadata as contactMetadata } from './contact/page'
import { metadata as notebookMetadata } from './notebook/page'
import { metadata as projectsMetadata } from './projects/page'
import { metadata as techStackMetadata } from './tech-stack/page'

describe('root metadata', () => {
  it('carries the positioning, no placeholders and no unimplemented locale', () => {
    const title = metadata.title as { default: string; template: string }
    expect(title.default).toBe(
      'Felipe Mateus — Front-end engineer who thinks like a product owner'
    )
    expect(title.template).toBe('%s — Felipe Mateus')
    expect(JSON.stringify(metadata)).not.toMatch(/seu-|exemplo|seuhandle|\/pt/)
    expect(metadata.verification).toBeUndefined()
  })

  it('keeps the root canonical on the homepage', () => {
    expect(metadata.alternates?.canonical).toBe('https://felipe-mateus.com')
  })
})

describe('page metadata', () => {
  it.each([
    ['about', aboutMetadata, '/about'],
    ['bookshelf', bookshelfMetadata, '/bookshelf'],
    ['contact', contactMetadata, '/contact'],
    ['notebook', notebookMetadata, '/notebook'],
    ['projects', projectsMetadata, '/projects'],
    ['tech-stack', techStackMetadata, '/tech-stack'],
  ])('canonicalizes %s to its own route', (_name, pageMetadata, canonical) => {
    expect(pageMetadata.alternates?.canonical).toBe(canonical)
    expect(pageMetadata.alternates?.canonical).not.toBe(
      metadata.alternates?.canonical
    )
  })

  it('gives every page an openGraph and twitter block', () => {
    for (const pageMetadata of [
      aboutMetadata,
      bookshelfMetadata,
      contactMetadata,
      notebookMetadata,
      projectsMetadata,
      techStackMetadata,
    ]) {
      expect(pageMetadata.openGraph?.title).toBeTruthy()
      expect(pageMetadata.openGraph?.description).toBeTruthy()
      expect(pageMetadata.twitter?.title).toBeTruthy()
      expect(pageMetadata.twitter?.description).toBeTruthy()
    }
  })
})
