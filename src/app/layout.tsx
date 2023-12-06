import { globalConfig } from '@/configs'
import Frame from '@/layouts/frame'
import { LayoutWrapper } from '@/layouts/wrapper'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: globalConfig.appName,
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
        <UserProvider>
          <LayoutWrapper>
            <Frame>
              {children}
            </Frame>
          </LayoutWrapper>
        </UserProvider>
      </body>
    </html>
  )
}
