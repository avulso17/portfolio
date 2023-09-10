'use client'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

import {
  Content,
  Portal,
  Root,
  Trigger,
  MenuContentProps,
  DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu'

const contentStyles = tv({
  base: [
    'flex h-fit w-fit flex-col gap-4 bg-onyx/60 px-6 py-4',
    'shadow-dropdown backdrop-blur-[11px] will-change-[opacity,transform]',
  ],
  variants: {
    side: {
      top: 'animate-slideUpAndFade rounded-t-xl',
      bottom: 'animate-slideDownAndFade rounded-b-xl',
    },
  },
  defaultVariants: {
    side: 'bottom',
  },
})

type ContentVariants = VariantProps<typeof contentStyles>

type TDropdownMenuProps = ContentVariants &
  MenuContentProps &
  DropdownMenuProps & {
    children?: React.ReactNode
    trigger?: React.ReactNode
  }

export const DropdownMenu = ({
  align = 'end',
  alignOffset = 0,
  children,
  className,
  collisionPadding = 0,
  modal = true,
  onOpenChange,
  open,
  side,
  sideOffset = 20.5,
  trigger,
}: TDropdownMenuProps): React.ReactElement => {
  return (
    <Root onOpenChange={onOpenChange} open={open} modal={modal}>
      <Trigger asChild>{trigger}</Trigger>

      <Portal>
        <Content
          align={align}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
          side={side}
          sideOffset={sideOffset}
          className={twMerge(contentStyles({ side }), className)}
        >
          {children}
        </Content>
      </Portal>
    </Root>
  )
}
