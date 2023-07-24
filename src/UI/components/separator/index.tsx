'use client'

import { Root } from '@radix-ui/react-separator'

interface IDialogProps {
  alpha?: boolean
  asChild?: boolean
  children?: React.ReactNode
  className?: string
  decorative?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const Separator = ({
  alpha = false,
  asChild = false,
  className = '',
  children,
  orientation = 'horizontal',
  decorative,
}: IDialogProps): JSX.Element => {
  return (
    <Root
      className={`separator ${
        alpha ? 'bg-separator-alpha' : 'bg-separator'
      } ${className}`}
      asChild={asChild}
      decorative={decorative}
      orientation={orientation}
    >
      {children}
    </Root>
  )
}

export default Separator
