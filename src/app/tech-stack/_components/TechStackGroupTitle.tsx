import { cn } from '@/lib/utils/cn'

export type TechStackGroupTitleProps = React.ComponentProps<'h2'>

const TechStackGroupTitle: React.FC<TechStackGroupTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      className={cn('mb-8 text-parchment/90 display-2', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export default TechStackGroupTitle
