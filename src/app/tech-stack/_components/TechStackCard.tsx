import ArrowRightIcon from '@/components/icons/ArrowRight'
import Image, { StaticImageData } from 'next/image'

import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

const cardStyles = tv({
  slots: {
    container: [
      'group flex items-center gap-4 p-4',
      'rounded-sm border border-line bg-ink-2',
      'relative w-full transition-colors hover:border-parchment-dim',
      'mobile:aspect-square mobile:flex-col mobile:items-start mobile:justify-between mobile:p-6',
    ],
    icon: [
      'absolute right-4 top-4 hidden text-xl text-parchment-mute mobile:block',
    ],
    image: ['aspect-square w-14 shrink-0 object-contain mobile:w-20'],
    title: 'text-base font-medium text-parchment',
    label: 'text-parchment-mute eyebrow-text',
  },
})

type TechStackCardProps = ComponentProps<'div'> & {
  category?: string
  name?: string
  src: StaticImageData
}

const TechStackCard: React.FC<TechStackCardProps> = ({
  className,
  category,
  name = 'Title',
  src,
}) => {
  const classes = cardStyles()

  return (
    <div className={classes.container({ className })}>
      <ArrowRightIcon className={classes.icon()} />

      <Image
        src={src}
        alt=''
        className={classes.image()}
        height={112}
        width={112}
        loading='lazy'
      />

      <div className='flex w-full flex-col gap-1'>
        <p className={classes.title()}>{name}</p>

        {category ? <span className={classes.label()}>{category}</span> : null}
      </div>
    </div>
  )
}

export default TechStackCard
