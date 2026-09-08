import { FM_HALO, FM_PLAIN } from './monogram.generated'

describe('monogram.generated', () => {
  it.each([
    ['FM_HALO', FM_HALO],
    ['FM_PLAIN', FM_PLAIN],
  ])('%s has a square viewBox and a valid path', (_name, monogram) => {
    const [, , w, h] = monogram.viewBox.split(' ').map(Number)
    expect(w).toBe(h)
    expect(monogram.d.startsWith('M')).toBe(true)
    expect(monogram.d.length).toBeGreaterThan(1000)
  })

  it('FM_HALO is larger than FM_PLAIN', () => {
    expect(FM_HALO.d.length).toBeGreaterThan(FM_PLAIN.d.length)
  })
})
