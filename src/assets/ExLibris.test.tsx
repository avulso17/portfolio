import { render } from '@testing-library/react'
import ExLibris from './ExLibris'
import { FM_HALO, FM_PLAIN } from './ex-libris/monogram.generated'

describe('ExLibris', () => {
  it('renders the plain monogram by default and no ring', () => {
    const { container } = render(<ExLibris data-testid='mark' />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', FM_PLAIN.viewBox)

    const paths = svg.querySelectorAll('path')
    expect(paths.length).toBe(1)
    expect(paths[0].getAttribute('d')).toBe(FM_PLAIN.d)

    expect(svg.querySelector('circle')).toBeNull()
  })

  it('halo renders only the FM halo mark, no rings or arc text', () => {
    const { container } = render(<ExLibris mark='halo' />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', FM_HALO.viewBox)

    const paths = svg.querySelectorAll('path')
    expect(paths.length).toBe(1)
    expect(paths[0].getAttribute('d')).toBe(FM_HALO.d)

    expect(container.querySelector('circle')).toBeNull()
    expect(container.querySelector('textPath')).toBeNull()
  })

  it('uses currentColor only (no hard-coded fills)', () => {
    const { container } = render(<ExLibris mark='halo' />)
    const html = container.innerHTML
    expect(html).not.toMatch(/#[0-9a-f]{3,6}/i)
    expect(html).toContain('currentColor')
  })

  it('forwards svg props and className', () => {
    const { container } = render(
      <ExLibris className='h-7 w-auto' aria-label='Felipe Mateus' />
    )
    const svg = container.querySelector('svg')!
    expect(svg).toHaveClass('h-7', 'w-auto')
    expect(svg).toHaveAttribute('aria-label', 'Felipe Mateus')
  })

  it('is an accessible image when given an aria-label', () => {
    const { container } = render(<ExLibris aria-label='Felipe Mateus' />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('role', 'img')
    expect(svg).not.toHaveAttribute('aria-hidden')
  })

  it('is hidden from assistive tech when unlabelled', () => {
    const { container } = render(<ExLibris />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAttribute('role')
  })
})
