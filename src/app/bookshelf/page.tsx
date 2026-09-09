import { Metadata } from 'next'
import { fetchBookshelf } from './_actions/fetchBookshelf'
import BookshelfItems from './_components/BookshelfItems'

export const metadata: Metadata = {
  title: 'Bookshelf',
  alternates: { canonical: '/bookshelf' },
  description: 'Books that changed how I decide.',
  openGraph: {
    title: 'Bookshelf',
    description: 'Books that changed how I decide.',
  },
  twitter: {
    title: 'Bookshelf',
    description: 'Books that changed how I decide.',
  },
}

const BookshelfPage: React.FC = async () => {
  const { books } = await fetchBookshelf()

  return <BookshelfItems books={books} />
}

export default BookshelfPage
