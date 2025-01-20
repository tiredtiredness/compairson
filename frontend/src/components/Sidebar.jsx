import { Icon } from '@iconify/react/dist/iconify.js'
import { IconNavLink } from '@/components/IconNavLink.jsx'
import { Loader } from '@/components/Loader.jsx'
import { useUser } from '@/hooks/useUser.js'

export const Sidebar = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return <Loader />

  return (
    <aside className="sticky top-0 mx-4 flex h-dvh w-14 flex-shrink-0 flex-col justify-center gap-6 border-r py-8 pr-4 sm:mx-10 sm:pr-10 lg:w-44">
      <div className="flex flex-col items-center gap-2">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white to-zinc-200">
          {user?.imageUrl ? (
            <img src={user?.imageUrl} alt="avatar" className="aspect-square" />
          ) : (
            <Icon icon="solar:user-outline" />
          )}
        </div>
        <div className="text-center font-bold">
          {user?.firstName || user?.username}
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        <IconNavLink
          to="/lists/public"
          icon="solar:magnifer-outline"
          text="Public lists"
          hideTextClassName="hidden lg:inline"
        />
        <IconNavLink
          to="/lists/mine"
          icon="solar:hamburger-menu-outline"
          text="Your lists"
          hideTextClassName="hidden lg:inline"
        />
        <IconNavLink
          to="/settings"
          icon="solar:settings-outline"
          text="Settings"
          hideTextClassName="hidden lg:inline"
        />
        <IconNavLink
          to="/logout"
          icon="solar:logout-2-outline"
          text="Log out"
          hideTextClassName="hidden lg:inline"
        />
      </nav>
      <div className="absolute bottom-4 flex flex-col gap-2">
        <footer className="text-center text-sm">Compairson &copy; 2025</footer>
      </div>
    </aside>
  )
}
