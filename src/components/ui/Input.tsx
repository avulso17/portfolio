import { forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: [
    'relative min-w-0 appearance-none text-white',
    'placeholder:text-gray focus-visible:outline-none',
  ],
  variants: {
    variant: {
      outlined: ['rounded-4xl border border-card-border bg-onyx'],
      unstyled: ['border-none bg-transparent'],
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    },
  },
  compoundVariants: [
    {
      size: 'md',
      variant: 'outlined',
      className: 'h-[52px] px-6 py-2',
    },
  ],
  defaultVariants: {
    variant: 'unstyled',
    size: 'md',
  },
})

type InputVariantProps = VariantProps<typeof styles>

export type InputProps = React.ComponentProps<'input'> & InputVariantProps

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input ref={ref} className={styles({ variant, className })} {...props} />
    )
  }
)

Input.displayName = 'Input'

export default Input
