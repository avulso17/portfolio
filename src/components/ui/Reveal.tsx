'use client'

import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils/cn'
import { CSSProperties, createElement } from 'react'

type RevealProps = {
  as?: 'div' | 'li' | 'article' | 'section'
  index?: number
  className?: string
  children: React.ReactNode
}

export const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  index = 0,
  className,
  children,
}) => {
  const ref = useReveal<HTMLElement>()
  return createElement(
    as,
    {
      ref,
      className: cn('print-in', className),
      style: { '--reveal-i': index } as CSSProperties,
    },
    children
  )
}
