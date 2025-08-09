'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/components/cart/cart-provider'
import type { TeawareProduct } from '@/lib/supabase'

type TeawareWithCategory = TeawareProduct & {
  teaware_categories?: {
    name?: string
    slug?: string
  } | null
}

interface TeawareDetailProps {
  teawareId: string
}

export default function TeawareDetail({ teawareId }: TeawareDetailProps) {
  const [teaware, setTeaware] = useState<TeawareWithCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  useEffect(() => {
    fetchTeawareDetail()
  }, [teawareId])

  const fetchTeawareDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('teaware_products')
        .select(`
          *,
          teaware_categories(name, slug)
        `)
        .eq('id', teawareId)
        .eq('is_active', true)
        .single()

      if (error) throw error
      setTeaware(data)
    } catch (error) {
      console.error('Error fetching teaware detail:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="animate-pulse">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  if (!teaware) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏺</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          茶具不存在
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          该茶具可能已下架或不存在
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* 产品图片 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-brown-100 to-tea-100 flex items-center justify-center">
            <span className="text-8xl">🏺</span>
          </div>
        </div>
      </motion.div>

      {/* 产品信息 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* 基本信息 */}
        <div>
          <div className="text-sm text-tea-600 dark:text-tea-400 mb-2">
            {teaware.teaware_categories?.name}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {teaware.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
            {teaware.english_name}
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {teaware.description}
          </p>
        </div>

        {/* 价格 */}
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-tea-600 dark:text-tea-400">
            ¥{teaware.sale_price || teaware.price}
          </span>
          {teaware.sale_price && teaware.sale_price < teaware.price && (
            <span className="text-xl text-gray-400 line-through">
              ¥{teaware.price}
            </span>
          )}
        </div>

        {/* 规格信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">材质</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {teaware.material}
            </div>
          </div>
          {teaware.capacity && (
            <div className="card p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">容量</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {teaware.capacity}ml
              </div>
            </div>
          )}
          <div className="card p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">使用指南</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {teaware.usage_guide || '暂无信息'}
            </div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">库存</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {teaware.stock_quantity > 0 ? `${teaware.stock_quantity}件` : '缺货'}
            </div>
          </div>
        </div>

        {/* 购买区域 */}
        <div className="card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">数量:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 btn-primary py-3">
              立即购买
            </button>
            <button 
              onClick={() => {
                if (teaware) {
                  dispatch({
                    type: 'ADD_ITEM',
                    payload: {
                      id: teaware.id,
                      name: teaware.name,
                      english_name: teaware.english_name,
                      price: teaware.price,
                      sale_price: teaware.sale_price,
                      quantity: quantity,
                      type: 'teaware'
                    }
                  })
                }
              }}
              className="flex-1 btn-secondary py-3"
            >
              加入购物车
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 