import {
  DISCORD_PATH,
  EMAIL_PATH,
  GITHUB_PATH,
  INSTAGRAM_PATH,
  LINKEDIN_PATH,
  TWITTER_PATH,
} from '@/env/social'
import BagFillIcon from '@/icons/BagFill'
import DiscordIcon from '@/icons/Discord'
import GitHubIcon from '@/icons/GitHub'
import HomeIcon from '@/icons/Home'
import InstagramIcon from '@/icons/Instagram'
import LinkedInIcon from '@/icons/LinkedIn'
import MessageFillIcon from '@/icons/MessageFill'
import PenFillIcon from '@/icons/PenFill'
import TwitterIcon from '@/icons/Twitter'
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
      path: LINKEDIN_PATH,
      icon: <LinkedInIcon />,
    },
    {
      name: 'X',
      path: TWITTER_PATH,
      icon: <TwitterIcon />,
    },
    {
      name: 'GitHub',
      path: GITHUB_PATH,
      icon: <GitHubIcon />,
    },
    {
      name: 'Instagram',
      path: INSTAGRAM_PATH,
      icon: <InstagramIcon />,
      hidden: true,
    },
    {
      name: 'Discord',
      path: DISCORD_PATH,
      icon: <DiscordIcon />,
      hidden: true,
    },
    {
      name: 'Email',
      path: EMAIL_PATH,
      icon: <MessageFillIcon />,
      hidden: true,
    },
  ],
}
