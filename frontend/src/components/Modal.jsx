import { Icon } from '@iconify/react/dist/iconify.js';

export const Modal = ({ isVisible = true, setIsVisible, children }) => {
  return (
    isVisible && (
      <div className='fixed top-0 left-0 w-dvw h-dvh flex items-center justify-center backdrop-blur-sm '>
        <div className='border-2 border-zinc-200 rounded px-2 py-1 flex flex-col gap-4 z-10 '>
          <div className='flex justify-end '>
            <h3 className=' font-bold grow'>Title</h3>
            <button onClick={() => setIsVisible(false)}>
              <Icon icon='solar:close-circle-outline' />
            </button>
          </div>
          {children ?? 'aboba'}
          <div className='self-end flex gap-1'>
            <button
              className='border-2 border-zinc-200 rounded px-2 py-1'
              onClick={() => setIsVisible(false)}
            >
              Cancel
            </button>
            <button className='border-2 border-zinc-200 rounded px-2 py-1 bg-green-500 text-white'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};
