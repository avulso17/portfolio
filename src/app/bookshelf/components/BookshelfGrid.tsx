type BookshelfGridProps = {
  children: React.ReactNode
}

const BookshelfGrid: React.FC<BookshelfGridProps> = ({ children }) => {
  return (
    <div className='grid w-full grid-cols-[repeat(2,_minmax(9.625rem,_1fr))] items-center gap-4 gap-y-6 pb-12 pt-16 mobile:grid-cols-[repeat(auto-fit,_minmax(13.375rem,_1fr))]'>
      {children}
    </div>
  )
}

export default BookshelfGrid
