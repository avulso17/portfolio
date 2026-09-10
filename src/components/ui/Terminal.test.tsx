import { render, screen } from '@testing-library/react'
import { Terminal } from './Terminal'

describe('Terminal', () => {
  it('renders a mono header with title and path', () => {
    render(
      <Terminal title='tech-stack' path='~/felipe'>
        <p>body</p>
      </Terminal>
    )
    expect(screen.getByText(/tech-stack/)).toHaveClass('eyebrow-text')
    expect(screen.getByText('~/felipe')).toHaveClass(
      'font-mono',
      'text-parchment-dim'
    )
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('draws three window dots', () => {
    const { container } = render(<Terminal title='t'>x</Terminal>)
    expect(container.querySelectorAll('header i')).toHaveLength(3)
  })
})
