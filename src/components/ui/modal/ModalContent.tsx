import { cn } from '@/lib/utils/cn'

type ModalContentProps = {
  children?: React.ReactNode
  className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({ className, children }) => {
  return (
    <section className={cn('bg-onyx max-h-[90%] rounded-lg', className)}>
      {children}
    </section>
  )
}

export default ModalContent
