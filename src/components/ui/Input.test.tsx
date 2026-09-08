import { render, screen } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  it('default line variant has only a bottom border and amber focus', () => {
    render(<Input aria-label='name' />)
    const el = screen.getByLabelText('name')
    expect(el).toHaveClass(
      'border-b',
      'border-line',
      'bg-transparent',
      'focus:border-amber'
    )
    expect(el.className).not.toMatch(/rounded-(md|lg|xl|4xl)/)
  })

  it('error state uses err color', () => {
    render(<Input aria-label='name' error />)
    expect(screen.getByLabelText('name')).toHaveClass('border-err')
  })
})
