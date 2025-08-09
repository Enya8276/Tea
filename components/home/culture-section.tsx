'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const cultureFeatures = [
  {
    title: '茶道精神',
    description: '和敬清寂，体现东方哲学与美学的完美结合',
    icon: '🌸',
    color: 'from-pink-400 to-pink-600'
  },
  {
    title: '历史传承',
    description: '千年茶文化，从陆羽《茶经》到现代茶艺',
    icon: '📜',
    color: 'from-amber-400 to-amber-600'
  },
  {
    title: '茶禅一味',
    description: '茶与禅的深厚渊源，体现物质与精神的和谐',
    icon: '🧘',
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    title: '国际影响',
    description: '中国茶文化走向世界，成为文化交流的桥梁',
    icon: '🌍',
    color: 'from-teal-400 to-teal-600'
  }
]

export default function CultureSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-tea-50 to-brown-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              茶文化传承
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              中国茶文化源远流长，承载着深厚的哲学思想和美学理念。
              从神农尝百草到陆羽著《茶经》，从宫廷贡茶到民间茶俗，
              茶文化已经深深融入中华民族的血脉之中。
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              茶不仅是一种饮品，更是一种生活方式和精神追求。
              通过品茶，我们可以感受到"和敬清寂"的茶道精神，
              体会到东方文化中人与自然、人与人之间的和谐关系。
            </p>
            <Link href="/culture" className="btn-primary text-lg px-8 py-3">
              探索茶文化
            </Link>
          </motion.div>

          {/* 右侧特色 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cultureFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="card p-6 h-full text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <span className="text-2xl">🍃</span>
            <span className="text-lg">茶韵雅集，传承千年茶文化</span>
            <span className="text-2xl">🍃</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 