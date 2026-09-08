import { IBook } from '@/types/bookshelf'
import Book from './BookshelfBook'
import BookshelfGrid from './BookshelfGrid'

const BookshelfItems: React.FC<{ books: IBook[] | null }> = ({ books }) => {
  if (!books)
    return (
      <p className='py-16 text-parchment-dim'>
        Couldn’t load the shelf. Try again in a minute.
      </p>
    )

  return (
    <BookshelfGrid>
      {books.map((book, index) => (
        <Book key={index} name={book.name} cover={book.image} />
      ))}
    </BookshelfGrid>
  )
}

export default BookshelfItems
