import { useAuth } from '../useAuth.js'
import { fetchPublicLists } from '@/utils/listService.js'
import { useQuery } from '@tanstack/react-query'

export const usePublicLists = (search, status, orderBy) => {
  const {
    user: { id: userId },
    token,
  } = useAuth()

  const {
    data: publicLists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['publicLists', userId, search, status, orderBy],
    queryFn: () => {
      return fetchPublicLists(search, status, orderBy, token)
    },
    enabled: !!userId && !!token,
  })

  return { publicLists, isLoading, isError }
}
