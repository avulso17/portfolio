'use client'

import { cn } from '@/lib/utils/cn'
import { useCallback, useEffect, useRef } from 'react'

type ModalProps = {
  children: React.ReactNode
  onClose?: () => void
  open: boolean
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.classList.add('animate-fadeIn')
    dialog.showModal()
  }, [])

  const closeModal = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const animDuration = 200
    dialog.classList.remove('animate-fadeIn')
    dialog.classList.add('animate-fadeOut')

    setTimeout(() => {
      dialog.close()
      dialog.classList.remove('animate-fadeOut')
    }, animDuration)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) openModal()
    } else {
      if (dialog.open) closeModal()
    }
  }, [open, closeModal, openModal])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !onClose) return

    const handleClose = () => {
      onClose()
    }

    dialog.addEventListener('close', handleClose)
    return () => {
      dialog.removeEventListener('close', handleClose)
    }
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      className={cn([
        'overflow-y-auto bg-onyx absolute-center',
        'mx-auto max-h-full w-full max-w-screen-tablet',
        'pointer-events-none opacity-0 transition-opacity',
        'tablet:max-h-[90%] tablet:rounded-xl',
        'backdrop:bg-black/25 backdrop:backdrop-blur-sm',
        'open:pointer-events-auto open:opacity-100',
      ])}
      onClick={closeModal}
    >
      <form method='dialog' className='absolute right-4 top-4'>
        <button type='reset' onClick={closeModal}>
          x
        </button>
      </form>
      <div className='h-full w-full' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
