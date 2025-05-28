import DiscordIcon from '@/components/icons/Discord'
import GitHubIcon from '@/components/icons/GitHub'
import InstagramIcon from '@/components/icons/Instagram'
import LinkedInIcon from '@/components/icons/LinkedIn'
import MessageFillIcon from '@/components/icons/MessageFill'
import TwitterIcon from '@/components/icons/Twitter'
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
      className='w-fit text-gray-dark transition-colors hover:text-white'
      {...props}
    >
      {children}
    </Link>
  )
}

const ContactSocialButtonGroup: React.FC = () => {
  return (
    <div className='mx-auto mt-16 flex w-fit max-w-[12.75rem] flex-wrap items-center gap-y-11 px-4 mobile:max-w-none mobile:gap-x-11'>
      <div className='flex w-fit items-center gap-11'>
        <SocialButton href={SOCIAL_LINKS.email}>
          <MessageFillIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={SOCIAL_LINKS.linkedIn}>
          <LinkedInIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={SOCIAL_LINKS.instagram}>
          <InstagramIcon className='text-3xl' />
        </SocialButton>
      </div>

      <div className='flex w-fit items-center gap-11'>
        <SocialButton href={SOCIAL_LINKS.x} target='_blank'>
          <TwitterIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={SOCIAL_LINKS.github} target='_blank'>
          <GitHubIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={SOCIAL_LINKS.discord} target='_blank'>
          <DiscordIcon className='text-3xl' />
        </SocialButton>
      </div>
    </div>
  )
}

export default ContactSocialButtonGroup
