'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { useMemo } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Item } from '@radix-ui/react-dropdown-menu'

import ChevronDownIcon from '../../../../public/icons/chevron/down.svg'
import GithubIcon from '../../../../public/icons/github.svg'
import LinkedinIcon from '../../../../public/icons/linkedin.svg'
import TwitterIcon from '../../../../public/icons/social/twitter.svg'
import PlanetIcon from '../../../../public/lord/wired/wired-planet.svg'
import { Button } from '../button'
import { DropdownMenu } from '../dropdown'
import Separator from '../separator'
const DynamicLordIcon = dynamic(() => import('../lordIcon'), { ssr: false })

const buttonStyles = tv({
  slots: {
    navigator:
      'flex h-[1.125rem] w-fit items-center text-base font-medium leading-normal text-gray-light outline-none transition-all ease-in-out hover:brightness-125 focus:outline-none tablet:',
    social:
      'h-11 w-11 cursor-pointer rounded-md p-[0.625rem] font-medium leading-normal text-gray-light transition-all ease-in-out hover:bg-white/10',
    icon: 'min-h-[1.5rem] min-w-[1.5rem]',
  },
})

type NavbarProps = React.ComponentProps<'nav'>

export const Navbar = ({ className }: NavbarProps): React.ReactElement => {
  const { navigator, social, icon } = buttonStyles()

  const memoPlanetIcon = useMemo(() => {
    return (
      <DynamicLordIcon
        src='/lord/wired/wired-planet.json'
        trigger='hover'
        target='.navbar'
        className='current-color'
        size={44}
      />
    )
  }, [])

  const memoThemeIcon = useMemo(() => {
    return (
      <DynamicLordIcon
        src='/lord/wired/wired-night-sky-moon-stars.json'
        trigger='hover'
        target='#theme-button'
        className='current-color'
        size={32}
      />
    )
  }, [])

  const trigger = (
    <Button variant='text'>
      More
      <ChevronDownIcon className='h-5 w-5 transition-all ease-in-out' />
    </Button>
  )

  return (
    <>
      <div id='nav-mobile' className='mx-auto mb-36 w-fit mobile:hidden'>
        <Link href='/'>
          <PlanetIcon className='min-w-[4rem] opacity-50' />
        </Link>
      </div>

      <nav
        className={twMerge(
          'navbar hidden h-fit max-h-[3.75rem] w-full justify-between overflow-hidden rounded-xl bg-onyx/30 p-4 backdrop-blur-[2px] mobile:flex',
          className
        )}
      >
        <div className='flex items-center gap-10'>
          <Link href='/' className='min-h-[1.625rem] min-w-[1.625rem]'>
            {memoPlanetIcon}
          </Link>

          <Link href='/about'>
            <Button variant='text'>About</Button>
          </Link>

          <Link href='/work'>
            <Button variant='text'>Work</Button>
          </Link>

          <Link href='/notebook' className='hidden wide:block'>
            <Button variant='text'>Notebook</Button>
          </Link>

          <Link href='/contact' className='hidden tablet:block'>
            <Button variant='text'>Contact</Button>
          </Link>

          <DropdownMenu
            trigger={trigger}
            sideOffset={20.5}
            className='hidden mobile:flex'
          >
            <Link href='/contact' className='flex tablet:hidden'>
              <Item className={navigator()}>Contact</Item>
            </Link>

            <Link href='/notebook' className='flex wide:hidden'>
              <Item className={navigator()}>Notebook</Item>
            </Link>

            <Link href='/bookshelf'>
              <Item className={navigator()}>Bookshelf</Item>
            </Link>

            <Link href='/stacks'>
              <Item className={navigator()}>Tech Stack</Item>
            </Link>

            <Link href='/ui'>
              <Item className={navigator()}>This UI Kit</Item>
            </Link>
          </DropdownMenu>
        </div>

        <div className='flex items-center gap-3'>
          <a
            href='https://www.linkedin.com/in/felipe-mateus-270246160'
            rel='noreferrer noopener'
            className={social()}
          >
            <LinkedinIcon className={icon()} />
          </a>

          <a
            href='https://twitter.com/felipe_teus10'
            rel='noreferrer noopener'
            className={social()}
          >
            <TwitterIcon className={icon()} />
          </a>

          <a
            href='https://github.com/avulso17'
            rel='noreferrer noopener'
            className={social()}
          >
            <GithubIcon className={icon()} />
          </a>

          <Separator orientation='vertical' className='opacity-25' />

          <button
            id='theme-button'
            className={twMerge(social(), 'grid place-items-center p-0')}
          >
            {memoThemeIcon}
          </button>
        </div>
      </nav>
    </>
  )
}
