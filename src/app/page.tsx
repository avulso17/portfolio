export default function Home(): React.ReactElement {
  return (
    <main className='w-full'>
      <div className='relative flex flex-col gap-10'>
        <h1 className='w-fit'>
          <b>I&apos;m</b> Felipe Mateus
        </h1>

        <p className='max-w-[45.625rem] hero-text'>
          A front-end engineer and UI/UX designer helping startups turn their
          visions into a digital reality. I specialize in designing and building
          modern mobile and web-based apps.
        </p>

        <div className='flex w-fit items-center gap-4'>
          <button>See my resume</button>
          <button>Get in touch</button>
        </div>
      </div>
    </main>
  )
}
