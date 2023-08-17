'use client'
import React, { ComponentProps } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

import Icon from '../icon'

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center h-fit whitespace-nowrap px-5 py-4 font-inter font-medium leading-normal transition-all duration-200 ease-in-out disabled:cursor-default disabled:opacity-50 disabled:grayscale',
  variants: {
    variant: {
      primary: 'text-white base-gradient button-shadow hover:brightness-125',
      secondary: 'bg-onyx text-gray-dark hover:brightness-125',
      text: 'p-0 h-[1.125rem] text-base text-gray-light leading-normal hover:text-white',
    },
    success: {
      true: 'bg-success text-white',
    },
    error: {
      true: 'bg-error text-white',
    },
    warning: {
      true: 'bg-warning text-black',
    },
    emphasis: {
      true: 'font-display-medium',
      false: 'font-display font-normal',
    },
    radii: {
      pill: 'rounded-[2.5rem]',
      rounded: 'rounded-lg',
    },
    width: {
      fit: 'w-fit',
      full: 'w-full',
    },
  },
  defaultVariants: {
    emphasis: true,
    error: false,
    radii: 'rounded',
    success: false,
    variant: 'primary',
    warning: false,
    width: 'fit',
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

type ButtonProps = ComponentProps<'button'> &
  ButtonVariants & {
    icon?: unknown
    iconSrc?: string
  }

export const Button = ({
  children,
  className,
  emphasis,
  error,
  iconSrc,
  radii,
  success,
  variant,
  warning,
  width,
  icon,
  ...props
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={buttonStyles({
        className,
        emphasis,
        error,
        radii,
        success,
        variant,
        warning,
        width,
      })}
      {...props}
    >
      {icon !== undefined && (
        <Icon
          className='mr-2 min-w-[1.5rem]'
          iconComponent={icon}
          src={iconSrc}
        />
      )}
      {children}
    </button>
  )
}
