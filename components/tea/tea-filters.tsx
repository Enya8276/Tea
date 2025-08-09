'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { TeaCategory } from '@/lib/supabase'

export default function TeaFilters() {
  const [categories, setCategories] = useState<TeaCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('tea_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) throw error
      const fetched = (data as unknown as TeaCategory[]) || []
      setCategories(fetched)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* 茶类筛选 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          茶类
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">全部茶类</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 价格筛选 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          价格范围
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="最低价"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="最高价"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 btn-primary text-sm py-2">
              应用
            </button>
            <button 
              onClick={() => setPriceRange([0, 1000])}
              className="flex-1 btn-secondary text-sm py-2"
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {/* 特色筛选 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          特色
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">推荐产品</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">新品上架</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">限时特价</span>
          </label>
        </div>
      </div>

      {/* 库存筛选 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          库存状态
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">有库存</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">预售商品</span>
          </label>
        </div>
      </div>

      {/* 清除筛选 */}
      <button className="w-full btn-secondary py-2">
        清除所有筛选
      </button>
    </div>
  )
} 