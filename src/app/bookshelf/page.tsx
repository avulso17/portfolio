import { Header } from '@/components/ui/Header'

import Book from '@/components/sections/bookshelf/Book'

import ArteDeViverBook from '@/assets/images/books/arte-de-viver.jpg'
import EssencialismoBook from '@/assets/images/books/essencialismo.jpg'
import IntEmocionalBook from '@/assets/images/books/inteligencia-emocional.jpg'
import MaisEspDiaboBook from '@/assets/images/books/mais-esperto-que-o-diabo.jpg'
import HomemMaisRicoBabiloniaBook from '@/assets/images/books/o-homem-mais-rico-da-babilonia.jpg'
import PoderSubcoscienteBook from '@/assets/images/books/o-poder-do-subconsciente.jpg'
import PrincipeBook from '@/assets/images/books/o-principe.jpg'
import ProcessoBook from '@/assets/images/books/o-processo.jpg'
import PaiRicoPaiPobreBook from '@/assets/images/books/pai-rico-pai-pobre.jpg'
import RapidoDevagarBook from '@/assets/images/books/rapido-e-devagar.jpg'

const books = [
  {
    name: 'A Arte de Viver',
    cover: ArteDeViverBook,
  },
  {
    name: 'Essencialismo',
    cover: EssencialismoBook,
  },
  {
    name: 'Inteligência Emocional',
    cover: IntEmocionalBook,
  },
  {
    name: 'Mais Esperto que o Diabo',
    cover: MaisEspDiaboBook,
  },
  {
    name: 'O Homem Mais Rico da Babilônia',
    cover: HomemMaisRicoBabiloniaBook,
  },
  {
    name: 'O Poder do Subconsciente',
    cover: PoderSubcoscienteBook,
  },
  {
    name: 'O Príncipe',
    cover: PrincipeBook,
  },
  {
    name: 'O Processo',
    cover: ProcessoBook,
  },
  {
    name: 'Pai Rico Pai Pobre',
    cover: PaiRicoPaiPobreBook,
  },
  {
    name: 'Rápido e Devagar',
    cover: RapidoDevagarBook,
  },
]

export default function BookshelfPage() {
  return (
    <main className='w-full'>
      <Header
        title='Bookshelf'
        subtitle='Books and pieces of wisdom I&rsquo;ve enjoyed reading.'
      />

      <div className='grid w-full grid-cols-[repeat(2,_minmax(9.625rem,_1fr))] items-center gap-4 gap-y-6 pb-12 pt-16 mobile:grid-cols-[repeat(auto-fit,_minmax(13.375rem,_1fr))]'>
        {books.map((book, index) => (
          <Book
            key={index}
            name={book.name}
            cover={book.cover}
            className='w-full'
          />
        ))}
      </div>
    </main>
  )
}
