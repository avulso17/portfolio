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

      <Image
        className='w-28'
        src='/logos/circular_logo.png'
        alt='Logo'
        height={40}
        width={110}
      />

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
