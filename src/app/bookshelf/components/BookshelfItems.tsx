import { fetchBookshelf } from '../actions/fetchBookshelf'
import Book from './BookshelfBook'
import BookshelfGrid from './BookshelfGrid'

const BookshelfItems: React.FC = async () => {
  const { books } = await fetchBookshelf()

  return (
    <BookshelfGrid>
      {books!.map((book, index) => (
        <Book key={index} name={book.name} cover={book.image} />
      ))}
    </BookshelfGrid>
  )
}

export default BookshelfItems
