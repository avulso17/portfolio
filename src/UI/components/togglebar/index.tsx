'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ComponentProps, useState } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { routes } from '@/utils/routes'
import { Item } from '@radix-ui/react-dropdown-menu'

import DropdownIcon from '../../../../public/icons/dashboard/simple.svg'
import { DropdownMenu } from '../dropdown'

const containerStyles = tv({
  base: [
    'flex items-center justify-between rounded-xl',
    'border border-nav-border/[0.38] bg-onyx/60 backdrop-blur-[2px]',
    'h-[3.75rem] p-4 overflow-hidden',
  ],
  variants: {
    active: {
      true: 'border-t-0 rounded-t-none',
    },
  },
})

const itemStyles = tv({
  base: [
    'flex shrink-0 items-center h-10 px-4 text-gray-light',
    'rounded-xl transition-colors ease-in-out outline-none',
    'hover:bg-white/20',
  ],

  variants: {
    active: {
      true: 'bg-white/10 text-white',
    },
    sub: {
      true: 'bg-white/10 rounded-lg text-lg text-white py-4 h-fit w-full',
    },
  },
})

type TogglebarProps = ComponentProps<'nav'>

export const Togglebar = ({
  className,
}: TogglebarProps): React.ReactElement => {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  const trigger = (
    <button
      className={itemStyles({ active: open })}
      onClick={(): void => setOpen(!open)}
    >
      <DropdownIcon className='w-6' />
    </button>
  )

  return (
    <nav className={twMerge(containerStyles({ active: open }), className)}>
      {routes.map(({ name, path, icon: Icon }, index) => (
        <Link key={index} href={path}>
          <button
            value={name}
            className={itemStyles({ active: path === pathname })}
          >
            <Icon className='w-6' />
          </button>
        </Link>
      ))}

      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
        trigger={trigger}
        side='top'
        sideOffset={10}
        alignOffset={-16}
        collisionPadding={{ left: 16, right: 16 }}
        className='flex w-[calc(100vw-2.25rem)] border border-b-0 border-nav-border/[0.38] py-8 mobile:hidden'
      >
        <Link href='/stacks'>
          <Item className={itemStyles({ sub: true })}>Tech Stack</Item>
        </Link>

        <Link href='/bookshelf'>
          <Item className={itemStyles({ sub: true })}>Bookshelf</Item>
        </Link>

        <Link href='/ui'>
          <Item
            className={itemStyles({ sub: true, active: pathname === 'ui' })}
          >
            This UI Kit
          </Item>
        </Link>

        <Item className={itemStyles({ sub: true })}>Theme: Dark</Item>
      </DropdownMenu>
    </nav>
  )
}
