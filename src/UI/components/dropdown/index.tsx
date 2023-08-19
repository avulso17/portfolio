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
  base: 'flex h-fit w-fit flex-col gap-4 bg-onyx/60 px-6 py-4 backdrop-blur-[6px] will-change-[opacity,transform] dropdown-shadow',
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
  children,
  trigger,
  side,
  sideOffset = 20.5,
  align = 'end',
  onOpenChange,
  open,
  className,
}: TDropdownMenuProps): React.ReactElement => {
  return (
    <Root onOpenChange={onOpenChange} open={open}>
      <Trigger asChild>{trigger}</Trigger>

      <Portal>
        <Content
          align={align}
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
