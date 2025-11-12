import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/api/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useCheckin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
    onSuccess: checkedInBooking => {
      toast.success(`Booking #${checkedInBooking.id} successfully checked in`)
      queryClient.invalidateQueries({
        queryKey: [['booking', checkedInBooking.id], ['bookings']],
      })
      navigate('/')
    },
    onError: () => toast.error('There was en error while checking in'),
  })

  return { checkin, isCheckingIn }
}
