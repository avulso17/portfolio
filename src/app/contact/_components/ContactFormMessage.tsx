import MessageErrorIcon from '@/components/icons/MessageError'
import MessageSentIcon from '@/components/icons/MessageSent'
import { Button } from '@/components/ui/Button'

type Props = { status: 'error' | 'success'; onRetry?: () => void }

const ContactFormMessage: React.FC<Props> = ({ status, onRetry }) => {
  const ok = status === 'success'
  return (
    <div
      role={ok ? 'status' : 'alert'}
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
          : 'Something failed on my side. Your message is still in the form — send it again, or email me directly.'}
      </p>
      {!ok && onRetry ? (
        <Button variant='secondary' onClick={onRetry}>
          Back to the message
        </Button>
      ) : null}
    </div>
  )
}

export default ContactFormMessage
