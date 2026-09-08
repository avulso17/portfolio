'use client'

import ChevronBottomIcon from '@/components/icons/ChevronBottom'
import { Button } from '@/components/ui/Button'
import { NAV_MORE, NAV_PRIMARY } from '@/configs/navigation'
import { useOnClickOutside } from '@/hooks/useOnClickOutsite'
import Link from 'next/link'
import { useRef, useState } from 'react'

const contact = NAV_PRIMARY.find((l) => l.href === '/contact')

const NavbarDesktopDropdownMenu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const onCloseMenu = () => setIsMenuOpen(false)

  useOnClickOutside(ref, () => {
    if (isMenuOpen) onCloseMenu()
  })

  return (
    <div ref={ref} className='relative'>
      <Button
        variant='text'
        rightIcon={<ChevronBottomIcon className='text-xl' />}
        aria-expanded={isMenuOpen}
        aria-controls='navbar-more'
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        More
      </Button>

      <div
        id='navbar-more'
        hidden={!isMenuOpen}
        className='absolute left-0 top-[calc(100%+0.5rem)] z-20 flex min-w-40 flex-col gap-3 rounded-sm border border-line bg-ink-2 p-4'
      >
        {contact ? (
          <Link href={contact.href} className='flex tablet:hidden'>
            <Button variant='text' onClick={onCloseMenu}>
              {contact.label}
            </Button>
          </Link>
        ) : null}
        {NAV_MORE.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Button variant='text' onClick={onCloseMenu}>
              {label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavbarDesktopDropdownMenu
