import { render, screen } from '@testing-library/react'
import BookshelfState from './BookshelfState'

describe('BookshelfState', () => {
  it('shows the empty shelf with its scene and no actions', () => {
    const { container } = render(<BookshelfState variant='empty' />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Nothing on the shelf yet.'
    )
    expect(screen.getByText(/land here as I finish them/)).toHaveClass(
      'font-serif',
      'italic'
    )
    expect(container.querySelector('img[aria-hidden="true"]')).toHaveAttribute(
      'src',
      expect.stringContaining('bookshelf-empty')
    )
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('shows the error copy and the actions it is given', () => {
    render(
      <BookshelfState variant='error'>
        <button>Try again</button>
      </BookshelfState>
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'The shelf didn’t load.'
    )
    expect(screen.getByText(/on my side, not yours/)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument()
  })
})
