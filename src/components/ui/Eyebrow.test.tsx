import { render, screen } from '@testing-library/react'
import { Eyebrow } from './Eyebrow'

describe('Eyebrow', () => {
  it('renders uppercase mono label with a square marker', () => {
    render(<Eyebrow>Selected work</Eyebrow>)
    const label = screen.getByText('Selected work')
    expect(label).toHaveClass('eyebrow-text')
    const square = label.querySelector('[data-square]')
    expect(square).not.toBeNull()
    expect(square).toHaveClass('bg-parchment-mute')
    expect(square).toHaveAttribute('aria-hidden', 'true')
  })

  it('prefixes an index when given', () => {
    render(<Eyebrow index='04'>Bookshelf</Eyebrow>)
    expect(screen.getByText(/04 — Bookshelf/)).toBeInTheDocument()
  })

  it('turns the square amber when active', () => {
    render(<Eyebrow active>Now</Eyebrow>)
    expect(screen.getByText('Now').querySelector('[data-square]')).toHaveClass(
      'bg-amber'
    )
  })
})
