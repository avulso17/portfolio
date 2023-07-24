import Dialog from '@/UI/components/dialog'
import Separator from '@/UI/components/separator'

const ModalContent = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 text-white'>
      {/* <h2>Dialog Title</h2> */}

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

export default function Home(): JSX.Element {
  return (
    <main className='min-h-screen py-8 bg-tile-4'>
      <div className='group mx-auto w-fit cursor-pointer select-none rounded-xl bg-white p-4 text-black transition-colors hover:bg-primary'>
        <h2 className='group-hover:text-white'>New project - Flow.ai</h2>

        <p className='mt-1 group-hover:text-white'>
          Create a new project from a variety of starting templates.
        </p>

        <Separator alpha className='my-2' />

        <p className='group-hover:text-white'>
          Create a new project from a variety of starting templates.
        </p>
      </div>

      <Dialog
        close
        // title='Dialog Title'
        // description='lorem ipsum dolor sit amet consectetur adipisicing elit.'
        content={<ModalContent />}
      >
        <button className='rounded bg-primary p-2 hover:bg-highlight'>
          Edit profile
        </button>
      </Dialog>
    </main>
  )
}
