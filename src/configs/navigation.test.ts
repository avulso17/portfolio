import {
  AVULSO_SINCE,
  NAV_ALL,
  NAV_MORE,
  NAV_PRIMARY,
  SIGN_OFF,
} from './navigation'

describe('navigation config', () => {
  it('keeps the literal labels in the spec order', () => {
    expect(NAV_PRIMARY.map((l) => l.label)).toEqual([
      'About',
      'Projects',
      'Contact',
    ])
    expect(NAV_MORE.map((l) => l.label)).toEqual([
      'Bookshelf',
      'Notebook',
      'Tech Stack',
    ])
    expect(NAV_ALL.map((l) => l.href)).toEqual([
      '/about',
      '/projects',
      '/tech-stack',
      '/bookshelf',
      '/notebook',
      '/contact',
    ])
  })

  it('carries the easter-egg year and the sign-off', () => {
    expect(AVULSO_SINCE).toBe(2015)
    expect(SIGN_OFF).toBe("Let's build something that pays for itself.")
  })
})
