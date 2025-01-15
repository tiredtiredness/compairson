export const Loader = ({ type }) => {
  const height = type === 'page' ? 'h-dvh w-full' : 'h-full w-min';
  return (
    <div className={`flex gap-2 justify-center items-center ${height} `}>
      <div className='bg-zinc-400 rounded-full size-2 animate-pulse animation-delay-0'></div>
      <div className='bg-zinc-400 rounded-full size-2 animate-pulse animation-delay-200'></div>
      <div className='bg-zinc-400 rounded-full size-2 animate-pulse animation-delay-400'></div>
    </div>
  );
};
