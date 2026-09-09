import ArrowRightIcon from '@/components/icons/ArrowRight'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Project } from '@/configs/works'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export type ProjectsCardProps = {
  project: Project
  index: number
  className?: string
}

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className='grid gap-1 border-t border-line py-4 mobile:grid-cols-[8rem_1fr] mobile:gap-6'>
    <span className='text-parchment-mute eyebrow-text'>{label}</span>
    <p className='text-base text-parchment'>{children}</p>
  </div>
)

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  project,
  index,
  className,
}) => {
  const {
    title,
    role,
    period,
    summary,
    call,
    result,
    stack,
    url,
    icon,
    image,
    screenshotView,
  } = project
  const number = String(index + 1).padStart(2, '0')

  return (
    <Card
      as='article'
      className={cn(
        'flex w-full flex-col overflow-hidden tablet:flex-row',
        className
      )}
    >
      <div className='flex grow flex-col px-6 py-8 mobile:p-10 tablet:max-w-[36rem]'>
        <div className='mb-6 flex items-center justify-between'>
          <Eyebrow index={number}>{period}</Eyebrow>
          <Image
            src={icon}
            alt=''
            width={40}
            height={40}
            className='rounded-sm object-contain'
          />
        </div>

        <h3 className='mb-1 text-3xl font-semibold leading-tight text-parchment'>
          {title}
        </h3>
        <p className='mb-6 text-parchment-dim'>{role}</p>
        <p className='mb-6 text-parchment-dim'>{summary}</p>

        {call ? <Row label='The call'>{call}</Row> : null}
        {result ? <Row label='The result'>{result}</Row> : null}

        <ul
          className='mt-auto flex flex-wrap gap-2 border-t border-line pt-4'
          aria-label='Stack'
        >
          {stack.map((item) => (
            <li
              key={item}
              className='rounded-full border border-line px-2.5 py-1 text-parchment-dim eyebrow-text'
            >
              {item}
            </li>
          ))}
        </ul>

        {url ? (
          <Link
            href={url}
            target='_blank'
            rel='noreferrer noopener'
            className='mt-6 w-fit'
          >
            <Button
              variant='text'
              className='group'
              rightIcon={
                <ArrowRightIcon className='text-base transition-transform duration-150 ease-out group-hover:translate-x-1' />
              }
            >
              Visit site
            </Button>
          </Link>
        ) : null}
      </div>

      <div className='relative hidden max-w-[28rem] shrink-0 grow border-l border-line tablet:flex'>
        <Image
          className={cn('object-cover object-left', {
            'object-top': screenshotView === 'tablet',
          })}
          src={image}
          alt={`${title} screenshot`}
          fill
          sizes='(min-width: 768px) 28rem, 0px'
        />
      </div>
    </Card>
  )
}

export default ProjectsCard
