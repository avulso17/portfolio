import { CrtWarp } from '@/components/effects/CrtWarp'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import Link from 'next/link'
import ResumeModalButton from './HomeResumeModalButton'

const HomeHero: React.FC = () => {
  return (
    <section className='relative z-0 flex min-h-[38rem] flex-col justify-end gap-8 border-b border-line pb-16 pt-40 mobile:min-h-[46rem] mobile:pt-56'>
      <CrtWarp name='home-paladin' className='[&_canvas]:object-cover' />

      <Eyebrow index='00'>
        Felipe Mateus — front-end engineer with a product owner&apos;s eye
      </Eyebrow>

      <h1 className='flex flex-col'>
        <span>I build the front-end</span>{' '}
        <span className='text-outline'>and question the roadmap.</span>
      </h1>

      <p className='max-w-[48ch] font-serif text-2xl italic text-parchment-dim'>
        Front-end engineer with an owner&rsquo;s eye — I find the bottleneck,
        make the call, and ship what moves the number.
      </p>

      <div className='flex flex-col gap-4 mobile:flex-row mobile:items-center'>
        <Link href='/contact' className='w-full mobile:w-fit'>
          <Button variant='accent' full>
            Tell me what&apos;s stuck
          </Button>
        </Link>
        <ResumeModalButton />
      </div>
    </section>
  )
}

export default HomeHero
