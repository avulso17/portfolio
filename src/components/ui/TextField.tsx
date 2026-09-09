'use client'

import { ComponentProps, forwardRef } from 'react'

import { tv, type VariantProps } from 'tailwind-variants'

const textFieldStyles = tv({
  slots: {
    wrapper: 'flex w-full flex-col gap-2',
    input: [
      'w-full min-w-0 appearance-none bg-transparent font-body text-parchment',
      'border-b border-line py-3 transition-colors',
      'placeholder:text-parchment-mute focus:border-amber focus:outline-none',
    ],
    label: 'text-parchment-mute eyebrow-text',
    message: 'text-err eyebrow-text',
  },
  variants: {
    error: {
      true: {
        input: 'border-err text-err placeholder:text-err/70',
        label: 'text-err',
      },
    },
  },
})

type TextFieldVariants = VariantProps<typeof textFieldStyles>

type ITextField = Omit<ComponentProps<'input'>, 'width'> &
  TextFieldVariants & {
    errorMessage?: string
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
      errorMessage,
      className,
      placeholder,
      inputClassname,
      ...props
    },
    forwardRef
  ) => {
    const {
      wrapper,
      input,
      label: labelStyles,
      message,
    } = textFieldStyles({ error })

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
          aria-invalid={error || undefined}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          {...props}
        />

        {errorMessage ? (
          <p id={`${id}-error`} role='alert' className={message()}>
            {errorMessage}
          </p>
        ) : null}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export { TextField }
