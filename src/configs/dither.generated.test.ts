import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { dithered } from './dither.generated'
import { works } from './works'

describe('dither manifest', () => {
  it('has an ink version of every project screenshot and the portrait', () => {
    const names = Object.keys(dithered).sort()
    expect(names).toEqual([...works.map((w) => w.slug), 'portrait'].sort())
    for (const asset of Object.values(dithered)) {
      expect(existsSync(join(process.cwd(), 'public', asset.png))).toBe(true)
      expect(existsSync(join(process.cwd(), 'public', asset.webp))).toBe(true)
      expect(asset.cssWidth).toBeGreaterThan(0)
    }
  })
})
