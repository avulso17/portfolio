import { cn } from '@/lib/utils/cn'

type SeparatorTypes = {
  children?: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const Separator: React.FC<SeparatorTypes> = ({
  children,
  className,
  orientation = 'horizontal',
}) => {
  return (
    <div
      role='separator'
      className={cn(
        [
          'bg-line',
          'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        ],
        className
      )}
      data-orientation={orientation}
    >
      {children}
    </div>
  )
}

export default Separator
