import Link from 'next/link'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/Button'

import { navigation } from '@/configs/nav'

import LogoSvg from '@/assets/Logo'
import { Separator } from '@/components/Separator'
import ChangeLocaleMenu from './NavbarDesktopChangeLocaleMenu'
import DropdownMenu from './NavbarDesktopDropdownMenu'

const iconButtonStyles = tv({
  base: [
    'flex h-11 w-11 items-center justify-center p-[0.625rem]',
    'cursor-pointer rounded-md text-2xl font-medium leading-normal text-gray-light',
    'transition-all ease-in-out hover:bg-white/10',
  ],
})

export type NavbarProps = React.ComponentProps<'nav'>

export default function Navbar({ className }: NavbarProps) {
  const socials = navigation.social.filter((item) => !item.hidden)

  return (
    <nav
      className={twMerge(
        'mb-44 hidden h-fit max-h-[3.75rem] w-full justify-between rounded-xl bg-onyx/30 p-4 backdrop-blur-sm mobile:flex',
        className
      )}
    >
      <div className='relative flex items-center gap-10'>
        <Link href='/' className='shrink-0'>
          <LogoSvg className='h-7 w-10 text-white transition-colors hover:text-gray-light' />
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

        <DropdownMenu />
      </div>

      <div className='flex items-center gap-2'>
        {socials.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={iconButtonStyles()}
            target='_blank'
          >
            {item.icon}
          </Link>
        ))}

        <Separator orientation='vertical' className='mx-1 opacity-25' />

        <ChangeLocaleMenu />
      </div>
    </nav>
  )
}
