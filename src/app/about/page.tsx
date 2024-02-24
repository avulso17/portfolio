'use client'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Portrait } from '@/components/Portrait'

import SendIcon from '../../../public/icons/send.svg'

const aboutStyles = tv({
  slots: {
    title: 'text-base font-semibold uppercase text-gray',
    text: 'w-full max-w-[37.75rem] text-lg leading-[158%] text-gray-dark',
  },
})

export default function AboutPage(): React.ReactElement {
  const { title, text } = aboutStyles.slots

  return (
    <main className='w-full pb-20'>
      <Header
        title='A little bit about me'
        subtitle='Who I am and what I do.'
      />

      <div className='flex justify-between pt-16'>
        <div className='flex w-full flex-col gap-8'>
          <div>
            <h2 className={title}>Who I am</h2>
            <p className={text}>
              I&rsquo;m <b className='text-white'>Felipe</b> a
              multi-disciplinary front-end engineer and UI/UX designer based in
              Uberlândia, Brazil 🇧🇷.
            </p>
          </div>

          <div>
            <h2 className={title}>What I Do</h2>
            <p className={text}>
              With two years of invaluable experience in my role at Harmony
              Technology &#8212; a tech company based here in Rabat, I have
              honed my skills in React.js, Next.js, TailwindCSS, and TypeScript,
              allowing me to craft seamless and interactive user experiences.
              During my time at Harmony Technology, I had the privilege of
              collaborating on projects for esteemed clients such as the
              Ministry of Health, Ministry of Education, and Ministry of
              Justice. It was an incredibly rewarding experience to develop
              applications that directly impact the lives of Moroccan citizens.
            </p>
          </div>

          <div>
            <h2 className={title}>What I Did</h2>
            <p className={text}>
              Before delving into the realm of front end engineering, I spent
              five years as a graphic designer. This background has equipped me
              with a keen eye for aesthetics and a deep understanding of
              user-centered design principles. It enables me to seamlessly blend
              functionality and visual appeal in every project I undertake.
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <Portrait src='/assets/me.jpg' square />
          <Button className='mt-20' icon={<SendIcon />}>
            Get in touch
          </Button>
        </div>
      </div>

      <p className={twMerge(text, 'my-16')}>
        Feel free to reach out via e-mail, or follow me on Twitter. Want to see
        where I&rsquo;ve worked? Check out my Resume, or Connect with me on
        LinkedIn.
      </p>

      <p className={twMerge(text, 'mb-4')}>
        Let&rsquo;s build something great,
      </p>

      <p>Felipe Mateus</p>
    </main>
  )
}
