'use client'
import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'

export const TextGenerateEffect = ({
  words,
  className,
  speed = 0.2,
}: {
  className?: string
  speed?: number
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
        duration: 1,
        delay: stagger(speed),
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
              className='text-inherit opacity-0 font-inherit'
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={className}>
      <div className='text-inherit font-inherit'>{renderWords()}</div>
    </div>
  )
}
