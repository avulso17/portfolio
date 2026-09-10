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
    const { container } = render(<Eyebrow index='04'>Bookshelf</Eyebrow>)
    expect(container).toHaveTextContent('04 — Bookshelf')
    expect(screen.getByText('04 —', { exact: false })).toHaveClass(
      'whitespace-nowrap'
    )
  })

  it('renders a level-2 heading when asked to', () => {
    render(<Eyebrow as='h2'>All projects</Eyebrow>)
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'All projects',
    })
    expect(heading).toHaveClass('eyebrow-text')
  })

  it('turns the square amber when active', () => {
    render(<Eyebrow active>Now</Eyebrow>)
    expect(screen.getByText('Now').querySelector('[data-square]')).toHaveClass(
      'bg-amber'
    )
  })
})
