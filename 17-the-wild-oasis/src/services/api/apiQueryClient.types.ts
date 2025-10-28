import '@tanstack/react-query'

type QueryKey = ['cabins' | 'settings' | 'bookings', ...ReadonlyArray<unknown>]

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey
    mutationKey: QueryKey
  }
}
