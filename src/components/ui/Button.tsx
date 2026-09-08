import React, { ComponentProps, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: [
    'inline-flex h-fit shrink-0 items-center justify-center',
    'whitespace-nowrap rounded-sm font-body text-base font-medium leading-none',
    'transition-colors duration-150 ease-out',
    'disabled:cursor-default disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'bg-parchment px-5 py-3.5 text-ink hover:bg-parchment-dim',
      accent: 'bg-amber px-5 py-3.5 text-ink hover:brightness-95',
      secondary: [
        'border border-line bg-transparent px-5 py-3.5 text-parchment',
        'hover:border-parchment-dim',
      ],
      text: [
        'rounded-none bg-transparent p-0 font-mono text-xs uppercase tracking-[0.08em]',
        'text-parchment-dim underline-offset-4 hover:text-parchment hover:underline',
      ],
    },
    icon: {
      true: 'gap-2',
    },
    full: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    variant: 'primary',
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
  { children, className, variant, full, leftIcon, rightIcon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={buttonStyles({
        className,
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
