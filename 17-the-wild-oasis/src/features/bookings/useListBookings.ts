import { useQuery } from '@tanstack/react-query'
import {
  getBookings,
  type GetBookingsArgs,
} from '../../services/api/apiBookings'
import { useSearchParams } from 'react-router-dom'
import type { Database } from '../../services/supabase/database.types'

export const useListBookings = () => {
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('status')
  const filter: GetBookingsArgs['filter'] =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue,
        }

  const { isLoading: isLoadingBookings, data: bookings } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  })

  return { isLoadingBookings, bookings }
}
