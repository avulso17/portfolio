'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type HomePortraitProps = React.ComponentProps<'div'>

export default function HomePortrait({ className }: HomePortraitProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className={twMerge(
        [
          'flex justify-center rounded-50',
          'h-[33.75rem] w-[33.75rem] overflow-hidden',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0',
          'after:z-10 after:bg-radial-gradient',
        ],
        className
      )}
    >
      <Image
        className='block h-auto w-auto object-contain'
        src='/assets/me-cropped.png'
        alt='Felipe Mateus'
        priority
        height={528}
        width={388}
      />
    </motion.div>
  )
}
