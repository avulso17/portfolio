import HandArrowDownSvg from '@/assets/HandArrowDown'
import MessageErrorIcon from '@/components/icons/MessageError'
import MessageSentIcon from '@/components/icons/MessageSent'

const ContactFormMessageSuccess: React.FC = () => {
  return (
    <>
      <MessageSentIcon className='text-[40px]' />
      <span className='text-center text-4xl font-semibold'>Message Sent!</span>
      <p className='max-w-[472px] text-center font-medium text-parchment'>
        Thanks for taking the time to write me, I&rsquo;ll reply to you as soon
        as possible.
      </p>
    </>
  )
}

const ContactFormMessageError: React.FC = () => {
  return (
    <>
      <MessageErrorIcon className='text-[40px] text-err' />
      <span className='text-center text-4xl font-semibold'>
        Cannot send message :(
      </span>
      <p className='text-center font-medium text-parchment'>
        An error occurred while sending your message, please try again later.
      </p>
    </>
  )
}

type ContactFormMessageProps = {
  status: 'error' | 'success'
}

const ContactFormMessage: React.FC<ContactFormMessageProps> = ({ status }) => {
  return (
    <div className='absolute inset-0 z-10 flex animate-bounce-in-top flex-col justify-between bg-ink-2 p-6'>
      <div />

      <div className='flex flex-col items-center gap-4'>
        {status === 'success' ? (
          <ContactFormMessageSuccess />
        ) : (
          <ContactFormMessageError />
        )}
      </div>

      <div className='flex flex-col items-center gap-8'>
        <p className='text-center font-medium text-parchment-dim'>
          In the meantime, follow me on these platforms below
        </p>

        <HandArrowDownSvg className='h-[98px] w-[56px] animate-bounce text-parchment delay-100' />
      </div>
    </div>
  )
}

export default ContactFormMessage
