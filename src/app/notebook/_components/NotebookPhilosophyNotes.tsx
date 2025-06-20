import StarsIcon from '@/components/icons/Stars'
import NotebookCategoryStack from './NotebookCategoryStack'

const notes = [
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
    icon: <StarsIcon className='h-4 w-4 text-gray-dark' />,
  },
]

const NotebookPhilosophyNotes: React.FC = () => {
  return <NotebookCategoryStack category='Philosophy' notes={notes} />
}

export default NotebookPhilosophyNotes
