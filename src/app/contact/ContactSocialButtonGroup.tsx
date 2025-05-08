import { SOCIAL_LINKS } from '@/constants/social'
import DiscordIcon from '@/icons/Discord'
import GitHubIcon from '@/icons/GitHub'
import InstagramIcon from '@/icons/Instagram'
import LinkedInIcon from '@/icons/LinkedIn'
import MessageFillIcon from '@/icons/MessageFill'
import TwitterIcon from '@/icons/Twitter'
import Link from 'next/link'

type SocialButtonProps = React.ComponentProps<'a'>

function SocialButton({ href, children, ...props }: SocialButtonProps) {
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

export default function ContactSocialButtonGroup() {
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
