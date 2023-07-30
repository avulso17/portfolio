'use client'

import Image from 'next/image'

import AboutIcon from '../../../../public/icons/github.svg'
import HomeIcon from '../../../../public/icons/home/home.svg'
import GaleryIcon from '../../../../public/icons/photo/photo.svg'
import ContactIcon from '../../../../public/icons/send.svg'
import SettingsIcon from '../../../../public/icons/settings.svg'
import UserIcon from '../../../../public/icons/user/user.svg'
import { Button } from '../button'

export const Navbar = (): JSX.Element => {
  return (
    <div className='flex h-[5.25rem] w-full items-center justify-between rounded-4xl bg-black px-20'>
      <div className='flex items-center gap-16'>
        <Button variant='text' icon={<HomeIcon />}>
          Home
        </Button>
        <Button variant='text' icon={<GaleryIcon />}>
          Galery
        </Button>
        <Button variant='text' icon={<UserIcon />}>
          User
        </Button>
      </div>

      <div className='flex h-fit w-fit select-none items-center gap-2 drop-shadow-[-1px_1px_4px_rgba(124,5,242,0.34)]'>
        <img
          className='h-auto w-12 object-contain'
          src='/logos/circular_logo.png'
          alt='Logo'
        />

        <h1 className=' font-cadency tracking-normal text-white/95'>flow.ai</h1>
      </div>

      <div className='flex items-center gap-16'>
        <Button variant='text' icon={<SettingsIcon />}>
          Settings
        </Button>
        <Button variant='text' icon={<AboutIcon />}>
          About
        </Button>
        <Button variant='text' icon={<ContactIcon />}>
          Contact Us
        </Button>
      </div>
    </div>
  )
}
