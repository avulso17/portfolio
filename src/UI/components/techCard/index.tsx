import Image from 'next/image'

import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const techCardStyles = tv({
  slots: {
    container: ['', ''],
    image: 'aspect-square w-[7.125rem] object-contain',
    label: [
      'flex h-fit w-fit items-center justify-center',
      'rounded-3xl border border-[#272525] bg-onyx',
      ' px-3 py-[0.375rem] text-sm leading-normal text-gray-dark',
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
  name = 'ChatGPT',
  category = 'Productivity',
  src = '/apps/ChatGPT.png',
}: TechCardProps): React.ReactElement => {
  const { container, image, label } = techCardStyles()

  return (
    <div
      className={twMerge(
        container(),
        className,
        'flex aspect-square w-full max-w-[18.75rem] flex-col items-center justify-end gap-10 rounded-[1.375rem] border border-card-border bg-onyx p-6'
      )}
    >
      <Image
        src={src}
        alt='tech_icon'
        className={image()}
        height={114}
        width={114}
      />
      <div className='flex w-full items-end justify-between'>
        <p className='text-xl font-medium leading-normal'>{name}</p>
        <span className={label()}>{category}</span>
      </div>
    </div>
  )
}
