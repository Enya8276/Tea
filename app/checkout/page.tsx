import { Suspense } from 'react'
import CheckoutContent from '@/components/checkout/checkout-content'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            结算
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            确认订单信息并完成支付
          </p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  )
} 