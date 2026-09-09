import { existsSync } from 'node:fs'
import path from 'node:path'
import { OG_ROUTES, ogCopy } from './og'

describe('ogCopy', () => {
  it('has an entry per route with uppercase eyebrow and non-empty title/alt', () => {
    for (const route of OG_ROUTES) {
      const c = ogCopy[route]
      expect(c.eyebrow).toBe(c.eyebrow.toUpperCase())
      expect(c.title.length).toBeGreaterThan(0)
      expect(c.alt.length).toBeGreaterThan(0)
    }
  })

  it('every route has file-based opengraph-image and twitter-image', () => {
    const app = path.join(process.cwd(), 'src', 'app')
    for (const route of OG_ROUTES) {
      const dir = route === 'home' ? app : path.join(app, route)
      expect(existsSync(path.join(dir, 'opengraph-image.tsx'))).toBe(true)
      expect(existsSync(path.join(dir, 'twitter-image.tsx'))).toBe(true)
    }
  })
})
