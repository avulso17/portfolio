import { cn } from '@/lib/utils/cn'
import Image from 'next/image'

type AboutPortraitProps = React.ComponentProps<'div'>

const AboutPortrait: React.FC = ({ className }: AboutPortraitProps) => {
  return (
    <div
      className={cn(
        [
          'border-card-border bg-black flex justify-center rounded-xl border',
          'relative z-0 h-[322px] w-[250px] overflow-hidden',
          'wide:h-[434px] wide:w-[346px]',
        ],
        className
      )}
    >
      <Image
        className='bg-onyx block object-cover'
        src='/assets/me-green-shirt.png'
        alt='Felipe Mateus Portrait'
        height={432}
        width={344}
        priority
      />
    </div>
  )
}

export default AboutPortrait
