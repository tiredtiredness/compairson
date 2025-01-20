import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth.js'
import { updateUser } from '@/utils/userService.js'

export const useUpdateUser = () => {
  const {
    user: { id },
    token,
  } = useAuth()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['user', id],
    mutationFn: ({ email, username, firstName, lastName }) => {
      return updateUser({ id, email, username, firstName, lastName }, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    },
  })
  return {
    mutate: mutation.mutate,
    isError: mutation.isError,
    isLoading: mutation.isLoading,
  }
}
