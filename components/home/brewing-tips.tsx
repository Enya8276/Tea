'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const brewingTips = [
  {
    title: '水温控制',
    description: '不同茶类需要不同的水温，绿茶宜用75-85°C，红茶宜用90-95°C',
    icon: '🌡️',
    color: 'from-blue-400 to-blue-600'
  },
  {
    title: '投茶量',
    description: '一般比例为1:50，即1克茶叶配50毫升水，可根据个人喜好调整',
    icon: '⚖️',
    color: 'from-green-400 to-green-600'
  },
  {
    title: '浸泡时间',
    description: '绿茶2-3分钟，红茶3-5分钟，乌龙茶3-5分钟，可根据茶品调整',
    icon: '⏰',
    color: 'from-orange-400 to-orange-600'
  },
  {
    title: '茶具选择',
    description: '不同茶类适合不同茶具，绿茶宜用玻璃杯，乌龙茶宜用紫砂壶',
    icon: '🏺',
    color: 'from-purple-400 to-purple-600'
  }
]

export default function BrewingTips() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            泡茶技巧
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            掌握正确的泡茶方法，让每一杯茶都散发出最纯正的香气
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brewingTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="card p-6 h-full text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${tip.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{tip.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
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
          <Link href="/brewing" className="btn-primary text-lg px-8 py-3">
            了解更多泡茶技巧
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 