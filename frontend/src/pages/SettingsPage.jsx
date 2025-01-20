import { Icon } from '@iconify/react/dist/iconify.js'
import { Header } from '@/components/Header'
import { Loader } from '@/components/Loader.jsx'
import { useState } from 'react'
import { Button } from '@/components/Button.jsx'
import { EditableText } from '@/components/EditableText.jsx'
import { Toggler } from '@/components/Toggler.jsx'
import { useUpdateUser } from '@/hooks/useUpdateUser.js'
import { useUser } from '@/hooks/useUser.js'

export const SettingsPage = () => {
  const { user, isLoading } = useUser()
  const { mutate: userMutation } = useUpdateUser()

  const [imageUrl, setTmageUrl] = useState(user?.imageUrl)
  const [selected, setSelected] = useState('day')

  const first = ['day', 'night']

  const handleToggle = (currentItem) => {
    setSelected(currentItem)
  }

  if (isLoading) return <Loader />
  return (
    <div className="mr-10 flex-grow py-8">
      <Header title="Settings" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold capitalize">Your avatar</h4>
              <div className="flex items-center gap-6">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white to-zinc-200">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      className="aspect-square w-full"
                    />
                  ) : (
                    <Icon icon="solar:user-outline" width={'25%'} />
                  )}
                </div>
                <input type="file" name="" id="" />
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                <h4 className="w-32 py-2 font-bold capitalize">First name</h4>
                <EditableText
                  text={user?.firstName}
                  setText={(firstName) => userMutation({ firstName })}
                >
                  {user?.firstName}
                </EditableText>
              </label>
              <label htmlFor="" className="flex items-center gap-2">
                <h4 className="w-32 py-2 font-bold capitalize">Last name</h4>
                <EditableText
                  text={user?.lastName}
                  setText={(lastName) => userMutation({ lastName })}
                >
                  {user?.lastName}
                </EditableText>
              </label>
              <label htmlFor="" className="flex items-center gap-2">
                <h4 className="w-32 py-2 font-bold capitalize">Username</h4>
                <EditableText
                  text={user?.username}
                  setText={(username) => userMutation({ username })}
                >
                  {user?.username}
                </EditableText>
              </label>
              <label htmlFor="" className="flex items-center gap-2">
                <h4 className="w-32 py-2 font-bold capitalize">Email</h4>
                <EditableText
                  text={user?.email}
                  setText={(email) => userMutation({ email })}
                >
                  {user?.email}
                </EditableText>
              </label>
            </div>
            <hr />
            <div className="flex items-center gap-2">
              <h4 className="w-32 py-2 font-bold capitalize">Theme</h4>
              <Toggler options={first} onToggle={handleToggle} />
            </div>
            <hr />
            <div className="flex items-center gap-2">
              <p className="w-32 font-bold text-zinc-400">
                Delete all your lists
              </p>
              <p className="grow text-sm text-zinc-400">
                When you delete your lists, you lose ALL created lists. You can
                cancel the deletion for 7 days.
              </p>
              <Button type="danger">Delete your account</Button>
            </div>
            <hr />
            <div className="flex items-center gap-2">
              <p className="w-32 font-bold text-zinc-400">
                Delete your account
              </p>
              <p className="grow text-sm text-zinc-400">
                When you delete your account, you lose all personal data and
                created lists. You can cancel the deletion for 7 days.
              </p>
              <Button type="danger">Delete account</Button>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
