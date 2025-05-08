'use client'

import { useBookshelf } from '@/hooks/useBookshelf'
import BookshelfGridItem from './BookshelfGridItem'

const BookshelfGrid: React.FC = () => {
  const { books } = useBookshelf()

  return (
    <div className='grid w-full grid-cols-[repeat(2,_minmax(9.625rem,_1fr))] items-center gap-4 gap-y-6 pb-12 pt-16 mobile:grid-cols-[repeat(auto-fit,_minmax(13.375rem,_1fr))]'>
      {books.map((book, index) => (
        <BookshelfGridItem key={index} name={book.name} cover={book.cover} />
      ))}
    </div>
  )
}

export default BookshelfGrid
