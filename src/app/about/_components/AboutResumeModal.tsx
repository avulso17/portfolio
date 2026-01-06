'use client'

import Resume from '@/components/Resume'
import { Modal, ModalContent } from '@/components/ui/modal'
import { useState } from 'react'

const AboutResumeModal: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className='text-white underline' onClick={() => setOpen(true)}>
        Resume
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent className='p-8 tablet:p-10'>
          <Resume />
        </ModalContent>
      </Modal>
    </>
  )
}

export default AboutResumeModal
