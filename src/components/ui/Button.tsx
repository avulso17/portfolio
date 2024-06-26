import React, { ComponentProps, forwardRef } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: [
    'inline-flex h-fit shrink-0 items-center justify-center',
    'whitespace-nowrap font-inter font-medium leading-normal',
    'relative transition-all duration-200 ease-in-out',
    'disabled:cursor-default disabled:opacity-50 disabled:grayscale',
  ],
  variants: {
    variant: {
      primary: [
        'bg-base-gradient px-5 py-4 text-white shadow-button',
        'hover:brightness-125',
      ],
      secondary: ['bg-onyx px-5 py-4 text-gray-dark', 'hover:brightness-125'],
      text: [
        'h-[1.125rem] text-base leading-normal text-gray-light',
        'hover:text-white',
      ],
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
    full: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    emphasis: true,
    variant: 'primary',
    radii: 'rounded',
    full: false,
  },
})

export type ButtonVariants = VariantProps<typeof buttonStyles>

export type ButtonProps = ComponentProps<'button'> &
  ButtonVariants & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    emphasis,
    radii,
    variant,
    full,
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
        radii,
        variant,
        icon: leftIcon !== undefined || rightIcon !== undefined,
        full,
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
