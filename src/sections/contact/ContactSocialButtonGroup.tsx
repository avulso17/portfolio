import {
  DISCORD_PATH,
  GITHUB_PATH,
  INSTAGRAM_PATH,
  LINKEDIN_PATH,
  TWITTER_PATH,
} from '@/env/social'
import DiscordIcon from '@/icons/Discord'
import GitHubIcon from '@/icons/GitHub'
import InstagramIcon from '@/icons/Instagram'
import LinkedInIcon from '@/icons/LinkedIn'
import TwitterIcon from '@/icons/Twitter'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: ['w-fit text-gray-dark transition-colors hover:text-white'],
})

export default function ContactSocialButtonGroup() {
  return (
    <div className='mx-auto mt-16 flex w-fit max-w-[12.75rem] flex-wrap items-center gap-y-11 px-4 mobile:max-w-none mobile:gap-x-11'>
      <div className='flex w-fit items-center gap-11'>
        <Link href={LINKEDIN_PATH} className={buttonStyles()}>
          <LinkedInIcon className='text-3xl' />
        </Link>

        <Link href={INSTAGRAM_PATH} className={buttonStyles()}>
          <InstagramIcon className='text-3xl' />
        </Link>
      </div>

      <div className='flex w-fit items-center gap-11'>
        <Link href={TWITTER_PATH} target='_blank' className={buttonStyles()}>
          <TwitterIcon className='text-3xl' />
        </Link>

        <Link href={GITHUB_PATH} target='_blank' className={buttonStyles()}>
          <GitHubIcon className='text-3xl' />
        </Link>

        <Link href={DISCORD_PATH} target='_blank' className={buttonStyles()}>
          <DiscordIcon className='text-3xl' />
        </Link>
      </div>
    </div>
  )
}
