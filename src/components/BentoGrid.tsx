import { cn } from '@/utils/cn'

export const BentoGrid = ({
  className,
  children,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'grid max-w-7xl grid-cols-1 gap-4 tablet:grid-cols-2 wide:auto-rows-[18rem] wide:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

const Skeleton = () => (
  <div
    className={cn([
      'bg-black bg-dot-white/[0.2]',
      'flex h-full min-h-[10rem] w-full flex-1',
      'rounded-xl border border-white/[0.2]',
      '[mask-image:radial-gradient(ellipse_at_center,white,transparent)]',
      'wide:min-h-[6rem]',
    ])}
  ></div>
)

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  title?: string | React.ReactNode
}) => {
  return (
    <div
      className={cn(
        [
          'group/bento row-span-1 space-y-4 p-4',
          'flex flex-col justify-between rounded-xl',
          'border border-card-border bg-black shadow-none',
          'transition duration-200 hover:shadow-xl',
        ],
        className
      )}
    >
      {header ?? <Skeleton />}
      <div className='transition duration-200 group-hover/bento:translate-x-2'>
        {icon}
        <div className='mb-2 mt-2 font-inter font-bold text-white'>{title}</div>
        <div className='text-xs font-normal text-gray-light'>{description}</div>
      </div>
    </div>
  )
}
