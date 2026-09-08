import { FM_PLAIN } from './monogram.generated'
import { exLibrisSvg } from './svg'

describe('exLibrisSvg', () => {
  it('builds a standalone square svg sized to the given size', () => {
    const svg = exLibrisSvg({
      size: 32,
      background: '#0A0A0A',
      color: '#F2EEE6',
    })
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('width="32"')
  })

  it('includes the background rect when a background is given', () => {
    const svg = exLibrisSvg({
      size: 100,
      background: '#0A0A0A',
      color: '#F2EEE6',
    })
    expect(svg).toContain('<rect width="100" height="100" fill="#0A0A0A"/>')
  })

  it('omits the background rect when background is none', () => {
    const svg = exLibrisSvg({ size: 100, background: 'none', color: '#F2EEE6' })
    expect(svg).not.toContain('<rect')
  })

  it('includes the FM_PLAIN mark path fitted by height', () => {
    const svg = exLibrisSvg({
      size: 100,
      background: 'none',
      color: '#F2EEE6',
    })
    expect(svg).toContain(`d="${FM_PLAIN.d}"`)
    expect(svg).toContain('fill="#F2EEE6"')
    expect(svg).toContain('translate(')
    expect(svg).toContain('scale(')
  })

  it('scales by height with the default pad of 8', () => {
    const svg = exLibrisSvg({
      size: 100,
      background: 'none',
      color: '#F2EEE6',
    })
    const scale = ((100 - 16) / 820).toFixed(4)
    expect(svg).toContain(`scale(${scale})`)
  })
})
