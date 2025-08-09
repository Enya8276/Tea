'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface SearchResult {
  id: string
  type: 'tea' | 'teaware' | 'article'
  title: string
  subtitle?: string
  description?: string
  url: string
  icon: string
  price?: number
  category?: string
}

interface SearchResultsProps {
  query: string
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      performSearch(query)
    } else {
      setResults([])
      setLoading(false)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'tea' as const,
          title: '西湖龙井',
          subtitle: '绿茶 - 明前特级',
          description: '产自浙江杭州西湖区，明前采摘，外形扁平挺直，色泽嫩绿光润。',
          url: '/tea/1',
          icon: '🍃',
          price: 299,
          category: '绿茶'
        },
        {
          id: '2',
          type: 'teaware' as const,
          title: '紫砂壶',
          subtitle: '宜兴紫砂 - 手工制作',
          description: '采用宜兴优质紫砂泥料，手工制作，造型优美，透气性好。',
          url: '/teaware/1',
          icon: '🏺',
          price: 599,
          category: '茶壶'
        },
        {
          id: '3',
          type: 'article' as const,
          title: '茶道：东方美学的精髓',
          subtitle: '茶文化文章',
          description: '茶道不仅是一种饮茶方式，更是东方哲学与美学的完美体现。',
          url: '/culture/1',
          icon: '📚',
          category: '茶道'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(mockResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          请输入搜索关键词
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          搜索茶叶、茶具或茶文化文章
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={result.url} className="block">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-tea-100 to-tea-200 dark:from-tea-900/20 dark:to-tea-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{result.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {result.title}
                      </h3>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-tea-100 dark:bg-tea-900/20 text-tea-800 dark:text-tea-200 rounded-full">
                        {result.type === 'tea' ? '茶叶' : result.type === 'teaware' ? '茶具' : '文章'}
                      </span>
                    </div>
                    
                    {result.subtitle && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {result.subtitle}
                      </p>
                    )}
                    
                    {result.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                        {result.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4">
                        {result.category && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {result.category}
                          </span>
                        )}
                        {result.price && (
                          <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                            ¥{result.price}
                          </span>
                        )}
                      </div>
                      <span className="text-tea-600 dark:text-tea-400 text-sm font-medium">
                        查看详情 →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            未找到相关结果
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            请尝试其他关键词或浏览我们的产品
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
      )}
    </div>
  )
} 