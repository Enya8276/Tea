'use client'

import { useCart } from '@/components/cart/cart-provider'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CartContent() {
  const { state: cartState, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  if (cartState.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          购物车是空的
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          快去选择您喜欢的茶叶和茶具吧
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/tea" className="btn-primary">
            浏览茶叶
          </Link>
          <Link href="/teaware" className="btn-secondary">
            浏览茶具
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 购物车商品列表 */}
      <div className="lg:col-span-2 space-y-4">
        <AnimatePresence>
          {cartState.items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4">
                {/* 商品图片 */}
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">
                    {item.type === 'tea' ? '🍃' : '🏺'}
                  </span>
                </div>

                {/* 商品信息 */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.english_name}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                      ¥{item.sale_price || item.price}
                    </span>
                    {item.sale_price && item.sale_price < item.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ¥{item.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* 数量控制 */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* 删除按钮 */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  删除
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 结算区域 */}
      <div className="lg:col-span-1">
        <div className="card p-6 sticky top-24">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            订单摘要
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">商品数量</span>
              <span className="font-medium">{cartState.itemCount} 件</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">商品总价</span>
              <span className="font-medium">¥{cartState.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">运费</span>
              <span className="font-medium">¥0</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  总计
                </span>
                <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                  ¥{cartState.total}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/checkout" className="w-full btn-primary py-3 block text-center">
              立即结算
            </Link>
            <Link href="/" className="w-full btn-secondary py-3 block text-center">
              继续购物
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 