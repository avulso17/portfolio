import { cn } from '@/lib/utils/cn'

export type TechStackGroupProps = React.ComponentProps<'div'>

const TechStackGroup: React.FC<TechStackGroupProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mb-12 grid w-full gap-4 mobile:grid-cols-2 tablet:grid-cols-3 wide:grid-cols-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default TechStackGroup
