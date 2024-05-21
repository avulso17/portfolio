import { ComponentProps } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import ArrowRightIcon from '@/icons/ArrowRight'
import { cn } from '@/lib/utils/cn'

export type WorkProjectCardProps = Omit<ComponentProps<'div'>, 'title'> & {
  description: string
  href?: string
  iconSrc: string
  imgSrc: string
  imgView?: string
  title: string
}

export default function WorkProjectCard({
  title = 'Project Name',
  description = 'Project description goes here',
  iconSrc = '/',
  imgSrc = '/',
  href = '/',
  imgView,
  className,
}: WorkProjectCardProps) {
  return (
    <div
      className={cn(
        [
          'flex w-full overflow-hidden rounded-4xl border border-card-border bg-onyx',
          'tablet:h-[35.25rem]',
        ],
        className
      )}
    >
      <div className='flex flex-col gap-4 px-6 py-8 mobile:p-[3.75rem] tablet:max-w-[35rem] tablet:pr-0'>
        <Image
          className='rounded-2xl object-contain'
          src={iconSrc}
          alt={`${title} Icon`}
          height={70}
          width={70}
          priority
        />
        <h3 className='text-xl font-extrabold leading-normal mobile:text-[2rem]'>
          {title}
        </h3>
        <p className='text-[0.938rem] leading-normal text-gray-dark mobile:text-base'>
          {description}
        </p>

        <Link
          href={href}
          target='_blank'
          className='mt-8 h-fit w-fit tablet:mt-auto'
        >
          <Button
            className='group text-lg'
            variant='text'
            rightIcon={
              <ArrowRightIcon className='text-2xl transition-transform ease-in-out group-hover:translate-x-1' />
            }
          >
            Visit Site
          </Button>
        </Link>
      </div>

      <div className='relative hidden shrink-0 grow tablet:flex'>
        <Image
          className={cn(
            'object-cover object-left transition-transform duration-300 hover:scale-110',
            {
              'hover:rotate-[-5.1deg]': imgView === 'tablet',
            }
          )}
          src={imgSrc}
          alt={`${title} Banner`}
          fill
          priority
        />
      </div>
    </div>
  )
}
