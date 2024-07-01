import ArrowRightIcon from '@/icons/ArrowRight'
import Image from 'next/image'

import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

const cardStyles = tv({
  slots: {
    container: [
      'group flex items-center justify-end gap-4 p-3.5',
      'rounded-2xl border border-card-border bg-onyx',
      'relative max-h-[300px] w-full',
      'transition-colors duration-300 hover:bg-card-border',
      'mobile:aspect-square mobile:rounded-3xl',
      'mobile:flex-col mobile:justify-between mobile:gap-10 mobile:p-6',
    ],
    icon: [
      'hidden mobile:flex',
      'absolute right-5 top-5 text-2xl opacity-0',
      '-translate-x-1 translate-y-1 -rotate-45 transition-all duration-300',
      'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100',
    ],
    image: [
      'aspect-square w-16 min-w-[3.75rem] shrink-0 object-contain',
      'overflow-hidden rounded-xl transition-transform duration-300',
      'mobile:w-[35%] mobile:group-hover:-translate-y-1 wide:w-28',
    ],
    title: 'text-base font-semibold !leading-none mobile:text-lg',
    label: [
      'flex h-fit w-fit items-center justify-center',
      'rounded-3xl border border-card-border',
      'px-2.5 py-1 text-xs leading-normal text-gray-dark',
    ],
  },
})

type TechStackCardProps = ComponentProps<'div'> & {
  category?: string
  name?: string
  src?: string
}

export default function TechStackCard({
  className,
  category,
  name = 'Next.js',
  src = '/apps/tools/Nextjs.png',
}: TechStackCardProps) {
  const classes = cardStyles()

  return (
    <div className={classes.container({ className })}>
      <div className='hidden min-h-7 mobile:flex' />

      <ArrowRightIcon className={classes.icon()} />

      <Image
        src={src}
        alt='stack_icon'
        className={classes.image()}
        quality={100}
        height={112}
        width={112}
        priority
      />

      <div className='flex w-full items-center justify-between gap-2'>
        <p className={classes.title()}>{name}</p>

        {category !== undefined ? (
          <span className={classes.label()}>{category}</span>
        ) : null}
      </div>
    </div>
  )
}
