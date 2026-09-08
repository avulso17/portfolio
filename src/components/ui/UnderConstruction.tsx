import Link from 'next/link'

import { Button } from './Button'

export const UnderConstruction = (): React.ReactElement => {
  return (
    <div className='flex w-full flex-col items-center py-16'>
      <img
        src='/assets/under-construction.svg'
        className='mx-auto aspect-square w-[500px]'
        alt='under_construction'
      />
      <p className='text-white/50 mt-12 text-center text-2xl'>
        This page is currently{' '}
        <b className='italic font-inherit'>under construction.</b>
      </p>
      <p className='text-white/50 text-center text-xl'>
        Please check back later.
      </p>

      <Link href='/' className='mt-12'>
        <Button>Home</Button>
      </Link>
    </div>
  )
}
