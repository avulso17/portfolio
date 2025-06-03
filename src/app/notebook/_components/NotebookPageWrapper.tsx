import NotebookDesignNotes from './NotebookDesignNotes'
import NotebookDevNotes from './NotebookDevNotes'
import NotebookPhilosophyNotes from './NotebookPhilosophyNotes'

const NotebookPageWrapper: React.FC = () => {
  return (
    <div className='flex flex-col gap-16 py-16 pb-28'>
      <NotebookDevNotes />
      <NotebookDesignNotes />
      <NotebookPhilosophyNotes />
    </div>
  )
}

export default NotebookPageWrapper
