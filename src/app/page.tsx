'use client'
import { Button } from '@/UI/components/button'
import { ProjectCard } from '@/UI/components/projectCards'
import { Widget } from '@/UI/components/widgets'

import SendIcon from '../../public/icons/send.svg'

export default function Home(): React.ReactElement {
  return (
    <main className='w-full'>
      <div className='relative mb-[23.375rem] flex w-full flex-col gap-10'>
        <h1 className='w-fit'>
          <b>I&rsquo;m</b> Felipe Mateus
        </h1>

        <p className='w-full max-w-[45.625rem] hero-text'>
          A front-end engineer and UI/UX designer helping startups turn their
          visions into a digital reality. I specialize in designing and building
          modern mobile and web-based apps.
        </p>

        <div className='flex w-fit items-center gap-4'>
          <Button>See my resume</Button>
          <Button variant='secondary'>Get in touch</Button>
        </div>
      </div>

      <h2 className='mb-8 header'>Selected Work</h2>
      <div className='mb-24 flex flex-col gap-8'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>

      <h2 className='mb-8 header'>Get to know me</h2>
      <div className='mb-[6.75rem] flex flex-wrap gap-4'>
        <Widget
          title='About me'
          subtitle='Who I am and what I do'
          image='/assets/memoji_1.webp'
          className='top-14 h-auto w-44 absolute-center-x'
        />
        <Widget
          title='Notebook'
          subtitle='My thoughts, insights, and reflections'
          image='/assets/desknotes.svg'
          className='top-8 h-[29rem] w-[19rem] absolute-center-x'
        />
        <Widget
          title='Bookshelf'
          subtitle="Books and pieces of wisdom I've enjoyed reading"
        />
        <Widget
          title='Tech Stack'
          subtitle='The dev tools, apps, devices, and games I use and play.'
        />
      </div>

      <div className='mb-28 flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='header'>Let&rsquo;s work together</h2>
          <p className='w-full max-w-[31rem] header-text'>
            Want to discuss an opportunity to create something great? I&rsquo;m
            ready when you are.
          </p>
        </div>

        <Button id='get-in-touch-button' icon={<SendIcon />}>
          Get in touch
        </Button>
      </div>
    </main>
  )
}
