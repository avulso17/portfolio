import Link from 'next/link'

import { Button } from '@/components/Button'
import { Portrait } from '@/components/Portrait'
import { ProjectCard } from '@/components/ProjectCards'
import { Widget } from '@/components/Widgets'
import SendIcon from '@/icons/Send'

export default function Home() {
  return (
    <main className='w-full'>
      <div className='relative z-0 mb-[8.5rem] flex w-full flex-col pt-14 mobile:mb-[20.625rem] mobile:gap-10 mobile:pt-0'>
        <h1 className='mb-4 w-fit whitespace-nowrap font-extrabold mobile:mb-0'>
          <b className='block mobile:hidden'>Hi 👋🏻</b>
          <b>I&rsquo;m</b> Felipe M
          <p className='hidden font-extrabold text-inherit font-inherit tablet:inline-block'>
            ateus
          </p>
        </h1>

        <p className='mb-14 w-full max-w-[45.625rem] font-medium !leading-5 !text-gray-dark hero-text mobile:mb-0 mobile:!leading-[2rem]'>
          A front-end engineer and UI/UX designer helping startups turn their
          visions into a digital reality. I specialize in designing and building
          modern mobile and web-based apps.
        </p>

        <div className='flex flex-col gap-4 mobile:flex-row mobile:items-center'>
          <Link href='/about'>
            <Button className='w-full mobile:w-fit'>See my resume</Button>
          </Link>
          <Link href='/contact'>
            <Button className='w-full mobile:w-fit' variant='secondary'>
              Get in touch
            </Button>
          </Link>
        </div>

        <Portrait
          src='/assets/me.jpg'
          className='absolute -top-10 left-[570px] -z-10 hidden wide:flex'
          inverted
        />
      </div>

      <h2 className='mb-8 header'>Selected Work</h2>
      <div className='mb-24 flex flex-col gap-8'>
        {/* <ProjectCard
          iconSrc='/logos/logo.svg'
          imgSrc='/assets/pigmo-screenshot.png'
          title='Flow.ai - AI Photo Generator'
          href='https://flow-ai-oficial.vercel.app/'
          description='This project aims to generate AI photos in a friendly and modern interface, where the user can take control of the jobs generated and store his most beautiful works of art. I had the idea to do it because I really appreciate Midjourney and it would be a good experience to integrate an AI into a project, where I can generate and manage my arts in a more intuitive and user friendly.'
        /> */}
        <ProjectCard
          iconSrc='/apps/redux-store-icon.svg'
          imgSrc='/assets/redux-store-screenshot.png'
          title='Redux Store'
          href='https://redux-store-oficial.vercel.app/'
          description='This project is a simple store that uses Redux to manage the state of the application. I had the idea to do it because I really appreciate Redux and it would be a good experience to integrate it into a project, where I can manage the state of my store in a more intuitive and user friendly.'
        />
        <ProjectCard
          iconSrc='/apps/pigmo-icon.svg'
          imgSrc='/assets/pigmo-screenshot.png'
          title='Pigmo - Casino Online'
          href='https://app.pigmo.com/'
          description='Pigmo is a casino online that offers a wide range of games, including slots, table games, and live casino. I was responsible for the development of the website, which was built with Next.js and ChakraUI. I also worked on the integration of the payment gateway and the implementation of the affiliate/rewards system. The website is fully responsive and optimized for SEO.'
        />
      </div>

      <h2 className='mb-8 header'>Get to know me</h2>
      <div className='mb-[6.75rem] flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-4 tablet:flex-row'>
          <Widget
            title='About me'
            subtitle='Who I am and what I do'
            imgSrc='/assets/about-me.png'
            imgClassName='object-contain mobile:object-cover'
          />
          <Widget
            title='Notebook'
            subtitle='My thoughts, insights, and reflections'
            imgSrc='/assets/notebook.png'
            imgClassName='object-contain mobile:object-cover'
          />
        </div>

        <div className='flex flex-col items-center gap-4 tablet:flex-row'>
          <Widget
            title='Bookshelf'
            subtitle="Books and pieces of wisdom I've enjoyed reading"
            imgSrc='/assets/bookshelf.png'
            imgClassName='object-cover'
          />
          <Widget
            title='Tech Stack'
            subtitle='The dev tools, apps, devices, and games I use and play.'
            imgSrc='/assets/tech-stack.png'
            imgClassName='object-cover object-left'
          />
        </div>
      </div>

      <div className='mb-28 flex flex-col items-center justify-between gap-8 tablet:flex-row tablet:gap-0'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-center header tablet:text-start'>
            Let&rsquo;s work together
          </h2>
          <p className='w-full text-center header-text tablet:max-w-[31rem] tablet:text-start'>
            Want to discuss an opportunity to create something great? I&rsquo;m
            ready when you are.
          </p>
        </div>

        <Link href='/contact' className='w-full mobile:w-fit'>
          <Button leftIcon={<SendIcon />} width='full'>
            Get in touch
          </Button>
        </Link>
      </div>
    </main>
  )
}
