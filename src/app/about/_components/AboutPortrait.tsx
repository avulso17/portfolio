import Image from 'next/image'

const AboutPortrait: React.FC = () => (
  <div className='relative aspect-[344/432] w-full overflow-hidden rounded-sm border border-line bg-ink-2'>
    <Image
      src='/assets/me-green-shirt.png'
      alt='Felipe Mateus'
      fill
      sizes='(min-width: 1024px) 22rem, 100vw'
      className='object-cover'
      priority
    />
  </div>
)

export default AboutPortrait
