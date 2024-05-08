import { cn } from '@/utils/cn'
import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: ['flex h-3 w-3 shrink-0 rounded-50 border'],
})

export default function MacOSControlBar() {
  return (
    <div
      className={cn([
        'flex max-h-[3.375rem] w-full items-center p-4',
        'rounded-t-xl border-b border-white/[0.03] bg-onyx',
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

      <span className='absolute select-none font-medium text-white absolute-center-x'>
        New message
      </span>
    </div>
  )
}
