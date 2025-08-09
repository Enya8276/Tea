import { Suspense } from 'react'
import ProfileContent from '@/components/profile/profile-content'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            个人中心
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            查看与管理您的账户信息
          </p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <ProfileContent />
        </Suspense>
      </div>
    </div>
  )
}

 