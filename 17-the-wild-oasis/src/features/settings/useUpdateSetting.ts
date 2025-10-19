import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateSetting as updateSettingApi } from '../../services/api/apiSettings'

export const useUpdateSetting = () => {
  const queryClient = useQueryClient()

  const { isPending: isUpdatingSetting, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully updated')
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onError: error => toast.error(error.message),
  })

  return { isUpdatingSetting, updateSetting }
}
