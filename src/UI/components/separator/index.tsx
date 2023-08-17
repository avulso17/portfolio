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
        `bg-white data-[alpha=true]:opacity-10`,
        'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
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
