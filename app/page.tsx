import Hero from '@/components/home/hero'
import TeaCategories from '@/components/home/tea-categories'
import TeawareShowcase from '@/components/home/teaware-showcase'
import CultureSection from '@/components/home/culture-section'
import BrewingTips from '@/components/home/brewing-tips'
import FeaturedProducts from '@/components/home/featured-products'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <Hero />
      
      {/* 六大茶类介绍 */}
      <TeaCategories />
      
      {/* 茶具展示 */}
      <TeawareShowcase />
      
      {/* 茶文化介绍 */}
      <CultureSection />
      
      {/* 泡茶技巧 */}
      <BrewingTips />
      
      {/* 推荐产品 */}
      <FeaturedProducts />
    </div>
  )
} 