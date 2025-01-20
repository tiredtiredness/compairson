import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

export const Dropdown = ({ title, type, items, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(type === 'checkbox' ? [] : '')
  const toggleDropdown = () => setIsOpen((isOpen) => !isOpen)

  const handleSelection = (key) => {
    if (type === 'checkbox') {
      const newSelection = selected.includes(key)
        ? selected.filter((item) => item !== key)
        : [...selected, key]
      setSelected(newSelection)
      onChange(newSelection)
    } else {
      setSelected(key)
      onChange(key)
    }
  }

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="relative flex items-center gap-1 rounded px-2 py-1 outline outline-1 outline-zinc-200 hover:bg-zinc-100 focus:outline focus:outline-offset-4 focus:outline-black"
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <Icon
          icon="solar:alt-arrow-down-outline"
          className={isOpen ? 'rotate-90 transition-all' : 'transition-all'}
        />
      </button>
      <div className="absolute h-2 w-full"></div>
      {isOpen && (
        <form className="absolute left-0 z-10 mt-2 flex flex-col rounded bg-white shadow-md outline outline-1 outline-zinc-200 focus:outline focus:outline-offset-4 focus:outline-black">
          {Object.entries(items).map(([key, value]) => (
            <label
              className="flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-zinc-100"
              key={key}
            >
              <input
                type={type}
                name={type === 'radio' ? title : key}
                checked={
                  type === 'checkbox'
                    ? selected.includes(key)
                    : selected === key
                }
                onChange={() => handleSelection(key)}
              />
              <span>{value}</span>
            </label>
          ))}
        </form>
      )}
    </div>
  )
}
