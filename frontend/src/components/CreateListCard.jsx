import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { createList, fetchLists } from '../utils/listService.js';
import { useAuth } from '../hooks/useAuth.js';
import { Loader } from './Loader.jsx';

export const CreateListCard = () => {
  const navigate = useNavigate();
  const { user, token, isLoading } = useAuth();

  const { data: lists } = useQuery({
    queryKey: ['lists', user?.id],
    queryFn: () => {
      return fetchLists(user?.id, token);
    },
  });

  const createListAndNavigate = async () => {
    if (!user?.id) return;

    const newList = await createList(
      {
        name: `List #${lists?.length + 1}`,
        userId: user?.id,
      },
      token
    );
    navigate(`/lists/${newList.id}`);
  };

  return (
    <button
      className='bg-zinc-100 rounded px-4 py-2 hover:cursor-pointer flex justify-center items-center '
      onClick={() => createListAndNavigate()}
    >
      <Icon icon='solar:add-square-outline' />
    </button>
  );
};
