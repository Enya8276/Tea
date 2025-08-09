import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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