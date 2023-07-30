import type { Metadata } from 'next'

import '@/UI/styles/global.css'
import { Navbar } from '@/UI/components/navbar'

export const metadata: Metadata = {
  title: 'Flow.ai',
  description: 'Create blended photos with Flow.ai',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en'>
      <body className='px-4 bg-tile-4'>
        <div className='mx-auto max-w-screen-wide-xl py-9'>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
