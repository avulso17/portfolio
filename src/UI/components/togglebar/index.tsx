'use client'
import Link from 'next/link'

import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, VariantProps } from 'tailwind-variants'

import { routes } from '@/utils/routes'
import { Root, Item } from '@radix-ui/react-toggle-group'

import HomeIcon from '../../../../public/icons/home/home.svg'

const togglebarStyles = tv({
  slots: {
    root: 'flex h-[3.75rem] items-center justify-between rounded-xl border border-[rgba(39,38,44,0.38)] bg-onyx/60 p-4 backdrop-blur-[2px]',
    item: 'flex h-10 shrink-0 items-center rounded-xl px-4 transition-colors ease-in-out hover:bg-white/20',
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
  const { root, item, icon } = togglebarStyles({ active })

  return (
    <Root type='single' asChild>
      <nav className={twMerge(root(), className)}>
        {routes.map(({ name, path, icon: Icon }, index) => (
          <Link key={index} href={path}>
            <Item value={name} className={item()}>
              <Icon className={icon()} />
            </Item>
          </Link>
        ))}

        <Item value='a' className={item()}>
          <HomeIcon className={icon()} />
        </Item>
      </nav>
    </Root>
  )
}
