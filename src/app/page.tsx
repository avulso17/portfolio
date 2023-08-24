'use client'
import Link from 'next/link'

import { Button } from '@/UI/components/button'
import { Portrait } from '@/UI/components/portrait'
import { ProjectCard } from '@/UI/components/projectCards'
import { Widget } from '@/UI/components/widgets'

import SendIcon from '../../public/icons/send.svg'

export default function Home(): React.ReactElement {
  return (
    <main className='w-full'>
      <div className='relative z-0 mb-[8.5rem] flex w-full flex-col pt-24 mobile:mb-[23.375rem] mobile:gap-10 mobile:pt-0'>
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
        <ProjectCard
          href='https://flow-ai-oficial.vercel.app/'
          iconSrc='/logos/logo.svg'
          title='Flow.ai - AI Photo Generator'
          description='This project aims to generate AI photos in a friendly and modern interface, where the user can take control of the jobs generated and store his most beautiful works of art. I had the idea to do it because I really appreciate Midjourney and it would be a good experience to integrate an AI into a project, where I can generate and manage my arts in a more intuitive and user friendly.'
        />
        <ProjectCard
          href='https://react.dev/'
          iconSrc='/apps/react-icon.svg'
          title='React Documentation'
          description='With the release of the new React website on March 16, there was a need for localization to make the documentation accessible to Arabic-speaking developers. I contributed to translating several documentation, worked with great developers, Improved my ability to write better PR requests, and as a side effect, I now know more about the Arabic grammar.'
        />
        <ProjectCard
          href='https://nextjs.org/'
          iconSrc='/apps/storybook-icon.svg'
          title='Storybook Documentation'
          description='This was my very first OSS contribution, I contributed to translating the documentation of Storybook into Arabic, enabling a wider audience to access and understand the resources available. I gained valuable experience in working effectively with teams and navigating the pull request process.'
        />
      </div>

      <h2 className='mb-8 header'>Get to know me</h2>
      <div className='mb-[6.75rem] flex flex-wrap gap-4'>
        <Widget
          title='About me'
          subtitle='Who I am and what I do'
          image='/assets/memoji_1.webp'
          className='top-[16%] h-auto w-[35%] absolute-center-x wide:top-14 wide:w-44'
        />
        <Widget
          title='Notebook'
          subtitle='My thoughts, insights, and reflections'
          image='/assets/desknotes.svg'
          className='top-[10%] h-auto max-h-[29rem] w-[60%] absolute-center-x wide:top-8 wide:w-[19rem]'
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
          <Button icon={<SendIcon />} className='w-full'>
            Get in touch
          </Button>
        </Link>
      </div>
    </main>
  )
}
