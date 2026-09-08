import MessageErrorIcon from '@/components/icons/MessageError'
import MessageSentIcon from '@/components/icons/MessageSent'

type Props = { status: 'error' | 'success' }

const ContactFormMessage: React.FC<Props> = ({ status }) => {
  const ok = status === 'success'
  return (
    <div
      role='status'
      className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink-2 p-6 text-center'
    >
      {ok ? (
        <MessageSentIcon className='text-4xl text-parchment' />
      ) : (
        <MessageErrorIcon className='text-4xl text-err' />
      )}
      <p className='text-3xl font-semibold text-parchment'>
        {ok ? 'Message sent.' : 'Not sent.'}
      </p>
      <p className='max-w-[40ch] text-parchment-dim'>
        {ok
          ? 'I read everything and answer what I can help with — usually within a couple of days.'
          : 'Something failed on my side. Email me directly or try again in a minute.'}
      </p>
    </div>
  )
}

export default ContactFormMessage
