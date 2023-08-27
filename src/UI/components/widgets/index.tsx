'use client'
import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const widgetStyles = tv({
  slots: {
    card: [
      'flex aspect-square shrink-0 flex-col overflow-hidden rounded-[2rem] border border-card-border bg-card-bg px-6',
      'h-auto min-h-[22.375rem] w-full min-w-[22.375rem]',
      'mobile:w-half-rem mobile:border-0',
    ],
    titleStyles: [
      'mt-[3.75rem] w-full text-center text-2xl font-extrabold',
      'tablet:text-[2rem]',
    ],
    subtitleStyles: [
      'mt-4 w-full text-center text-[0.938rem] leading-normal text-gray-dark mobile:text-base',
    ],
  },
})

type WidgetProps = ComponentProps<'div'> & {
  image?: string
  subtitle?: string
  title?: string
}

export const Widget = ({
  className,
  image,
  subtitle = 'Subtitle',
  title = 'Title',
}: WidgetProps): React.ReactElement => {
  const { card, titleStyles, subtitleStyles } = widgetStyles()

  return (
    <div className={card()}>
      <h3 className={titleStyles()}>{title}</h3>
      <p className={subtitleStyles()}>{subtitle}</p>
      <div className='relative z-0 mt-1 h-full w-full'>
        <img
          className={twMerge('absolute -z-10', className)}
          src={image}
          alt='widget_image'
        />
      </div>
    </div>
  )
}
