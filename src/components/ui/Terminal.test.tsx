import { render, screen } from '@testing-library/react'
import { Terminal } from './Terminal'

describe('Terminal', () => {
  it('renders a mono header with title and path', () => {
    render(
      <Terminal title='tech-stack' path='~/felipe'>
        <p>body</p>
      </Terminal>
    )
    const header = screen.getByRole('heading', { name: /tech-stack/ })
    expect(header).toHaveClass('font-mono')
    expect(screen.getByText('~/felipe')).toHaveClass(
      'font-mono',
      'text-parchment-mute'
    )
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('draws three window dots', () => {
    render(<Terminal title='t'>x</Terminal>)
    expect(screen.getAllByTestId('terminal-dot')).toHaveLength(3)
  })
})
