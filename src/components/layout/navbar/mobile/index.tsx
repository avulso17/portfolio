'use client'
import BagFillIcon from '@/components/icons/BagFill'
import HomeIcon from '@/components/icons/Home'
import MessageFillIcon from '@/components/icons/MessageFill'
import MoreOutlineIcon from '@/components/icons/MoreOutline'
import UserFillIcon from '@/components/icons/UserFill'
import { NAV_PRIMARY } from '@/configs/navigation'
import { useOnClickOutside } from '@/hooks/useOnClickOutsite'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'
import NavbarMobileMoreMenu from './NavbarMobileMoreMenu'

const routes = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: NAV_PRIMARY[0].label, path: NAV_PRIMARY[0].href, icon: UserFillIcon },
  { name: NAV_PRIMARY[1].label, path: NAV_PRIMARY[1].href, icon: BagFillIcon },
  {
    name: NAV_PRIMARY[2].label,
    path: NAV_PRIMARY[2].href,
    icon: MessageFillIcon,
  },
  { name: 'More', icon: MoreOutlineIcon },
]

const navbarMobileStyles = tv({
  slots: {
    container: ['fixed bottom-4 left-4 right-4 z-30 mobile:hidden'],
    nav: [
      'border border-line bg-ink-2',
      'flex h-[3.75rem] items-center justify-between rounded-sm px-2.5 py-2',
    ],
    item: [
      'flex h-10 shrink-0 items-center px-4',
      'rounded-sm text-parchment-dim',
      'transition-colors duration-150 ease-out',
      'data-[active=true]:bg-ink data-[active=true]:text-parchment',
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

const NavbarMobile: React.FC<NavbarMobileProps> = ({ className }) => {
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
      <nav aria-label='Primary' className={nav({ className })}>
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

export default NavbarMobile
