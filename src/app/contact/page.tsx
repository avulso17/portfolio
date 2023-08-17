'use client'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import Separator from '@/UI/components/separator'

const formStyles = tv({
  slots: {
    controlBar:
      'flex max-h-[3.375rem] w-full items-center rounded-t-xl bg-onyx p-4 shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.03)_inset]',
    controlButton: 'flex h-3 w-3 shrink-0 rounded-50 border',
  },
})

export default function ContactPage(): React.ReactElement {
  const { controlBar, controlButton } = formStyles()
  return (
    <main className='w-full'>
      <div className='relative flex flex-col gap-2 pb-16'>
        <h1 className='hero-title'>Get in touch</h1>
        <p className='hero-text'>Let&rsquo;s build something awesome.</p>

        <Separator className='absolute bottom-0 !w-screen bg-white/[0.01] absolute-center-x' />
      </div>

      <div className='mb-20 mt-16 w-full'>
        <div className='flex w-full flex-col gap-8 overflow-hidden rounded-xl bg-onyx'>
          <div className={controlBar()}>
            <div className='flex h-fit w-fit gap-2'>
              <button
                className={twMerge(
                  controlButton(),
                  'border-[#D62929] bg-[#F63636]'
                )}
              />
              <button
                className={twMerge(
                  controlButton(),
                  'border-[#CEA435] bg-[#F6C136]'
                )}
              />
              <button
                className={twMerge(
                  controlButton(),
                  'border-[#53CC28] bg-[#68F636]'
                )}
              />
            </div>

            <span className='absolute select-none font-medium text-white absolute-center-x'>
              New message
            </span>
          </div>

          <div className='px-8 py-[0.625rem]'></div>
        </div>

        <div className='mx-auto mt-16 flex w-fit gap-11'>a</div>
      </div>
    </main>
  )
}
