import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../useAuth.js';
import { updateList } from '../../utils/listService.js';

export const useUpdateList = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, isPrivate, name, description }) =>
      updateList({ id, isPrivate, name, description }, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['list']);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
};
