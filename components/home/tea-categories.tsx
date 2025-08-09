'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const teaCategories = [
  {
    name: '绿茶',
    englishName: 'Green Tea',
    description: '未经发酵，保持茶叶的天然色泽和清香',
    color: 'from-green-400 to-green-600',
    icon: '🍃',
    slug: 'green-tea'
  },
  {
    name: '红茶',
    englishName: 'Black Tea',
    description: '全发酵茶，滋味醇厚，香气浓郁',
    color: 'from-red-400 to-red-600',
    icon: '☕',
    slug: 'black-tea'
  },
  {
    name: '乌龙茶',
    englishName: 'Oolong Tea',
    description: '半发酵茶，介于绿茶和红茶之间',
    color: 'from-amber-400 to-amber-600',
    icon: '🍂',
    slug: 'oolong-tea'
  },
  {
    name: '白茶',
    englishName: 'White Tea',
    description: '微发酵茶，清淡雅致，自然甘甜',
    color: 'from-gray-300 to-gray-500',
    icon: '🌸',
    slug: 'white-tea'
  },
  {
    name: '黄茶',
    englishName: 'Yellow Tea',
    description: '轻发酵茶，独特的黄汤黄叶',
    color: 'from-yellow-400 to-yellow-600',
    icon: '🌼',
    slug: 'yellow-tea'
  },
  {
    name: '黑茶',
    englishName: 'Dark Tea',
    description: '后发酵茶，越陈越香，醇厚绵长',
    color: 'from-brown-600 to-brown-800',
    icon: '🫖',
    slug: 'dark-tea'
  }
]

export default function TeaCategories() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            中国六大茶类
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            中国茶叶按发酵程度分为六大类，每种茶类都有其独特的制作工艺和口感特点
          </p>
        </motion.div>

        {/* 茶类网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teaCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/tea?category=${category.slug}`}>
                <div className="card p-6 h-full cursor-pointer transition-all duration-300 group-hover:shadow-xl">
                  {/* 图标和颜色条 */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>

                  {/* 内容 */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {category.englishName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* 悬停效果 */}
                  <div className="mt-4 flex items-center text-tea-600 dark:text-tea-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">了解更多</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 底部CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/tea" className="btn-primary text-lg px-8 py-3">
            浏览所有茶叶
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 