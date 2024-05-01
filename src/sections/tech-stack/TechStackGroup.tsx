import { cn } from '@/utils/cn'

export type TechStackGroupProps = React.ComponentProps<'div'>

export default function TechStackGroup({
  children,
  className,
  ...props
}: TechStackGroupProps) {
  return (
    <div
      className={cn(
        'mb-16 grid w-full grid-rows-[3,_minmax(280px,_1fr)] gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
