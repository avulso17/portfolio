import { Header } from '@/components/ui/Header'
import { Suspense } from 'react'
import BookshelfItems from './components/BookshelfItems'
import BookshelfLoading from './components/BookshelfLoading'

const BookshelfPage: React.FC = () => {
  return (
    <main>
      <Header
        title='Bookshelf'
        subtitle='Books and pieces of wisdom I&rsquo;ve enjoyed reading.'
      />
      <Suspense fallback={<BookshelfLoading />}>
        <BookshelfItems />
      </Suspense>
    </main>
  )
}

export default BookshelfPage
