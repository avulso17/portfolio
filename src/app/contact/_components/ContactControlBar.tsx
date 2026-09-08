import { cn } from '@/lib/utils/cn'
import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: ['flex h-3 w-3 shrink-0 rounded-50 border'],
})

const ContactControlBar: React.FC = () => {
  return (
    <div
      className={cn([
        'flex max-h-[3.375rem] w-full items-center p-4',
        'border-white/[0.03] bg-onyx rounded-t-xl border-b',
      ])}
    >
      <div className='flex h-fit w-fit gap-2'>
        <button
          className={buttonStyles({
            className: 'border-[#D62929] bg-[#F63636]',
          })}
        />

        <button
          className={buttonStyles({
            className: 'border-[#CEA435] bg-[#F6C136]',
          })}
        />

        <button
          className={buttonStyles({
            className: 'border-[#53CC28] bg-[#68F636]',
          })}
        />
      </div>

      <span className='text-white absolute select-none font-medium absolute-center-x'>
        New message
      </span>
    </div>
  )
}

export default ContactControlBar
