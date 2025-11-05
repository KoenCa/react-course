import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getBookings,
  type GetBookingsArgs,
} from '../../services/api/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export const useListBookings = () => {
  const queryClient = useQueryClient()
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

  // QUERY
  const {
    isLoading: isLoadingBookings,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  // PREFETCH QUERY
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE)

  // Next pages
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })

  // PRevious pages
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })

  return {
    isLoadingBookings,
    error,
    bookings: bookings,
    count: count,
  }
}
