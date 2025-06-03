'use client'

import sendEmail from '@/app/contact/_actions/sendEmail'
import Separator from '@/components/ui/Separator'
import { TextField } from '@/components/ui/TextField'
import { cn } from '@/lib/utils/cn'
import { useState, useTransition } from 'react'
import ContactFormMessage from './ContactFormMessage'
import ContactSubmitButton from './ContactSubmitButton'

export type Errors = {
  email?: string[]
  name?: string[]
  subject?: string[]
  text?: string[]
}

type ErrorsKeys = keyof Errors

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<Errors>({})

  const [isPending, startTransition] = useTransition()

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      const { errors, status } = await sendEmail(formData)

      if (status) {
        setStatus(status)
      }

      if (errors) {
        setErrors(errors)
      } else {
        setErrors({})
      }
    })
  }

  const clearError = (name: ErrorsKeys) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev }

      if (name in updatedErrors) {
        delete updatedErrors[name]
      }

      return updatedErrors
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 'Enter' || e.key === 'NumpadEnter')
    ) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <>
      <form
        action={submitAction}
        className={cn([
          'flex w-full flex-col gap-6 px-4 pt-6',
          'mobile:gap-8 mobile:px-8 mobile:py-2.5',
        ])}
      >
        <div className='h-fit w-full'>
          <TextField
            id='email'
            type='email'
            name='email'
            placeholder='Enter your email address'
            label='Email:'
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            error={Boolean(errors?.email)}
          />

          <Separator alpha className='my-4' />

          <TextField
            id='name'
            type='text'
            name='name'
            placeholder='Enter your name'
            label='Name:'
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            error={Boolean(errors?.name)}
          />

          <Separator alpha className='my-4' />

          <TextField
            type='text'
            id='subject'
            name='subject'
            placeholder='Enter subject'
            label='Subject:'
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            error={Boolean(errors?.subject)}
          />
        </div>

        <Separator alpha />

        <textarea
          id='text'
          name='text'
          placeholder='Write your message here'
          className={cn(
            [
              'h-80 w-full rounded-xl bg-black p-6 text-start',
              'shadow-text-area placeholder:text-gray focus:outline-none',
            ],
            {
              'text-red/80 ring-2 ring-red placeholder:text-red': Boolean(
                errors?.text
              ),
            }
          )}
          disabled={isPending}
          onChange={(e) => clearError(e.target.name as ErrorsKeys)}
          onKeyDown={handleKeyDown}
        />

        <ContactSubmitButton />
      </form>

      {status ? (
        <ContactFormMessage status={status as 'success' | 'error'} />
      ) : null}
    </>
  )
}

export default ContactForm
