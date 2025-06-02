'use client'

import { Button } from '@/components/ui/Button'
import { useFormStatus } from 'react-dom'

const ContactSubmitButton: React.FC = () => {
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

export default ContactSubmitButton
