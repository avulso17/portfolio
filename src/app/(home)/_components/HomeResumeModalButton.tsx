import Resume from '@/components/Resume'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/AnimatedModal'

const HomeResumeModalButton: React.FC = () => {
  return (
    <Modal>
      <ModalTrigger className='group/modal-btn w-full overflow-hidden mobile:w-fit'>
        <span className='text-center transition duration-500 group-hover/modal-btn:translate-x-[400%]'>
          See my resume
        </span>
        <div className='absolute inset-0 z-20 flex -translate-x-full items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0'>
          📄
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

export default HomeResumeModalButton
