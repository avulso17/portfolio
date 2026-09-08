import { cn } from '@/lib/utils/cn'

type ModalContentProps = {
  children?: React.ReactNode
  className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({ className, children }) => {
  return (
    <section className={cn('max-h-[90%] rounded-sm bg-ink-2', className)}>
      {children}
    </section>
  )
}

export default ModalContent
