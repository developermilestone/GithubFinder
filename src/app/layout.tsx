import { LayoutWrapper } from '@/layouts/wrapper'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Github Finder',
  description: 'Keep track of your favorite Github repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
