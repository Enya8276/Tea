import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-tea-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">茶</span>
              </div>
              <span className="text-xl font-bold">茶韵雅集</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              传承千年茶文化，品味东方茶韵。我们致力于为茶爱好者提供优质的茶叶和茶具，
              传播中国茶文化知识，让更多人感受茶文化的魅力。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-tea-400 transition-colors">
                <span className="sr-only">微信</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M15.5,13.5A1.5,1.5 0 0,1 14,12A1.5,1.5 0 0,1 15.5,10.5A1.5,1.5 0 0,1 17,12A1.5,1.5 0 0,1 15.5,13.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-tea-400 transition-colors">
                <span className="sr-only">微博</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.5,6.75C17.5,6.75 18.25,7.5 18.25,8.5C18.25,9.5 17.5,10.25 16.5,10.25C15.5,10.25 14.75,9.5 14.75,8.5C14.75,7.5 15.5,6.75 16.5,6.75M7.5,6.75C8.5,6.75 9.25,7.5 9.25,8.5C9.25,9.5 8.5,10.25 7.5,10.25C6.5,10.25 5.75,9.5 5.75,8.5C5.75,7.5 6.5,6.75 7.5,6.75M12,18C10,18 8.5,16.5 8.5,14.5H15.5C15.5,16.5 14,18 12,18Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tea" className="text-gray-300 hover:text-tea-400 transition-colors">
                  茶叶产品
                </Link>
              </li>
              <li>
                <Link href="/teaware" className="text-gray-300 hover:text-tea-400 transition-colors">
                  茶具产品
                </Link>
              </li>
              <li>
                <Link href="/culture" className="text-gray-300 hover:text-tea-400 transition-colors">
                  茶文化
                </Link>
              </li>
              <li>
                <Link href="/brewing" className="text-gray-300 hover:text-tea-400 transition-colors">
                  泡茶技巧
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-300">
              <li>客服热线：400-888-8888</li>
              <li>邮箱：contact@teaculture.com</li>
              <li>地址：中国杭州市西湖区</li>
              <li>营业时间：9:00-18:00</li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 茶韵雅集. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
} 