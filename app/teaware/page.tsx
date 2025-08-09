import { Suspense } from 'react'
import TeawareList from '@/components/teaware/teaware-list'
import TeawareFilters from '@/components/teaware/teaware-filters'

export default function TeawarePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            茶具产品
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            精选传统工艺茶具，传承东方美学
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏过滤器 */}
          <div className="lg:col-span-1">
            <TeawareFilters />
          </div>

          {/* 产品列表 */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>加载中...</div>}>
              <TeawareList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 