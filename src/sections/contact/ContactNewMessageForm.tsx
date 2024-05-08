import { Separator } from '@/components/Separator'
import { TextField } from '@/components/TextField'
import { cn } from '@/utils/cn'
import ContactSubmitButton from './ContactSubmitButton'

export type ContactNewMessageFormProps = React.ComponentProps<'form'> & {
  errors?: any
}

export default function ContactNewMessageForm({
  action,
  className,
  errors,
  ...props
}: ContactNewMessageFormProps) {
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
    <form
      action={action}
      className={cn([
        'flex w-full flex-col gap-6 px-4 pt-6',
        'mobile:gap-8 mobile:px-8 mobile:py-[0.625rem]',
        className,
      ])}
      {...props}
    >
      <div className='h-fit w-full'>
        <TextField
          id='email'
          type='email'
          name='email'
          placeholder='Enter your email address'
          label='Email:'
          // required
        />

        <Separator alpha className='my-4' />

        <TextField
          id='name'
          type='text'
          name='name'
          placeholder='Enter your name'
          label='Name:'
        />

        <Separator alpha className='my-4' />

        <TextField
          type='text'
          id='subject'
          name='subject'
          placeholder='Enter subject'
          label='Subject:'
        />
      </div>

      <Separator alpha />

      <textarea
        id='text'
        name='text'
        placeholder='Write your message here'
        className={cn([
          'h-80 w-full rounded-xl bg-black p-6 text-start',
          'shadow-text-area placeholder:text-gray focus:outline-none',
        ])}
        onKeyDown={handleKeyDown}
      />

      <ContactSubmitButton />
    </form>
  )
}
