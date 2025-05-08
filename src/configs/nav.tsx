import { SOCIAL_LINKS } from '@/constants/social'
import BagFillIcon from '@/icons/BagFill'
import GitHubIcon from '@/icons/GitHub'
import HomeIcon from '@/icons/Home'
import InstagramIcon from '@/icons/Instagram'
import LinkedInIcon from '@/icons/LinkedIn'
import MessageFillIcon from '@/icons/MessageFill'
import PenFillIcon from '@/icons/PenFill'
import UserFillIcon from '@/icons/UserFill'

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
