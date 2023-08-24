'use client'
import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const portraitStyles = tv({
  slots: {
    image: 'block h-[21.5rem] w-72 object-cover object-[55%_22%]',
    wrapper: 'h-fit w-fit bg-onyx mask-geist',
    container: 'relative z-0 flex justify-center overflow-hidden',
    after:
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:bg-radial-gradient',
  },
  variants: {
    circle: {
      true: {
        wrapper: 'mt-[5.375rem]',
        container: 'h-[33.75rem] w-[33.75rem] rounded-50',
      },
    },
    square: {
      true: {
        container: 'h-[33.75rem] w-[33.75rem] rounded-50',
      },
    },
    inverted: {
      true: {
        wrapper: 'rotate-inverted-y',
      },
    },
  },
  defaultVariants: {
    circle: true,
  },
})

type PortraitVariants = VariantProps<typeof portraitStyles>

type PortraitProps = PortraitVariants &
  ComponentProps<'div'> & {
    src?: string
  }

export const Portrait = ({
  src,
  circle,
  square,
  className,
  inverted,
}: PortraitProps): React.ReactElement => {
  const { after, image, container, wrapper } = portraitStyles({
    circle,
    square,
    inverted,
  })

  return (
    <div className={twMerge(container(), after(), className)}>
      <div className={wrapper()}>
        <img className={image()} src={src} alt='felipe_mateus_portrait' />
      </div>
    </div>
  )
}
