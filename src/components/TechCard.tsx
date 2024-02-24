import Image from 'next/image'

import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const techCardStyles = tv({
  slots: {
    container: [
      'flex w-full items-center justify-end gap-4 p-3.5',
      'relative rounded-2xl border border-card-border bg-onyx',
      'mobile:max-w-tech-card mobile:rounded-[1.375rem] wide:max-w-[18.75rem]',
      'mobile:aspect-square mobile:flex-col mobile:gap-10 mobile:p-6',
    ],
    image: [
      'aspect-square w-16 min-w-[3.75rem] object-contain',
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

type TechCardProps = ComponentProps<'div'> & {
  category?: string
  name?: string
  src?: string
}

export const TechCard = ({
  className,
  name = 'Name',
  category,
  src = '',
}: TechCardProps): React.ReactElement => {
  const { container, image, title, label } = techCardStyles()

  return (
    <div className={twMerge(container(), className)}>
      <Image
        src={src}
        alt='stack_icon'
        className={image()}
        height={112}
        width={112}
        quality={100}
      />
      <div className='flex w-full items-end justify-between'>
        <p className={title()}>{name}</p>
        {category !== undefined && <span className={label()}>{category}</span>}
      </div>
    </div>
  )
}
