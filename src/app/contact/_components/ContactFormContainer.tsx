import { Terminal } from '@/components/ui/Terminal'
import ContactForm from './ContactForm'

const ContactFormContainer: React.FC = () => (
  <Terminal
    title='new message'
    path='~/inbox'
    className='relative overflow-hidden'
  >
    <ContactForm />
  </Terminal>
)

export default ContactFormContainer
