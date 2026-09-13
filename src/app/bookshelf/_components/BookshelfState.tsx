import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Scene } from '@/components/ui/Scene'

const copy = {
  empty: {
    title: 'Nothing on the shelf yet.',
    aside: 'The books that changed how I decide land here as I finish them.',
  },
  error: {
    title: 'The shelf didn’t load.',
    aside: 'It’s on my side, not yours.',
  },
} as const

type BookshelfStateProps = {
  variant: keyof typeof copy
  children?: React.ReactNode
}

const BookshelfState: React.FC<BookshelfStateProps> = ({
  variant,
  children,
}) => (
  <Reveal className='py-12'>
    <Card className='relative z-0 flex min-h-[24rem] flex-col justify-end gap-4 overflow-hidden p-8'>
      <Scene name='bookshelf-empty' scrim='bottom' position='center' />
      <Eyebrow index='03'>Bookshelf</Eyebrow>
      <h2 className='max-w-[18ch]'>{copy[variant].title}</h2>
      <p className='max-w-[40ch] font-serif text-xl italic text-parchment-dim'>
        {copy[variant].aside}
      </p>
      {children ? <div className='flex gap-4 pt-2'>{children}</div> : null}
    </Card>
  </Reveal>
)

export default BookshelfState
