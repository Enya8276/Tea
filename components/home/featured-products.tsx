'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const featuredProducts = [
  {
    name: '西湖龙井',
    englishName: 'West Lake Longjing',
    category: '绿茶',
    price: 299,
    originalPrice: 399,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 128,
    isNew: true
  },
  {
    name: '正山小种',
    englishName: 'Lapsang Souchong',
    category: '红茶',
    price: 159,
    originalPrice: 199,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 95,
    isNew: false
  },
  {
    name: '铁观音',
    englishName: 'Tieguanyin',
    category: '乌龙茶',
    price: 399,
    originalPrice: 499,
    image: '/api/placeholder/300/300',
    rating: 4.9,
    reviews: 156,
    isNew: true
  },
  {
    name: '白瓷盖碗',
    englishName: 'White Porcelain Gaiwan',
    category: '茶具',
    price: 89,
    originalPrice: 129,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 89,
    isNew: false
  }
]

export default function FeaturedProducts() {
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
            精选推荐
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            我们精心挑选的优质茶叶和茶具，为您带来最纯正的茶文化体验
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/product/${product.name}`}>
                <div className="card overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                    <div className="w-full h-full bg-gradient-to-br from-tea-100 to-brown-100 flex items-center justify-center">
                      <span className="text-4xl">🍃</span>
                    </div>
                    
                    {product.isNew && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        新品
                      </div>
                    )}
                    
                    <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                      ⭐ {product.rating}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-xs text-tea-600 dark:text-tea-400 mb-1">
                      {product.category}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {product.englishName}
                    </p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                        ¥{product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ¥{product.originalPrice}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {product.reviews} 条评价
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
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products" className="btn-primary text-lg px-8 py-3">
            浏览所有产品
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 