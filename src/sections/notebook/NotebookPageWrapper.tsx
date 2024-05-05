import { notes } from '@/configs/notes'
import NotebookCategoryStack from './NotebookCategoryStack'

const DEV_NOTES = notes.dev
const DESIGN_NOTES = notes.design

export default function NotebookPageWrapper() {
  return (
    <div className='flex flex-col gap-16 py-16 pb-28'>
      <NotebookCategoryStack category='Dev' notes={DEV_NOTES} />
      <NotebookCategoryStack category='Design' notes={DESIGN_NOTES} />
    </div>
  )
}
