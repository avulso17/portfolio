'use client'

import Link from 'next/link'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/Button'
import { DropdownMenu } from '@/components/Dropdown'
import { Separator } from '@/components/Separator'
import { Item } from '@radix-ui/react-dropdown-menu'

import { navigation } from '@/configs/nav'
import ChevronDownIcon from '../../../../public/icons/chevron/down.svg'

import SunIcon from '../../../../public/icons/sun.svg'
import LogoIcon from '../../../../public/icons/UFO.svg'

const buttonStyles = tv({
  slots: {
    navigator:
      'flex h-[1.125rem] w-fit items-center text-base font-medium leading-normal text-gray-light outline-none transition-all ease-in-out hover:brightness-125 focus:outline-none',
    social: [
      'flex h-11 w-11 items-center justify-center p-[0.625rem]',
      'cursor-pointer rounded-md text-2xl font-medium leading-normal text-gray-light',
      'transition-all ease-in-out hover:bg-white/10',
    ],
    icon: 'min-h-[1.5rem] min-w-[1.5rem]',
  },
})

export type NavbarProps = React.ComponentProps<'nav'>

export const Navbar = ({ className }: NavbarProps) => {
  const { navigator, social, icon } = buttonStyles()

  const socials = navigation.social.filter((item) => !item.hidden)
  const routes = navigation.routes

  const trigger = (
    <Button variant='text'>
      More
      <ChevronDownIcon className='h-5 w-5 transition-all ease-in-out' />
    </Button>
  )

  return (
    <>
      <div className='mx-auto mb-36 w-fit mobile:hidden'>
        <Link href='/'>
          <LogoIcon className='min-w-[4rem] text-white/50 transition-colors hover:text-white' />
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
            <LogoIcon className='aspect-square w-11 text-white/50 transition-colors hover:text-white' />
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
          {socials.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={social()}
              target='_blank'
            >
              {item.icon}
            </Link>
          ))}

          <Separator orientation='vertical' className='opacity-25' />

          <button id='theme-button' className={social()}>
            <SunIcon className={icon()} />
          </button>
        </div>
      </nav>
    </>
  )
}
