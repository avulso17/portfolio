'use client'

import { ComponentProps, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

import * as Label from '@radix-ui/react-label'

const textFieldStyles = tv({
  slots: {
    wrapper: 'flex items-baseline gap-2',
    input: [
      'h-fit w-full appearance-none border-none bg-transparent text-gray-light ',
      'transition-colors placeholder:text-gray focus:outline-none',
    ],
    label: 'inline-block text-base font-medium',
  },
  variants: {
    error: {
      true: {
        input:
          'border-red bg-red/10 text-red/80 focus:border-red focus:ring-red',
        label: 'text-red/80',
      },
    },
    success: {
      true: {
        input:
          'border-green text-green/80 bg-green/10 focus:border-green focus:ring-green',
        label: 'text-green/80',
      },
    },
  },
})

type TextFieldVariants = VariantProps<typeof textFieldStyles>

type ITextField = Omit<ComponentProps<'input'>, 'width'> &
  TextFieldVariants & {
    icon?: string
    label?: string
  }

const TextField = forwardRef<HTMLInputElement, ITextField>(
  (
    { id, label, error, success, className, placeholder, ...props },
    forwardRef
  ) => {
    const {
      wrapper,
      input,
      label: labelStyles,
    } = textFieldStyles({ error, success })

    return (
      <div className={wrapper()}>
        {label !== undefined && (
          <Label.Root className={labelStyles()} htmlFor={id}>
            {label}
          </Label.Root>
        )}

        <input
          ref={forwardRef}
          id={id}
          className={twMerge(input(), className)}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export { TextField }
