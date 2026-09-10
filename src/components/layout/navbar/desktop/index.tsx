import ExLibris from '@/assets/ExLibris'
import GitHubIcon from '@/components/icons/GitHub'
import LinkedInIcon from '@/components/icons/LinkedIn'
import YouTubeIcon from '@/components/icons/YouTube'
import { Button } from '@/components/ui/Button'
import { NAV_PRIMARY } from '@/configs/navigation'
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
      aria-label='Primary'
      className={twMerge(
        'rule-b hidden h-fit w-full items-center justify-between py-4 mobile:flex',
        className
      )}
    >
      <div className='relative flex items-center gap-10'>
        <Link href='/' className='shrink-0' aria-label='Home'>
          <ExLibris
            mark='monogram'
            className='h-8 w-auto text-parchment transition-colors hover:text-parchment-dim'
          />
        </Link>

        {NAV_PRIMARY.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={label === 'Contact' ? 'hidden tablet:block' : undefined}
          >
            <Button variant='text'>{label}</Button>
          </Link>
        ))}

        <NavbarDesktopDropdownMenu />
      </div>

      <div className='flex items-center gap-2'>
        <Link
          href={SOCIAL_LINKS.linkedIn}
          className={iconButtonStyles()}
          target='_blank'
          aria-label='LinkedIn'
        >
          <LinkedInIcon />
        </Link>
        <Link
          href={SOCIAL_LINKS.youTube}
          className={iconButtonStyles()}
          target='_blank'
          aria-label='YouTube'
        >
          <YouTubeIcon />
        </Link>
        <Link
          href={SOCIAL_LINKS.github}
          className={iconButtonStyles()}
          target='_blank'
          aria-label='GitHub'
        >
          <GitHubIcon />
        </Link>
      </div>
    </nav>
  )
}

export default NavbarDesktop
