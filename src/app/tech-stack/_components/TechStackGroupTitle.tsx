import { cn } from '@/lib/utils/cn'

export type TechStackGroupTitleProps = React.ComponentProps<'h2'>

const TechStackGroupTitle: React.FC<TechStackGroupTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2 className={cn('text-white/90 mb-8 header', className)} {...props}>
      {children}
    </h2>
  )
}

export default TechStackGroupTitle
