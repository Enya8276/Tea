'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/components/supabase-provider'
import Link from 'next/link'

interface ProfileData {
  email: string | null
  userId: string | null
}

export default function ProfileContent() {
  const { user, supabase } = useSupabase()
  const [profile, setProfile] = useState<ProfileData>({ email: null, userId: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProfile({ email: user?.email ?? null, userId: user?.id ?? null })
    setLoading(false)
  }, [user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    // Next.js App Router will re-render via provider state change
  }

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔐</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">请先登录</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">登录后即可查看和管理您的账户信息</p>
        <Link href="/auth" className="btn-primary">前往登录</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">账户信息</h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><span className="font-medium">用户ID：</span>{profile.userId}</p>
          <p><span className="font-medium">邮箱：</span>{profile.email}</p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Link href="/orders" className="btn-secondary">查看订单</Link>
          <button onClick={handleSignOut} className="btn-primary">退出登录</button>
        </div>
      </div>
    </div>
  )
}

 