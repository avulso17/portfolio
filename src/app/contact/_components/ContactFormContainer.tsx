import { Reveal } from '@/components/ui/Reveal'
import { Terminal } from '@/components/ui/Terminal'
import ContactForm from './ContactForm'

const ContactFormContainer: React.FC = () => (
  <Reveal>
    <Terminal
      title='new message'
      path='~/inbox'
      className='relative overflow-hidden'
    >
      <ContactForm />
    </Terminal>
  </Reveal>
)

export default ContactFormContainer
