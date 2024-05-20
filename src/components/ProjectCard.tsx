import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

import ArrowRightIcon from '@/icons/ArrowRight'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './Button'

const projectCardStyles = tv({
  slots: {
    content: [
      'flex w-full rounded-4xl border border-card-border bg-onyx',
      'tablet:h-[35.25rem]',
    ],
    icon: 'rounded-2xl object-contain',
    title: 'text-xl font-extrabold leading-normal mobile:text-[2rem]',
    description:
      'text-[0.938rem] leading-normal text-gray-dark mobile:text-base',
  },
})

type ProjectCardProps = Omit<ComponentProps<'div'>, 'title'> & {
  description?: string
  href?: string
  iconSrc?: string
  imgSrc?: string
  title?: string
}

export const ProjectCard = ({
  title = 'Project Name',
  description = 'Project description goes here',
  iconSrc = '',
  imgSrc = '/',
  href = '',
}: ProjectCardProps) => {
  const {
    content,
    icon,
    description: descriptionStyles,
    title: titleStyles,
  } = projectCardStyles()

  return (
    <div className={content()}>
      <div className='flex flex-col gap-4 px-6 py-8 mobile:p-[3.75rem] tablet:max-w-[35rem] tablet:pr-0'>
        <Image
          className={icon()}
          src={iconSrc}
          alt={`${title} Icon`}
          height={70}
          width={70}
          priority
        />
        <h3 className={titleStyles()}>{title}</h3>
        <p className={descriptionStyles()}>{description}</p>

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
          className='object-cover object-left'
          src={imgSrc}
          alt={`${title} Banner`}
          fill
          priority
        />
      </div>
    </div>
  )
}
