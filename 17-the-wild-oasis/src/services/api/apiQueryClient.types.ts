import '@tanstack/react-query'

type QueryKey = ['cabins' | 'settings', ...ReadonlyArray<unknown>]

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey
    mutationKey: QueryKey
  }
}
