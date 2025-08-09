'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface BrewingTip {
  id: string
  tea_type: string
  title: string
  temperature: string
  time: string
  ratio: string
  steps: string[]
  tips: string[]
  teaware: string[]
}

export default function BrewingContent() {
  const [selectedTeaType, setSelectedTeaType] = useState<string>('green')

  const brewingTips: BrewingTip[] = [
    {
      id: '1',
      tea_type: 'green',
      title: '绿茶冲泡技巧',
      temperature: '75-85°C',
      time: '2-3分钟',
      ratio: '1:50 (茶叶:水)',
      steps: [
        '准备茶具：玻璃杯或盖碗',
        '温杯：用热水冲洗茶具',
        '投茶：取3-5克茶叶',
        '注水：用75-85°C的热水',
        '浸泡：2-3分钟后即可品饮'
      ],
      tips: [
        '水温不宜过高，避免烫伤茶叶',
        '绿茶不宜久泡，以免苦涩',
        '可多次冲泡，每次时间递增'
      ],
      teaware: ['玻璃杯', '盖碗', '公道杯']
    },
    {
      id: '2',
      tea_type: 'oolong',
      title: '乌龙茶冲泡技巧',
      temperature: '90-95°C',
      time: '3-5分钟',
      ratio: '1:30 (茶叶:水)',
      steps: [
        '准备茶具：紫砂壶或盖碗',
        '温壶：用热水冲洗茶具',
        '投茶：取5-8克茶叶',
        '洗茶：快速冲洗茶叶',
        '注水：用90-95°C的热水',
        '浸泡：3-5分钟后品饮'
      ],
      tips: [
        '乌龙茶需要洗茶，去除杂质',
        '可多次冲泡，每次时间递增',
        '注意控制水温，避免过烫'
      ],
      teaware: ['紫砂壶', '盖碗', '品茗杯']
    },
    {
      id: '3',
      tea_type: 'black',
      title: '红茶冲泡技巧',
      temperature: '90-95°C',
      time: '3-5分钟',
      ratio: '1:40 (茶叶:水)',
      steps: [
        '准备茶具：瓷壶或盖碗',
        '温壶：用热水冲洗茶具',
        '投茶：取3-5克茶叶',
        '注水：用90-95°C的热水',
        '浸泡：3-5分钟后品饮'
      ],
      tips: [
        '红茶可加糖或牛奶',
        '适合早餐或下午茶',
        '可多次冲泡'
      ],
      teaware: ['瓷壶', '盖碗', '茶杯']
    },
    {
      id: '4',
      tea_type: 'pu-erh',
      title: '普洱茶冲泡技巧',
      temperature: '95-100°C',
      time: '5-10分钟',
      ratio: '1:25 (茶叶:水)',
      steps: [
        '准备茶具：紫砂壶或盖碗',
        '温壶：用热水冲洗茶具',
        '投茶：取5-8克茶叶',
        '洗茶：快速冲洗茶叶',
        '注水：用95-100°C的热水',
        '浸泡：5-10分钟后品饮'
      ],
      tips: [
        '普洱茶需要洗茶',
        '可多次冲泡，越泡越香',
        '注意控制浸泡时间'
      ],
      teaware: ['紫砂壶', '盖碗', '品茗杯']
    },
    {
      id: '5',
      tea_type: 'white',
      title: '白茶冲泡技巧',
      temperature: '80-85°C',
      time: '3-5分钟',
      ratio: '1:50 (茶叶:水)',
      steps: [
        '准备茶具：玻璃杯或盖碗',
        '温杯：用热水冲洗茶具',
        '投茶：取3-5克茶叶',
        '注水：用80-85°C的热水',
        '浸泡：3-5分钟后品饮'
      ],
      tips: [
        '白茶清淡，不宜久泡',
        '可多次冲泡',
        '注意水温控制'
      ],
      teaware: ['玻璃杯', '盖碗', '公道杯']
    }
  ]

  const teaTypes = [
    { id: 'green', name: '绿茶', icon: '🍃' },
    { id: 'oolong', name: '乌龙茶', icon: '🌿' },
    { id: 'black', name: '红茶', icon: '☕' },
    { id: 'pu-erh', name: '普洱茶', icon: '🍂' },
    { id: 'white', name: '白茶', icon: '🌸' }
  ]

  const currentTip = brewingTips.find(tip => tip.tea_type === selectedTeaType)

  return (
    <div className="space-y-8">
      {/* 茶类选择 */}
      <div className="flex flex-wrap gap-3">
        {teaTypes.map((teaType) => (
          <button
            key={teaType.id}
            onClick={() => setSelectedTeaType(teaType.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              selectedTeaType === teaType.id
                ? 'bg-tea-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{teaType.icon}</span>
            <span className="font-medium">{teaType.name}</span>
          </button>
        ))}
      </div>

      {/* 冲泡技巧详情 */}
      {currentTip && (
        <motion.div
          key={currentTip.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* 基本信息 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {currentTip.title}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400 font-medium">水温：</span>
                <span className="text-gray-700 dark:text-gray-300">{currentTip.temperature}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400 font-medium">时间：</span>
                <span className="text-gray-700 dark:text-gray-300">{currentTip.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-tea-600 dark:text-tea-400 font-medium">比例：</span>
                <span className="text-gray-700 dark:text-gray-300">{currentTip.ratio}</span>
              </div>
            </div>

            {/* 推荐茶具 */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                推荐茶具
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentTip.teaware.map((item) => (
                  <span
                    key={item}
                    className="inline-flex px-3 py-1 text-sm bg-tea-100 dark:bg-tea-900/20 text-tea-800 dark:text-tea-200 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 冲泡步骤 */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                冲泡步骤
              </h3>
              <ol className="space-y-3">
                {currentTip.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-tea-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                注意事项
              </h3>
              <ul className="space-y-2">
                {currentTip.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-tea-600 dark:text-tea-400 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* 通用泡茶知识 */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          通用泡茶知识
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">水质选择</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              泡茶用水以软水为佳，如矿泉水、纯净水。避免使用硬水，以免影响茶汤口感。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">茶具清洁</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              茶具使用前要彻底清洁，避免异味影响茶汤品质。紫砂壶需要养壶。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">茶叶储存</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              茶叶应存放在干燥、阴凉、无异味的环境中，避免阳光直射和高温。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">品茶环境</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              品茶环境应安静、整洁，避免异味干扰。可播放轻音乐营造氛围。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 