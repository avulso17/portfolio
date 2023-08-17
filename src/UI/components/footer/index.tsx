import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Button } from '../button'
import Separator from '../separator'
const DynamicLordIcon = dynamic(() => import('../lordIcon'), { ssr: false })

export const Footer = (): React.ReactElement => {
  return (
    <footer
      id='footer'
      className='relative flex w-full justify-between pb-10 pt-[4.625rem]'
    >
      <Separator alpha className='absolute top-0 !w-screen absolute-center-x' />

      <div className='flex flex-col gap-4'>
        <DynamicLordIcon
          src='/lord/wired/wired-planet.json'
          trigger='hover'
          target='#footer'
          className='current-color'
          size={64}
        />
        <p className='text-xl font-medium leading-normal text-gray'>
          Thanks for stopping by ッ
        </p>

        <small className='mt-auto select-none text-sm leading-normal text-gray'>
          &#169; 2023 Felipe Mateus. All Rights Reserved.
        </small>
      </div>

      <div className='flex gap-28'>
        <div className='flex flex-col gap-4'>
          <b className='mb-4 font-bold'>Links</b>
          <Link href='/about'>
            <Button variant='text'>About</Button>
          </Link>

          <Link href='/work'>
            <Button variant='text'>Work</Button>
          </Link>

          <Link href='/stacks'>
            <Button variant='text'>Tech Stack</Button>
          </Link>

          <Link href='/contact'>
            <Button variant='text'>Contact</Button>
          </Link>
        </div>

        <div className='flex flex-col gap-4'>
          <b className='mb-4 font-bold'>Elsewhere</b>
          <Button variant='text'>Email</Button>
          <Button variant='text'>LinkedIn</Button>
          <Button variant='text'>GitHub</Button>
          <Button variant='text'>Twitter</Button>
          <Button variant='text'>Discord</Button>
        </div>
      </div>
    </footer>
  )
}
