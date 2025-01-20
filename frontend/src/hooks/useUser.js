import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth.js'
import { fetchUserProfile } from '@/utils/authService.js'

export const useUser = () => {
  const { user, isLoading, token } = useAuth()
  const { data: userQ, isLoadingQ } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => fetchUserProfile(token),
  })

  return { user: userQ, isLoading: isLoading || isLoadingQ }
}
