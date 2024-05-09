import MacOSControlBar from './ContactMacOSControlBar'
import ContactNewMessageForm from './ContactNewMessageForm'

export default function ContactWindow() {
  return (
    <div className='relative flex w-full flex-col overflow-hidden rounded-xl bg-onyx pb-5'>
      <MacOSControlBar />
      <ContactNewMessageForm />
    </div>
  )
}
