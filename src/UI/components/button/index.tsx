import React, { ComponentProps } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'rounded-md bg-primary p-2 hover:bg-highlight',
  variants: {
    success: {
      true: 'bg-success',
    },
    error: {
      true: 'bg-error',
    },
    warning: {
      true: 'bg-warning',
    },
  },
  defaultVariants: {
    success: false,
    error: false,
    warning: false,
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonStyles> & {
    children?: React.ReactNode | string
  }

export const Button = ({
  children,
  className,
  success,
  error,
  warning,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={buttonStyles({ success, error, warning, className })}
      {...props}
    >
      {children}
    </button>
  )
}
