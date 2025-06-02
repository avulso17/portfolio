'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

const items = [
  {
    name: 'Tech Stack',
    path: '/tech-stack',
  },
  {
    name: 'Bookshelf',
    path: '/bookshelf',
  },
]

const styles = tv({
  slots: {
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
})

export type NavbarMobileMoreMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const NavbarMobileMoreMenu: React.FC<NavbarMobileMoreMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname()

  const { list, listItem } = styles()

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          initial={{ y: 2, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 2, opacity: 0 }}
          className={list()}
        >
          {items.map(({ path, name }, index) => (
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default NavbarMobileMoreMenu
