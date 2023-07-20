import Dialog from '@/UI/components/dialog'

export default function Home(): JSX.Element {
  return (
    <main>
      <h1>Flow.ai</h1>

      <div className='group mx-auto w-fit cursor-pointer select-none rounded-lg bg-white p-4 text-black hover:bg-primary'>
        <h2 className='group-hover:text-white'>New project</h2>

        <p className='group-hover:text-white'>
          Create a new project from a variety of starting templates.
        </p>
      </div>

      <Dialog close content={<div className='text-black'>alo</div>}>
        <button className='rounded bg-primary p-2 hover:bg-highlight'>
          Edit profile
        </button>
      </Dialog>
    </main>
  )
}
