import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AccountContextProvider } from './context/account.context'
import CustomErrorAlert from './components/CustomErrorAlert'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Q-Pros Front End Task',
  description: 'Front End Assignment - Tareq Jarwan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AccountContextProvider>
          <CustomErrorAlert />
          {children}
        </AccountContextProvider>
      </body>
    </html>
  )
}
