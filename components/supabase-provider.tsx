'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'

type SupabaseContext = {
  supabase: SupabaseClient | null
  user: User | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [user, setUser] = useState<User | null>(null)

  // Lazily create the client on the client-side only to avoid build-time env requirements
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (url && key) {
      const client = createClient(url, key)
      setSupabase(client)
    } else {
      // Missing envs: keep supabase null; UI will render but no auth/data until env configured
      console.warn('Supabase env variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
    }
  }, [])

  useEffect(() => {
    if (!supabase) return
    let isMounted = true

    const syncUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (isMounted) setUser(user)
    }

    syncUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) setUser(session?.user ?? null)
      }
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <Context.Provider value={{ supabase, user }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}