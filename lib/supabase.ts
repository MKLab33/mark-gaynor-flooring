import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface BookingRow {
  id?: number
  floor_type: string
  service_type: string
  area_sqm: string
  name: string
  phone: string
  email: string
  message?: string
  created_at?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: SupabaseClient<any> | null = null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabase(): SupabaseClient<any> {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase env vars not configured.')
    _client = createClient(url, key)
  }
  return _client
}
