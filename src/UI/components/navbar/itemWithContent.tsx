import { forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import {
  Item,
  Trigger,
  Content,
  type NavigationMenuItemProps,
  type NavigationMenuContentProps,
} from '@radix-ui/react-navigation-menu'

import { Button } from '../button'

type ItemWithContentProps = NavigationMenuItemProps &
  NavigationMenuContentProps & {
    icon?: unknown
    title: string
  }

const ItemWithContent = forwardRef<HTMLLIElement, ItemWithContentProps>(
  ({ className, children, title, icon }, forwardedRef) => (
    <Item ref={forwardedRef}>
      <Trigger asChild>
        <Button variant='text' icon={icon}>
          {title}
        </Button>
      </Trigger>

      <Content
        className={twMerge(
          'sm:w-auto absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft',
          className
        )}
      >
        {children}
      </Content>
    </Item>
  )
)

ItemWithContent.displayName = 'ItemWithContent'

export default ItemWithContent
