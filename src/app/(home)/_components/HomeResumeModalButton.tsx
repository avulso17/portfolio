'use client'

import Resume from '@/components/Resume'
import { Button } from '@/components/ui/Button'
import { Modal, ModalContent } from '@/components/ui/modal'
import { useState } from 'react'

const HomeResumeModalButton: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <Button
        className='group/modal-btn w-full overflow-hidden mobile:w-fit'
        onClick={handleClick}
      >
        <span className='text-center transition duration-500 group-hover/modal-btn:translate-x-[400%]'>
          See my resume
        </span>
        <div className='absolute inset-0 z-20 flex -translate-x-full items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0'>
          📄
        </div>
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent className='p-8 tablet:p-10'>
          <Resume />
        </ModalContent>
      </Modal>
    </>
  )
}

export default HomeResumeModalButton
