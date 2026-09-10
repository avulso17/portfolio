import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const eyebrowStyles = tv({
  slots: {
    root: 'inline-flex items-center gap-2 text-parchment-dim eyebrow-text',
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
    as?: 'p' | 'h2' | 'h3'
    index?: string
  }

export const Eyebrow: React.FC<EyebrowProps> = ({
  as: Tag = 'p',
  active,
  index,
  children,
  className,
  ...props
}) => {
  const { root, square } = eyebrowStyles({ active })

  return (
    <Tag className={root({ className })} {...props}>
      <span aria-hidden='true' data-square className={square()} />
      {index ? `${index} — ` : null}
      {children}
    </Tag>
  )
}
