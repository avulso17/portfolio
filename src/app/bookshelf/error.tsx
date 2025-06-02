'use client'

import Link from 'next/link'

const BookshelfErrorPage: React.FC = () => {
  return (
    <div>
      <span>Ocorreu um erro</span>
      <Link href='/'>Home</Link>
    </div>
  )
}

export default BookshelfErrorPage
