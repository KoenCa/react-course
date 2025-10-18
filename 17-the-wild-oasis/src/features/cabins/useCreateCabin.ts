import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin as createCabinApi } from '../../services/api/apiCabins'
import toast from 'react-hot-toast'

export const useCreateCabin = () => {
  const queryClient = useQueryClient()

  const { isPending: isCreatingCabin, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success('New Cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: error => toast.error(error.message),
  })

  return { isCreatingCabin, createCabin }
}
