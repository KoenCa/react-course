import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const CABIN_IMAGES_BUCKET_NAME = 'cabin-images'
export const AVATARS_BUCKET_NAME = 'avatars'

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
