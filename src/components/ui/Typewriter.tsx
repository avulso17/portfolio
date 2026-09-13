'use client'

import { cn } from '@/lib/utils/cn'
import { CSSProperties } from 'react'

type TypewriterProps = { text: string; className?: string }

export const Typewriter: React.FC<TypewriterProps> = ({ text, className }) => (
  <span
    className={cn('typewriter', className)}
    style={{ '--chars': text.length } as CSSProperties}
  >
    {text}
  </span>
)
