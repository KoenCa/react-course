import type { Database } from '../supabase/database.types'
import { CABIN_IMAGES_BUCKET_NAME, supabase } from '../supabase/supabase'

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from('Cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return cabins
}

export const createCabin = async (
  newCabin: Omit<Database['public']['Tables']['Cabins']['Insert'], 'image'> & {
    image: File
  }
) => {
  // 1. Create image name and get public URL for the image that will be uploaded
  const imageName = getSupabaseStorageImageName(newCabin.image)
  const imagePath = getPublicCabinImageUrl(imageName)

  // 2. Create Cabin
  const { data: createdCabin, error } = await supabase
    .from('Cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  // 3. Upload image
  const { error: storageError } = await uploadCabinImage(
    imageName,
    newCabin.image
  )

  // 4. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from('Cabins').delete().eq('id', createdCabin.id)

    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    )
  }

  return createdCabin
}

export const updateCabin = async ({
  updatedCabin,
  id,
}: {
  updatedCabin: Omit<
    Database['public']['Tables']['Cabins']['Update'],
    'image'
  > & {
    image: File | string
  }
  id: number
}) => {
  let supabaseResult

  // No new image has been uploaded
  if (typeof updatedCabin.image === 'string') {
    supabaseResult = await supabase
      .from('Cabins')
      .update({ ...updatedCabin, image: updatedCabin.image })
      .eq('id', id)
      .select()
      .single()
  } else {
    // New image has been uploaded, upload it to Supabase storage and add it to cabin with other updated fields
    const imageName = getSupabaseStorageImageName(updatedCabin.image)
    const imagePath = getPublicCabinImageUrl(imageName)

    const { error: storageError } = await uploadCabinImage(
      imageName,
      updatedCabin.image
    )

    if (storageError)
      throw new Error(
        'Cabin image could not be uploaded, cabin update is canceled.'
      )

    supabaseResult = await supabase
      .from('Cabins')
      .update({ ...updatedCabin, image: imagePath })
      .eq('id', id)
      .select()
      .single()
  }

  if (supabaseResult.error) throw new Error('Cabin could not be updated')

  return supabaseResult.data
}

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }

  return data
}

const getSupabaseStorageImageName = (image: File) =>
  `${Math.random()}-${image.name}`.replaceAll('/', '')

const getPublicCabinImageUrl = (imageName: string) =>
  supabase.storage.from(CABIN_IMAGES_BUCKET_NAME).getPublicUrl(imageName).data
    .publicUrl

const uploadCabinImage = (imageName: string, imageFile: File) =>
  supabase.storage.from(CABIN_IMAGES_BUCKET_NAME).upload(imageName, imageFile)
