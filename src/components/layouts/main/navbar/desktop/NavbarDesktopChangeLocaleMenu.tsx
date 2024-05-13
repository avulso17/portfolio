'use client'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/Button'
import EnglishIcon from '@/icons/langs/English'
import PortugueseIcon from '@/icons/langs/Portuguese'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

const triggerStyles = tv({
  base: [
    'flex h-11 w-11 items-center justify-center p-[0.625rem]',
    'cursor-pointer rounded-md text-xl font-medium leading-normal text-gray-light',
    'transition-all ease-in-out hover:bg-white/10',
  ],
})

export default function NavbarDesktopChangeLocaleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev)

  const onCloseMenu = () => setIsMenuOpen(false)

  const handleChangeLocale = (newLocale: 'en' | 'pt-BR') => {
    changeLocale(newLocale)
    onCloseMenu
  }

  return (
    <>
      <button className={triggerStyles()} onClick={handleToggleMenu}>
        {currentLocale === 'en' ? <EnglishIcon /> : <PortugueseIcon />}
      </button>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -2 }}
            transition={{ duration: 0.1 }}
            className='absolute right-0 top-[calc(100%+1rem)] flex flex-col gap-4 rounded-b-xl bg-onyx/50 p-4'
          >
            <Button variant='text' onClick={() => handleChangeLocale('en')}>
              English
            </Button>

            <Button variant='text' onClick={() => handleChangeLocale('pt-BR')}>
              Português
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
