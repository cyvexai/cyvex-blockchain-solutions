import './globals.css'
import { Ubuntu, Space_Grotesk } from 'next/font/google'
import Starfield from '../components/Starfield'
import CursorTracker from '../components/CursorTracker'
import Header from '../components/Header'
import ConditionalFooter from "../components/ConditionalFooter";

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

export const metadata = {
  title: 'Cyvex Blockchain Solutions',
  description: 'AI-Powered Solana Blockchain Analytics',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ubuntu.className} ${space.className}`}>
      <body className="relative text-white overflow-x-hidden">
        {/* animated starfield background */}
        <Starfield />

        {/* glowing cursor tracker */}
        <CursorTracker />

        {/* site header */}
        <Header />

        {/* main site content */}
        <main className="relative z-10">{children}</main>

        
        {/* footer on all pages except /dashboard */}
        <ConditionalFooter />
      </body>
    </html>
  )
}