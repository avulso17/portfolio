import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextGenerateEffect } from '@/components/TextGeneratorEffect'
import { getI18n } from '@/locales/server'
import HomePortrait from './HomePortrait'

export default async function HomeHero() {
  const t = await getI18n()

  return (
    <div className='relative z-0 mb-[8.5rem] flex w-full flex-col pt-14 mobile:mb-[20.625rem] mobile:gap-10 mobile:pt-0'>
      <h1 className='mb-4 w-fit whitespace-nowrap font-extrabold mobile:mb-0'>
        <b className='block mobile:hidden'>Hi 👋🏻</b>
        <b>I&rsquo;m</b> Felipe M
        <p className='hidden font-extrabold text-inherit font-inherit tablet:inline-block'>
          ateus
        </p>
      </h1>

      <TextGenerateEffect
        speed={0.1}
        words={t('home.hero.description')}
        className='mb-14 w-full max-w-[45.625rem] font-medium !leading-5 !text-gray-dark hero-text mobile:mb-0 mobile:!leading-[2rem]'
      />

      <div className='flex flex-col gap-4 mobile:flex-row mobile:items-center'>
        <Link href='/about'>
          <Button className='w-full mobile:w-fit'>See my resume</Button>
        </Link>
        <Link href='/contact'>
          <Button className='w-full mobile:w-fit' variant='secondary'>
            Get in touch
          </Button>
        </Link>
      </div>

      <HomePortrait className='absolute -top-10 left-[570px] -z-10 hidden wide:flex' />
    </div>
  )
}
