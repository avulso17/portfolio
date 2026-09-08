import { render } from '@testing-library/react'
import ExLibris from './ExLibris'
import { FM_HALO, FM_PLAIN } from './ex-libris/monogram.generated'
import { SEAL_TEXT } from './ex-libris/paths'

describe('ExLibris', () => {
  it('renders the plain monogram by default and no ring', () => {
    const { container } = render(<ExLibris data-testid='mark' />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100')

    const paths = svg.querySelectorAll('path')
    expect(paths.length).toBe(1)
    expect(paths[0].getAttribute('d')).toBe(FM_PLAIN.d)

    expect(svg.querySelector('circle')).toBeNull()
  })

  it('seal renders the ring, the arc text, and the halo monogram', () => {
    const { container } = render(<ExLibris mark='seal' />)
    expect(container.querySelectorAll('circle').length).toBeGreaterThanOrEqual(
      3
    )

    const textPath = container.querySelector('textPath')
    expect(textPath).not.toBeNull()
    expect(textPath?.textContent).toBe(SEAL_TEXT)

    const d = Array.from(container.querySelectorAll('path')).map((p) =>
      p.getAttribute('d')
    )
    expect(d).toContain(FM_HALO.d)
  })

  it('uses currentColor only (no hard-coded fills)', () => {
    const { container } = render(<ExLibris mark='seal' />)
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
