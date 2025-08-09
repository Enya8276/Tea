import { createClient } from '@supabase/supabase-js'

// Lazily create a singleton in runtime; avoid throwing during build if envs are absent
let supabaseSingleton: ReturnType<typeof createClient> | null = null
export const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (url && key) {
    if (!supabaseSingleton) {
      supabaseSingleton = createClient(url, key)
    }
    return supabaseSingleton
  }
  // Fallback dummy client: will cause queries to fail gracefully if used before envs set
  // but prevents build-time crashes
  return null as unknown as ReturnType<typeof createClient>
})()

// 数据库类型定义
export interface TeaCategory {
  id: string
  name: string
  english_name: string
  description: string
  slug: string
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TeaProduct {
  id: string
  name: string
  english_name: string
  category_id: string
  origin_region: string
  harvest_season: string
  processing_method: string
  price: number
  sale_price: number | null
  stock_quantity: number
  sku: string
  images: any
  description: string
  brewing_guide: any
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TeawareCategory {
  id: string
  name: string
  english_name: string
  description: string
  slug: string
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TeawareProduct {
  id: string
  name: string
  english_name: string
  category_id: string
  material: string
  capacity: number | null
  price: number
  sale_price: number | null
  stock_quantity: number
  sku: string
  images: any
  description: string
  usage_guide: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
} 