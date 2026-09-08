import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const eyebrowStyles = tv({
  slots: {
    root: 'inline-flex items-center gap-2 text-parchment-mute eyebrow-text',
    square: 'inline-block h-1.5 w-1.5 shrink-0 bg-parchment-mute',
  },
  variants: {
    active: {
      true: {
        root: 'text-parchment',
        square: 'bg-amber',
      },
    },
  },
})

export type EyebrowProps = ComponentProps<'p'> &
  VariantProps<typeof eyebrowStyles> & {
    index?: string
  }

export const Eyebrow: React.FC<EyebrowProps> = ({
  active,
  index,
  children,
  className,
  ...props
}) => {
  const { root, square } = eyebrowStyles({ active })

  return (
    <p className={root({ className })} {...props}>
      <span aria-hidden='true' data-square className={square()} />
      {index ? `${index} — ` : null}
      {children}
    </p>
  )
}
