'use client'
import { Button } from '@/components/Button'
import { useOnClickOutside } from '@/hooks/useOnClickOutsite'
import ChevronBottomIcon from '@/icons/ChevronBottom'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'

export type NavbarDesktopDropdownMenu = {
  navigatorStyles: string
}

export default function NavbarDesktopDropdownMenu() {
  const ref = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev)

  const onCloseMenu = () => setIsMenuOpen(false)

  const handleOnClickOutside = () => {
    if (isMenuOpen) {
      onCloseMenu()
    }
  }

  useOnClickOutside(ref, handleOnClickOutside)

  return (
    <>
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
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -2 }}
            transition={{ duration: 0.1 }}
            className='absolute right-0 top-[calc(100%+1rem)] flex flex-col gap-4 rounded-b-xl bg-onyx/50 p-4'
          >
            <Link href='/contact' className='flex tablet:hidden'>
              <Button variant='text' onClick={onCloseMenu}>
                Contact
              </Button>
            </Link>

            {/* <Link href='/notebook' className='flex wide:hidden'>
              <Button variant='text' onClick={onCloseMenu}>
                Notebook
              </Button>
            </Link> */}

            <Link href='/bookshelf'>
              <Button variant='text' onClick={onCloseMenu}>
                Bookshelf
              </Button>
            </Link>

            <Link href='/tech-stack'>
              <Button variant='text' onClick={onCloseMenu}>
                Tech Stack
              </Button>
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
