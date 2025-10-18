import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/api/apiCabins'

export const useListCabins = () => {
  const { isLoading: isLoadingCabins, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  return { isLoadingCabins, cabins }
}
