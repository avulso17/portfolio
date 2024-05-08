'use client'

import { useActionState } from 'react'

import sendEmail from '@/app/contact/actions'

import MacOSControlBar from './ContactMacOSControlBar'
import ContactMessageSent, { SentStatus } from './ContactMessageSent'
import ContactNewMessageForm from './ContactNewMessageForm'

export default function ContactWindow() {
  const [state, submitAction] = useActionState(sendEmail, null)

  const status = state?.status as SentStatus

  return (
    <div className='relative flex w-full flex-col overflow-hidden rounded-xl bg-onyx pb-5'>
      <MacOSControlBar />
      <ContactNewMessageForm action={submitAction} errors={state?.errors} />

      {status ? <ContactMessageSent status={status} /> : null}
    </div>
  )
}
