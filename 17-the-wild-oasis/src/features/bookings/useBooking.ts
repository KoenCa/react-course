import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/api/apiBookings'

export const useBooking = (id: number | null | undefined) => {
  if (!id) return { isLoading: false, error: null, booking: null }

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
    retry: false,
  })

  return {
    isLoading,
    error,
    booking,
  }
}
