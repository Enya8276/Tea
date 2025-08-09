'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { TeawareProduct } from '@/lib/supabase'

type TeawareWithCategory = TeawareProduct & {
  teaware_categories?: {
    name?: string
    slug?: string
  } | null
}

export default function TeawareList() {
  const [teawares, setTeawares] = useState<TeawareWithCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeawares()
  }, [])

  const fetchTeawares = async () => {
    try {
      const { data, error } = await supabase
        .from('teaware_products')
        .select(`
          *,
          teaware_categories(name, slug)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTeawares(data || [])
    } catch (error) {
      console.error('Error fetching teawares:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          共找到 {teawares.length} 款茶具
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">排序:</span>
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800">
            <option>默认排序</option>
            <option>价格从低到高</option>
            <option>价格从高到低</option>
            <option>最新上架</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teawares.map((teaware, index) => (
          <motion.div
            key={teaware.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link href={`/teaware/${teaware.id}`}>
              <div className="card overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-xl">
                {/* 产品图片 */}
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                  <div className="w-full h-full bg-gradient-to-br from-brown-100 to-tea-100 flex items-center justify-center">
                    <span className="text-4xl">🏺</span>
                  </div>
                  
                  {teaware.is_featured && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      推荐
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                    {teaware.stock_quantity > 0 ? '有货' : '缺货'}
                  </div>
                </div>

                {/* 产品信息 */}
                <div className="p-4">
                  <div className="text-xs text-tea-600 dark:text-tea-400 mb-1">
                    {teaware.teaware_categories?.name}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {teaware.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {teaware.english_name}
                  </p>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    材质: {teaware.material}
                  </div>
                  
                  {teaware.capacity && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      容量: {teaware.capacity}ml
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {teaware.description}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                        ¥{teaware.price}
                      </span>
                      {teaware.sale_price && teaware.sale_price < teaware.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ¥{teaware.sale_price}
                        </span>
                      )}
                    </div>
                    
                    <button className="btn-primary text-sm px-3 py-1">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {teawares.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏺</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            暂无茶具产品
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            请稍后再来查看，或联系客服了解更多信息
          </p>
        </div>
      )}
    </div>
  )
} 