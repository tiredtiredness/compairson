import { Icon } from '@iconify/react/dist/iconify.js';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader.jsx';
import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { EditableText } from '../components/EditableText.jsx';
import { Toggler } from '../components/Toggler.jsx';
import { useUpdateUser } from '../hooks/useUpdateUser.js';
import { useUser } from '../hooks/useUser.js';

export const SettingsPage = () => {
  const { user, isLoading } = useUser();
  const { mutate: userMutation } = useUpdateUser();

  const [imageUrl, setTmageUrl] = useState(user?.imageUrl);
  const [selected, setSelected] = useState('day');

  const first = ['day', 'night'];

  const handleToggle = currentItem => {
    setSelected(currentItem);
  };

  if (isLoading) return <Loader />;
  return (
    <div className='flex-grow py-8 mr-10'>
      <Header title='Settings' />
      {isLoading ? (
        <Loader />
      ) : (
        <div className=''>
          <main className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <h4 className='font-bold capitalize'>Your avatar</h4>
              <div className='flex gap-6 items-center'>
                <div className='w-28 h-28 bg-gradient-to-br from-white to-zinc-200 rounded-full overflow-hidden flex justify-center items-center'>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt='avatar'
                      className='w-full aspect-square '
                    />
                  ) : (
                    <Icon icon='solar:user-outline' width={'25%'} />
                  )}
                </div>
                <input type='file' name='' id='' />
              </div>
            </div>
            <hr />
            <div className='flex flex-col gap-2'>
              <label htmlFor='' className='flex gap-2 items-center '>
                <h4 className='font-bold capitalize w-32 py-2'>First name</h4>
                <EditableText
                  text={user?.firstName}
                  setText={firstName => userMutation({ firstName })}
                >
                  {user?.firstName}
                </EditableText>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <h4 className='font-bold capitalize w-32 py-2'>Last name</h4>
                <EditableText
                  text={user?.lastName}
                  setText={lastName => userMutation({ lastName })}
                >
                  {user?.lastName}
                </EditableText>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <h4 className='font-bold capitalize w-32 py-2'>Username</h4>
                <EditableText
                  text={user?.username}
                  setText={username => userMutation({ username })}
                >
                  {user?.username}
                </EditableText>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <h4 className='font-bold capitalize w-32 py-2'>Email</h4>
                <EditableText
                  text={user?.email}
                  setText={email => userMutation({ email })}
                >
                  {user?.email}
                </EditableText>
              </label>
            </div>
            <hr />
            <div className='flex gap-2 items-center'>
              <h4 className='font-bold capitalize w-32 py-2'>Theme</h4>
              <Toggler options={first} onToggle={handleToggle} />
            </div>
            <hr />
            <div className='flex gap-2 items-center'>
              <p className='font-bold w-32 text-zinc-400'>
                Delete all your lists
              </p>
              <p className='text-zinc-400 text-sm grow'>
                When you delete your lists, you lose ALL created lists. You can
                cancel the deletion for 7 days.
              </p>
              <Button type='danger'>Delete your account</Button>
            </div>
            <hr />
            <div className='flex gap-2 items-center'>
              <p className='font-bold w-32 text-zinc-400'>
                Delete your account
              </p>
              <p className='text-zinc-400 text-sm grow'>
                When you delete your account, you lose all personal data and
                created lists. You can cancel the deletion for 7 days.
              </p>
              <Button type='danger'>Delete account</Button>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
