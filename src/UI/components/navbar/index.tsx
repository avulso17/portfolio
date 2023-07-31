'use client'

import { Root, List, Indicator } from '@radix-ui/react-navigation-menu'

import AboutIcon from '../../../../public/icons/github.svg'
import HomeIcon from '../../../../public/icons/home/home.svg'
import GaleryIcon from '../../../../public/icons/photo/photo.svg'
import ContactIcon from '../../../../public/icons/send.svg'
import SettingsIcon from '../../../../public/icons/settings.svg'
import UserIcon from '../../../../public/icons/user/user.svg'
import { Button } from '../button'
import ItemWithContent from './itemWithContent'
import ListItem from './listItem'
import NavViewport from './viewport'

export const Navbar = (): JSX.Element => {
  return (
    <Root className='relative z-10'>
      <List className='flex h-[5.25rem] w-full items-center justify-between rounded-4xl bg-black px-14'>
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

          <h1 className=' font-cadency tracking-normal text-white/95'>
            flow.ai
          </h1>
        </div>

        <div className='flex items-center gap-16'>
          <ItemWithContent title='Settings' icon={<SettingsIcon />}>
            <ul className='grid w-fit grid-cols-2 gap-4 rounded-3xl p-5'>
              <ListItem title='Teste'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                totam vitae laboriosam assumenda voluptatum, accusamus ex nulla
                velit, voluptatem dolore error at! Delectus molestias minima
                illum assumenda iure eos excepturi.
              </ListItem>

              <ListItem title='Teste'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                totam vitae laboriosam assumenda voluptatum, accusamus ex nulla
                velit, voluptatem dolore error at! Delectus molestias minima
                illum assumenda iure eos excepturi.
              </ListItem>

              <ListItem title='Teste'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                totam vitae laboriosam assumenda voluptatum, accusamus ex nulla
                velit, voluptatem dolore error at! Delectus molestias minima
                illum assumenda iure eos excepturi.
              </ListItem>
            </ul>
          </ItemWithContent>

          <ItemWithContent title='About' icon={<AboutIcon />}>
            <ListItem title='Teste'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              totam vitae laboriosam assumenda voluptatum, accusamus ex nulla
              velit, voluptatem dolore error at! Delectus molestias minima illum
              assumenda iure eos excepturi.
            </ListItem>
          </ItemWithContent>

          <ItemWithContent title='Contact Us' icon={<ContactIcon />}>
            <ListItem title='Teste'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              totam vitae laboriosam assumenda voluptatum, accusamus ex nulla
              velit, voluptatem dolore error at! Delectus molestias minima illum
              assumenda iure eos excepturi.
            </ListItem>
          </ItemWithContent>
        </div>

        <Indicator className='top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn'>
          <div className='relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-red' />
        </Indicator>
      </List>

      <NavViewport />
    </Root>
  )
}
