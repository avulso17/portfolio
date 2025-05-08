import LogoSvg from '@/assets/Logo'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'

const LinkButton: React.FC<{
  href: string
  label: string
  target?: React.HTMLAttributeAnchorTarget
}> = ({ label, href, target }) => {
  return (
    <Link
      className='h-10 w-fit min-w-16'
      href={href}
      aria-label={label}
      target={target}
    >
      <Button className='h-full w-full justify-start' variant='text'>
        {label}
      </Button>
    </Link>
  )
}

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
        <div className='flex w-fit flex-col gap-1'>
          <b className='mb-4 font-bold'>Links</b>
          <LinkButton href='/about' label='About' />
          <LinkButton href='/work' label='Work' />
          <LinkButton href='/tech-stack' label='Tech Stack' />
          <LinkButton href='/contact' label='Contact' />
        </div>

        <div className='flex flex-col gap-1'>
          <b className='mb-4 font-bold'>Elsewhere</b>
          <LinkButton href={SOCIAL_LINKS.email} label='Email' target='_blank' />
          <LinkButton
            href={SOCIAL_LINKS.linkedIn}
            label='LinkedIn'
            target='_blank'
          />
          <LinkButton
            href={SOCIAL_LINKS.github}
            label='GitHub'
            target='_blank'
          />
          <LinkButton href={SOCIAL_LINKS.x} label='X' target='_blank' />
          <LinkButton
            href={SOCIAL_LINKS.discord}
            label='Discord'
            target='_blank'
          />
        </div>
      </div>
    </footer>
  )
}
