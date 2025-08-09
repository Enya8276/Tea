import { Suspense } from 'react'
import CartContent from '@/components/cart/cart-content'

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            购物车
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            查看您选择的茶叶和茶具
          </p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <CartContent />
        </Suspense>
      </div>
    </div>
  )
} 