'use client'

import { useModal } from '@/components/ui/AnimatedModal'
import { cn } from '@/lib/utils/cn'

export type AboutResumeModalButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>

export default function AboutResumeModalButton({
  className,
}: AboutResumeModalButtonProps) {
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
