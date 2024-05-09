'use client'

import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/Button'

import { navigation } from '@/configs/nav'

import LogoSvg from '@/assets/Logo'
import { Separator } from '@/components/Separator'
import ChevronBottomIcon from '@/icons/ChevronBottom'
import StarsIcon from '@/icons/Stars'
import { useState } from 'react'

const buttonStyles = tv({
  slots: {
    navigator:
      'flex h-[1.125rem] w-fit items-center text-base font-medium leading-normal text-gray-light outline-none transition-all ease-in-out hover:brightness-125 focus:outline-none',
    social: [
      'flex h-11 w-11 items-center justify-center p-[0.625rem]',
      'cursor-pointer rounded-md text-2xl font-medium leading-normal text-gray-light',
      'transition-all ease-in-out hover:bg-white/10',
    ],
  },
})

export type NavbarProps = React.ComponentProps<'nav'>

export default function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { navigator, social } = buttonStyles()

  const socials = navigation.social.filter((item) => !item.hidden)

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev)

  const onCloseMenu = () => setIsMenuOpen(false)

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

        <Button
          variant='text'
          rightIcon={<ChevronBottomIcon className='text-xl' />}
          onClick={handleToggleMenu}
        >
          More
        </Button>

        <AnimatePresence initial={false}>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -2 }}
              transition={{ duration: 0.1 }}
              className='absolute right-0 top-[calc(100%+1rem)] flex flex-col gap-4 rounded-b-xl bg-onyx/50 p-4'
            >
              <Link href='/contact' className='flex tablet:hidden'>
                <span className={navigator()} onClick={onCloseMenu}>
                  Contact
                </span>
              </Link>

              <Link href='/notebook' className='flex wide:hidden'>
                <span className={navigator()} onClick={onCloseMenu}>
                  Notebook
                </span>
              </Link>

              <Link href='/bookshelf'>
                <span className={navigator()} onClick={onCloseMenu}>
                  Bookshelf
                </span>
              </Link>

              <Link href='/tech-stack'>
                <span className={navigator()} onClick={onCloseMenu}>
                  Tech Stack
                </span>
              </Link>

              {/* <Link href='/ui'>
                <span className={navigator()} onClick={onCloseMenu}>
                  This UI Kit
                </span>
              </Link> */}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className='flex items-center gap-2'>
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

        <Separator orientation='vertical' className='mx-1 opacity-25' />

        <Link href='/playground' className={social()}>
          <StarsIcon />
        </Link>
      </div>
    </nav>
  )
}
