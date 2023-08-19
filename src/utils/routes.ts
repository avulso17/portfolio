import WorkIcon from '../../public/icons/briefcase.svg'
import NotebookIcon from '../../public/icons/edit/pencil.svg'
import HomeIcon from '../../public/icons/home/home.svg'
import ContactIcon from '../../public/icons/message.svg'
import AboutIcon from '../../public/icons/user/user.svg'

export const routes = [
  {
    name: 'home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'about',
    path: '/about',
    icon: AboutIcon,
  },
  {
    name: 'work',
    path: '/work',
    icon: WorkIcon,
  },
  {
    name: 'notebook',
    path: '/notebook ',
    icon: NotebookIcon,
  },
  {
    name: 'contact',
    path: '/contact',
    icon: ContactIcon,
  },
]
