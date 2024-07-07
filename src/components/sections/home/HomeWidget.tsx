'use client'

import { ComponentProps, memo } from 'react'

import Image from 'next/image'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { CardBody, CardContainer, CardItem } from '@/components/ui/3DCard'

const widgetStyles = tv({
  slots: {
    cardStyles: [
      'rounded-[2rem] border border-card-border bg-card-bg',
      'h-full w-full',
      'mobile:border-0',
    ],
    containerStyles: ['aspect-square w-full cursor-pointer'],
    bodyStyles: ['flex flex-col items-center'],
    titleStyles: [
      'text-center text-2xl font-extrabold',
      'mt-10 px-6',
      'mobile:mt-[3.75rem] mobile:text-[2rem]',
    ],
    subtitleStyles: [
      'text-center text-[0.938rem] leading-normal text-gray-dark ',
      'my-2 px-6',
      'mobile:mb-0 mobile:mt-4 mobile:text-base',
    ],
    imgStyles: [
      'relative h-full w-full overflow-hidden rounded-[2rem] object-cover',
    ],
  },
})

type WidgetProps = ComponentProps<'div'> & {
  imgClassName?: string
  imgSrc: string
  subtitle: string
  title: string
}

const HomeWidget = memo<WidgetProps>(function HomeWidget({
  imgClassName,
  imgSrc = '/assets/about-me.png',
  subtitle = 'Subtitle',
  title = 'Title',
}: WidgetProps) {
  const {
    cardStyles,
    containerStyles,
    bodyStyles,
    titleStyles,
    subtitleStyles,
    imgStyles,
  } = widgetStyles()

  return (
    <CardContainer
      className={cardStyles()}
      containerClassName={containerStyles()}
    >
      <CardBody className={bodyStyles()}>
        <CardItem as='h3' className={titleStyles()} translateZ='45'>
          {title}
        </CardItem>

        <CardItem as='p' className={subtitleStyles()} translateZ='55'>
          {subtitle}
        </CardItem>

        <CardItem className={imgStyles()} translateZ='65'>
          <Image
            className={twMerge('object-top', imgClassName)}
            src={imgSrc}
            alt='widget_image'
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  )
})

export default HomeWidget
