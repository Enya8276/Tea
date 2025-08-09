import { Suspense } from 'react'
import TeawareDetail from '@/components/teaware/teaware-detail'
import RelatedTeawares from '@/components/teaware/related-teawares'

interface TeawareDetailPageProps {
  params: {
    id: string
  }
}

export default function TeawareDetailPage({ params }: TeawareDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <Suspense fallback={<div>加载中...</div>}>
          <TeawareDetail teawareId={params.id} />
        </Suspense>
        
        <div className="mt-16">
          <Suspense fallback={<div>加载中...</div>}>
            <RelatedTeawares currentTeawareId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 