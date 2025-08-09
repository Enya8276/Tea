'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { TeawareProduct } from '@/lib/supabase'

type RelatedTeaware = TeawareProduct & {
  teaware_categories?: {
    name?: string
    slug?: string
  } | null
}

interface RelatedTeawaresProps {
  currentTeawareId: string
}

export default function RelatedTeawares({ currentTeawareId }: RelatedTeawaresProps) {
  const [relatedTeawares, setRelatedTeawares] = useState<RelatedTeaware[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedTeawares()
  }, [currentTeawareId])

  const fetchRelatedTeawares = async () => {
    try {
      // 获取当前茶具信息
      const { data: currentTeaware } = await supabase
        .from('teaware_products')
        .select('category_id')
        .eq('id', currentTeawareId)
        .single()

      if (!currentTeaware) return

      // 获取同类别茶具
      const { data, error } = await supabase
        .from('teaware_products')
        .select(`
          *,
          teaware_categories(name, slug)
        `)
        .eq('category_id', currentTeaware.category_id)
        .neq('id', currentTeawareId)
        .eq('is_active', true)
        .limit(4)

      if (error) throw error
      setRelatedTeawares(data || [])
    } catch (error) {
      console.error('Error fetching related teawares:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          相关推荐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedTeawares.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        相关推荐
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTeawares.map((teaware, index) => (
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
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                  <div className="w-full h-full bg-gradient-to-br from-brown-100 to-tea-100 flex items-center justify-center">
                    <span className="text-4xl">🏺</span>
                  </div>
                </div>

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
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                      ¥{teaware.sale_price || teaware.price}
                    </span>
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
    </div>
  )
} 