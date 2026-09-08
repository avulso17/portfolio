import { forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: [
    'relative min-w-0 appearance-none bg-transparent font-body text-parchment',
    'placeholder:text-parchment-mute focus-visible:outline-none',
    'transition-colors',
  ],
  variants: {
    variant: {
      line: 'border-b border-line px-0 py-3 focus:border-amber',
      unstyled: 'border-none',
    },
    error: {
      true: 'border-err text-err placeholder:text-err/70',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})

type InputVariantProps = VariantProps<typeof styles>

export type InputProps = React.ComponentProps<'input'> & InputVariantProps

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={styles({ variant, error, className })}
        aria-invalid={error || undefined}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
