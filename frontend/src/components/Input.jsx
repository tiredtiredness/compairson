import { Icon } from '@iconify/react/dist/iconify.js'

export const Input = ({ inputValue, setInputValue }) => {
  return (
    <label className="relative col-span-1 flex items-center">
      <input
        type="text"
        id="search"
        value={inputValue}
        className="w-full rounded px-2 py-1 pr-8 outline outline-1 outline-zinc-200 focus:outline focus:outline-offset-4 focus:outline-black"
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Icon
        icon="solar:magnifer-outline"
        className="absolute right-2 hover:cursor-pointer"
      />
    </label>
  )
}
