import { cn } from '@/lib/utils/cn'

export type TechStackGroupProps = React.ComponentProps<'div'>

export default function TechStackGroup({
  children,
  className,
  ...props
}: TechStackGroupProps) {
  return (
    <div
      className={cn(
        'mb-16 grid w-full gap-4 mobile:grid-cols-2 tablet:grid-cols-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
