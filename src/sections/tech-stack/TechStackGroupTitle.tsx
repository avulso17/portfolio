import { cn } from '@/utils/cn'

export type TechStackGroupTitleProps = React.ComponentProps<'h2'>

export default function TechStackGroupTitle({
  children,
  className,
  ...props
}: TechStackGroupTitleProps) {
  return (
    <h2 className={cn('mb-8 text-gray-dark header', className)} {...props}>
      {children}
    </h2>
  )
}
