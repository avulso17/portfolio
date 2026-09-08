import ExLibris from '@/assets/ExLibris'
import Separator from '@/components/ui/Separator'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SOCIAL_LINKS } from '@/constants/social'
import FooterLinkButton from './FooterLinkButton'

const Footer: React.FC = () => {
  return (
    <footer
      id='footer'
      className='relative flex w-full flex-col-reverse justify-between gap-12 py-8 tablet:flex-row tablet:gap-0 tablet:pb-10 tablet:pt-[4.625rem]'
    >
      <Separator alpha screen />

      <div className='flex flex-col gap-4'>
        <ExLibris
          mark='seal'
          aria-label='Felipe Mateus ex-libris'
          className='h-16 w-16 text-parchment'
        />
        <p className='font-serif text-xl italic text-parchment-dim'>
          Thanks for stopping by ッ
        </p>

        <small className='mt-auto select-none font-mono text-xs uppercase tracking-[0.08em] text-parchment-mute'>
          &#169; 2025 Felipe Mateus. All Rights Reserved.
        </small>
      </div>

      <div className='flex flex-col gap-10 tablet:flex-row tablet:gap-28'>
        <div className='flex w-fit flex-col gap-1'>
          <Eyebrow className='mb-4'>Links</Eyebrow>
          <FooterLinkButton href='/about' label='About'>
            About
          </FooterLinkButton>
          <FooterLinkButton href='/projects' label='Projects'>
            Projects
          </FooterLinkButton>
          <FooterLinkButton href='/tech-stack' label='Tech Stack'>
            Tech Stack
          </FooterLinkButton>
          <FooterLinkButton href='/bookshelf' label='Bookshelf'>
            Bookshelf
          </FooterLinkButton>
          <FooterLinkButton href='/notebook' label='Notebook'>
            Notebook
          </FooterLinkButton>
          <FooterLinkButton href='/contact' label='Contact'>
            Contact
          </FooterLinkButton>
        </div>

        <div className='flex flex-col gap-1'>
          <Eyebrow className='mb-4'>Elsewhere</Eyebrow>
          <FooterLinkButton
            href={SOCIAL_LINKS.email}
            label='Email'
            target='_blank'
          >
            Email
          </FooterLinkButton>
          <FooterLinkButton
            href={SOCIAL_LINKS.linkedIn}
            label='LinkedIn'
            target='_blank'
          >
            LinkedIn
          </FooterLinkButton>
          <FooterLinkButton
            href={SOCIAL_LINKS.github}
            label='GitHub'
            target='_blank'
          >
            GitHub
          </FooterLinkButton>
          <FooterLinkButton href={SOCIAL_LINKS.x} label='X' target='_blank'>
            X
          </FooterLinkButton>
          <FooterLinkButton
            href={SOCIAL_LINKS.discord}
            label='Discord'
            target='_blank'
          >
            Discord
          </FooterLinkButton>
          <FooterLinkButton
            href={SOCIAL_LINKS.youTube}
            label='YouTube'
            target='_blank'
          >
            YouTube
          </FooterLinkButton>
        </div>
      </div>
    </footer>
  )
}

export default Footer
