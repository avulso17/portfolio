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
      path: 'https://www.linkedin.com/in/felipe-mateus-270246160',
      icon: <LinkedInIcon />,
    },
    {
      name: 'X',
      path: 'https://twitter.com/felipe_teus10',
      icon: <TwitterIcon />,
    },
    {
      name: 'GitHub',
      path: 'https://github.com/avulso17',
      icon: <GitHubIcon />,
    },
    {
      name: 'Instagram',
      path: 'https://www.instagram.com/felipe_teus/',
      icon: <InstagramIcon />,
      hidden: true,
    },
    {
      name: 'Discord',
      path: 'https://discord.gg/KgWFr3Xn6v',
      icon: <DiscordIcon />,
      hidden: true,
    },
    {
      name: 'Email',
      path: 'mailto:felipe_mateus08@hotmail.com?subject=Contato%20pelo%20site',
      icon: <MessageFillIcon />,
      hidden: true,
    },
  ],
}
