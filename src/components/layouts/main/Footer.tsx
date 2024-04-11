'use client'

import Link from 'next/link'

import { Button } from '@/components/Button'
import { Separator } from '@/components/Separator'
import UFOIcon from '@/icons/UFO'
import { links } from '@/utils/links'

export default function Footer() {
  const { linkedIn, email, github, twitter, discord } = links

  return (
    <footer
      id='footer'
      className='relative flex w-full flex-col-reverse justify-between gap-12 py-8 tablet:flex-row tablet:gap-0 tablet:pb-10 tablet:pt-[4.625rem]'
    >
      <Separator alpha className='absolute top-0 !w-screen absolute-center-x' />

      <div className='flex flex-col gap-4'>
        <UFOIcon className='text-6xl' />
        <p className='text-xl font-medium leading-normal text-gray'>
          Thanks for stopping by ッ
        </p>

        <small className='mt-auto select-none text-sm leading-normal text-gray'>
          &#169; 2023 Felipe Mateus. All Rights Reserved.
        </small>
      </div>

      <div className='flex flex-col gap-10 tablet:flex-row tablet:gap-28'>
        <div className='flex w-fit flex-col gap-4'>
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
          <Button variant='text'>
            <a
              href={email}
              rel='noreferrer noopener'
              target='_blank'
              className='font-medium font-inherit'
            >
              Email
            </a>
          </Button>
          <Button variant='text'>
            <a
              href={linkedIn}
              rel='noreferrer noopener'
              target='_blank'
              className='font-medium font-inherit'
            >
              LinkedIn
            </a>
          </Button>
          <Button variant='text'>
            <a
              href={github}
              rel='noreferrer noopener'
              target='_blank'
              className='font-medium font-inherit'
            >
              GitHub
            </a>
          </Button>
          <Button variant='text'>
            <a
              href={twitter}
              rel='noreferrer noopener'
              target='_blank'
              className='font-medium font-inherit'
            >
              Twitter
            </a>
          </Button>
          <Button variant='text'>
            <a
              href={discord}
              rel='noreferrer noopener'
              target='_blank'
              className='font-medium font-inherit'
            >
              Discord
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
