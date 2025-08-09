import { Suspense } from 'react'
import SearchResults from '@/components/search/search-results'

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            搜索结果
          </h1>
          {query && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              搜索关键词：<span className="font-medium text-tea-600 dark:text-tea-400">"{query}"</span>
            </p>
          )}
        </div>

        <Suspense fallback={<div>搜索中...</div>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
} 