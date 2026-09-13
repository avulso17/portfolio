import { PageHero } from '@/components/ui/PageHero'

const BookshelfTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main>
      <PageHero
        index='03'
        label='Bookshelf'
        title='What I read.'
        subtitle='Books that changed how I decide.'
        scene='bookshelf-library'
      />
      {children}
    </main>
  )
}

export default BookshelfTemplate
