import { BentoGrid, BentoGridItem } from '@/components/BentoGrid'
import { Note } from '@/configs/notes'
import { twMerge } from 'tailwind-merge'

export type NotebookCategoryStack = React.ComponentProps<'div'> & {
  category: string
  notes: Note[]
}

export default function NotebookCategoryStack({
  className,
  category,
  notes,
}: NotebookCategoryStack) {
  return (
    <div className={twMerge(['flex flex-col gap-8'], className)}>
      {/* HEADER */}
      <div className='flex items-center justify-between gap-4'>
        <h2 className='text-5xl font-bold text-gray-dark'>{category}</h2>
        <span className='text-xl text-gray-dark'>{notes.length ?? 0} note</span>
      </div>

      <BentoGrid className='max-w-none'>
        {notes.map((item, index) => (
          <BentoGridItem
            key={index}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={index === 3 || index === 6 ? 'wide:col-span-2' : ''}
          />
        ))}
      </BentoGrid>
    </div>
  )
}
