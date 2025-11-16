import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/api/apiBookings'
import toast from 'react-hot-toast'

export const useCheckout = () => {
  const queryClient = useQueryClient()

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: checkedOutBooking => {
      toast.success(`Booking #${checkedOutBooking.id} successfully checked out`)
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
    onError: () => toast.error('There was en error while checking out'),
  })

  return { checkout, isCheckingOut }
}
