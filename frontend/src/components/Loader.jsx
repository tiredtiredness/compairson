export const Loader = ({ type }) => {
  const height = type === 'page' ? 'h-dvh w-full' : 'h-full w-min'
  return (
    <div className={`flex items-center justify-center gap-2 ${height} `}>
      <div className="animation-delay-0 size-2 animate-pulse rounded-full bg-zinc-400"></div>
      <div className="animation-delay-200 size-2 animate-pulse rounded-full bg-zinc-400"></div>
      <div className="animation-delay-400 size-2 animate-pulse rounded-full bg-zinc-400"></div>
    </div>
  )
}
