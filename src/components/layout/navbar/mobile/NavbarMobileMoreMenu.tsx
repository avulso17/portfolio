'use client'

import { NAV_MORE } from '@/configs/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    list: [
      'flex w-full flex-col gap-2 px-4 py-4',
      'rounded-t-sm border border-line bg-ink-2',
      'absolute bottom-full left-0 z-10',
    ],
    listItem: [
      'flex h-12 w-full shrink-0 items-center px-4',
      'rounded-sm text-parchment-dim eyebrow-text',
      'transition-colors ease-in-out hover:text-parchment',
      'data-[active=true]:bg-ink data-[active=true]:text-parchment',
    ],
  },
})

export type NavbarMobileMoreMenuProps = { isOpen: boolean; onClose: () => void }

const NavbarMobileMoreMenu: React.FC<NavbarMobileMoreMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname()
  const { list, listItem } = styles()

  return (
    <div id='navbar-mobile-more' hidden={!isOpen} className={list()}>
      {NAV_MORE.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          data-active={pathname === href}
          className={listItem()}
          onClick={onClose}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export default NavbarMobileMoreMenu
