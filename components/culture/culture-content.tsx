'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CultureArticle {
  id: string
  title: string
  english_title: string
  summary: string
  content: string
  image_url?: string
  category: string
  read_time: number
  created_at: string
}

export default function CultureContent() {
  const [articles, setArticles] = useState<CultureArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      // 模拟从数据库获取文章数据
      const mockArticles: CultureArticle[] = [
        {
          id: '1',
          title: '茶道：东方美学的精髓',
          english_title: 'Tea Ceremony: The Essence of Eastern Aesthetics',
          summary: '茶道不仅是一种饮茶方式，更是东方哲学与美学的完美体现。通过茶道，我们可以感受到"和敬清寂"的茶道精神。',
          content: '茶道起源于中国，发展于日本，是一种以茶为媒介的生活礼仪。茶道强调"和敬清寂"四个字...',
          category: '茶道',
          read_time: 8,
          created_at: '2024-12-01T10:00:00Z'
        },
        {
          id: '2',
          title: '六大茶类的起源与特点',
          english_title: 'Origin and Characteristics of Six Major Tea Types',
          summary: '中国茶文化博大精深，六大茶类各具特色。从绿茶的清新到黑茶的醇厚，每一种茶都有其独特的魅力。',
          content: '中国茶叶按照制作工艺和发酵程度，可以分为绿茶、黄茶、白茶、青茶、红茶、黑茶六大类...',
          category: '茶类',
          read_time: 12,
          created_at: '2024-11-28T14:30:00Z'
        },
        {
          id: '3',
          title: '茶与禅：心灵的对话',
          english_title: 'Tea and Zen: A Dialogue of the Soul',
          summary: '茶与禅有着深厚的渊源，茶禅一味，体现了东方文化中物质与精神的和谐统一。',
          content: '茶禅一味，是东方文化中一个重要的哲学概念。茶与禅的结合，体现了物质与精神的和谐统一...',
          category: '茶禅',
          read_time: 10,
          created_at: '2024-11-25T09:15:00Z'
        },
        {
          id: '4',
          title: '茶具之美：器以载道',
          english_title: 'The Beauty of Teaware: Vessels Carrying the Way',
          summary: '茶具不仅是实用器具，更是艺术品。从紫砂壶到盖碗，每一件茶具都承载着深厚的文化内涵。',
          content: '茶具之美，在于其不仅实用，更承载着深厚的文化内涵。从紫砂壶的温润如玉到盖碗的简洁优雅...',
          category: '茶具',
          read_time: 6,
          created_at: '2024-11-20T16:45:00Z'
        },
        {
          id: '5',
          title: '茶席设计：空间的艺术',
          english_title: 'Tea Table Design: The Art of Space',
          summary: '茶席设计是一门空间艺术，通过精心布置，营造出宁静优雅的品茶环境。',
          content: '茶席设计是一门综合艺术，涉及空间布局、色彩搭配、器物选择等多个方面...',
          category: '茶席',
          read_time: 7,
          created_at: '2024-11-15T11:20:00Z'
        }
      ]
      
      setArticles(mockArticles)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: '全部' },
    { id: '茶道', name: '茶道' },
    { id: '茶类', name: '茶类' },
    { id: '茶禅', name: '茶禅' },
    { id: '茶具', name: '茶具' },
    { id: '茶席', name: '茶席' }
  ]

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-tea-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            {/* 文章图片 */}
            <div className="w-full h-48 bg-gradient-to-br from-tea-100 to-tea-200 dark:from-tea-900/20 dark:to-tea-800/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🍃</span>
            </div>

            {/* 文章信息 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-tea-100 dark:bg-tea-900/20 text-tea-800 dark:text-tea-200 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {article.read_time} 分钟阅读
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {article.summary}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
                <Link 
                  href={`/culture/${article.id}`}
                  className="text-tea-600 dark:text-tea-400 hover:text-tea-700 dark:hover:text-tea-300 text-sm font-medium"
                >
                  阅读全文 →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            暂无相关文章
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            请选择其他分类或稍后再来查看
          </p>
        </div>
      )}
    </div>
  )
} 