import ExLibris from '@/assets/ExLibris'
import GitHubIcon from '@/components/icons/GitHub'
import LinkedInIcon from '@/components/icons/LinkedIn'
import YouTubeIcon from '@/components/icons/YouTube'
import { Button } from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import NavbarDesktopDropdownMenu from './NavbarDesktopDropdownMenu'

const iconButtonStyles = tv({
  base: [
    'flex h-10 w-10 items-center justify-center',
    'cursor-pointer rounded-sm text-xl text-parchment-dim',
    'transition-colors hover:bg-ink-2 hover:text-parchment',
  ],
})

export type NavbarProps = React.ComponentProps<'nav'>

const NavbarDesktop: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav
      className={twMerge(
        'mb-44 hidden h-fit w-full items-center justify-between border-b border-line py-4 mobile:flex',
        className
      )}
    >
      <div className='relative flex items-center gap-10'>
        <Link href='/' className='shrink-0'>
          <ExLibris
            mark='monogram'
            aria-label='Felipe Mateus'
            className='h-7 w-7 text-parchment transition-colors hover:text-parchment-dim'
          />
        </Link>

        <Link href='/about'>
          <Button variant='text'>About</Button>
        </Link>

        <Link href='/projects'>
          <Button variant='text'>Projects</Button>
        </Link>

        <Link href='/contact' className='hidden tablet:block'>
          <Button variant='text'>Contact</Button>
        </Link>

        <NavbarDesktopDropdownMenu />
      </div>

      <div className='flex items-center gap-2'>
        <Link
          href={SOCIAL_LINKS.linkedIn}
          className={iconButtonStyles()}
          target='_blank'
        >
          <LinkedInIcon />
        </Link>
        <Link
          href={SOCIAL_LINKS.youTube}
          className={iconButtonStyles()}
          target='_blank'
        >
          <YouTubeIcon />
        </Link>
        <Link
          href={SOCIAL_LINKS.github}
          className={iconButtonStyles()}
          target='_blank'
        >
          <GitHubIcon />
        </Link>

        {/* <Separator orientation='vertical' className='mx-1 opacity-25' /> */}

        {/* <ChangeLocaleMenu /> */}
      </div>
    </nav>
  )
}

export default NavbarDesktop
