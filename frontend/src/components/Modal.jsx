import { Icon } from '@iconify/react/dist/iconify.js'

export const Modal = ({ isVisible = true, setIsVisible, children }) => {
  return (
    isVisible && (
      <div className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center backdrop-blur-sm">
        <div className="z-10 flex flex-col gap-4 rounded border-2 border-zinc-200 px-2 py-1">
          <div className="flex justify-end">
            <h3 className="grow font-bold">Title</h3>
            <button onClick={() => setIsVisible(false)}>
              <Icon icon="solar:close-circle-outline" />
            </button>
          </div>
          {children ?? 'aboba'}
          <div className="flex gap-1 self-end">
            <button
              className="rounded border-2 border-zinc-200 px-2 py-1"
              onClick={() => setIsVisible(false)}
            >
              Cancel
            </button>
            <button className="rounded border-2 border-zinc-200 bg-green-500 px-2 py-1 text-white">
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  )
}
