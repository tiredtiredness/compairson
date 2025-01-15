import { useQuery } from '@tanstack/react-query';
import { fetchList } from '../../utils/listService.js';
import { useAuth } from '../useAuth.js';

export const useList = listId => {
  const { token } = useAuth();
  const { data: list, isLoading: isLoadingList } = useQuery({
    queryKey: ['list', listId],
    queryFn: () => fetchList(listId, token),
  });
  return { list, isLoading: isLoadingList };
};
