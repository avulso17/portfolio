import Link from 'next/link'

import LogoSvg from '@/assets/Logo'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { SOCIAL_LINKS } from '@/constants/social'

export default function Footer() {
  return (
    <footer
      id='footer'
      className='relative flex w-full flex-col-reverse justify-between gap-12 py-8 tablet:flex-row tablet:gap-0 tablet:pb-10 tablet:pt-[4.625rem]'
    >
      <Separator alpha className='absolute top-0 !w-screen absolute-center-x' />

      <div className='flex flex-col gap-4'>
        <LogoSvg className='h-[60px] w-[92px]' />
        <p className='text-xl font-medium leading-normal text-white/40'>
          Thanks for stopping by ッ
        </p>

        <small className='mt-auto select-none text-sm leading-normal text-white/40'>
          &#169; 2025 Felipe Mateus. All Rights Reserved.
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

          <Link href='/tech-stack'>
            <Button variant='text'>Tech Stack</Button>
          </Link>

          <Link href='/contact'>
            <Button variant='text'>Contact</Button>
          </Link>
        </div>

        <div className='flex flex-col gap-4'>
          <b className='mb-4 font-bold'>Elsewhere</b>
          <Link href={SOCIAL_LINKS.email} target='_blank'>
            <Button variant='text'>Email</Button>
          </Link>

          <Link href={SOCIAL_LINKS.linkedIn} target='_blank'>
            <Button variant='text'>LinkedIn</Button>
          </Link>

          <Link href={SOCIAL_LINKS.github} target='_blank'>
            <Button variant='text'>GitHub</Button>
          </Link>

          <Link href={SOCIAL_LINKS.x} target='_blank'>
            <Button variant='text'>X</Button>
          </Link>

          <Link href={SOCIAL_LINKS.discord} target='_blank'>
            <Button variant='text'>Discord</Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
