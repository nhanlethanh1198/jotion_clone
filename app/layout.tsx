import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jôtion',
  description: 'The best way to manage your notes, tasks, and todos.',
  icons: {
    icon: [
      {
        media: `(prefers-color-scheme: light)`,
        url: `/logo.svg`,
        href: `/logo.svg`
      },
      {
        media: `(prefers-color-scheme: dark)`,
        url: `/logo-dark.svg`,
        href: `/logo-dark.svg`
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          disableTransitionOnChange={true}
          storageKey='jotion-theme-2'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
