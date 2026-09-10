import { render, screen } from '@testing-library/react'
import { Typewriter } from './Typewriter'
import { Eyebrow } from './Eyebrow'

describe('Typewriter', () => {
  it('renders the full text immediately and exposes its length for the mask', () => {
    render(<Typewriter text='new message' />)
    const el = screen.getByText('new message')
    expect(el).toHaveClass('typewriter')
    expect(el.style.getPropertyValue('--chars')).toBe('11')
  })

  it('is applied by Eyebrow typing to string children only', () => {
    render(
      <Eyebrow index='00' typing>
        Felipe Mateus
      </Eyebrow>
    )
    expect(screen.getByText('Felipe Mateus')).toHaveClass('typewriter')
    expect(screen.getByText(/00 —/)).toBeInTheDocument()
  })
})
