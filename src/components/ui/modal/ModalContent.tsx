import { cn } from '@/lib/utils/cn'

type ModalContentProps = {
  children?: React.ReactNode
  className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({ className, children }) => {
  return (
    <section className={cn('max-h-[90%] rounded-lg bg-onyx', className)}>
      {children}
    </section>
  )
}

export default ModalContent
