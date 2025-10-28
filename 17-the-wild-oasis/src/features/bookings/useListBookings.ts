import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/api/apiBookings'

export const useListBookings = () => {
  const { isLoading: isLoadingBookings, data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  })

  return { isLoadingBookings, bookings }
}
