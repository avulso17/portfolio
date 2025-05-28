import BagFillIcon from '@/components/icons/BagFill'
import GitHubIcon from '@/components/icons/GitHub'
import HomeIcon from '@/components/icons/Home'
import InstagramIcon from '@/components/icons/Instagram'
import LinkedInIcon from '@/components/icons/LinkedIn'
import MessageFillIcon from '@/components/icons/MessageFill'
import PenFillIcon from '@/components/icons/PenFill'
import UserFillIcon from '@/components/icons/UserFill'
import { SOCIAL_LINKS } from '@/constants/social'

export const navigation = {
  routes: [
    {
      name: 'Home',
      path: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'About',
      path: '/about',
      icon: <UserFillIcon />,
    },
    {
      name: 'Work',
      path: '/work',
      icon: <BagFillIcon />,
    },
    {
      name: 'Notebook',
      path: '/notebook',
      icon: <PenFillIcon />,
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: <MessageFillIcon />,
    },
  ],
  social: [
    {
      name: 'LinkedIn',
      path: SOCIAL_LINKS.linkedIn,
      icon: <LinkedInIcon />,
    },
    {
      name: 'Instagram',
      path: SOCIAL_LINKS.instagram,
      icon: <InstagramIcon />,
    },
    {
      name: 'GitHub',
      path: SOCIAL_LINKS.github,
      icon: <GitHubIcon />,
    },
  ],
}
