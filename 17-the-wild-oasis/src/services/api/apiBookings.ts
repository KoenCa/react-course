import { PAGE_SIZE } from '../../utils/constants'
import { getToday } from '../../utils/helpers'
import type { Database } from '../supabase/database.types'
import { supabase } from '../supabase/supabase'

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('Bookings')
    .select('*, Cabins(*), Guests(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking not found')
  }

  return data
}

export interface GetBookingsArgs {
  filter?: {
    field: keyof Database['public']['Tables']['Bookings']['Row']
    value: string
    method?: 'eq' | 'gte' | 'lte'
  }
  sortBy?: {
    field: keyof Database['public']['Tables']['Bookings']['Row']
    direction: 'asc' | 'desc'
  }
  page: number
}

export const getBookings = async (
  queryOptions: GetBookingsArgs | undefined
) => {
  const { filter, sortBy, page } = queryOptions || {}

  let query = supabase
    .from('Bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, Cabins(name), Guests(fullName, email)',
      { count: 'exact' }
    )

  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value)

  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })

  if (page) {
    // 0 - 9, 10 - 19,...
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error('Bookings could no be loaded')
  }

  return { bookings: data, count }
}

/**
  Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days,
  for example.
  @param date date as ISO date string
*/
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('Bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

/**
 * Returns all STAYS that were created after the given date
 * @param date date as ISO date string
 */
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('Bookings')
    // .select('*')
    .select('*, Guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

/**
 * Get activities for today. "Activity" means that there is a check in or a check out today.
*/
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('Bookings')
    .select('*, Guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at')

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }
  return data
}

export async function updateBooking(
  id: number,
  obj: Database['public']['Tables']['Bookings']['Update']
) {
  const { data, error } = await supabase
    .from('Bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }

  return data
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('Bookings').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }

  return data
}
