import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('is an ink-2 surface with a line border and 2px radius', () => {
    render(<Card data-testid='c'>body</Card>)
    const el = screen.getByTestId('c')
    expect(el).toHaveClass('bg-ink-2', 'border', 'border-line', 'rounded-sm')
    expect(el.className).not.toMatch(/shadow|blur|backdrop/)
  })

  it('can render as another element', () => {
    render(
      <Card as='article' data-testid='c'>
        body
      </Card>
    )
    expect(screen.getByTestId('c').tagName).toBe('ARTICLE')
  })
})
