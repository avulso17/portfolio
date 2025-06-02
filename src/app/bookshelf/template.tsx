import { Header } from '@/components/ui/Header'

const BookshelfTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main>
      <Header
        title='Bookshelf'
        subtitle='Books and pieces of wisdom I&rsquo;ve enjoyed reading.'
      />
      {children}
    </main>
  )
}

export default BookshelfTemplate
