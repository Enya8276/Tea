'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSupabase } from '@/components/supabase-provider'
import { useCart } from '@/components/cart/cart-provider'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import SearchBar from '@/components/search/search-bar'

const navigation = [
  { name: '首页', href: '/' },
  { name: '茶叶', href: '/tea' },
  { name: '茶具', href: '/teaware' },
  { name: '茶文化', href: '/culture' },
  { name: '泡茶技巧', href: '/brewing' },
  { name: '关于我们', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, supabase } = useSupabase()
  const { state: cartState } = useCart()
  const { theme, setTheme } = useTheme()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tea-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">茶</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">茶韵雅集</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-tea-600 dark:hover:text-tea-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

                 {/* Right side actions */}
         <div className="flex items-center space-x-4">
           {/* Search */}
           <SearchBar />
           
           {/* Theme toggle */}
           <button
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
           >
             {theme === 'dark' ? (
               <SunIcon className="w-5 h-5 text-yellow-500" />
             ) : (
               <MoonIcon className="w-5 h-5 text-gray-600" />
             )}
           </button>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ShoppingCartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {cartState.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartState.itemCount}
              </span>
            )}
          </Link>

                     {/* User menu */}
           {user ? (
             <div className="relative">
               <button 
                 onClick={() => setMobileMenuOpen(false)}
                 className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
               >
                 <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
               </button>
               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                 <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                   <p className="text-sm font-medium text-gray-900 dark:text-white">
                     {user.user_metadata?.name || user.email}
                   </p>
                   <p className="text-xs text-gray-500 dark:text-gray-400">
                     {user.email}
                   </p>
                 </div>
                 <Link href="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                   个人中心
                 </Link>
                 <Link href="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                   我的订单
                 </Link>
                 <button
                   onClick={handleSignOut}
                   className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                 >
                   退出登录
                 </button>
               </div>
             </div>
          ) : (
            <Link href="/auth" className="btn-primary">
              登录/注册
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-tea-600 dark:hover:text-tea-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
} 