import dynamic from 'next/dynamic'

import { tv } from 'tailwind-variants'

import Separator from '../separator'
const DynamicLordIcon = dynamic(() => import('../lordIcon'), { ssr: false })

const footerStyles = tv({
  slots: {
    button:
      'flex h-[1.125rem] w-fit items-center text-base font-medium leading-normal text-gray-light outline-none transition-all ease-in-out hover:brightness-125 focus:outline-none',
  },
})

export const Footer = (): React.ReactElement => {
  const { button } = footerStyles()

  return (
    <footer
      id='footer'
      className='relative flex w-full justify-between pb-10 pt-[4.625rem]'
    >
      <Separator alpha className='absolute top-0 !w-screen absolute-center-x' />

      <div className='flex flex-col gap-4'>
        <DynamicLordIcon
          src='/lord/wired/wired-planet.json'
          trigger='hover'
          target='#footer'
          className='current-color'
          size={64}
        />
        <p className='text-xl font-medium leading-normal text-gray'>
          Thanks for stopping by ッ
        </p>

        <small className='mt-auto select-none text-sm leading-normal text-gray'>
          &#169; 2023 Felipe Mateus. All Rights Reserved.
        </small>
      </div>

      <div className='flex gap-28'>
        <div className='flex flex-col gap-4'>
          <b className='mb-4 font-bold'>Links</b>

          <button className={button()}>About</button>
          <button className={button()}>Work</button>
          <button className={button()}>Tech Stack</button>
          <button className={button()}>Contact</button>
        </div>

        <div className='flex flex-col gap-4'>
          <b className='mb-4 font-bold'>Elsewhere</b>

          <button className={button()}>Email</button>
          <button className={button()}>LinkedIn</button>
          <button className={button()}>GitHub</button>
          <button className={button()}>Twitter</button>
          <button className={button()}>Discord</button>
        </div>
      </div>
    </footer>
  )
}
