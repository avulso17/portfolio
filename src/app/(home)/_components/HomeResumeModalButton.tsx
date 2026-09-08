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
        variant='secondary'
        className='w-full mobile:w-fit'
        onClick={handleClick}
      >
        See my résumé
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
