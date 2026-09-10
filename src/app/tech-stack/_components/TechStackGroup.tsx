import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils/cn'

export type TechStackGroupProps = {
  className?: string
  children: React.ReactNode
}

const TechStackGroup: React.FC<TechStackGroupProps> = ({
  children,
  className,
}) => {
  return (
    <Reveal
      className={cn(
        'mb-12 grid w-full gap-4 mobile:grid-cols-2 tablet:grid-cols-3 wide:grid-cols-4',
        className
      )}
    >
      {children}
    </Reveal>
  )
}

export default TechStackGroup
