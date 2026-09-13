import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('primary is solid parchment on ink', () => {
    render(<Button>Go</Button>)
    const btn = screen.getByRole('button', { name: 'Go' })
    expect(btn).toHaveClass('bg-parchment', 'text-ink')
    expect(btn.className).not.toMatch(/amber/)
  })

  it('accent is the only amber variant', () => {
    render(<Button variant='accent'>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-amber', 'text-ink')
  })

  it('secondary is an outline in line color', () => {
    render(<Button variant='secondary'>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-line',
      'bg-transparent'
    )
  })

  it('text variant is mono with underline offset', () => {
    render(<Button variant='text'>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass(
      'eyebrow-text',
      'underline-offset-4'
    )
  })

  it('never uses radius above 2px', () => {
    for (const variant of ['primary', 'accent', 'secondary', 'text'] as const) {
      const { unmount } = render(<Button variant={variant}>x</Button>)
      expect(screen.getByRole('button').className).not.toMatch(
        /rounded-(md|lg|xl|2xl|3xl|full|\[)/
      )
      unmount()
    }
  })

  it('renders icons around children', () => {
    render(
      <Button
        leftIcon={<i data-testid='l' />}
        rightIcon={<i data-testid='r' />}
      >
        Go
      </Button>
    )
    expect(screen.getByTestId('l')).toBeInTheDocument()
    expect(screen.getByTestId('r')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('gap-2')
  })
})
