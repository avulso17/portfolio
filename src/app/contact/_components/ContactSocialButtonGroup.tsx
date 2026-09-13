import DiscordIcon from '@/components/icons/Discord'
import GitHubIcon from '@/components/icons/GitHub'
import InstagramIcon from '@/components/icons/Instagram'
import LinkedInIcon from '@/components/icons/LinkedIn'
import TwitterIcon from '@/components/icons/Twitter'
import YouTubeIcon from '@/components/icons/YouTube'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'

type SocialButtonProps = React.ComponentProps<'a'>

const SocialButton: React.FC<SocialButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link
      href={href ?? '/'}
      className='w-fit text-parchment-dim transition-colors hover:text-parchment'
      {...props}
    >
      {children}
    </Link>
  )
}

const ContactSocialButtonGroup: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-6'>
      <SocialButton href={SOCIAL_LINKS.youTube} aria-label='YouTube'>
        <YouTubeIcon className='text-2xl' />
      </SocialButton>

      <SocialButton href={SOCIAL_LINKS.linkedIn} aria-label='LinkedIn'>
        <LinkedInIcon className='text-2xl' />
      </SocialButton>

      <SocialButton href={SOCIAL_LINKS.instagram} aria-label='Instagram'>
        <InstagramIcon className='text-2xl' />
      </SocialButton>

      <SocialButton href={SOCIAL_LINKS.x} target='_blank' aria-label='X'>
        <TwitterIcon className='text-2xl' />
      </SocialButton>

      <SocialButton
        href={SOCIAL_LINKS.github}
        target='_blank'
        aria-label='GitHub'
      >
        <GitHubIcon className='text-2xl' />
      </SocialButton>

      <SocialButton
        href={SOCIAL_LINKS.discord}
        target='_blank'
        aria-label='Discord'
      >
        <DiscordIcon className='text-2xl' />
      </SocialButton>
    </div>
  )
}

export default ContactSocialButtonGroup
