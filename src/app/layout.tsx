import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Aaditya's Healthy Bites - Premium Organic Baby Food",
  description: 'Clean, nutritious, and delicious baby food made with love and organic ingredients.',
  keywords: 'baby food, organic, healthy, toddler snacks, purees',
}

import { CartProvider } from '../context/CartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{
        backgroundColor: 'var(--color-bg)',
        overflowX: 'hidden'
      }}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer style={{
            padding: '4rem 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            marginTop: '4rem',
            color: 'var(--color-text-light)'
          }}>
            <div className="container">
              <p>&copy; {new Date().getFullYear()} Aaditya's Healthy Bites. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
