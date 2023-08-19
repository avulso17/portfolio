'use client'
import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

import ArrowRight from '../../../../public/icons/arrow/right.svg'
import { Button } from '../button'

const projectCardVStyles = tv({
  slots: {
    content:
      'flex h-[35.25rem] w-full shrink-0 overflow-hidden rounded-4xl border border-card-border bg-onyx',
    icon: 'h-[4.375rem] w-[4.375rem] object-contain',
    title: 'truncate text-xl font-extrabold leading-normal mobile:text-[2rem]',
    description:
      'leading-normal text-[0.938rem] text-gray-dark mobile:text-base',
  },
})

type ProjectCardProps = Omit<ComponentProps<'div'>, 'title'> & {
  description?: string
  iconSrc?: string
  title?: string
}

export const ProjectCard = ({
  title = 'Project Name',
  description = 'Project description goes here',
  iconSrc = '',
}: ProjectCardProps): React.ReactElement => {
  const {
    content,
    icon,
    description: descriptionStyles,
    title: titleStyles,
  } = projectCardVStyles()

  return (
    <div className={content()}>
      <div className='flex h-full w-full flex-col gap-4 px-6 py-8 mobile:p-[3.75rem] tablet:max-w-[35rem] tablet:pr-0'>
        <img className={icon()} src={iconSrc} alt='project_icon' />
        <h3 className={titleStyles()}>{title}</h3>
        <p className={descriptionStyles()}>{description}</p>

        <Button className='mt-auto p-0' variant='text'>
          Visit Site
          <ArrowRight className='ml-2 w-6' />
        </Button>
      </div>

      <div className='relative z-0 hidden h-full grow bg-blue tablet:flex'></div>
    </div>
  )
}
