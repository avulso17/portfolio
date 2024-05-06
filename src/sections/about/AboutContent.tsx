import { Button } from '@/components/Button'
import { EMAIL_PATH, LINKEDIN_PATH, TWITTER_PATH } from '@/env/social'
import SendIcon from '@/icons/Send'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import AboutPortrait from './AboutPortrait'

const aboutStyles = tv({
  slots: {
    title: 'text-base font-semibold uppercase text-gray',
    text: 'w-full text-lg leading-[158%] text-gray-dark wide:max-w-[37.75rem]',
  },
})

export default function AboutContent() {
  const { title, text } = aboutStyles.slots

  return (
    <>
      <div className='flex flex-col justify-between pt-16 wide:flex-row'>
        <div className='order-2 flex w-full flex-col gap-8 pr-4 wide:order-1'>
          <div className='flex flex-col gap-2'>
            <h2 className={title}>Who I am</h2>
            <p className={text}>
              I&rsquo;m <b className='text-white font-inherit'>Felipe Mateus</b>{' '}
              a multi-disciplinary Software Engineer and Front-end Software
              Developer based in Uberlândia, Brazil 🇧🇷.
            </p>

            <p className={text}>
              I am an ambitious person passionate about challenges and my goal
              in life is to change lives, whether with a good action, advice,
              good work or delivering personalized solutions for your
              business/company.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className={title}>What I Do</h2>
            <p className={text}>
              With three years of experience as a software engineer, I&rsquo;ve
              had the privilege of contributing to groundbreaking projects in
              the tech industry.
            </p>

            <p className={text}>
              Throughout my experience, I had the opportunity to work in
              startups with innovative ideas, where I could acquire and improve
              my skills in <b className='text-white font-inherit'>React.js</b>,{' '}
              <b className='text-white font-inherit'>Next.js</b>,{' '}
              <b className='text-white font-inherit'>TailwindCSS</b>,{' '}
              <b className='text-white font-inherit'>JavaScript</b> and{' '}
              <b className='text-white font-inherit'>TypeScript</b>, allowing me
              to craft seamless and interactive user experiences.
            </p>

            <p className={text}>
              Looking ahead, I am driven by the desire to continue pushing
              boundaries and leveraging technology to create meaningful impact.
              I am enthusiastic about exploring new opportunities where I can
              collaborate with talented teams, tackle complex challenges, and
              contribute to building the next generation of innovative
              solutions.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className={title}>What I Did</h2>
            <p className={text}>
              Before delving into front-end engineering, I spent five years in
              IT. This experience gave me broad knowledge of different areas of
              technology, providing me with a holistic understanding of software
              development, allowing me to identify more efficient solutions,
              helping to deal with complex challenges, facilitating
              collaboration with other professionals and teams, promoting more
              efficient communication and preparing myself to adapt to new
              technologies and changes in the technological scenario.
            </p>
          </div>
        </div>

        <div className='order-1 mb-16 flex flex-col wide:order-2 wide:mb-0 wide:items-center'>
          <AboutPortrait />

          <Link href='/contact' className='hidden wide:block'>
            <Button className='mt-20' leftIcon={<SendIcon />}>
              Get in touch
            </Button>
          </Link>
        </div>
      </div>

      <p className={twMerge(text, 'my-16')}>
        Feel free to reach out via{' '}
        <Link
          href={EMAIL_PATH}
          className='text-white underline font-inherit'
          target='_blank'
        >
          e-mail
        </Link>
        , or follow me on{' '}
        <Link
          href={TWITTER_PATH}
          className='text-white underline font-inherit'
          target='_blank'
        >
          Twitter.
        </Link>{' '}
        Want to see where I&rsquo;ve worked? Check out my Resume, or Connect
        with me on{' '}
        <Link
          href={LINKEDIN_PATH}
          className='text-white underline font-inherit'
          target='_blank'
        >
          LinkedIn
        </Link>
        .
      </p>

      <p className={twMerge(text, 'mb-4')}>
        Let&rsquo;s build something great,
      </p>

      <p>Felipe Mateus</p>

      <Link href='/contact' className='wide:hidden'>
        <Button
          className='mt-28 max-w-none tablet:max-w-[400px] '
          leftIcon={<SendIcon className='text-2xl' />}
          full
        >
          Get in touch
        </Button>
      </Link>
    </>
  )
}
