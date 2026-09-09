import { render, screen } from '@testing-library/react'
import ContactForm from './ContactForm'

vi.mock('@/app/contact/_actions/sendEmail', () => ({
  default: vi.fn(),
}))

describe('ContactForm', () => {
  it('keeps vertical rhythm between the three short fields', () => {
    render(<ContactForm />)
    const fields = ['Email', 'Name', 'Subject'].map(
      (label) => screen.getByLabelText(label).parentElement!
    )
    const group = fields[0].parentElement!
    for (const field of fields) expect(field.parentElement).toBe(group)
    expect(group).toHaveClass('flex', 'flex-col', 'gap-6')
  })
})
