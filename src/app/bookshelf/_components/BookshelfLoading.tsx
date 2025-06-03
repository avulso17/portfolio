import BookshelfGrid from './BookshelfGrid'

const BookshelfLoading: React.FC = () => {
  return (
    <BookshelfGrid>
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className='aspect-[244/325] w-full animate-pulse rounded-md bg-onyx'
          />
        ))}
    </BookshelfGrid>
  )
}

export default BookshelfLoading
