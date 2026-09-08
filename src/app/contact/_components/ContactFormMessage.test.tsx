import { render, screen } from '@testing-library/react'
import ContactFormMessage from './ContactFormMessage'

describe('ContactFormMessage', () => {
  it('has no bounce animation and uses the new copy', () => {
    const { container } = render(<ContactFormMessage status='success' />)
    expect(container.innerHTML).not.toMatch(/animate-bounce/)
    expect(screen.getByText('Message sent.')).toBeInTheDocument()
    expect(screen.getByText(/I read everything/)).toBeInTheDocument()
  })
})
