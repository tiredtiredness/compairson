import { useMutation } from '@tanstack/react-query'
import { deleteList } from '@/utils/listService.js'
import { useAuth } from '@/hooks/useAuth.js'

export const useDeleteList = (listId, onSuccess) => {
  const { token } = useAuth()
  const mutation = useMutation({
    mutationKey: ['list', listId],
    mutationFn: () => deleteList(listId, token),
    onSuccess,
  })
  return {
    mutate: mutation.mutate,
    onSuccess: mutation.onSuccess,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  }
}
