import { VariantProps, tv } from 'tailwind-variants'

const portraitStyles = tv({
  slots: {
    image: 'object-cover',
    container: 'grid place-items-center bg-black',
  },
  variants: {
    circle: {
      true: {
        image: 'rounded-full',
        container: 'h-[33.75rem] w-[33.75rem] rounded-50',
      },
    },
    square: {
      true: {
        image: 'rounded-full',
        container: 'h-[33.75rem] w-[33.75rem] rounded-50',
      },
    },
  },
  defaultVariants: {
    circle: true,
  },
})
type portraitVariants = VariantProps<typeof portraitStyles>

type PortraitProps = portraitVariants & {
  src?: string
}

export const Portrait = ({
  src,
  circle,
  square,
}: PortraitProps): React.ReactElement => {
  const { image, container } = portraitStyles({ circle, square })

  return (
    <div className={container()}>
      <img className={image() + ''} src={src} alt='geist_avatar_portrait' />
    </div>
  )
}
