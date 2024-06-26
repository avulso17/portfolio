import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type HomePortraitProps = React.ComponentProps<'div'>

export default function HomePortrait({ className }: HomePortraitProps) {
  return (
    <div
      className={twMerge(
        [
          'flex justify-center rounded-50',
          'h-[33.75rem] w-[33.75rem] overflow-hidden',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0',
          'after:z-10 after:bg-radial-gradient',
        ],
        className
      )}
    >
      <div
        className={twMerge([
          'relative mt-[5.375rem] h-[21.5rem] w-72',
          'bg-onyx mask-geist rotate-inverted-y',
        ])}
      >
        <Image
          className='block object-cover object-[55%_22%]'
          src='/assets/felipe_1.jpg'
          alt='Felipe Mateus'
          priority
          fill
        />
      </div>
    </div>
  )
}
