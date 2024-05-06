import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type AboutPortraitProps = React.ComponentProps<'div'>

export default function AboutPortrait({ className }: AboutPortraitProps) {
  return (
    <div
      className={twMerge(
        [
          'flex justify-center rounded-xl border border-card-border bg-black',
          'relative z-0 h-[322px] w-[250px] overflow-hidden',
          'wide:h-[434px] wide:w-[346px]',
        ],
        className
      )}
    >
      <div className='relative h-full w-full bg-onyx'>
        <Image
          className='block object-cover object-[0%_20%] rotate-inverted-y'
          src='/assets/felipe_2.jpg'
          alt='Felipe Mateus'
          fill
        />
      </div>
    </div>
  )
}
