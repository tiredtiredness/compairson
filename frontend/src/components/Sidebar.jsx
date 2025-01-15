import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuth } from '../hooks/useAuth.js';
import { IconNavLink } from './IconNavLink.jsx';
import { fetchUserProfile } from '../utils/authService.js';
import { useQuery } from '@tanstack/react-query';
import { Loader } from './Loader.jsx';
import { useUser } from '../hooks/useUser.js';

export const Sidebar = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loader />;

  return (
    <aside className='flex-shrink-0 h-dvh border-r mx-4 sm:mx-10 pr-4 sm:pr-10 py-8 sticky top-0 flex flex-col justify-center gap-6 w-14 lg:w-44 '>
      <div className='flex flex-col items-center gap-2'>
        <div className='w-full aspect-square bg-gradient-to-br from-white to-zinc-200 rounded-full overflow-hidden flex justify-center items-center'>
          {user?.imageUrl ? (
            <img src={user?.imageUrl} alt='avatar' className='aspect-square' />
          ) : (
            <Icon icon='solar:user-outline' />
          )}
        </div>
        <div className='font-bold text-center'>
          {user?.firstName || user?.username}
        </div>
      </div>
      <nav className='flex flex-col gap-2'>
        <IconNavLink
          to='/lists/public'
          icon='solar:magnifer-outline'
          text='Public lists'
          hideTextClassName='hidden lg:inline'
        />
        <IconNavLink
          to='/lists/mine'
          icon='solar:hamburger-menu-outline'
          text='Your lists'
          hideTextClassName='hidden lg:inline'
        />
        <IconNavLink
          to='/settings'
          icon='solar:settings-outline'
          text='Settings'
          hideTextClassName='hidden lg:inline'
        />
        <IconNavLink
          to='/logout'
          icon='solar:logout-2-outline'
          text='Log out'
          hideTextClassName='hidden lg:inline'
        />
      </nav>
      <div className='flex flex-col gap-2 absolute bottom-4'>
        <footer className='text-center text-sm'>Compairson &copy; 2025</footer>
      </div>
    </aside>
  );
};
