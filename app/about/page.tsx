import { Suspense } from 'react'
import AboutContent from '@/components/about/about-content'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            关于我们
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            传承千年茶文化，品味东方茶韵
          </p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <AboutContent />
        </Suspense>
      </div>
    </div>
  )
} 