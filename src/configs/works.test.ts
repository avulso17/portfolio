import { works } from './works'

describe('works', () => {
  it('has unique slugs, a stack for every project, and no placeholder URLs', () => {
    const slugs = works.map((w) => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const w of works) {
      expect(w.stack.length).toBeGreaterThan(0)
      expect(w.url ?? '').not.toContain('flow-ai-oficial')
    }
  })

  it('only quotes numbers that exist in the résumé', () => {
    const withResult = works.filter((w) => w.result)
    expect(withResult.map((w) => w.slug)).toEqual(['zeus-agrotech'])
    expect(withResult[0].result).toMatch(/50%/)
  })
})
