import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WorkSpace Africa | Find & Book Guaranteed Workspaces',
  description: 'Africa\'s essential technology infrastructure for the flexible work economy. Discover and book premium workspaces across Nigeria.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
