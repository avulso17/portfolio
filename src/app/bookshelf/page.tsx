import { Book } from '@/UI/components/book'
import Separator from '@/UI/components/separator'

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

      <div className='grid w-full grid-cols-[repeat(2,_minmax(9.625rem,_1fr))] items-center gap-4 gap-y-6 pb-12 pt-16 mobile:grid-cols-[repeat(auto-fit,_minmax(13.375rem,_1fr))]'>
        {books.map((book) => (
          <Book key={book} image={`/books/${book}`} className='w-full' />
        ))}
      </div>
    </main>
  )
}
