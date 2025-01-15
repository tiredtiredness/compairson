import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '../../utils/itemService.js';
import { useAuth } from '../useAuth.js';

export const useItems = listId => {
  const { token } = useAuth();
  const { data: items, isLoading: isLoadingItems } = useQuery({
    queryKey: ['items', listId],
    queryFn: () => fetchItems(listId, token),
  });
  console.log(items);
  return { items, isLoading: isLoadingItems };
};
