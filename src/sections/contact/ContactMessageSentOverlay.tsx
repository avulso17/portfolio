import HandArrowDown from '@/assets/HandArrowDown'
import MessageErrorIcon from '@/icons/MessageError'
import MessageSentIcon from '@/icons/MessageSent'

export type SentStatus = 'error' | 'success'

export type ContactMessageSent = {
  status: SentStatus
}

export default function ContactMessageSentOverlay({
  status,
}: ContactMessageSent) {
  return (
    <div className='absolute inset-0 z-10 flex animate-bounce-in-top flex-col justify-between bg-onyx p-6'>
      <div />

      <div className='flex flex-col items-center gap-4'>
        {status === 'success' ? (
          <MessageSentIcon className='text-[40px]' />
        ) : (
          <MessageErrorIcon className='text-[40px] text-error' />
        )}

        <span className='text-4xl font-semibold'>
          {status === 'success' ? 'Message Sent!' : 'Cannot send message :('}
        </span>

        {status === 'success' ? (
          <p className='max-w-[472px] text-center font-medium text-gray-light'>
            Thanks for taking the time to write me, I’ll reply to you as soon as
            possible.
          </p>
        ) : (
          <p className='text-center font-medium text-gray-light'>
            An error occurred while sending your message, please try again
            later.
          </p>
        )}
      </div>

      <div className='flex flex-col items-center gap-8'>
        <p className='font-medium text-gray-dark'>
          In the meantime, follow me on these platforms below
        </p>

        <HandArrowDown className='h-[98px] w-[56px] animate-bounce text-gray-light delay-100 dark:text-gray-dark' />
      </div>
    </div>
  )
}
