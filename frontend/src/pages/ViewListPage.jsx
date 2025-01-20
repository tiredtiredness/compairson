import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { Icon } from '@iconify/react/dist/iconify.js';
import { updateList } from '../utils/listService.js';
import { useNavigate, useParams, useResolvedPath } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { Loader } from '../components/Loader.jsx';
import { createItem } from '../utils/itemService.js';
import { useState } from 'react';
import { EditableText } from '../components/EditableText.jsx';
import { Button } from '../components/Button.jsx';
import { useList } from '../hooks/lists/useList.js';
import { useDeleteList } from '../hooks/lists/useDeleteList.js';
import { useItems } from '../hooks/items/useItems.js';
import { useDeleteItem } from '../hooks/items/useDeleteItem.js';
import { useUpdateList } from '../hooks/lists/useUpdateList.js';

export const ViewListPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const rankingPath = useResolvedPath('./ranking');
  const navigate = useNavigate();

  const { list, isLoading: isLoadingList } = useList(params.listId);
  const { mutate: deleteListMutation } = useDeleteList(params.listId, () =>
    navigate('/lists')
  );
  const { items, isLoading: isLoadingItems } = useItems(params.listId);
  const { mutate: deleteItemMutation } = useDeleteItem(list?.id);

  const listMutation = useUpdateList();

  const addItemMutation = useMutation({
    mutationKey: ['item', list?.id],
    mutationFn: () => {
      createItem({ name: itemName, listId: list?.id }, token);
      setItemName('');
    },
    onSuccess: queryClient.invalidateQueries(['item']),
  });

  const [itemName, setItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const listCreationDate = new Date(list?.createdAt).toLocaleDateString();

  if (isLoadingItems) return <Loader />;
  return (
    <div className='mr-10 py-8 '>
      <Header title='View list' />
      <main className='flex flex-col gap-2'>
        <EditableText
          text={list?.name}
          setText={name => listMutation.mutate({ id: list?.id, name })}
        >
          <h3 className='text-2xl'>{list?.name}</h3>
        </EditableText>

        <div className='border-l-2 border-black pl-2 '>
          <EditableText
            type='textarea'
            text={list?.description}
            setText={description =>
              listMutation.mutate({ id: list?.id, description })
            }
          >
            <p className='text-sm'>{list?.description}</p>
          </EditableText>
        </div>

        <div>Created at {listCreationDate}</div>

        {items?.length ? (
          <ul className='flex flex-col gap-2 list-decimal pl-4'>
            {items.map(item => (
              <li key={item.id}>
                <div className='flex gap-2 items-center'>
                  <p>{item.name}</p>
                  <button onClick={() => deleteItemMutation(item.id)}>
                    <Icon icon='solar:trash-bin-trash-outline' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          'No items currently in the list. Click "Add item" to add the first item'
        )}
        {isAddingItem && (
          <div className='flex gap-2 items-center'>
            <input
              type='text'
              name=''
              id=''
              value={itemName}
              className='border-2 border-zinc-200 rounded px-2 py-1'
              onChange={e => setItemName(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  addItemMutation.mutate();
                }
              }}
            />
            <Icon icon='solar:reply-2-outline' />
          </div>
        )}
        <div className='flex gap-2'>
          <button
            onClick={() => setIsAddingItem(!isAddingItem)}
            className='border-2 rounded border-zinc-200 px-2 py-1 box-content flex gap-1 items-center'
          >
            <Icon icon='solar:add-circle-outline' /> <span>Add Item</span>
          </button>
          {isAddingItem && (
            <button className='rounded bg-zinc-200 px-2 py-1 '>Finish</button>
          )}
        </div>
        <Button
          type='light'
          className='w-fit'
          onClick={() => navigate(rankingPath)}
        >
          Rank
        </Button>
        <Button type='danger' className='w-fit' onClick={deleteListMutation}>
          Delete list
        </Button>
      </main>
    </div>
  );
};
