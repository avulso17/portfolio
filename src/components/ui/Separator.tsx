import { cn } from '@/lib/utils/cn'
import { SeparatorProps } from '@radix-ui/react-separator'

type SeparatorTypes = SeparatorProps & {
  alpha?: boolean
  screen?: boolean
}

const Separator: React.FC<SeparatorTypes> = ({
  alpha,
  children,
  className,
  decorative,
  orientation = 'horizontal',
  screen,
}) => {
  return (
    <div
      role='separator'
      className={cn(
        [
          `bg-white data-[alpha=true]:opacity-10`,
          'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
          'data-[screen=true]:absolute data-[screen=true]:top-0 data-[screen=true]:w-screen data-[screen=true]:absolute-center-x',
        ],
        className
      )}
      data-alpha={alpha}
      data-decorative={decorative}
      data-orientation={orientation}
      data-screen={screen}
    >
      {children}
    </div>
  )
}

export default Separator
