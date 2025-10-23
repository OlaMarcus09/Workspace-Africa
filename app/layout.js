import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WorkSpace Africa | Find & Book Guaranteed Workspaces in 60 Seconds',
  description: 'Africa\'s essential technology infrastructure for the flexible work economy. Discover and book premium workspaces across Nigeria.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}
