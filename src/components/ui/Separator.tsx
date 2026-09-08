import { cn } from '@/lib/utils/cn'

type SeparatorTypes = {
  children?: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
  screen?: boolean
}

const Separator: React.FC<SeparatorTypes> = ({
  children,
  className,
  orientation = 'horizontal',
  screen,
}) => {
  return (
    <div
      role='separator'
      className={cn(
        [
          'bg-line',
          'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
          'data-[screen=true]:absolute data-[screen=true]:top-0 data-[screen=true]:w-screen data-[screen=true]:absolute-center-x',
        ],
        className
      )}
      data-orientation={orientation}
      data-screen={screen}
    >
      {children}
    </div>
  )
}

export default Separator
