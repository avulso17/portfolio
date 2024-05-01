import Image from 'next/image'

import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

const cardStyles = tv({
  slots: {
    container: [
      'flex items-center justify-end gap-4 p-3.5',
      'relative rounded-2xl border border-card-border bg-onyx',
      'mobile:aspect-square mobile:w-auto ',
      'mobile:flex-col mobile:gap-10 mobile:rounded-3xl mobile:p-6',
    ],
    image: [
      'aspect-square w-16 min-w-[3.75rem] shrink-0 object-contain',
      'overflow-hidden rounded-3xl mobile:-mt-1.5 mobile:rounded-2xl',
      'mobile:absolute mobile:w-[35%] mobile:absolute-center wide:w-28',
    ],
    title: 'text-base font-semibold leading-normal mobile:text-lg',
    label: [
      'flex h-fit w-fit items-center justify-center',
      'rounded-3xl border border-[#272525] bg-onyx',
      'px-3 py-1.5 text-xs leading-normal text-gray-dark',
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
      <Image
        src={src}
        alt='stack_icon'
        className={classes.image()}
        height={112}
        width={112}
        quality={100}
      />

      <div className='flex w-full items-end justify-between'>
        <p className={classes.title()}>{name}</p>

        {category !== undefined ? (
          <span className={classes.label()}>{category}</span>
        ) : null}
      </div>
    </div>
  )
}
