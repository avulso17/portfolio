import HandArrowDownSvg from '@/assets/HandArrowDown'
import MessageErrorIcon from '@/components/icons/MessageError'
import MessageSentIcon from '@/components/icons/MessageSent'

const ContactFormMessageSuccess: React.FC = () => {
  return (
    <>
      <MessageSentIcon className='text-[40px]' />
      <span className='text-center text-4xl font-semibold'>Message Sent!</span>
      <p className='text-gray-light max-w-[472px] text-center font-medium'>
        Thanks for taking the time to write me, I&rsquo;ll reply to you as soon
        as possible.
      </p>
    </>
  )
}

const ContactFormMessageError: React.FC = () => {
  return (
    <>
      <MessageErrorIcon className='text-error text-[40px]' />
      <span className='text-center text-4xl font-semibold'>
        Cannot send message :(
      </span>
      <p className='text-gray-light text-center font-medium'>
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
    <div className='bg-onyx absolute inset-0 z-10 flex animate-bounce-in-top flex-col justify-between p-6'>
      <div />

      <div className='flex flex-col items-center gap-4'>
        {status === 'success' ? (
          <ContactFormMessageSuccess />
        ) : (
          <ContactFormMessageError />
        )}
      </div>

      <div className='flex flex-col items-center gap-8'>
        <p className='text-gray-dark text-center font-medium'>
          In the meantime, follow me on these platforms below
        </p>

        <HandArrowDownSvg className='text-gray-light dark:text-gray-dark h-[98px] w-[56px] animate-bounce delay-100' />
      </div>
    </div>
  )
}

export default ContactFormMessage
