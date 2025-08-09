'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/supabase-provider'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  items: OrderItem[]
}

interface OrderItem {
  id: string
  product_name: string
  quantity: number
  price: number
  product_type: 'tea' | 'teaware'
}

export default function OrdersContent() {
  const { user, supabase } = useSupabase()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({ user_id: user!.id })
      const res = await fetch(`/api/orders?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || '获取订单失败')
      setOrders((data?.orders ?? []) as Order[])
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
      case '配送中':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
      case '待付款':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
      case '已取消':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔐</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          请先登录
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          登录后可以查看您的订单历史
        </p>
        <Link href="/auth" className="btn-primary">
          立即登录
        </Link>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          暂无订单
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          您还没有任何订单，快去选购心仪的茶叶和茶具吧
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
    <div className="space-y-6">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card p-6"
        >
          {/* 订单头部 */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                订单号：{order.order_number}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                下单时间：{new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <p className="text-lg font-bold text-tea-600 dark:text-tea-400 mt-1">
                ¥{order.total_amount}
              </p>
            </div>
          </div>

          {/* 订单商品 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">订单商品</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-xl">
                      {item.product_type === 'tea' ? '🍃' : '🏺'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {item.product_name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      数量：{item.quantity} × ¥{item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ¥{item.quantity * item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 订单操作 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex justify-end space-x-3">
              <button className="btn-secondary text-sm px-4 py-2">
                查看详情
              </button>
              {order.status === '已完成' && (
                <button className="btn-primary text-sm px-4 py-2">
                  再次购买
                </button>
              )}
              {order.status === '待付款' && (
                <button className="btn-primary text-sm px-4 py-2">
                  立即付款
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 