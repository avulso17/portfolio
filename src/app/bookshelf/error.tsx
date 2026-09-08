'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const BookshelfErrorPage: React.FC<{ reset: () => void }> = ({ reset }) => (
  <div className='flex flex-col items-start gap-6 py-16'>
    <p className='text-parchment-dim'>
      The shelf didn&rsquo;t load. It&rsquo;s on my side, not yours.
    </p>
    <div className='flex gap-4'>
      <Button variant='secondary' onClick={reset}>
        Try again
      </Button>
      <Link href='/'>
        <Button variant='text'>Back home</Button>
      </Link>
    </div>
  </div>
)

export default BookshelfErrorPage
