import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCabin as updateCabinApi } from '../../services/api/apiCabins'

export const useUpdateCabin = () => {
  const queryClient = useQueryClient()

  const { isPending: isUpdatingCabin, mutate: updateCabin } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: error => toast.error(error.message),
  })

  return { isUpdatingCabin, updateCabin }
}
