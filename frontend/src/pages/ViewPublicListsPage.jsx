import { Header } from '../components/Header';
import { ListCard } from '../components/ListCard';
import { Loader } from '../components/Loader';

import { useAuth } from '../hooks/useAuth.js';
import { useEffect, useState } from 'react';
import { FilterSection } from '../components/FilterSection.jsx';
import { Input } from '../components/Input.jsx';
import { Dropdown } from '../components/Dropdown.jsx';
import { Button } from '../components/Button.jsx';
import { usePublicLists } from '../hooks/lists/usePublicLists.js';

const statusFilterItems = {
  pending: 'Pending',
  paused: 'Paused',
  sorted: 'Sorted',
};

const orderByFilterItems = {
  newest: 'Newest',
  oldest: 'Oldest',
  alphabetical: 'A-Z',
  reverseAlphabetical: 'Z-A',
};

export const ViewPublicListsPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [orderByFilter, setOrderByFilter] = useState('');

  const { publicLists, isLoading } = usePublicLists(
    inputValue,
    statusFilter,
    orderByFilter
  );

  const clearFilters = () => {
    setInputValue('');
    setStatusFilter([]);
    setOrderByFilter('');
  };

  return (
    <div className='flex-grow py-8 mr-10'>
      <Header title='Public lists' />
      <main className=''>
        <FilterSection>
          <Input inputValue={inputValue} setInputValue={setInputValue} />
          <Dropdown
            title='Status'
            type='checkbox'
            items={statusFilterItems}
            onChange={setStatusFilter}
          />
          <Dropdown
            title='Order By'
            type='radio'
            items={orderByFilterItems}
            onChange={setOrderByFilter}
          />
          <Button type='light' onClick={clearFilters}>
            Clear
          </Button>
        </FilterSection>
        <div className='grid grid-cols-3 gap-4'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {publicLists?.map(list => (
                <ListCard
                  list={list}
                  key={list.id}
                  showAuthor={true}
                  showIsPrivate={false}
                />
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
