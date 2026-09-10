import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Terminal } from '@/components/ui/Terminal'
import { Typewriter } from '@/components/ui/Typewriter'
import Link from 'next/link'

const categories = ['dev', 'design', 'philosophy']

const NotebookInProgress: React.FC = () => (
  <Reveal className='grid gap-8 py-16 pb-28 wide:grid-cols-2'>
    <Terminal title='notebook' path='~/notes'>
      <p>
        <Typewriter text='$ ls' />
      </p>
      <p>
        <Typewriter text={categories.map((c) => `${c}/`).join('  ')} />
      </p>
      <p className='mt-4'>
        <Typewriter text='$ wc -l */*.md' />
      </p>
      <p>
        <Typewriter text='0 published · drafts in progress' />
      </p>
    </Terminal>

    <div className='flex flex-col gap-4'>
      <p className='font-serif text-2xl italic text-parchment-dim'>
        The first notes are about decisions, not tutorials: what I cut, what I
        measured, what I would decide again.
      </p>
      <p className='max-w-[60ch] text-parchment-dim'>
        Until they land, the same thinking is visible on the projects page —
        each one shows the call and the result.
      </p>
      <Link href='/projects' className='w-fit'>
        <Button variant='secondary'>See the projects</Button>
      </Link>
    </div>
  </Reveal>
)

export default NotebookInProgress
