'use client'

import { ComponentProps, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

import * as Label from '@radix-ui/react-label'

const textFieldStyles = tv({
  slots: {
    wrapper: 'flex w-full items-center gap-2',
    input: [
      'w-full min-w-0 appearance-none text-gray-light',
      'transition-colors placeholder:text-gray focus:outline-none',
    ],
    label: 'inline-block text-base font-medium',
  },
  variants: {
    variant: {
      outlined: {
        input: [],
      },
      standard: {
        input: ['border-none bg-transparent'],
      },
    },
    error: {
      true: {
        input: 'border-red text-red/80 placeholder:text-red',
        label: 'text-red/80',
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
})

type TextFieldVariants = VariantProps<typeof textFieldStyles>

type ITextField = Omit<ComponentProps<'input'>, 'width'> &
  TextFieldVariants & {
    icon?: string
    label?: string
  }

const TextField = forwardRef<HTMLInputElement, ITextField>(
  ({ id, label, error, className, placeholder, ...props }, forwardRef) => {
    const { wrapper, input, label: labelStyles } = textFieldStyles({ error })

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
