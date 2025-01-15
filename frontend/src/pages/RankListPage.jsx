import { Header } from '../components/Header';

export const RankListPage = () => {
  return (
    <div className=' col-span-4 mr-10 py-8 '>
      <Header title='Rank list' />
      <main className='grid grid-cols-4 grid-rows-3 gap-x-4 '>
        <input type='range' className='col-start-2 col-span-2' />

        <button className='border-2 rounded px-2 py-1 col-start-2'>
          <div className=''>The Bolter</div>
        </button>
        <button className='border-2 rounded px-2 py-1 col-start-3'>
          <div className=''>Robin</div>
        </button>
      </main>
    </div>
  );
};
