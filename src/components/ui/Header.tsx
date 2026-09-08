import Separator from './Separator'

type HeaderProps = {
  subtitle?: string
  title?: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className='relative flex w-full flex-col gap-2 pb-14'>
      <h1>{title ?? 'Header'}</h1>
      <p className='text-xl text-parchment-dim'>
        {subtitle ?? 'Here goes a subtitle for the header'}
      </p>

      <Separator className='absolute bottom-0 !w-screen absolute-center-x' />
    </div>
  )
}
