import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import SendIcon from '@/icons/Send'

export default function HomeGetInTouchSection() {
  return (
    <div className='mb-28 flex flex-col items-center justify-between gap-8 tablet:flex-row tablet:gap-0'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-center header tablet:text-start'>
          Let&rsquo;s work together
        </h2>
        <p className='w-full text-center header-text tablet:max-w-[31rem] tablet:text-start'>
          Want to discuss an opportunity to create something great? I&rsquo;m
          ready when you are.
        </p>
      </div>

      <Link href='/contact' className='w-full mobile:w-fit'>
        <Button leftIcon={<SendIcon />} full>
          Get in touch
        </Button>
      </Link>
    </div>
  )
}
