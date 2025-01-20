import { useState } from 'react'
import { Header } from '@/components/Header'
import { ListCard } from '@/components/ListCard'
import { Loader } from '@/components/Loader'
import { FilterSection } from '../components/FilterSection.jsx'
import { Input } from '@/components/Input.jsx'
import { Dropdown } from '@/components/Dropdown.jsx'
import { Button } from '@/components/Button.jsx'
import { usePublicLists } from '@/hooks/lists/usePublicLists.js'
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
}

export const ViewPublicListsPage = () => {
  const [inputValue, setInputValue] = useState('')
  const debounceInputValue = useDebounce(inputValue, 300)
  const [statusFilter, setStatusFilter] = useState([])
  const [orderByFilter, setOrderByFilter] = useState('')

  const { publicLists, isLoading } = usePublicLists(
    debounceInputValue,
    statusFilter,
    orderByFilter
  )

  const clearFilters = () => {
    setInputValue('')
    setStatusFilter([])
    setOrderByFilter('')
  }

  return (
    <div className="mr-10 flex-grow py-8">
      <Header title="Public lists" />
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {publicLists?.map((list) => (
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
  )
}
