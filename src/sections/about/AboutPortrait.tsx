import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type AboutPortraitProps = React.ComponentProps<'div'>

export default function AboutPortrait({ className }: AboutPortraitProps) {
  return (
    <div
      className={twMerge(
        [
          'flex justify-center rounded-xl border border-card-border bg-black',
          'relative z-0 h-fit w-fit overflow-hidden px-8 py-14',
          'wide:px-11 wide:py-16',
        ],
        className
      )}
    >
      <div className='relative h-[202px] w-[170px] bg-onyx mask-geist wide:h-[19rem] wide:w-64'>
        <Image
          className='block object-cover'
          src='/assets/me.jpg'
          alt='Felipe Mateus'
          fill
        />
      </div>
    </div>
  )
}
