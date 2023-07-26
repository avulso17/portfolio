import Dialog from '@/UI/components/dialog'
import Separator from '@/UI/components/separator'

const ModalContent = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 text-white'>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam libero
        ipsa, laboriosam doloremque error quam culpa quibusdam cum facilis
        repudiandae, perspiciatis necessitatibus iusto vitae veritatis qui
        cupiditate facere! Odio, consequatur?
      </p>

      <div className='rounded-lg p-2 bg-fill-300'>
        <small>Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam libero
        ipsa, laboriosam doloremque error quam culpa quibusdam cum facilis
        repudiandae, perspiciatis necessitatibus iusto vitae veritatis qui
        cupiditate facere! Odio, consequatur?
      </p>
    </div>
  )
}

const FooterContent = (): JSX.Element => {
  return (
    <div className='flex justify-end gap-2 px-5 pb-5'>
      <button className='rounded-md bg-primary p-2 hover:bg-highlight'>
        Save
      </button>

      <button className='rounded-md bg-primary p-2 hover:bg-highlight'>
        Cancel
      </button>
    </div>
  )
}

export default function Home(): JSX.Element {
  return (
    <main className='flex h-full flex-col items-start justify-normal gap-4 rounded-3xl backdrop-blur-xl bg-material-100'>
      <Dialog
        close
        title='Informaçoes de segurança'
        // description='As informaçoes de segurança vao te ajudar a manter sua conta segura.'
        content={<ModalContent />}
        // footer={<FooterContent />}
      >
        <button className='rounded bg-primary p-2 hover:bg-highlight'>
          Edit profile
        </button>
      </Dialog>
    </main>
  )
}
