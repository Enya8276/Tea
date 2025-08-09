'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutContent() {
  return (
    <div className="space-y-12">
      {/* 品牌故事 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              茶韵雅集 - 传承千年茶文化
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              茶韵雅集成立于2020年，是一家专注于中国茶文化传承与推广的茶叶电商平台。我们致力于为茶友提供优质的茶叶、精美的茶具，以及丰富的茶文化知识。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们精选全国各大茶区的优质茶叶，从西湖龙井到武夷岩茶，从云南普洱到安溪铁观音，每一款茶叶都经过严格的质量把控，确保为您带来最纯正的茶香。
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              同时，我们也为国际友人提供了解中国茶文化的窗口，让更多人感受到东方茶道的魅力。
            </p>
          </div>
          <div className="w-full h-64 bg-gradient-to-br from-tea-100 to-tea-200 dark:from-tea-900/20 dark:to-tea-800/20 rounded-lg flex items-center justify-center">
            <span className="text-6xl">🍃</span>
          </div>
        </div>
      </motion.div>

      {/* 我们的使命 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-tea-100 dark:bg-tea-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            我们的使命
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            传承千年茶文化，让更多人品味到东方茶韵的独特魅力
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-tea-100 dark:bg-tea-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌟</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            我们的愿景
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            成为全球领先的茶文化传播平台，让中国茶文化走向世界
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-tea-100 dark:bg-tea-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💎</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            我们的价值观
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            品质至上，文化传承，诚信经营，服务至上
          </p>
        </div>
      </motion.div>

      {/* 核心优势 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          我们的核心优势
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tea-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  优质茶叶源头直供
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  与各大茶区建立直接合作关系，确保茶叶品质和价格优势
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tea-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  专业茶艺师团队
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  拥有专业的茶艺师团队，为您提供专业的茶文化咨询
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tea-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  严格质量把控
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  每款茶叶都经过严格的质量检测，确保安全健康
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tea-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  丰富的茶文化内容
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  提供丰富的茶文化知识和冲泡技巧，让您深入了解茶文化
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tea-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  优质客户服务
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  7×24小时客服支持，为您提供贴心的购物体验
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tea-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">6</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  国际化服务
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  支持多语言服务，为国际友人提供便捷的购物体验
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 联系我们 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          联系我们
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              联系方式
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">📧</span>
                <span className="text-gray-600 dark:text-gray-300">邮箱：contact@teaculture.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">📞</span>
                <span className="text-gray-600 dark:text-gray-300">电话：400-888-8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">📍</span>
                <span className="text-gray-600 dark:text-gray-300">地址：杭州市西湖区茶文化街88号</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">🕒</span>
                <span className="text-gray-600 dark:text-gray-300">营业时间：周一至周日 9:00-21:00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              关注我们
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">📱</span>
                <span className="text-gray-600 dark:text-gray-300">微信公众号：茶韵雅集</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">🎵</span>
                <span className="text-gray-600 dark:text-gray-300">抖音号：茶韵雅集官方</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">📺</span>
                <span className="text-gray-600 dark:text-gray-300">小红书：茶韵雅集</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400">🌐</span>
                <span className="text-gray-600 dark:text-gray-300">官网：www.teaculture.com</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 行动召唤 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <div className="card p-8 bg-gradient-to-r from-tea-50 to-tea-100 dark:from-tea-900/20 dark:to-tea-800/20">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            开始您的茶文化之旅
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            立即体验我们的优质茶叶和茶具，感受东方茶韵的独特魅力
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tea" className="btn-primary">
              浏览茶叶
            </Link>
            <Link href="/teaware" className="btn-secondary">
              浏览茶具
            </Link>
            <Link href="/culture" className="btn-secondary">
              了解茶文化
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 