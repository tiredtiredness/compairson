import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';

export const Dropdown = ({ title, type, items, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(type === 'checkbox' ? [] : '');
  const toggleDropdown = () => setIsOpen(isOpen => !isOpen);

  const handleSelection = key => {
    if (type === 'checkbox') {
      const newSelection = selected.includes(key)
        ? selected.filter(item => item !== key)
        : [...selected, key];
      setSelected(newSelection);
      onChange(newSelection);
    } else {
      setSelected(key);
      onChange(key);
    }
  };

  return (
    <div className='relative' onMouseLeave={() => setIsOpen(false)}>
      <button
        className='relative outline outline-zinc-200 rounded px-2 py-1 flex items-center gap-1 hover:bg-zinc-100'
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <Icon
          icon='solar:alt-arrow-down-outline'
          className={isOpen ? 'rotate-90 transition-all' : 'transition-all'}
        />
      </button>
      <div className='absolute w-full h-2'></div>
      {isOpen && (
        <form className='absolute left-0 mt-2 outline outline-zinc-200 rounded flex flex-col shadow-md bg-white z-10 '>
          {Object.entries(items).map(([key, value]) => (
            <label
              className='px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-zinc-100 '
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
  );
};
