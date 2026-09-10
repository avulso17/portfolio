'use client'

import sendEmail from '@/app/contact/_actions/sendEmail'
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
      <form action={submitAction} className='flex w-full flex-col gap-6'>
        <div className='flex w-full flex-col gap-6'>
          <TextField
            id='email'
            type='email'
            name='email'
            placeholder='you@company.com'
            label='Email'
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            error={Boolean(errors?.email)}
            errorMessage={errors?.email?.[0]}
          />

          <TextField
            id='name'
            type='text'
            name='name'
            placeholder='Your name'
            label='Name'
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            error={Boolean(errors?.name)}
            errorMessage={errors?.name?.[0]}
          />

          <TextField
            type='text'
            id='subject'
            name='subject'
            placeholder='What is this about?'
            label='Subject'
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            error={Boolean(errors?.subject)}
            errorMessage={errors?.subject?.[0]}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='text' className='text-parchment-dim eyebrow-text'>
            Message
          </label>
          <textarea
            id='text'
            name='text'
            maxLength={1500}
            placeholder='What’s stuck? Context, what you tried, what it costs you.'
            className={cn(
              'min-h-56 w-full resize-y border-b border-line bg-transparent py-3 font-body text-parchment',
              'placeholder:text-parchment-mute focus:border-amber focus:outline-none',
              {
                'border-err text-err placeholder:text-err/70': Boolean(
                  errors?.text
                ),
              }
            )}
            disabled={isPending}
            onChange={(e) => clearError(e.target.name as ErrorsKeys)}
            onKeyDown={handleKeyDown}
            aria-invalid={Boolean(errors?.text) || undefined}
            aria-describedby={errors?.text ? 'text-error' : undefined}
          />
          {errors?.text ? (
            <p id='text-error' role='alert' className='text-err eyebrow-text'>
              {errors.text[0]}
            </p>
          ) : null}
          <span className='text-parchment-dim eyebrow-text'>
            ⌘/Ctrl + Enter to send · max 1500
          </span>
        </div>

        <ContactSubmitButton />
      </form>

      {status ? (
        <ContactFormMessage
          status={status as 'success' | 'error'}
          onRetry={() => setStatus(undefined)}
        />
      ) : null}
    </>
  )
}

export default ContactForm
