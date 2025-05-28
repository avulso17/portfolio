import SendIcon from '@/components/icons/Send'
import { Button } from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/constants/social'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { tv } from 'tailwind-variants'
import AboutPortrait from './AboutPortrait'
import AboutResumeModal from './AboutResumeModal'

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
              a multidisciplinary front-end engineer based in Uberlândia, Brazil
              🇧🇷.
            </p>

            <p className={text}>
              I have always been a very curious and creative person, working
              with front-end today, for me, significantly expresses my passion
              for visual arts and technology.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className={title}>What I Do</h2>

            <p className={text}>
              Currently, I am a software developer specializing in front-end and
              UI, helping and contributing to startups transforming their dreams
              into technology.
            </p>

            <p className={text}>
              Some of my skills are: the ability to faithfully reproduce
              designs, vast knowledge about UI and responsive/mobile and
              building custom landing pages.
            </p>

            <p className={text}>
              I am enthusiastic about exploring new opportunities where I can
              collaborate with talented teams, tackle complex challenges, and
              contribute to building the next generation of innovative
              solutions.
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className={title}>What I Did</h2>

            <p className={text}>
              With four years of experience as a software developer, I had the
              privilege of contributing to innovative projects, where I acquired
              and improved my skills in:{' '}
              <b className='text-white font-inherit'>React.js</b>,{' '}
              <b className='text-white font-inherit'>Next.js</b>,{' '}
              <b className='text-white font-inherit'>TailwindCSS</b>,{' '}
              <b className='text-white font-inherit'>JavaScript</b> and{' '}
              <b className='text-white font-inherit'>TypeScript</b>, etc.
              Allowing me to craft seamless and interactive user experiences.
            </p>

            <p className={text}>
              Before specializing in front-end engineering, I worked in IT for
              five years. This experience provided me with comprehensive
              knowledge in various areas of technology, allowing me to:
            </p>

            <ul className={cn(text, 'list-inside list-disc')}>
              <li>Understand software development holistically;</li>
              <li>Identify more efficient solutions to complex challenges;</li>
              <li>
                Facilitate collaboration with other professionals and teams;
              </li>
              <li>Promote more effective communication;</li>
              <li>
                Adapt quickly to new technologies and changes in the
                technological landscape;
              </li>
            </ul>

            <p className={text}>
              This solid foundation prepared me to face challenges and seize
              opportunities in front-end engineering.
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

      <div className='my-16'>
        <span className={cn(text, 'inline-block')}>
          Feel free to reach out via{' '}
          <Link
            href={SOCIAL_LINKS.email}
            className='text-white underline font-inherit'
            target='_blank'
          >
            e-mail
          </Link>
          , or follow me on{' '}
          <Link
            href={SOCIAL_LINKS.x}
            className='text-white underline font-inherit'
            target='_blank'
          >
            X.
          </Link>{' '}
          Want to see where I&rsquo;ve worked? Check out my <AboutResumeModal />
          , or Connect with me on{' '}
          <Link
            href={SOCIAL_LINKS.linkedIn}
            className='text-white underline font-inherit'
            target='_blank'
          >
            LinkedIn
          </Link>
          .
        </span>
      </div>

      <p className={text}>Let&rsquo;s build something great,</p>

      <Image
        className='mt-4'
        src='/assets/white_signature.png'
        alt='Felipe Mateus'
        height={86}
        width={300}
      />

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
