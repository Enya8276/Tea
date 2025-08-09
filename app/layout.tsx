import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SupabaseProvider from '@/components/supabase-provider'
import { CartProvider } from '@/components/cart/cart-provider'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '茶韵雅集 - 传承千年茶文化',
  description: '专业的茶叶电商网站，提供优质茶叶和茶具，传播中国茶文化知识。',
  keywords: '茶叶,茶具,茶文化,龙井,铁观音,紫砂壶,盖碗',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 