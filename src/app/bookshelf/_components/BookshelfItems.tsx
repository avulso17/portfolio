import { Button } from '@/components/ui/Button'
import { IBook } from '@/types/bookshelf'
import Link from 'next/link'
import Book from './BookshelfBook'
import BookshelfGrid from './BookshelfGrid'
import BookshelfState from './BookshelfState'

const BookshelfItems: React.FC<{ books: IBook[] | null }> = ({ books }) => {
  if (!books)
    return (
      <BookshelfState variant='error'>
        <Link href='/'>
          <Button variant='text'>Back home</Button>
        </Link>
      </BookshelfState>
    )

  if (books.length === 0) return <BookshelfState variant='empty' />

  return (
    <BookshelfGrid>
      {books.map((book, index) => (
        <Book key={index} name={book.name} cover={book.image} />
      ))}
    </BookshelfGrid>
  )
}

export default BookshelfItems
