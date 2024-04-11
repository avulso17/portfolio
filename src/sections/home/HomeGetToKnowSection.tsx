import { Widget } from '@/components/Widget'

export default function HomeGetToKnowSection() {
  return (
    <>
      <h2 className='mb-8 header'>Get to know me</h2>
      <div className='mb-[6.75rem] flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-4 tablet:flex-row'>
          <Widget
            title='About me'
            subtitle='Who I am and what I do'
            imgSrc='/assets/about-me.png'
            imgClassName='object-contain mobile:object-cover'
          />
          <Widget
            title='Notebook'
            subtitle='My thoughts, insights, and reflections'
            imgSrc='/assets/notebook.png'
            imgClassName='object-contain mobile:object-cover'
          />
        </div>

        <div className='flex flex-col items-center gap-4 tablet:flex-row'>
          <Widget
            title='Bookshelf'
            subtitle="Books and pieces of wisdom I've enjoyed reading"
            imgSrc='/assets/bookshelf.png'
            imgClassName='object-cover'
          />
          <Widget
            title='Tech Stack'
            subtitle='The dev tools, apps, devices, and games I use and play.'
            imgSrc='/assets/tech-stack.png'
            imgClassName='object-cover object-left'
          />
        </div>
      </div>
    </>
  )
}
