import Resume from '@/components/Resume'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/AnimatedModal'

export default function HomeResumeModalButton() {
  return (
    <Modal>
      <ModalTrigger className='group/modal-btn w-full overflow-hidden mobile:w-fit'>
        <span className='text-center transition duration-500 group-hover/modal-btn:translate-x-40'>
          See my resume
        </span>
        <div className='absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0'>
          ✈️
        </div>
      </ModalTrigger>

      <ModalBody>
        <ModalContent>
          <Resume />
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}
