'use client'

import { twMerge } from 'tailwind-merge'

import { Root, SeparatorProps } from '@radix-ui/react-separator'

type SeparatorTypes = SeparatorProps & {
  alpha?: boolean
}

const Separator = ({
  alpha = false,
  asChild = false,
  className,
  children,
  orientation,
  decorative,
}: SeparatorTypes): JSX.Element => {
  return (
    <Root
      data-alpha={alpha}
      className={twMerge('data-[alpha=true]:bg-alpha separator', className)}
      asChild={asChild}
      decorative={decorative}
      orientation={orientation}
    >
      {children}
    </Root>
  )
}

export default Separator
