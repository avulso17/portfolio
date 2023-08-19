'use client'
import Link from 'next/link'

import { ComponentProps, useState } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, VariantProps } from 'tailwind-variants'

import { routes } from '@/utils/routes'
import { Item } from '@radix-ui/react-dropdown-menu'

import DropdownIcon from '../../../../public/icons/dashboard/simple.svg'
import { DropdownMenu } from '../dropdown'

const togglebarStyles = tv({
  slots: {
    container:
      'flex h-[3.75rem] items-center justify-between overflow-hidden rounded-xl border border-[rgba(39,38,44,0.38)] bg-onyx/60 p-4 backdrop-blur-[2px]',
    item: 'flex h-10 shrink-0 items-center rounded-xl px-4 transition-colors ease-in-out hover:bg-white/20 data-[state=on]:bg-white/20',
    icon: 'w-6 text-gray-light',
  },
  variants: {
    active: {
      true: {
        item: '',
        icon: 'text-white',
      },
    },
  },
})

type TogglebarVariants = VariantProps<typeof togglebarStyles>

type TogglebarProps = ComponentProps<'nav'> & TogglebarVariants

export const Togglebar = ({
  active,
  className,
}: TogglebarProps): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false)
  const { container, item, icon } = togglebarStyles({ active })

  const trigger = (
    <button className={item()} onClick={(): void => setOpen(!open)}>
      <DropdownIcon className={icon()} />
    </button>
  )

  return (
    <nav className={twMerge(container(), className)}>
      {routes.map(({ name, path, icon: Icon }, index) => (
        <Link key={index} href={path}>
          <button value={name} className={item()}>
            <Icon className={icon()} />
          </button>
        </Link>
      ))}

      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
        trigger={trigger}
        side='top'
        sideOffset={10}
        className='flex mobile:hidden'
      >
        <Item>Under construction...</Item>
      </DropdownMenu>
    </nav>
  )
}
