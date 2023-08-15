import Link from 'next/link'

import { twMerge } from 'tailwind-merge'
import { type ClassProp, type ClassValue } from 'tailwind-variants'

import {
  Content,
  Item,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu'

type DropdownMenuProps = {
  children: React.ReactNode
  navigator: (slotProps?: ClassProp<ClassValue> | undefined) => string
}

export const DropdownMenu = ({
  children,
  navigator,
}: DropdownMenuProps): React.ReactElement => {
  return (
    <Root>
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Content
          align='end'
          side='bottom'
          sideOffset={20.5}
          className={twMerge(
            'rounded-b-xl bg-onyx/60 backdrop-blur-[6px] dropdown-shadow',
            'flex flex-col gap-4 px-6 py-4',
            'h-fit w-fit',
            'will-change-[opacity,transform]',
            'data-[side=bottom]:animate-slideUpAndFade data-[side=top]:animate-slideDownAndFade',
            'data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade'
          )}
        >
          <Link href='/bookshelf'>
            <Item className={navigator()}>Bookshelf</Item>
          </Link>

          <Link href='/stacks'>
            <Item className={navigator()}>Tech Stack</Item>
          </Link>

          <Link href='/ui'>
            <Item className={navigator()}>This UI Kit</Item>
          </Link>
        </Content>
      </Portal>
    </Root>
  )
}
