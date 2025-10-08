import { QueryClient } from '@tanstack/react-query'

export const apiqueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
})
