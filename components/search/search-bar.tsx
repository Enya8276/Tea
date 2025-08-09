'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  id: string
  type: 'tea' | 'teaware' | 'article'
  title: string
  subtitle?: string
  url: string
  icon: string
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length > 0) {
      performSearch(query)
    } else {
      setResults([])
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    try {
      // 模拟搜索延迟
      await new Promise(resolve => setTimeout(resolve, 300))

      // 模拟搜索结果
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'tea' as const,
          title: '西湖龙井',
          subtitle: '绿茶 - 明前特级',
          url: '/tea/1',
          icon: '🍃'
        },
        {
          id: '2',
          type: 'tea' as const,
          title: '正山小种',
          subtitle: '红茶 - 传统工艺',
          url: '/tea/2',
          icon: '☕'
        },
        {
          id: '3',
          type: 'teaware' as const,
          title: '紫砂壶',
          subtitle: '宜兴紫砂 - 手工制作',
          url: '/teaware/1',
          icon: '🏺'
        },
        {
          id: '4',
          type: 'article' as const,
          title: '茶道：东方美学的精髓',
          subtitle: '茶文化文章',
          url: '/culture/1',
          icon: '📚'
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

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url)
    setIsOpen(false)
    setQuery('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className="relative">
      {/* 搜索按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* 搜索弹窗 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          >
            <form onSubmit={handleSubmit} className="p-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索茶叶、茶具、文章..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-tea-500 focus:border-transparent"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* 搜索结果 */}
            {query && (
              <div className="border-t border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    搜索中...
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{result.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {result.title}
                            </p>
                            {result.subtitle && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {result.subtitle}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                            {result.type}
                          </span>
                        </div>
                      </button>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          router.push(`/search?q=${encodeURIComponent(query)}`)
                          setIsOpen(false)
                        }}
                        className="w-full text-center text-tea-600 dark:text-tea-400 hover:text-tea-700 dark:hover:text-tea-300 text-sm font-medium"
                      >
                        查看全部搜索结果
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    未找到相关结果
                  </div>
                )}
              </div>
            )}

            {/* 搜索建议 */}
            {!query && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  热门搜索
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['西湖龙井', '紫砂壶', '茶道', '普洱茶'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 