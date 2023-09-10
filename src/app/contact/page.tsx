'use client'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button, Header, Separator, TextField } from '@/UI/components'
import { links } from '@/utils/links'

import GithubIcon from '../../../public/icons/github.svg'
import LinkedinIcon from '../../../public/icons/linkedin.svg'
import EmailIcon from '../../../public/icons/message.svg'
import DiscordIcon from '../../../public/icons/social/discord.svg'
import InstagramIcon from '../../../public/icons/social/instagram.svg'
import TwitterIcon from '../../../public/icons/social/twitter.svg'

const contactStyles = tv({
  slots: {
    controlBar:
      'flex max-h-[3.375rem] w-full items-center rounded-t-xl border-b border-white/[0.03] bg-onyx p-4',
    controlButton: 'flex h-3 w-3 shrink-0 rounded-50 border',
    content: [
      'flex w-full flex-col gap-6 px-4 pt-6 ',
      'mobile:gap-8 mobile:px-8 mobile:py-[0.625rem]',
    ],
    textArea: [
      'h-80 w-full rounded-xl bg-black p-6 text-start',
      'shadow-text-area placeholder:text-gray focus:outline-none',
    ],
    socialButtons: 'w-fit text-gray-dark transition-colors hover:text-white',
  },
})

export default function ContactPage(): React.ReactElement {
  const { email, linkedIn, github, twitter, discord, instagram } = links
  const { controlBar, controlButton, content, textArea, socialButtons } =
    contactStyles()

  return (
    <main className='w-full'>
      <Header
        title='Get in touch'
        subtitle='Let&rsquo;s build something awesome.'
      />

      <div className='mb-20 mt-8 w-full mobile:mt-16'>
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

          <div className='flex w-full justify-end px-4 py-6 mobile:px-12 mobile:py-4'>
            <Button className='w-full mobile:w-fit'>Send</Button>
          </div>
        </div>

        <div className='mx-auto mt-16 flex w-fit max-w-[12.75rem] flex-wrap items-center gap-y-11 px-4 mobile:max-w-none mobile:gap-x-11'>
          <div className='flex w-fit items-center gap-11'>
            <a
              href={email}
              rel='noreferrer noopener'
              className={socialButtons()}
            >
              <EmailIcon className='w-7' />
            </a>
            <a
              href={linkedIn}
              rel='noreferrer noopener'
              className={socialButtons()}
            >
              <LinkedinIcon className='w-7' />
            </a>
            <a
              href={instagram}
              rel='noreferrer noopener'
              className={socialButtons()}
            >
              <InstagramIcon className='w-7' />
            </a>
          </div>

          <div className='flex w-fit items-center gap-11'>
            <a
              href={twitter}
              rel='noreferrer noopener'
              target='_blank'
              className={socialButtons()}
            >
              <TwitterIcon className='w-7' />
            </a>
            <a
              href={github}
              rel='noreferrer noopener'
              target='_blank'
              className={socialButtons()}
            >
              <GithubIcon className='w-7' />
            </a>
            <a
              href={discord}
              rel='noreferrer noopener'
              target='_blank'
              className={socialButtons()}
            >
              <DiscordIcon className='w-7' />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
