'use client'

import { useState } from 'react'
import { useSupabase } from '@/components/supabase-provider'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { supabase } = useSupabase()
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!email || !password) {
      setMessage({ type: 'error', text: '邮箱和密码不能为空' })
      setLoading(false)
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage({ type: 'error', text: '两次输入的密码不一致' })
      setLoading(false)
      return
    }

    try {
      let authResponse
      if (isLogin) {
        authResponse = await supabase.auth.signInWithPassword({ email, password })
      } else {
        authResponse = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
      }

      if (authResponse.error) {
        setMessage({ type: 'error', text: authResponse.error.message })
      } else {
        if (isLogin) {
          setMessage({ type: 'success', text: '登录成功！即将跳转到个人中心...' })
          setTimeout(() => {
            router.push('/profile')
          }, 1500)
        } else {
          setMessage({ type: 'success', text: '注册成功！请检查您的邮箱以完成验证。' })
        }
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '发生未知错误' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-8 shadow-lg"
    >
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {isLogin ? '登录您的账户' : '创建新账户'}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {isLogin ? '或 ' : '已有账户？'}
        <button
          onClick={() => {
            setIsLogin(!isLogin)
            setMessage(null)
            setEmail('')
            setPassword('')
            setConfirmPassword('')
          }}
          className="font-medium text-tea-600 hover:text-tea-500 dark:text-tea-400 dark:hover:text-tea-300"
        >
          {isLogin ? '注册新账户' : '立即登录'}
        </button>
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleAuth}>
        <div>
          <label htmlFor="email-address" className="sr-only">
            邮箱地址
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:z-10 focus:border-tea-500 focus:outline-none focus:ring-tea-500"
            placeholder="邮箱地址"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            密码
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:z-10 focus:border-tea-500 focus:outline-none focus:ring-tea-500"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              确认密码
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:z-10 focus:border-tea-500 focus:outline-none focus:ring-tea-500"
              placeholder="确认密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              message.type === 'error'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-tea-600 py-2 px-4 text-sm font-medium text-white hover:bg-tea-700 focus:outline-none focus:ring-2 focus:ring-tea-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={loading}
          >
            {loading ? '处理中...' : isLogin ? '登录' : '注册'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}