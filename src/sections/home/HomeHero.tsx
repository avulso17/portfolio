import Link from 'next/link'

import { Button } from '@/components/Button'
import HomePortrait from './HomePortrait'

export default function HomeHero() {
  return (
    <div className='relative z-0 mb-[8.5rem] flex w-full flex-col pt-14 mobile:mb-[20.625rem] mobile:gap-10 mobile:pt-0'>
      <h1 className='mb-4 w-fit whitespace-nowrap font-extrabold mobile:mb-0'>
        <b className='block mobile:hidden'>Hi 👋🏻</b>
        <b>I&rsquo;m</b> Felipe M
        <p className='hidden font-extrabold text-inherit font-inherit tablet:inline-block'>
          ateus
        </p>
      </h1>

      <p className='mb-14 w-full max-w-[45.625rem] font-medium !leading-5 !text-gray-dark hero-text mobile:mb-0 mobile:!leading-[2rem]'>
        A front-end engineer and UI/UX designer helping startups turn their
        visions into a digital reality. I specialize in designing and building
        modern mobile and web-based apps.
      </p>

      <div className='flex flex-col gap-4 mobile:flex-row mobile:items-center'>
        <Link href='/about'>
          <Button className='w-full mobile:w-fit'>See my resume</Button>
        </Link>

        <Link href='/contact'>
          <Button className='w-full mobile:w-fit' variant='secondary'>
            Get in touch
          </Button>
        </Link>
      </div>

      <HomePortrait className='absolute -top-10 left-[570px] -z-10 hidden wide:flex' />
    </div>
  )
}
