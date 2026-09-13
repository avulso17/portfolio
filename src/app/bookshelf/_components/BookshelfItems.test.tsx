import { render, screen } from '@testing-library/react'
import BookshelfItems from './BookshelfItems'

describe('BookshelfItems', () => {
  it('renders the empty state for an empty list and the error state for null', () => {
    const { rerender } = render(<BookshelfItems books={[]} />)
    expect(screen.getByText('Nothing on the shelf yet.')).toBeInTheDocument()
    rerender(<BookshelfItems books={null} />)
    expect(screen.getByText('The shelf didn’t load.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
