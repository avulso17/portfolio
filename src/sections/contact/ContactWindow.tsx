import MacOSControlBar from './ContactMacOSControlBar'
import ContactMessageSent from './ContactMessageSent'
import ContactNewMessageForm from './ContactNewMessageForm'

export default function ContactWindow() {
  // const status = 'error'
  const status = undefined

  return (
    <div className='relative flex w-full flex-col overflow-hidden rounded-xl bg-onyx pb-5'>
      <MacOSControlBar />
      <ContactNewMessageForm />

      {status ? <ContactMessageSent status={status} /> : null}
    </div>
  )
}
