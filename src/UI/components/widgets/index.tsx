'use client'
import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const widgetStyles = tv({
  slots: {
    card: 'flex h-widget w-widget shrink-0 flex-col rounded-[2rem] bg-card-bg px-6',
    titleStyles:
      'mt-[3.75rem] w-full text-center text-[2rem] font-extrabold leading-normal',
    subtitleStyles:
      'mt-4 w-full text-center text-base leading-normal text-gray-dark',
  },
})

type WidgetProps = ComponentProps<'div'> & {
  image?: string
  imageCSS?: string
  subtitle?: string
  title?: string
}

export const Widget = ({
  image,
  subtitle = 'Subtitle',
  title = 'Title',
  imageCSS,
}: WidgetProps): React.ReactElement => {
  const { card, titleStyles, subtitleStyles } = widgetStyles()

  return (
    <div className={card()}>
      <h3 className={titleStyles()}>{title}</h3>
      <p className={subtitleStyles()}>{subtitle}</p>
      <img
        className={twMerge('mt-1 pt-16', imageCSS)}
        src={image}
        alt='widget_image'
      />
    </div>
  )
}
