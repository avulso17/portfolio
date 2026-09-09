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

  if (books.length === 0)
    return (
      <p className='max-w-[60ch] py-16 text-parchment-dim'>
        Nothing on the shelf yet. I add books here once I finish them.
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
