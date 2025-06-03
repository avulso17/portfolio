import { fetchBookshelf } from './_actions/fetchBookshelf'
import BookshelfItems from './_components/BookshelfItems'

const BookshelfPage: React.FC = async () => {
  const { books } = await fetchBookshelf()

  return <BookshelfItems books={books} />
}

export default BookshelfPage
