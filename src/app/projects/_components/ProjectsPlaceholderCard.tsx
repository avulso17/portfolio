import SendIcon from '@/components/icons/Send'
import StarsIcon from '@/components/icons/Stars'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

type ProjectsPlaceholderCardProps = { className?: string }

const ProjectsPlaceholderCard: React.FC<ProjectsPlaceholderCardProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        [
          'flex w-full flex-col items-center justify-center',
          'bg-onyx/50 rounded-4xl py-16 custom-border-dashed-mobile',
          'mobile:custom-border-dashed tablet:h-[35.25rem]',
        ],
        className
      )}
    >
      <StarsIcon className='text-gray-light mb-8 text-7xl' />
      <h3 className='mb-4 text-xl font-extrabold mobile:text-3xl'>
        YOUR PROJECT GOES HERE
      </h3>
      <p className='text-gray-dark mb-20 text-sm mobile:text-base'>
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

export default ProjectsPlaceholderCard
