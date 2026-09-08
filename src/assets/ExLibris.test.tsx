import { render } from '@testing-library/react'
import ExLibris from './ExLibris'
import { F_PATHS, M_PATHS, F_SOLO_PATHS } from './ex-libris/paths'

describe('ExLibris', () => {
  it('renders the monogram by default with F and M strokes and no ring', () => {
    const { container } = render(<ExLibris data-testid='mark' />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100')
    const d = Array.from(svg.querySelectorAll('path')).map((p) =>
      p.getAttribute('d')
    )
    for (const p of [...F_PATHS, ...M_PATHS]) expect(d).toContain(p)
    expect(svg.querySelector('circle')).toBeNull()
  })

  it('seal adds the ring', () => {
    const { container } = render(<ExLibris mark='seal' />)
    expect(container.querySelectorAll('circle').length).toBeGreaterThan(0)
  })

  it('lone F renders only the solo F strokes', () => {
    const { container } = render(<ExLibris mark='f' />)
    const d = Array.from(container.querySelectorAll('path')).map((p) =>
      p.getAttribute('d')
    )
    expect(d).toEqual(F_SOLO_PATHS)
  })

  it('uses currentColor only (no hard-coded fills)', () => {
    const { container } = render(<ExLibris mark='seal' ring='hatched' />)
    const html = container.innerHTML
    expect(html).not.toMatch(/#[0-9a-f]{3,6}/i)
    expect(html).toContain('currentColor')
  })

  it('forwards svg props and className', () => {
    const { container } = render(
      <ExLibris className='h-7 w-7' aria-label='Felipe Mateus' />
    )
    const svg = container.querySelector('svg')!
    expect(svg).toHaveClass('h-7', 'w-7')
    expect(svg).toHaveAttribute('aria-label', 'Felipe Mateus')
  })
})
