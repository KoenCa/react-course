import { useQuery } from '@tanstack/react-query'
import {
  getBookings,
  type GetBookingsArgs,
} from '../../services/api/apiBookings'
import { useSearchParams } from 'react-router-dom'

export const useListBookings = () => {
  const [searchParams] = useSearchParams()

  // FILTERING
  const filterValue = searchParams.get('status') || 'all'
  const filter: GetBookingsArgs['filter'] =
    filterValue === 'all'
      ? undefined
      : {
          field: 'status',
          value: filterValue,
        }

  // SORTING
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByValue.split('-') as [
    GetBookingsArgs['sortBy']['field'],
    GetBookingsArgs['sortBy']['direction']
  ]
  const sortBy: GetBookingsArgs['sortBy'] = { field, direction }

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const {
    isLoading: isLoadingBookings,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  return {
    isLoadingBookings,
    error,
    bookings: bookings,
    count: count,
  }
}
