import { render, screen } from '@testing-library/react'
import ContactFormMessage from './ContactFormMessage'

describe('ContactFormMessage', () => {
  it('has no bounce animation and uses the new copy', () => {
    const { container } = render(<ContactFormMessage status='success' />)
    expect(container.innerHTML).not.toMatch(/animate-bounce/)
    expect(screen.getByText('Message sent.')).toBeInTheDocument()
    expect(screen.getByText(/I read everything/)).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('offers a way back to the message when sending failed', () => {
    render(<ContactFormMessage status='error' onRetry={() => {}} />)
    expect(screen.getByText('Not sent.')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Back to the message' })
    ).toBeInTheDocument()
  })
})
