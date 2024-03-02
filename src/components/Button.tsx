import React, { ComponentProps, forwardRef } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex h-fit items-center justify-center whitespace-nowrap px-5 py-4 font-inter font-medium leading-normal transition-all duration-200 ease-in-out disabled:cursor-default disabled:opacity-50 disabled:grayscale',
  variants: {
    variant: {
      primary: 'bg-base-gradient text-white shadow-button hover:brightness-125',
      secondary: 'bg-onyx text-gray-dark hover:brightness-125',
      text: 'h-[1.125rem] p-0 text-base leading-normal text-gray-light hover:text-white',
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
    icon: {
      true: 'gap-2',
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
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    emphasis,
    error,
    radii,
    success,
    variant,
    warning,
    width,
    leftIcon,
    rightIcon,
    ...props
  },
  forwardRef
) {
  return (
    <button
      ref={forwardRef}
      className={buttonStyles({
        className,
        emphasis,
        error,
        radii,
        success,
        variant,
        warning,
        icon: leftIcon !== undefined || rightIcon !== undefined,
        width,
      })}
      {...props}
    >
      {leftIcon !== undefined ? leftIcon : null}
      {children}
      {rightIcon !== undefined ? rightIcon : null}
    </button>
  )
})

export { Button }
