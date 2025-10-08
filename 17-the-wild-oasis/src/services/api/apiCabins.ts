import { supabase } from '../supabase/supabase'

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from('Cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return cabins
}

