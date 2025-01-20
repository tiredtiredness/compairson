import { useMutation } from '@tanstack/react-query'
import { deleteItem } from '@/utils/itemService.js'
import { useAuth } from '@/hooks/useAuth.js'

export const useDeleteItem = (listId) => {
  const { token } = useAuth()
  const mutation = useMutation({
    mutationKey: ['item', listId],
    mutationFn: (itemId) => deleteItem(itemId, token),
  })
  return {
    mutate: mutation.mutate,
    isError: mutation.isError,
    isLoading: mutation.isLoading,
  }
}
