/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router'

const icons = {
  sorted: <Icon icon="solar:list-check-outline" />,
  paused: <Icon icon="solar:pause-outline" />,
  pending: <Icon icon="solar:play-outline" />,
}

export const ListCard = ({
  list,
  setIsPrivate,
  showAuthor,
  showIsPrivate = true,
}) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`/lists/${list.id}`}
      className="fade flex min-h-36 flex-col gap-1 rounded bg-zinc-100 px-4 py-2 hover:cursor-pointer focus:outline focus:outline-offset-4 focus:outline-black active:outline active:outline-offset-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{list.name}</h3>
        <div className="flex gap-2">
          {showIsPrivate && (
            <button
              onClick={(e) => {
                e.preventDefault()
                if (!setIsPrivate) return
                setIsPrivate({ id: list.id, isPrivate: !list.isPrivate })
              }}
            >
              {list.isPrivate ? (
                <Icon icon="solar:lock-password-outline" />
              ) : (
                <Icon icon="solar:lock-unlocked-outline" />
              )}
            </button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              navigate(`../lists/${list.id}/ranking`)
            }}
          >
            {icons[list.status]}
          </button>
        </div>
      </div>
      {showAuthor && <p>{list?.user?.username}</p>}

      <p className="line-clamp-3 text-sm">{list.description}</p>
      <hr />
      {list.reactions ? (
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-green-600">
            <p>10</p>
            <Icon icon="solar:star-outline" />
          </div>
          <div className="flex items-center gap-1 text-indigo-400">
            <p>2</p> <Icon icon="solar:emoji-funny-circle-outline" />
          </div>
          <div className="flex items-center gap-1 text-rose-600">
            <p>3</p> <Icon icon="solar:heart-broken-broken" />
          </div>
        </div>
      ) : (
        <p>No ranking yet</p>
      )}
    </Link>
  )
}
