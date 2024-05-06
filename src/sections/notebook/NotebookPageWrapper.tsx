import NotebookDesignNotes from './NotebookDesignNotes'
import NotebookDevNotes from './NotebookDevNotes'
import NotebookPhilosophyNotes from './NotebookPhilosophyNotes'

export default function NotebookPageWrapper() {
  return (
    <div className='flex flex-col gap-16 py-16 pb-28'>
      <NotebookDevNotes />
      <NotebookDesignNotes />
      <NotebookPhilosophyNotes />
    </div>
  )
}
