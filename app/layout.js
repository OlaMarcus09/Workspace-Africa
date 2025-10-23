import './globals.css'

export const metadata = {
  title: 'WorkSpace Africa | Find & Book Guaranteed Workspaces',
  description: 'Africa\'s essential technology infrastructure for the flexible work economy. Discover and book premium workspaces across Nigeria.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
