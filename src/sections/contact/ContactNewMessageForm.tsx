import { Button } from '@/components/Button'
import { Separator } from '@/components/Separator'
import { TextField } from '@/components/TextField'
import { cn } from '@/utils/cn'

export default function ContactNewMessageForm() {
  return (
    <form
      className={cn([
        'flex w-full flex-col gap-6 px-4 pt-6',
        'mobile:gap-8 mobile:px-8 mobile:py-[0.625rem]',
      ])}
    >
      <div className='h-fit w-full'>
        <TextField
          type='email'
          placeholder='Enter your email address'
          label='Email:'
        />

        <Separator alpha className='my-4' />

        <TextField type='text' placeholder='Enter your name' label='Name:' />

        <Separator alpha className='my-4' />

        <TextField type='text' placeholder='Enter subject' label='Subject:' />
      </div>

      <Separator alpha />

      <textarea
        placeholder='Write your message here'
        className={cn([
          'h-80 w-full rounded-xl bg-black p-6 text-start',
          'shadow-text-area placeholder:text-gray focus:outline-none',
        ])}
      />

      <Button type='submit' className='ml-auto mr-4 w-full px-8 mobile:w-fit'>
        Send
      </Button>
    </form>
  )
}
