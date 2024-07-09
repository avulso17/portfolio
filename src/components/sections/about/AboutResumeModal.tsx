import Resume from '@/components/Resume'
import { Modal, ModalBody, ModalContent } from '@/components/ui/AnimatedModal'
import Trigger from './AboutResumeModalButton'

export default function AboutResumeModal() {
  return (
    <Modal>
      <Trigger />

      <ModalBody>
        <ModalContent>
          <Resume />
        </ModalContent>
      </ModalBody>
    </Modal>
  )
}
