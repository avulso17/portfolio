import { Header } from '@/components/ui/Header'
import BookshelfGrid from './BookshelfGrid'

const BookshelfPage: React.FC = () => {
  return (
    <main>
      <Header
        title='Bookshelf'
        subtitle='Books and pieces of wisdom I&rsquo;ve enjoyed reading.'
      />
      <BookshelfGrid />
    </main>
  )
}

export default BookshelfPage
