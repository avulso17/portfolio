import Link from 'next/link'

import {
  DISCORD_PATH,
  EMAIL_PATH,
  GITHUB_PATH,
  INSTAGRAM_PATH,
  LINKEDIN_PATH,
  TWITTER_PATH,
} from '@/env/social'

import DiscordIcon from '@/icons/Discord'
import GitHubIcon from '@/icons/GitHub'
import InstagramIcon from '@/icons/Instagram'
import LinkedInIcon from '@/icons/LinkedIn'
import MessageFillIcon from '@/icons/MessageFill'
import TwitterIcon from '@/icons/Twitter'

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
        <SocialButton href={EMAIL_PATH}>
          <MessageFillIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={LINKEDIN_PATH}>
          <LinkedInIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={INSTAGRAM_PATH}>
          <InstagramIcon className='text-3xl' />
        </SocialButton>
      </div>

      <div className='flex w-fit items-center gap-11'>
        <SocialButton href={TWITTER_PATH} target='_blank'>
          <TwitterIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={GITHUB_PATH} target='_blank'>
          <GitHubIcon className='text-3xl' />
        </SocialButton>

        <SocialButton href={DISCORD_PATH} target='_blank'>
          <DiscordIcon className='text-3xl' />
        </SocialButton>
      </div>
    </div>
  )
}
