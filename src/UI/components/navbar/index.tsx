'use client'

import Image from 'next/image'

import { Button } from '../button'

export const Navbar = (): JSX.Element => {
  return (
    <div className='flex h-[5.25rem] w-full items-center justify-between rounded-4xl bg-black px-20'>
      <div className='flex items-center gap-16'>
        <Button variant='text' iconPath='/icons/home/home.svg'>
          Home
        </Button>
        <Button variant='text'>Galery</Button>
        <Button variant='text'>User</Button>
      </div>

      <Image src='/icons/home/home.svg' alt='Logo' height={40} width={110} />

      <div className='flex items-center gap-16'>
        <Button variant='text'>Settings</Button>
        <Button variant='text'>About</Button>
        <Button variant='text'>Contact Us</Button>
      </div>
    </div>
  )
}
