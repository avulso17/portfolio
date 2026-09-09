import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('draws the line grid with registration marks by default', () => {
    render(<Container data-testid='c'>x</Container>)
    const el = screen.getByTestId('c')
    expect(el).toHaveClass('border-x', 'border-line')
    expect(el.querySelectorAll('[data-reg-mark]')).toHaveLength(4)
  })

  it('can opt out of the grid', () => {
    render(
      <Container grid={false} data-testid='c'>
        x
      </Container>
    )
    const el = screen.getByTestId('c')
    expect(el).not.toHaveClass('border-x')
    expect(el.querySelectorAll('[data-reg-mark]')).toHaveLength(0)
  })
})
