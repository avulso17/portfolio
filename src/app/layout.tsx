import type { Metadata } from 'next'

import '@/UI/styles/global.css'

export const metadata: Metadata = {
  title: 'Flow.ai',
  description: 'Create blended photos with Flow.ai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en'>
      <body className='bg-tile-4'>
        <div className='h-screen rounded-3xl p-16'>{children}</div>
      </body>
    </html>
  )
}
