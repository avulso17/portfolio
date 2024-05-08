'use client'

import { Button } from '@/components/Button'
import { useFormStatus } from 'react-dom'

export default function ContactSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='ml-auto mr-4 w-full px-8 mobile:w-fit'
    >
      Send
    </Button>
  )
}
