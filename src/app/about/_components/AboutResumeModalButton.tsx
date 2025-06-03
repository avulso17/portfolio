'use client'

import { useModal } from '@/components/ui/AnimatedModal'
import { cn } from '@/lib/utils/cn'

export type AboutResumeModalButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>

const AboutResumeModalButton: React.FC<AboutResumeModalButtonProps> = ({
  className,
}) => {
  const { setOpen } = useModal()

  return (
    <button
      className={cn('text-white underline', className)}
      onClick={() => setOpen(true)}
    >
      Resume
    </button>
  )
}

export default AboutResumeModalButton
