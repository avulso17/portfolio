import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'
import AboutPortrait from './AboutPortrait'
import AboutResumeModal from './AboutResumeModal'

const Block: React.FC<{
  index: string
  label: string
  children: React.ReactNode
}> = ({ index, label, children }) => (
  <Reveal
    as='section'
    className='rule-t grid gap-6 py-10 wide:grid-cols-[16rem_1fr]'
  >
    <Eyebrow as='h2' index={index}>
      {label}
    </Eyebrow>
    <div className='flex max-w-[60ch] flex-col gap-4 text-lg leading-relaxed text-parchment-dim'>
      {children}
    </div>
  </Reveal>
)

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <b className='font-medium text-parchment'>{children}</b>
)

const AboutContent: React.FC = () => (
  <div className='flex flex-col gap-0 pb-20 wide:flex-row wide:gap-16'>
    <div className='order-2 grow wide:order-1'>
      <Block index='01' label='How I decide'>
        <p>
          I look at the product, the company and where the company is right now
          before I look at the code. Curious by default, critical on purpose,
          direct when it saves everyone time.
        </p>
        <p>
          Ten years in technology — <Strong>five years in IT</Strong>, then five
          on the front-end — taught me that the cheapest bug is the feature you
          cut early, and that the front-end is where the business finds out
          whether the roadmap was right.
        </p>
      </Block>

      <Block index='02' label='What I’ve shipped'>
        <p>
          Front-end foundations for early-stage startups, usually from zero and
          usually next to the founder: <Strong>Pigmo</Strong> from the first
          commit (2023 — present), the <Strong>Zeus Agrotech</Strong> portal
          rebuilt out of a legacy app, and the <Strong>Equals9</Strong> apps
          where I started as a developer.
        </p>
        <p>
          React, Next.js, TypeScript and Tailwind are the tools. The deliverable
          is a product that moves a number — the full list, with the call and
          the result on each, is on the{' '}
          <Link
            href='/projects'
            className='text-parchment underline underline-offset-4'
          >
            projects page
          </Link>
          .
        </p>
      </Block>

      <Block index='03' label='Where I’m useful'>
        <p>
          Early-stage teams that need the front-end done right the first time,
          roadmaps that need someone to push back, and interfaces that have to
          convert rather than just render.
        </p>
        <div>
          Based in <Strong>Uberlândia, Brazil</Strong>, working with teams
          anywhere. My résumé is one click away: <AboutResumeModal />. Or reach
          me on{' '}
          <Link
            href={SOCIAL_LINKS.linkedIn}
            target='_blank'
            className='text-parchment underline underline-offset-4'
          >
            LinkedIn
          </Link>
          .
        </div>
      </Block>
    </div>

    <div className='order-1 flex flex-col gap-8 pt-10 wide:order-2 wide:w-[22rem] wide:shrink-0'>
      <AboutPortrait />
      <Link href='/contact' className='w-full'>
        <Button full>Tell me what&rsquo;s stuck</Button>
      </Link>
    </div>
  </div>
)

export default AboutContent
