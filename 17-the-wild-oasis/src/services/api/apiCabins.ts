import type { Database } from '../supabase/database.types'
import { supabase, supabaseUrl } from '../supabase/supabase'

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from('Cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return cabins
}

export const createCabin = async (
  newCabin: Database['public']['Tables']['Cabins']['Insert'] & { image: File }
) => {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // https://luttuwzpgsetpqmlgmjx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create Cabin
  const { data: insertedCabin, error } = await supabase
    .from('Cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  // 2. Upload image
  const { data, error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await deleteCabin(insertedCabin[0].id)

    console.error(error)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    )
  }

  return insertedCabin
}

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }

  return data
}
