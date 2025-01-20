import { useQuery } from '@tanstack/react-query'
import { fetchLists } from '@/utils/listService.js'
import { useAuth } from '@/hooks/useAuth.js'

export const useLists = (search, status, orderBy) => {
  const {
    user: { id },
    token,
  } = useAuth()

  const {
    data: lists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lists', id, search, status, orderBy],
    queryFn: () => {
      return fetchLists({ search, status, orderBy }, token)
    },
    enabled: !!id && !!token,
  })

  return { lists, isLoading, isError }
}
