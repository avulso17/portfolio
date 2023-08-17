'use client'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '@/UI/components/button'
import Separator from '@/UI/components/separator'
import TextField from '@/UI/components/textField'

const contactStyles = tv({
  slots: {
    controlBar:
      'flex max-h-[3.375rem] w-full items-center rounded-t-xl bg-onyx p-4 shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.03)_inset]',
    controlButton: 'flex h-3 w-3 shrink-0 rounded-50 border',
    content:
      'flex flex-col gap-6 w-full px-4 pt-6 mobile:py-[0.625rem] mobile:px-8 mobile:gap-8',
    textArea:
      'h-80 w-full rounded-xl bg-black p-6 text-start shadow-[0px_19px_30px_0px_rgba(0,0,0,0.2)] placeholder:text-gray focus:outline-none',
    socialButtons: 'flex w-fit gap-11',
  },
})

export default function ContactPage(): React.ReactElement {
  const { controlBar, controlButton, content, textArea, socialButtons } =
    contactStyles()

  return (
    <main className='w-full'>
      <div className='relative flex flex-col gap-2 pb-16'>
        <h1 className='hero-title'>Get in touch</h1>
        <p className='hero-text'>Let&rsquo;s build something awesome.</p>

        <Separator className='absolute bottom-0 !w-screen opacity-[0.06] absolute-center-x' />
      </div>

      <div className='mb-20 mt-16 w-full'>
        <div className='flex w-full flex-col overflow-hidden rounded-xl bg-onyx'>
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

          <form className={content()}>
            <div className='h-fit w-full'>
              <TextField
                type='email'
                placeholder='Enter your email address'
                label='Email:'
              />
              <Separator alpha className='my-4' />
              <TextField
                type='text'
                placeholder='Enter your name'
                label='Name:'
              />
              <Separator alpha className='my-4' />
              <TextField
                type='text'
                placeholder='Enter subject'
                label='Subject:'
              />
            </div>
            <Separator alpha />

            <textarea
              placeholder='Write your message here'
              className={textArea()}
            />
          </form>

          <div className='flex w-full justify-end p-6 mobile:px-12 mobile:py-4'>
            <Button className='w-full mobile:w-fit'>Send</Button>
          </div>
        </div>

        <div className='mx-auto mt-16 flex w-fit gap-11'>
          <a href='' rel='noreferrer noopener' className={socialButtons()}></a>
          <a href='' rel='noreferrer noopener' className={socialButtons()}></a>
          <a href='' rel='noreferrer noopener' className={socialButtons()}></a>
          <a href='' rel='noreferrer noopener' className={socialButtons()}></a>
          <a href='' rel='noreferrer noopener' className={socialButtons()}></a>
          <a href='' rel='noreferrer noopener' className={socialButtons()}></a>
        </div>
      </div>
    </main>
  )
}
