'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ComponentProps, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { tv } from 'tailwind-variants'

import BagFillIcon from '@/icons/BagFill'
import HomeIcon from '@/icons/Home'
import MessageFillIcon from '@/icons/MessageFill'
import MoreOutlineIcon from '@/icons/MoreOutline'
import PenFillIcon from '@/icons/PenFill'
import UserFillIcon from '@/icons/UserFill'

const routes = [
  {
    name: 'home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'about',
    path: '/about',
    icon: UserFillIcon,
  },
  {
    name: 'work',
    path: '/work',
    icon: BagFillIcon,
  },
  {
    name: 'notebook',
    path: '/notebook',
    icon: PenFillIcon,
  },
  {
    name: 'contact',
    path: '/contact',
    icon: MessageFillIcon,
  },
  {
    name: 'more',
    icon: MoreOutlineIcon,
  },
]

const more = [
  {
    name: 'Tech Stack',
    path: '/tech-stack',
  },
  {
    name: 'Bookshelf',
    path: '/bookshelf',
  },
  // {
  //   name: 'This UI Kit',
  //   path: '/ui',
  // },
]

const navbarMobileStyles = tv({
  slots: {
    container: ['fixed bottom-4 left-4 right-4 z-30 mobile:hidden'],
    nav: [
      'bg-onyx/80 ring-1 ring-nav-border/60 backdrop-blur-sm blur-performance',
      'flex h-[3.75rem] items-center justify-between rounded-2xl px-2.5 py-2',
      'transition-all duration-200 ease-in-out',
    ],
    item: [
      'flex h-10 shrink-0 items-center px-4',
      'rounded-lg text-gray-light outline-none',
      'transition-colors ease-in-out',
      'data-[active=true]:bg-white/10 data-[active=true]:text-white',
    ],
    list: [
      'flex w-full flex-col gap-4 px-4 py-6 backdrop-blur-sm blur-performance',
      'rounded-t-2xl bg-black/80 ring-1 ring-nav-border/60',
      'absolute bottom-full left-0 z-10',
    ],
    listItem: [
      'flex h-14 shrink-0 items-center justify-center px-4 py-2',
      'w-full rounded-lg bg-white/5 text-gray-light outline-none',
      'transition-colors ease-in-out',
      'data-[active=true]:bg-white/10 data-[active=true]:text-white',
    ],
  },
  variants: {
    active: {
      true: {
        nav: 'rounded-t-none border-t-0',
      },
    },
  },
})

type MoreListProps = {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

function MoreList({ isOpen, onClose, pathname }: MoreListProps) {
  const { list, listItem } = navbarMobileStyles()

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          initial={{ y: 2, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 2, opacity: 0 }}
          className={list()}
        >
          {more.map(({ path, name }, index) => (
            <Link key={index} href={path}>
              <button
                data-active={path === pathname}
                className={listItem()}
                onClick={onClose}
              >
                {name}
              </button>
            </Link>
          ))}

          <button className={listItem()}>Theme: Dark</button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export type NavbarMobileProps = ComponentProps<'nav'>

export default function NavbarMobile({ className }: NavbarMobileProps) {
  const pathname = usePathname()
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
  const { container, nav, item } = navbarMobileStyles({ active: isMenuOpen })

  const handleToggle = () => setMenuOpen((prev) => !prev)

  const onClose = () => setMenuOpen(false)

  return (
    <div className={container()}>
      <nav className={nav({ className })}>
        {routes.map(({ path, icon: Icon }, index) => {
          if (path === undefined) {
            return (
              <button
                key={index}
                data-active={isMenuOpen}
                className={item()}
                onClick={handleToggle}
              >
                <Icon className='text-2xl' />
              </button>
            )
          }

          return (
            <Link
              key={index}
              href={path}
              className={item()}
              data-active={path === pathname}
            >
              <Icon className='text-2xl' />
            </Link>
          )
        })}
      </nav>

      <MoreList isOpen={isMenuOpen} onClose={onClose} pathname={pathname} />
    </div>
  )
}
