import SendIcon from '@/components/icons/Send'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SIGN_OFF } from '@/configs/navigation'
import Link from 'next/link'

const HomeGetInTouchSection: React.FC = () => (
  <section className='flex flex-col items-start justify-between gap-8 py-16 tablet:flex-row tablet:items-end'>
    <div className='flex flex-col gap-3'>
      <Eyebrow index='06'>Contact</Eyebrow>
      <h2>Tell me what&rsquo;s stuck.</h2>
      <p className='max-w-[40ch] font-serif text-2xl italic text-parchment-dim'>
        {SIGN_OFF}
      </p>
    </div>
    <Link href='/contact' className='w-full mobile:w-fit'>
      <Button leftIcon={<SendIcon />} full>
        Get in touch
      </Button>
    </Link>
  </section>
)

export default HomeGetInTouchSection
