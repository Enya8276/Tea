import { Suspense } from 'react'
import CultureContent from '@/components/culture/culture-content'

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            茶文化
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            探索中国茶文化的深厚底蕴与历史传承
          </p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <CultureContent />
        </Suspense>
      </div>
    </div>
  )
} 