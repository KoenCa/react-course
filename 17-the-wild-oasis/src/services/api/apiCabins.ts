import { supabase } from '../supabase/supabase'

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from('Cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return cabins
}

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }

  return data
}
