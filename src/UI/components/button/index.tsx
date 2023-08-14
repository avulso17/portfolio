'use client'
import React, { ComponentProps } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

import Icon from '../icon'

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap px-5 py-3.5 leading-5 disabled:cursor-default disabled:bg-fill-300 disabled:text-label-300',
  variants: {
    variant: {
      primary:
        'text-white bg-primary transition-colors duration-200 ease-in-out hover:bg-highlight',
      secondary: 'text-primary bg-primary/10 hover:bg-primary/20',
      tertiary: 'text-primary bg-fill-300 hover:bg-fill-200',
      text: 'text-primary bg-transparent hover:bg-primary/10',
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
      rounded: 'rounded-xl',
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
        <Icon className='mr-1' iconComponent={icon} src={iconSrc} />
      )}
      {children}
    </button>
  )
}
