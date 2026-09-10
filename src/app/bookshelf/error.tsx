'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useEffect } from 'react'
import BookshelfState from './_components/BookshelfState'

const BookshelfErrorPage: React.FC<{
  error: Error & { digest?: string }
  reset: () => void
}> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <BookshelfState variant='error'>
      <Button variant='secondary' onClick={reset}>
        Try again
      </Button>
      <Link href='/'>
        <Button variant='text'>Back home</Button>
      </Link>
    </BookshelfState>
  )
}

export default BookshelfErrorPage
