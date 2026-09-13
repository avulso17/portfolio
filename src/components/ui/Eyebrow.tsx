import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Typewriter } from './Typewriter'

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
    typing?: boolean
  }

export const Eyebrow: React.FC<EyebrowProps> = ({
  as: Tag = 'p',
  active,
  index,
  typing,
  children,
  className,
  ...props
}) => {
  const { root, square } = eyebrowStyles({ active })
  const label =
    typing && typeof children === 'string' ? (
      <Typewriter text={children} />
    ) : (
      children
    )

  return (
    <Tag className={root({ className })} {...props}>
      <span aria-hidden='true' data-square className={square()} />
      {index ? <span className='whitespace-nowrap'>{index} — </span> : null}
      {label}
    </Tag>
  )
}
