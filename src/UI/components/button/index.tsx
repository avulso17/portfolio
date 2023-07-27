import React, { ComponentProps } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex justify-center items-center px-5 py-3.5 disabled:bg-fill-300 disabled:text-label-300 disabled:cursor-default leading-5',
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
      true: 'font-display-medium font-semibold',
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
    emphasis: false,
    error: false,
    radii: 'rounded',
    success: false,
    variant: 'primary',
    warning: false,
    width: 'fit',
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

type ButtonProps = ComponentProps<'button'> & ButtonVariants

export const Button = ({
  children,
  className,
  emphasis,
  error,
  radii,
  success,
  variant,
  warning,
  width,
  ...props
}: ButtonProps): JSX.Element => {
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
      {children}
    </button>
  )
}
