'use client'
import { useOnClickOutside } from '@/hooks/useOnClickOutsite'
import BagFillIcon from '@/icons/BagFill'
import HomeIcon from '@/icons/Home'
import MessageFillIcon from '@/icons/MessageFill'
import MoreOutlineIcon from '@/icons/MoreOutline'
import UserFillIcon from '@/icons/UserFill'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'
import NavbarMobileMoreMenu from './NavbarMobileMoreMenu'

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
  // {
  //   name: 'notebook',
  //   path: '/notebook',
  //   icon: PenFillIcon,
  // },
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
  },
  variants: {
    active: {
      true: {
        nav: 'rounded-t-none border-t-0',
      },
    },
  },
})

export type NavbarMobileProps = ComponentProps<'nav'>

export default function NavbarMobile({ className }: NavbarMobileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
  const { container, nav, item } = navbarMobileStyles({ active: isMenuOpen })

  const handleToggle = () => setMenuOpen((prev) => !prev)

  const onClose = () => setMenuOpen(false)

  const handleClickOutside = () => {
    if (isMenuOpen) {
      onClose()
    }
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div ref={ref} className={container()}>
      <nav className={nav({ className })}>
        {routes.map(({ name, path, icon: Icon }, index) => {
          if (!path) {
            return (
              <button
                key={name}
                data-active={isMenuOpen}
                className={item()}
                onClick={handleToggle}
                name={name}
                aria-label={name}
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
              aria-label={name}
            >
              <Icon className='text-2xl' />
            </Link>
          )
        })}
      </nav>

      <NavbarMobileMoreMenu isOpen={isMenuOpen} onClose={onClose} />
    </div>
  )
}
