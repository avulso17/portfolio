import { ComponentPropsWithRef, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import {
  Viewport,
  type NavigationMenuViewportProps,
} from '@radix-ui/react-navigation-menu'

type NavViewportProps = ComponentPropsWithRef<'div'> &
  NavigationMenuViewportProps

const NavViewport = forwardRef<HTMLDivElement, NavViewportProps>(
  ({ className }, forwardedRef) => (
    <div
      className={twMerge(
        'absolute left-0 top-full flex w-full justify-center perspective-[2000px]',
        className
      )}
      ref={forwardedRef}
    >
      <Viewport className='sm:w-[var(--radix-navigation-menu-viewport-width)] relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[20px] bg-black transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn' />
    </div>
  )
)

NavViewport.displayName = 'NavViewport'

export default NavViewport
