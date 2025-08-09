import { Suspense } from 'react'
import TeaDetail from '@/components/tea/tea-detail'
import RelatedTeas from '@/components/tea/related-teas'

interface TeaDetailPageProps {
  params: {
    id: string
  }
}

export default function TeaDetailPage({ params }: TeaDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <Suspense fallback={<div>加载中...</div>}>
          <TeaDetail teaId={params.id} />
        </Suspense>
        
        <div className="mt-16">
          <Suspense fallback={<div>加载中...</div>}>
            <RelatedTeas currentTeaId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 