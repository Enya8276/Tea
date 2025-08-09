import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type CheckoutItem = {
  id: string
  name: string
  quantity: number
  price: number
  sale_price?: number | null
  type: 'tea' | 'teaware'
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)')
  }
  return createClient(url, serviceKey)
}

function generateOrderNumber(): string {
  const now = new Date()
  const yyyy = now.getFullYear().toString()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return `TEA${yyyy}${mm}${dd}${rand}`
}

export async function POST(req: Request) {
  try {
    const { userId, shippingAddress, items } = (await req.json()) as {
      userId?: string
      shippingAddress?: Record<string, any>
      items?: CheckoutItem[]
    }

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Ensure customer exists
    const { data: existingCustomer, error: findCustomerError } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (findCustomerError) {
      return NextResponse.json({ error: findCustomerError.message }, { status: 500 })
    }

    let customerId = existingCustomer?.id as string | undefined
    if (!customerId) {
      const { data: newCustomer, error: insertCustomerError } = await supabase
        .from('customers')
        .insert({ user_id: userId, shipping_address: shippingAddress ?? null })
        .select('id')
        .single()
      if (insertCustomerError || !newCustomer) {
        return NextResponse.json({ error: insertCustomerError?.message || 'Failed to create customer' }, { status: 500 })
      }
      customerId = newCustomer.id
    }

    // Compute totals
    const lineTotals = items.map((it) => (it.sale_price ?? it.price) * it.quantity)
    const subtotal = Number(lineTotals.reduce((sum, v) => sum + v, 0).toFixed(2))
    const shippingAmount = 0
    const taxAmount = 0
    const totalAmount = Number((subtotal + shippingAmount + taxAmount).toFixed(2))

    const orderNumber = generateOrderNumber()

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        status: 'pending',
        subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        total_amount: totalAmount,
        payment_status: 'pending',
        shipping_address: shippingAddress ?? null,
      })
      .select('id, order_number')
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: orderError?.message || 'Failed to create order' }, { status: 500 })
    }

    // Prepare order items
    const orderItems = items.map((it) => ({
      order_id: order.id,
      product_type: it.type,
      tea_product_id: it.type === 'tea' ? it.id : null,
      teaware_product_id: it.type === 'teaware' ? it.id : null,
      product_name: it.name,
      quantity: it.quantity,
      unit_price: Number((it.sale_price ?? it.price).toFixed(2)),
      total_price: Number(((it.sale_price ?? it.price) * it.quantity).toFixed(2)),
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }

    return NextResponse.json({ orderId: order.id, orderNumber: order.order_number }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('user_id')
    if (!userId) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle()

    if (customerError) {
      return NextResponse.json({ error: customerError.message }, { status: 500 })
    }
    if (!customer) {
      return NextResponse.json({ orders: [] }, { status: 200 })
    }

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, order_number, status, total_amount, created_at')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })

    if (ordersError) {
      return NextResponse.json({ error: ordersError.message }, { status: 500 })
    }

    // Fetch items per order (simple N+1 for clarity here)
    const results = [] as any[]
    for (const o of orders ?? []) {
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('id, product_name, quantity, unit_price, product_type')
        .eq('order_id', o.id)

      if (itemsError) {
        return NextResponse.json({ error: itemsError.message }, { status: 500 })
      }

      results.push({
        id: o.id,
        order_number: o.order_number,
        status: o.status,
        total_amount: Number(o.total_amount),
        created_at: o.created_at,
        items: (items ?? []).map((it) => ({
          id: it.id,
          product_name: it.product_name,
          quantity: it.quantity,
          price: Number(it.unit_price),
          product_type: it.product_type as 'tea' | 'teaware',
        })),
      })
    }

    return NextResponse.json({ orders: results }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}


