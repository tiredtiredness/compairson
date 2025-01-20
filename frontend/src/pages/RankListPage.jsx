import { useParams } from 'react-router';
import { Header } from '../components/Header';
import { useList } from '../hooks/lists/useList.js';
import { useItems } from '../hooks/items/useItems.js';
import { Loader } from '../components/Loader.jsx';
import { useRanking } from '../hooks/useRanking.js';

export const RankListPage = () => {
  const { listId } = useParams();
  const { list, isLoading: isLoadingList } = useList(listId);
  const { items, isLoading: isLoadingItems } = useItems(listId);
  const itemsToRank = items?.map(item => item.id);

  const {
    pairs,
    currentPair,
    isFinished,
    handleOptionClick,
    getRanking,
    isLoading: isLoadingPair,
  } = useRanking(itemsToRank);
  const itemNameMap = Object.fromEntries(
    items?.map(item => [item.id, item.name]) ?? []
  );

  if (isLoadingList || isLoadingItems) return <Loader />;
  console.log(getRanking());

  return (
    <div className='mr-10 py-8'>
      <Header title='Rank list' />
      <main className='flex flex-col'>
        <h1>Ranking for &quot;{list?.name}&quot;</h1>
        {isFinished ? (
          <ol className='list-decimal list-inside '>
            {getRanking().map(item => (
              <li key={item.element}>{itemNameMap[item.element]}</li>
            ))}
          </ol>
        ) : (
          <>
            {isLoadingPair ? (
              <Loader />
            ) : (
              <div className='flex gap-4'>
                <button
                  className='border-2 rounded px-2 py-1'
                  onClick={() => {
                    handleOptionClick(0);
                  }}
                >
                  {itemNameMap[pairs?.[currentPair]?.[0]]}
                </button>
                <button
                  className='border-2 rounded px-2 py-1'
                  onClick={() => {
                    handleOptionClick(1);
                  }}
                >
                  {itemNameMap[pairs?.[currentPair]?.[1]]}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
