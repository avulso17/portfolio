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
}: SeparatorTypes): React.ReactElement => {
  return (
    <Root
      data-alpha={alpha}
      className={twMerge(
        'separator data-[alpha=false]:bg-white data-[alpha=true]:bg-white/25',
        className
      )}
      asChild={asChild}
      decorative={decorative}
      orientation={orientation}
    >
      {children}
    </Root>
  )
}

export default Separator
