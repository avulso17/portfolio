import ExLibris from '@/assets/ExLibris'
import Separator from '@/components/ui/Separator'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { AVULSO_SINCE, NAV_ALL, SIGN_OFF } from '@/configs/navigation'
import { SOCIAL_LINKS } from '@/constants/social'
import FooterLinkButton from './FooterLinkButton'

const elsewhere = [
  { href: SOCIAL_LINKS.email, label: 'Email' },
  { href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.x, label: 'X' },
  { href: SOCIAL_LINKS.discord, label: 'Discord' },
  { href: SOCIAL_LINKS.youTube, label: 'YouTube' },
]

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      id='footer'
      className='relative flex w-full flex-col-reverse justify-between gap-12 py-8 tablet:flex-row tablet:gap-0 tablet:pb-10 tablet:pt-[4.625rem]'
    >
      <Separator screen />

      <div className='flex flex-col gap-4'>
        <ExLibris
          mark='halo'
          aria-label='Felipe Mateus ex-libris'
          className='h-16 w-16 text-parchment'
        />
        <p className='font-serif text-xl italic text-parchment-dim'>
          {SIGN_OFF}
        </p>

        <div className='mt-auto flex select-none flex-col gap-1 text-parchment-dim eyebrow-text'>
          <small className='font-inherit'>{`© ${year} Felipe Mateus`}</small>
          <small className='normal-case font-inherit'>{`// avulso, since ${AVULSO_SINCE}`}</small>
        </div>
      </div>

      <div className='flex flex-col gap-10 tablet:flex-row tablet:gap-28'>
        <nav aria-label='Footer' className='flex w-fit flex-col gap-1'>
          <Eyebrow className='mb-4'>Links</Eyebrow>
          {NAV_ALL.map(({ href, label }) => (
            <FooterLinkButton key={href} href={href} label={label}>
              {label}
            </FooterLinkButton>
          ))}
        </nav>

        <div className='flex flex-col gap-1'>
          <Eyebrow className='mb-4'>Elsewhere</Eyebrow>
          {elsewhere.map(({ href, label }) => (
            <FooterLinkButton
              key={label}
              href={href}
              label={label}
              target='_blank'
            >
              {label}
            </FooterLinkButton>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
