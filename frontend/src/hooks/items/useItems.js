import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '@/utils/itemService.js'
import { useAuth } from '@/hooks/useAuth.js'

export const useItems = (listId) => {
  const { token } = useAuth()
  const { data: items, isLoading: isLoadingItems } = useQuery({
    queryKey: ['items', listId],
    queryFn: () => fetchItems(listId, token),
  })
  return { items, isLoading: isLoadingItems }
}
