import BookshelfGrid from './BookshelfGrid'

const BookshelfLoading: React.FC = () => {
  return (
    <BookshelfGrid>
      {Array(8)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className='bg-onyx aspect-[244/325] w-full animate-pulse rounded-md'
          />
        ))}
    </BookshelfGrid>
  )
}

export default BookshelfLoading
