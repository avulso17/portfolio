import { Separator } from './Separator'

type HeaderProps = {
  subtitle?: string
  title?: string
}

export const Header = ({
  title,
  subtitle,
}: HeaderProps): React.ReactElement => {
  return (
    <div className='relative flex w-full flex-col gap-2 pb-14'>
      <h1>{title ?? 'Header'}</h1>
      <p className='hero-text'>
        {subtitle ?? 'Here goes a subtitle for the header'}
      </p>

      <Separator className='absolute bottom-0 !w-screen opacity-[0.06] absolute-center-x' />
    </div>
  )
}
