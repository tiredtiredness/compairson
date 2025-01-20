import { Header } from '@/components/Header'
import { ListCard } from '@/components/ListCard'
import { Loader } from '@/components/Loader'
import { CreateListCard } from '@/components/CreateListCard.jsx'
import { FilterSection } from '@/components/FilterSection.jsx'
import { Input } from '@/components/Input.jsx'
import { Dropdown } from '@/components/Dropdown.jsx'
import { Button } from '@/components/Button.jsx'
import { useUpdateList } from '@/hooks/lists/useUpdateList.js'
import { useLists } from '@/hooks/lists/useLists.js'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce.js'

const statusFilterItems = {
  pending: 'Pending',
  paused: 'Paused',
  sorted: 'Sorted',
}

const orderByFilterItems = {
  newest: 'Newest',
  oldest: 'Oldest',
  alphabetical: 'A-Z',
  reverseAlphabetical: 'Z-A',
  mostItems: 'Most Items',
  fewestItems: 'Fewest Items',
  publicFirst: 'Public First',
  privateFirst: 'Private First',
}

export const AllListsPage = () => {
  const [inputValue, setInputValue] = useState('')
  const debounceInputValue = useDebounce(inputValue, 300)
  const [statusFilter, setStatusFilter] = useState([])
  const [orderByFilter, setOrderByFilter] = useState('')

  const clearFilters = () => {
    setInputValue('')
    setStatusFilter([])
    setOrderByFilter('')
  }

  const { lists, isLoading: isLoadingLists } = useLists(
    debounceInputValue,
    statusFilter,
    orderByFilter
  )

  const { mutate, isLoading: isLoadingUpdateList, isError } = useUpdateList()

  return (
    <div className="mr-10 flex-grow py-8">
      <Header title="Your lists" />
      <main className="">
        <FilterSection>
          <Input inputValue={inputValue} setInputValue={setInputValue} />
          <Dropdown
            title="Status"
            type="checkbox"
            items={statusFilterItems}
            onChange={setStatusFilter}
          />
          <Dropdown
            title="Order By"
            type="radio"
            items={orderByFilterItems}
            onChange={setOrderByFilter}
          />
          <Button type="light" onClick={clearFilters}>
            Clear
          </Button>
        </FilterSection>
        <div className="grid grid-cols-3 gap-4">
          {isLoadingLists ? (
            <Loader />
          ) : (
            <>
              <CreateListCard />
              {lists?.map((list) => (
                <ListCard
                  list={list}
                  key={list.id}
                  setIsPrivate={({ id, isPrivate }) => {
                    mutate({ id, isPrivate })
                  }}
                />
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
