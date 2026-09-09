import { render, screen } from '@testing-library/react'
import { TextField } from './TextField'

describe('TextField', () => {
  it('renders no message and no description when there is no error', () => {
    render(<TextField id='email' label='Email' />)
    const input = screen.getByLabelText('Email')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('names the problem and points the input at it', () => {
    render(
      <TextField
        id='email'
        label='Email'
        error
        errorMessage='Add your email so I can answer.'
      />
    )
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Add your email so I can answer.'
    )
  })
})
