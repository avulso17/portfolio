import { cn } from '@/lib/utils/cn'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto max-w-screen-wide', className)}>{children}</div>
  )
}

export default Container
