import { IBook } from '@/types/bookshelf'
import Book from './BookshelfBook'
import BookshelfGrid from './BookshelfGrid'

const BookshelfItems: React.FC<{ books: IBook[] | null }> = ({ books }) => {
  if (!books) return <span>Error to load bookshelf</span>

  return (
    <BookshelfGrid>
      {books.map((book, index) => (
        <Book key={index} name={book.name} cover={book.image} />
      ))}
    </BookshelfGrid>
  )
}

export default BookshelfItems
