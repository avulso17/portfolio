import { Button } from '@/UI/components/button'
import Dialog from '@/UI/components/dialog'

const ModalContent = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 text-white'>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam libero
        ipsa, laboriosam doloremque error quam culpa quibusdam cum facilis
        repudiandae, perspiciatis necessitatibus iusto vitae veritatis qui
        cupiditate facere! Odio, consequatur?
      </p>

      <div className='rounded-lg p-2 material-fill-300'>
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

// const FooterContent = (): JSX.Element => {
//   return (
//     <div className='flex justify-end gap-2 px-5 pb-5'>
//       <Button>Save</Button>

//       <Button>Cancel</Button>
//     </div>
//   )
// }

export default function Home(): JSX.Element {
  return (
    <main className=''>
      {/* <Dialog
        close
        title='Informaçoes de segurança'
        // description='As informaçoes de segurança vao te ajudar a manter sua conta segura.'
        content={<ModalContent />}
        // footer={<FooterContent />}
      >
        <Button>Open Dialog</Button>
      </Dialog> */}
    </main>
  )
}
