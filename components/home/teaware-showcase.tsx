'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const teawareItems = [
  {
    name: '紫砂壶',
    englishName: 'Yixing Teapot',
    description: '宜兴紫砂壶，透气性好，适合泡乌龙茶和普洱茶',
    price: '¥299起',
    image: '🏺',
    category: '茶壶',
    features: ['透气性好', '越用越香', '传统工艺']
  },
  {
    name: '盖碗',
    englishName: 'Gaiwan',
    description: '白瓷盖碗，适合泡绿茶和花茶，便于观茶色',
    price: '¥89起',
    image: '🍵',
    category: '茶具',
    features: ['便于观色', '清洗方便', '适合多种茶']
  },
  {
    name: '品茗杯',
    englishName: 'Tea Cup',
    description: '精致品茗杯，提升品茶体验，感受茶香',
    price: '¥39起',
    image: '☕',
    category: '茶杯',
    features: ['精致美观', '手感舒适', '提升体验']
  },
  {
    name: '茶盘',
    englishName: 'Tea Tray',
    description: '实木茶盘，收纳茶具，营造品茶氛围',
    price: '¥199起',
    image: '🪵',
    category: '茶盘',
    features: ['实木材质', '收纳方便', '营造氛围']
  }
]

export default function TeawareShowcase() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            精美茶具
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            精选传统工艺茶具，让每一次品茶都成为艺术享受
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teawareItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href="/teaware">
                <div className="card overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative aspect-square bg-gradient-to-br from-brown-100 to-brown-200 dark:from-brown-900/20 dark:to-brown-800/20 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {item.image}
                    </span>
                    <div className="absolute top-2 left-2 bg-tea-600 text-white text-xs px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="text-xs bg-tea-100 dark:bg-tea-900/20 text-tea-800 dark:text-tea-200 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                        {item.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        查看详情 →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/teaware" className="btn-primary text-lg px-8 py-3">
            浏览更多茶具
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 