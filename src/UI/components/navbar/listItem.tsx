import { ComponentPropsWithRef, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { Link } from '@radix-ui/react-navigation-menu'

type ListItemProps = Omit<ComponentPropsWithRef<'li'>, 'title'> & {
  title: string
}

const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title }, forwardedRef) => (
    <li>
      <Link asChild>
        <a
          className={twMerge(
            'block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-fill-100 focus:shadow-[0_0_0_2px] focus:shadow-primary',
            className
          )}
          ref={forwardedRef}
        >
          <div className='title-1'>{title}</div>
          <p className='text-label-200'>{children}</p>
        </a>
      </Link>
    </li>
  )
)

ListItem.displayName = 'ListItem'

export default ListItem
