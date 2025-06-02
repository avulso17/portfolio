import Resume from '@/components/Resume'
import { Modal, ModalBody, ModalContent } from '@/components/ui/AnimatedModal'
import Trigger from './AboutResumeModalButton'

const AboutResumeModal: React.FC = () => {
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

export default AboutResumeModal
