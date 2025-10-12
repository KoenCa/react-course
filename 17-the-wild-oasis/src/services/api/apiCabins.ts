import type { Database } from '../supabase/database.types'
import {
  CABIN_IMAGES_BUCKET_NAME,
  supabase,
  supabaseUrl,
} from '../supabase/supabase'

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

  // 1. Get public URL for the image that will be uploaded
  const {
    data: { publicUrl: publicCabinImageUrl },
  } = supabase.storage.from(CABIN_IMAGES_BUCKET_NAME).getPublicUrl(imageName)

  // 2. Create Cabin with public image URL
  const { data: insertedCabin, error } = await supabase
    .from('Cabins')
    .insert([{ ...newCabin, image: publicCabinImageUrl }])
    .select()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  // 3. Upload image
  const { error: storageError } = await supabase.storage
    .from(CABIN_IMAGES_BUCKET_NAME)
    .upload(imageName, newCabin.image)

  // 4. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from('Cabins').delete().eq('id', insertedCabin[0].id)

    console.error(storageError)
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
