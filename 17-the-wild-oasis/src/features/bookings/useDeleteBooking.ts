import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingApi } from '../../services/api/apiBookings'
import toast from 'react-hot-toast'

export const useDeleteBooking = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteBooking,
    isPending: isDeletingBooking,
    error: deleteBookingError,
  } = useMutation({
    mutationFn: (bookingId: number) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success('Booking successfully deleted!')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: error => toast.error(error.message),
  })

  return { deleteBooking, isDeletingBooking, deleteBookingError }
}
