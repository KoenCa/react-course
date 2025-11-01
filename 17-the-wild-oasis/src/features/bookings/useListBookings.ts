import { useQuery } from '@tanstack/react-query'
import {
  getBookings,
  type GetBookingsArgs,
} from '../../services/api/apiBookings'
import { useSearchParams } from 'react-router-dom'

export const useListBookings = () => {
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('status') || 'all'
  const filter: GetBookingsArgs['filter'] =
    filterValue === 'all'
      ? undefined
      : {
          field: 'status',
          value: filterValue,
        }

  const sortByValue = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByValue.split('-') as [
    GetBookingsArgs['sortBy']['field'],
    GetBookingsArgs['sortBy']['direction']
  ]
  const sortBy: GetBookingsArgs['sortBy'] = { field, direction }

  const { isLoading: isLoadingBookings, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  })

  return { isLoadingBookings, bookings }
}
