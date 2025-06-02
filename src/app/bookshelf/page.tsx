import { fetchBookshelf } from './actions/fetchBookshelf'
import BookshelfItems from './components/BookshelfItems'

const BookshelfPage: React.FC = async () => {
  const { books } = await fetchBookshelf()

  return <BookshelfItems books={books} />
}

export default BookshelfPage
