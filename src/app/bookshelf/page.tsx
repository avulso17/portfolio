import { tv } from 'tailwind-variants'

import { Book } from '@/UI/components/book'
import Separator from '@/UI/components/separator'

const bookStyles = tv({
  base: 'w-[10.625rem] mobile:w-[13.375rem]',
})

const books = [
  'arte-de-viver.jpg',
  'essencialismo.jpg',
  'inteligencia-emocional.jpg',
  'mais-esperto-que-o-diabo.jpg',
  'o-homem-mais-rico-da-babilonia.jpg',
  'o-poder-do-subconsciente.jpg',
  'o-principe.jpg',
  'o-processo.jpg',
  'pai-rico-pai-pobre.jpg',
  'rapido-e-devagar.jpg',
]

export default function BookshelfPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <div className='relative flex w-full flex-col gap-2 pb-14'>
        <h1>Bookshelf</h1>
        <p className='hero-text'>
          Books and pieces of wisdom I&rsquo;ve enjoyed reading.
        </p>

        <Separator className='absolute bottom-0 !w-screen opacity-[0.06] absolute-center-x' />
      </div>

      <div className='flex w-full flex-wrap items-center justify-between gap-y-6 pb-12 pt-16'>
        {books.map((book) => (
          <Book key={book} image={`/books/${book}`} className={bookStyles()} />
        ))}
      </div>
    </main>
  )
}
