import StarsIcon from '@/components/icons/Stars'
import NotebookCategoryStack from './NotebookCategoryStack'

const notes = [
  {
    href: '/notebook/note',
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and functional design.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
  {
    title: 'The Power of Communication',
    description:
      'Understand the impact of effective communication in our lives.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
]

export default function NotebookDevNotes() {
  return <NotebookCategoryStack category='Dev' notes={notes} />
}
