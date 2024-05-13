import { Header } from '@/components/Header'
import ContactSocialButtonGroup from '@/sections/contact/ContactSocialButtonGroup'
import ContactWindow from '@/sections/contact/ContactWindow'
import { Metadata } from 'next'

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Felipe Mateus - Software Engineer',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'Software Engineer',
    'Front-end',
    'Developer',
    'contact',
    'email',
    'socials',
    'instagram',
    'twitter',
    'linkedIn',
    'message',
    'gitHub',
    'discord',
  ],
  authors: [{ name: 'Felipe', url: 'https://felipe-mateus.com' }],
  creator: 'Felipe Mateus',
  publisher: 'Felipe Mateus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://felipe-mateus.com'),
  title: 'Felipe Mateus - Software Engineer',
  description:
    'Contact me by message, email or social media. Let’s build something awesome.',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Felipe Mateus - Software Engineer',
    description:
      'Contact me by message, email or social media. Let’s build something awesome.',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    images: [
      {
        url: '/og/og-contact.jpg',
        width: 800,
        height: 600,
      },
      {
        url: '/og/og-contact.jpg',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Mateus - Software Engineer',
    description:
      'Contact me by message, email or social media. Let’s build something awesome.',
    creator: 'Felipe Mateus',
    images: ['/og/og-contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <main className='w-full'>
      <Header
        title='Get in touch'
        subtitle='Let&rsquo;s build something awesome.'
      />

      <div className='mb-20 mt-8 w-full mobile:mt-16'>
        <ContactWindow />

        <ContactSocialButtonGroup />
      </div>
    </main>
  )
}
