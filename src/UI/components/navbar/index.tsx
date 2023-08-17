'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import ChevronDownIcon from '../../../../public/icons/chevron/down.svg'
import GithubIcon from '../../../../public/icons/github.svg'
import LinkedinIcon from '../../../../public/icons/linkedin.svg'
import TwitterIcon from '../../../../public/icons/social/twitter.svg'
import Separator from '../separator'
import { DropdownMenu } from './dropdown'
const DynamicLordIcon = dynamic(() => import('../lordIcon'), { ssr: false })

const buttonStyles = tv({
  slots: {
    navigator:
      'flex h-[1.125rem] w-fit items-center text-base font-medium leading-normal text-gray-light outline-none transition-all ease-in-out hover:brightness-125 focus:outline-none',
    social:
      'h-11 w-11 cursor-pointer rounded-md p-[0.625rem] font-medium leading-normal text-gray-light transition-all ease-in-out hover:bg-white/10',
    icon: 'min-h-[1.5rem] min-w-[1.5rem]',
  },
})

type NavbarProps = React.ComponentProps<'nav'>

export const Navbar = ({ className }: NavbarProps): React.ReactElement => {
  const { navigator, social, icon } = buttonStyles()

  return (
    <nav
      className={twMerge(
        'navbar flex h-fit max-h-[3.75rem] w-full justify-between rounded-xl bg-onyx/30 p-4 backdrop-blur-[2px]',
        className
      )}
    >
      <div className='flex items-center gap-10'>
        <Link href='/' className='min-h-[1.625rem] min-w-[1.625rem]'>
          <DynamicLordIcon
            src='/lord/wired/wired-planet.json'
            trigger='hover'
            target='.navbar'
            className='current-color'
            size={44}
          />
        </Link>

        <Link href='/about'>
          <button className={navigator()}>About</button>
        </Link>

        <Link href='/work'>
          <button className={navigator()}>Work</button>
        </Link>

        <Link href='/notebook'>
          <button className={navigator()}>Notebook</button>
        </Link>

        <Link href='/contact'>
          <button className={navigator()}>Contact</button>
        </Link>
        <DropdownMenu navigator={navigator}>
          <button className={navigator()}>
            More
            <ChevronDownIcon className='h-5 w-5 transition-all ease-in-out' />
          </button>
        </DropdownMenu>
      </div>

      <div className='flex items-center gap-3'>
        <a
          href='www.linkedin.com/in/felipe-mateus-270246160'
          rel='noreferrer noopener'
          className={social()}
        >
          <LinkedinIcon className={icon()} />
        </a>

        <a href='' className={social()}>
          <TwitterIcon className={icon()} />
        </a>

        <a href='' className={social()}>
          <GithubIcon className={icon()} />
        </a>

        <Separator orientation='vertical' className='opacity-25' />

        <button
          id='theme-button'
          className={twMerge(social(), 'grid place-items-center p-0')}
        >
          <DynamicLordIcon
            src='/lord/wired/wired-night-sky-moon-stars.json'
            trigger='hover'
            target='#theme-button'
            className='current-color'
            size={32}
          />
        </button>
      </div>
    </nav>
  )
}
