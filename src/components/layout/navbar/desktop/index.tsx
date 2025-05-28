import LogoSvg from '@/assets/Logo'
import GitHubIcon from '@/components/icons/GitHub'
import InstagramIcon from '@/components/icons/Instagram'
import LinkedInIcon from '@/components/icons/LinkedIn'
import { Button } from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import NavbarDesktopDropdownMenu from './NavbarDesktopDropdownMenu'

const iconButtonStyles = tv({
  base: [
    'flex h-11 w-11 items-center justify-center p-[0.625rem]',
    'cursor-pointer rounded-md text-2xl font-medium leading-normal text-gray-light',
    'transition-all ease-in-out hover:bg-white/10',
  ],
})

export type NavbarProps = React.ComponentProps<'nav'>

const NavbarDesktop: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav
      className={twMerge(
        'mb-44 hidden h-fit max-h-[3.75rem] w-full justify-between rounded-xl bg-onyx/30 p-4 backdrop-blur-sm mobile:flex',
        className
      )}
    >
      <div className='relative flex items-center gap-10'>
        <Link href='/' className='shrink-0'>
          <LogoSvg className='h-7 w-10 text-white transition-colors hover:text-gray-light' />
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
          href={SOCIAL_LINKS.instagram}
          className={iconButtonStyles()}
          target='_blank'
        >
          <InstagramIcon />
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
