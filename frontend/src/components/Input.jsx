import { Icon } from '@iconify/react/dist/iconify.js';

export const Input = ({ inputValue, setInputValue }) => {
  return (
    <label className='flex items-center relative col-span-1'>
      <input
        type='text'
        id='search'
        value={inputValue}
        className='outline outline-zinc-200 rounded px-2 py-1 pr-8 w-full'
        onChange={e => setInputValue(e.target.value)}
      />
      <Icon
        icon='solar:magnifer-outline'
        className=' absolute right-2 hover:cursor-pointer'
      />
    </label>
  );
};
