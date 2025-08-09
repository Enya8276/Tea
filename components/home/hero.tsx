'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-tea-50 to-brown-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-tea-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brown-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-tea-300 rounded-full opacity-30 animate-bounce"></div>
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              传承千年
              <span className="text-tea-600 dark:text-tea-400">茶文化</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              品味东方茶韵，感受茶道之美。我们精选优质茶叶和精美茶具，
              为您带来最纯正的茶文化体验。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/tea" className="btn-primary text-lg px-8 py-3">
                探索茶叶
              </Link>
              <Link href="/culture" className="btn-secondary text-lg px-8 py-3">
                了解茶文化
              </Link>
            </div>
          </motion.div>

          {/* 右侧图片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* 主图片 */}
              <div className="bg-gradient-to-br from-tea-100 to-brown-100 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-tea-200 to-brown-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-tea-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-3xl font-bold">茶</span>
                    </div>
                    <p className="text-tea-800 font-medium">茶韵雅集</p>
                  </div>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-tea-300 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brown-300 rounded-full opacity-60 animate-pulse delay-500"></div>
            </div>
          </motion.div>
        </div>

        {/* 特色标签 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '🍃', title: '优质茶叶', desc: '精选产地' },
            { icon: '🏺', title: '精美茶具', desc: '传统工艺' },
            { icon: '📚', title: '茶文化', desc: '知识传播' },
            { icon: '🌍', title: '国际配送', desc: '全球服务' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 