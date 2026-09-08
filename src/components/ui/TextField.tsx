'use client'

import { ComponentProps, forwardRef } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const textFieldStyles = tv({
  slots: {
    wrapper: 'flex w-full items-center gap-2',
    input: [
      'text-gray-light w-full min-w-0 appearance-none',
      'placeholder:text-gray transition-colors focus:outline-none',
    ],
    label: 'inline-block text-base font-medium',
  },
  variants: {
    variant: {
      outlined: {
        wrapper: [
          'border-card-border bg-onyx rounded-4xl border',
          'h-[52px] px-6 py-2',
        ],
        input: ['bg-transparent'],
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
    inputClassname?: string
    label?: string
  }

const TextField = forwardRef<HTMLInputElement, ITextField>(
  (
    {
      id,
      label,
      error,
      className,
      placeholder,
      variant,
      inputClassname,
      ...props
    },
    forwardRef
  ) => {
    const {
      wrapper,
      input,
      label: labelStyles,
    } = textFieldStyles({ error, variant })

    return (
      <div className={wrapper({ className })}>
        {label !== undefined && (
          <label className={labelStyles()} htmlFor={id}>
            {label}
          </label>
        )}

        <input
          ref={forwardRef}
          id={id}
          className={input({ className: inputClassname })}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export { TextField }
