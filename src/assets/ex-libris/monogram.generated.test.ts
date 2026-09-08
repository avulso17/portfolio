import { FM_HALO, FM_PLAIN } from './monogram.generated'

describe('monogram.generated', () => {
  it.each([
    ['FM_HALO', FM_HALO],
    ['FM_PLAIN', FM_PLAIN],
  ])('%s has a valid path', (_name, monogram) => {
    expect(monogram.d.startsWith('M')).toBe(true)
    expect(monogram.d.length).toBeGreaterThan(1000)
  })

  it('FM_HALO has a square viewBox (it is centered in a circle)', () => {
    const [, , w, h] = FM_HALO.viewBox.split(' ').map(Number)
    expect(w).toBe(h)
  })

  it('FM_PLAIN has a taller-than-wide viewBox (no square padding)', () => {
    const [, , w, h] = FM_PLAIN.viewBox.split(' ').map(Number)
    expect(h).toBeGreaterThan(w)
  })

  it('FM_HALO is larger than FM_PLAIN', () => {
    expect(FM_HALO.d.length).toBeGreaterThan(FM_PLAIN.d.length)
  })
})
