'use client'
import { cn } from '@/utils/cn'
import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'

export const TextGenerateEffect = ({
  words,
  className,
}: {
  className?: string
  words: string
}) => {
  const [scope, animate] = useAnimate()
  let wordsArray = words.split(' ')
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current])

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className='text-black opacity-0 dark:text-white'
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn('font-bold', className)}>
      <div className='mt-4'>
        <div className=' text-2xl leading-snug tracking-wide text-black dark:text-white'>
          {renderWords()}
        </div>
      </div>
    </div>
  )
}