import { cn } from '@/lib/utils/cn'
import { ComponentProps, createElement } from 'react'

export type CardProps = ComponentProps<'div'> & {
  as?: 'div' | 'article' | 'li' | 'section'
}

export const Card: React.FC<CardProps> = ({
  as = 'div',
  className,
  children,
  ...props
}) => {
  return createElement(
    as,
    {
      className: cn('rounded-sm border border-line bg-ink-2', className),
      ...props,
    },
    children
  )
}
