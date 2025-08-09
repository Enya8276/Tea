import { Suspense } from 'react'
import OrdersContent from '@/components/orders/orders-content'

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            我的订单
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            查看历史订单与物流状态
          </p>
        </div>

        <Suspense fallback={<div>加载中...</div>}>
          <OrdersContent />
        </Suspense>
      </div>
    </div>
  )
}

 