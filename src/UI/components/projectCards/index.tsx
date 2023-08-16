'use client'
import { ComponentProps } from 'react'

import { tv } from 'tailwind-variants'

import { Button } from '../button'

const projectCardVStyles = tv({
  slots: {
    content:
      'flex h-[35.25rem] w-full shrink-0 overflow-hidden rounded-4xl border border-card-border bg-onyx',
    icon: 'h-[4.375rem] w-[4.375rem] object-contain',
    title: 'truncate text-[2rem] font-extrabold leading-normal',
    description: 'leading-normal text-gray-dark',
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
  className,
}: ProjectCardProps): React.ReactElement => {
  const {
    content,
    icon,
    description: descriptionStyles,
    title: titleStyles,
  } = projectCardVStyles()

  return (
    <div className={content()}>
      <div className='flex h-full w-full max-w-[35rem] flex-col gap-4 p-[3.75rem] pr-0'>
        <img className={icon()} src={iconSrc} alt='project_icon' />
        <h3 className={titleStyles()}>{title}</h3>
        <p className={descriptionStyles()}>{description}</p>

        <Button className='mt-auto p-0' variant='text'>
          Visit Site
        </Button>
      </div>

      <div className='relative z-0 flex h-full grow bg-blue'></div>
    </div>
  )
}
