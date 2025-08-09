'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart/cart-provider'
import { useSupabase } from '@/components/supabase-provider'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ShippingAddress {
  name: string
  phone: string
  address: string
  city: string
  postal_code: string
}

export default function CheckoutContent() {
  const router = useRouter()
  const { state: cartState, dispatch } = useCart()
  const { user } = useSupabase()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/checkout')
      return
    }

    if (cartState.items.length === 0) {
      router.push('/cart')
      return
    }

    // 从用户信息中预填充地址
    if (user.user_metadata) {
      setShippingAddress({
        name: user.user_metadata.name || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || '',
        city: user.user_metadata.city || '',
        postal_code: user.user_metadata.postal_code || ''
      })
    }
  }, [user, cartState.items.length, router])

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address) {
        alert('请填写完整的收货信息')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (!selectedPaymentMethod) {
        alert('请选择支付方式')
        return
      }
      setCurrentStep(3)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch({ type: 'CLEAR_CART' })
      router.push('/orders')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('订单创建失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔐</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          请先登录
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          登录后可以继续结算
        </p>
        <Link href="/auth?redirect=/checkout" className="btn-primary">
          立即登录
        </Link>
      </div>
    )
  }

  if (cartState.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          购物车是空的
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          请先添加商品到购物车
        </p>
        <Link href="/tea" className="btn-primary">
          去购物
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 结算步骤 */}
      <div className="lg:col-span-2 space-y-6">
        {/* 步骤指示器 */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-tea-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step ? 'bg-tea-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* 步骤内容 */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              收货地址
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  收货人姓名 *
                </label>
                <input
                  type="text"
                  value={shippingAddress.name}
                  onChange={(e) => handleAddressChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="请输入收货人姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  手机号码 *
                </label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => handleAddressChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="请输入手机号码"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  详细地址 *
                </label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) => handleAddressChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="请输入详细地址"
                />
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              选择支付方式
            </h2>
            <div className="space-y-3">
              {[
                { id: 'alipay', name: '支付宝', description: '推荐使用支付宝支付', icon: '💳' },
                { id: 'wechat', name: '微信支付', description: '使用微信扫码支付', icon: '📱' },
                { id: 'card', name: '银行卡', description: '支持各大银行储蓄卡和信用卡', icon: '🏦' }
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPaymentMethod === method.id
                      ? 'border-tea-600 bg-tea-50 dark:bg-tea-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-tea-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              订单确认
            </h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">收货地址</h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-900 dark:text-white">
                  {shippingAddress.name} {shippingAddress.phone}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {shippingAddress.address}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">商品清单</h3>
              <div className="space-y-3">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-lg">
                          {item.type === 'tea' ? '🍃' : '🏺'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          数量：{item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ¥{(item.sale_price || item.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 步骤导航 */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handlePreviousStep}
              className="btn-secondary px-6 py-3"
            >
              上一步
            </button>
          )}
          <div className="ml-auto">
            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                className="btn-primary px-6 py-3"
              >
                下一步
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '处理中...' : '提交订单'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 订单摘要 */}
      <div className="lg:col-span-1">
        <div className="card p-6 sticky top-24">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            订单摘要
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">商品数量</span>
              <span className="font-medium">{cartState.itemCount} 件</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">商品总价</span>
              <span className="font-medium">¥{cartState.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">运费</span>
              <span className="font-medium">¥0</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  总计
                </span>
                <span className="text-lg font-bold text-tea-600 dark:text-tea-400">
                  ¥{cartState.total}
                </span>
              </div>
            </div>
          </div>

          <Link href="/cart" className="w-full btn-secondary py-3 block text-center">
            返回购物车
          </Link>
        </div>
      </div>
    </div>
  )
} 