import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createItem } from '@/utils/itemService.js'
import { useAuth } from '@/hooks/useAuth.js'

export const useCreateItem = (onSuccess) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['item', itemId],
    mutationFn: () => {
      createItem({ name, listId }, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['item'])
      onSuccess()
    },
  })
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  }
}
