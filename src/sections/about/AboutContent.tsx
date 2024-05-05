import { Button } from '@/components/Button'
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
        Feel free to reach out via e-mail, or follow me on Twitter. Want to see
        where I&rsquo;ve worked? Check out my Resume, or Connect with me on
        LinkedIn.
      </p>

      <p className={twMerge(text, 'mb-4')}>
        Let&rsquo;s build something great,
      </p>

      <p>Felipe Mateus</p>

      <Link href='/contact' className='wide:hidden'>
        <Button
          className='mx-auto mt-28 max-w-none tablet:max-w-[400px] '
          leftIcon={<SendIcon className='text-2xl' />}
          full
        >
          Get in touch
        </Button>
      </Link>
    </>
  )
}
