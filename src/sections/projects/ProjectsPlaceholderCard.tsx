import { Button } from '@/components/Button'
import SendIcon from '@/icons/Send'
import StarsIcon from '@/icons/Stars'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type ProjectPlaceholderCardProps = React.ComponentProps<'div'>

export default function ProjectsPlaceholderCard({
  className,
}: ProjectPlaceholderCardProps) {
  return (
    <div
      className={twMerge(
        [
          'flex w-full flex-col items-center justify-center',
          'rounded-4xl bg-onyx/50 py-16 custom-border-dashed-mobile',
          'mobile:custom-border-dashed tablet:h-[35.25rem]',
        ],
        className
      )}
    >
      <StarsIcon className='mb-8 text-7xl text-gray-light' />
      <h3 className='mb-4 text-xl font-extrabold mobile:text-3xl'>
        YOUR PROJECT GOES HERE
      </h3>
      <p className='mb-20 text-sm text-gray-dark mobile:text-base'>
        Let’s turn your idea into a visual reality
      </p>

      <Link href='/contact'>
        <Button className='px-8' leftIcon={<SendIcon className=' text-2xl' />}>
          Get in touch
        </Button>
      </Link>
    </div>
  )
}
